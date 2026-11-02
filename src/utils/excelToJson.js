import * as XLSX from "xlsx";

// Khoá ngày dùng trong bảng (khớp DAYS trong src/constants/timetable.js)
const DAY_KEYS = new Set(["2", "3", "4", "5", "6"]);

// Không dùng \b: JS coi ký tự có dấu là non-word nên "Thứ"/"Tiết" sẽ không khớp.
const PERIOD_HEADER = /^(tiết|tiet|ppct|period)/i;
const DAY_HEADER = /^(thứ|thu|ngày|ngay)/i;
const SESSION_HEADER = /^(buổi|buoi)/i;
const NOT_A_CLASS_HEADER =
    /^(thứ|thu|buổi|buoi|tiết|tiet|ngày|ngay|lớp|lop|stt|tt|ghi chú|ghi chu)$/i;

const DAY_WORDS = {
    hai: "2",
    ba: "3",
    tư: "4",
    tu: "4",
    năm: "5",
    nam: "5",
    sáu: "6",
    sau: "6",
};

const APPLY_DATE =
    /(?:áp dụng từ|ap dung tu)(?:\s*ngày|\s*ngay)?\s*:?\s*(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{4})\s*(?:[-–—:|]\s*(.+))?/i;

/**
 * Đọc file Excel và trả về dữ liệu Period.
 *
 * Không giả định vị trí dòng/cột: mỗi sheet được dò header
 * để tìm cột Thứ, cột Buổi (nếu có), cột Tiết và các cột lớp.
 * Sheet đọc được đầu tiên sẽ được dùng.
 */
export async function excelToJson(file) {
    if (!file) {
        throw new Error("Chưa chọn file Excel.");
    }

    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
        type: "array",
    });

    if (!workbook.SheetNames.length) {
        throw new Error("File Excel không có sheet nào.");
    }

    const failures = [];

    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: "",
            blankrows: false,
        });

        try {
            return parseSheet(rows, sheetName);
        } catch (error) {
            failures.push(`- ${sheetName}: ${error.message}`);
        }
    }

    throw new Error(
        `Không đọc được thời khoá biểu từ file này.\n${failures.join("\n")}`
    );
}

/**
 * Đọc một sheet đã chuyển thành mảng 2 chiều.
 */
function parseSheet(rows, sheetName) {
    const layout = findLayout(rows);

    if (!layout) {
        throw new Error(
            'Không tìm thấy dòng tiêu đề có cột "Thứ" và cột "Tiết" kèm tên lớp.'
        );
    }

    const { name, applyDate } = getPeriodInfo(rows, sheetName);

    const schedule = buildSchedule(rows, layout);

    if (countLessons(schedule) === 0) {
        throw new Error(
            'Tìm thấy tiêu đề nhưng không có tiết học nào. Kiểm tra lại cột "Tiết" và tên lớp.'
        );
    }

    return {
        name,
        applyDate,
        active: false,
        schedule,
    };
}

/**
 * Dò dòng header: dòng có ô "Thứ"/"Ngày", ô "Tiết" và ít nhất một cột lớp ở bên phải.
 * Trả về chỉ số dòng và chỉ số cột thật, không nén cột.
 */
function findLayout(rows) {
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r] || [];

        const periodIndex = row.findIndex((cell) =>
            PERIOD_HEADER.test(cellText(cell))
        );

        if (periodIndex === -1) continue;

        // "Thứ"/"Buổi" có thể nằm ở dòng này hoặc bị gộp dọc ở 2 dòng trên
        let dayIndex = -1;
        let sessionIndex = -1;

        for (let hr = r; hr >= Math.max(0, r - 2); hr--) {
            const headerRow = rows[hr] || [];

            headerRow.forEach((cell, c) => {
                if (c >= periodIndex) return;

                const text = cellText(cell);

                if (!text) return;

                if (dayIndex === -1 && DAY_HEADER.test(text)) {
                    dayIndex = c;
                }

                if (sessionIndex === -1 && SESSION_HEADER.test(text)) {
                    sessionIndex = c;
                }
            });
        }

        if (dayIndex === -1) continue;

        const firstClassColumn =
            Math.max(periodIndex, dayIndex, sessionIndex) + 1;

        const classColumns = [];

        for (let c = firstClassColumn; c < row.length; c++) {
            const name = cellText(row[c]);

            if (!name) continue;
            if (NOT_A_CLASS_HEADER.test(name)) continue;

            classColumns.push({
                name,
                index: c,
            });
        }

        if (classColumns.length === 0) continue;

        return {
            headerRow: r,
            dayIndex,
            sessionIndex,
            periodIndex,
            classColumns,
        };
    }

    return null;
}

/**
 * Duyệt các dòng dữ liệu bên dưới header.
 * Ô Thứ/Buổi bị gộp chỉ có giá trị ở dòng đầu nên được ghi nhớ.
 */
function buildSchedule(rows, layout) {
    const schedule = {};

    layout.classColumns.forEach(({ name }) => {
        schedule[name] = {};
    });

    let currentDay = null;
    let currentSession = null;
    let skippedRows = 0;
    let duplicateSlots = 0;

    for (let r = layout.headerRow + 1; r < rows.length; r++) {
        const row = rows[r] || [];

        const day = parseDayKey(row[layout.dayIndex]);

        if (day) {
            currentDay = day;
        }

        if (layout.sessionIndex >= 0) {
            const session = parseSession(row[layout.sessionIndex]);

            if (session) {
                currentSession = session;
            }
        }

        if (!currentDay) continue;

        if (!DAY_KEYS.has(currentDay)) {
            skippedRows += 1;
            continue;
        }

        const periodNumber = parsePeriodNumber(row[layout.periodIndex]);

        if (!periodNumber) continue;

        const slot = resolveSlot(periodNumber, currentSession);

        layout.classColumns.forEach(({ name, index }) => {
            if (!schedule[name][currentDay]) {
                schedule[name][currentDay] = {};
            }

            const daySchedule = schedule[name][currentDay];
            const lessons = parseLessons(row[index]);

            if (!lessons) {
                if (!(slot in daySchedule)) {
                    daySchedule[slot] = null;
                }

                return;
            }

            if (daySchedule[slot]) {
                duplicateSlots += 1;
            }

            daySchedule[slot] = lessons;
        });
    }

    if (skippedRows > 0) {
        console.warn(
            `Bỏ qua ${skippedRows} dòng thứ bảy/chủ nhật hoặc nhãn thứ không đọc được.`
        );
    }

    if (duplicateSlots > 0) {
        console.warn(
            `Có ${duplicateSlots} ô bị ghi đè do trùng thứ và tiết. Giữ giá trị xuất hiện sau.`
        );
    }

    return schedule;
}

/**
 * "Thứ 2", "Thứ hai", "T2", "2 (02/09)" -> "2"
 */
function parseDayKey(cell) {
    const text = cellText(cell).toLowerCase();

    if (!text) return null;

    const stripped = text
        .replace(/^(thứ|thu)\s*/i, "")
        .replace(/^t(?=\s*\d)/i, "")
        .trim();

    if (!stripped) return null;

    const firstWord = stripped.split(/[\s(,/.-]+/)[0] || "";

    if (DAY_WORDS[firstWord]) return DAY_WORDS[firstWord];
    if (/^[2-8]$/.test(firstWord)) return firstWord;

    const digit = stripped.match(/\d/);

    return digit ? digit[0] : null;
}

/**
 * "Sáng", "Chiều" (kể cả ô gộp) -> buổi của các dòng phía dưới
 */
function parseSession(cell) {
    const text = cellText(cell).toLowerCase();

    if (!text) return null;

    if (text.startsWith("sáng") || text.startsWith("sang") || text === "am") {
        return "morning";
    }

    if (text.startsWith("chiều") || text.startsWith("chieu") || text === "pm") {
        return "afternoon";
    }

    return null;
}

/**
 * "Tiết 1", "1", "1 (07:30 - 08:15)" -> "1"; ngoài 1..8 thì bỏ qua
 */
function parsePeriodNumber(cell) {
    const text = cellText(cell);

    if (!text) return null;

    const match = text.match(/\d{1,2}/);

    if (!match) return null;

    const number = Number(match[0]);

    if (number < 1 || number > 8) return null;

    return String(number);
}

/**
 * Nếu file đánh số tiết lại từ 1 ở buổi chiều, dời sang 5..8
 * để không đè lên buổi sáng.
 */
function resolveSlot(periodNumber, session) {
    const number = Number(periodNumber);

    if (session === "afternoon" && number <= 4) {
        return String(number + 4);
    }

    return String(number);
}

/**
 * Một ô có thể chứa nhiều môn trong cùng tiết, ngăn bằng dấu phẩy:
 * "Toán-Thắng T, Tin-Cường" -> 2 bài học.
 */
function parseLessons(cell) {
    const text = cellText(cell);

    if (!text) return null;

    const lessons = text
        .split(/[,;]+/)
        .map((segment) => parseLessonSegment(segment))
        .filter(Boolean);

    return lessons.length ? lessons : null;
}

/**
 * "Tin-Cường" -> Tin / Cường
 * "LS-ĐL-Hân" -> LS-ĐL / Hân (tách ở dấu gạch nối cuối cùng)
 * "LS-ĐL" -> LS-ĐL, không có giáo viên
 */
function parseLessonSegment(segment) {
    const text = cellText(segment);

    if (!text) return null;

    const lastDash = Math.max(
        text.lastIndexOf("-"),
        text.lastIndexOf("–"),
        text.lastIndexOf("—")
    );

    if (lastDash > 0 && lastDash < text.length - 1) {
        const subject = text.substring(0, lastDash).trim();
        const teacher = text.substring(lastDash + 1).trim();

        if (subject && teacher && !isShorthand(teacher)) {
            return { subject, teacher };
        }
    }

    return { subject: text, teacher: "" };
}

/**
 * "CS", "ĐL", "CN" là mảnh của tên môn, không phải tên giáo viên.
 */
function isShorthand(token) {
    if (!token || token.length > 5) return false;
    if (/\s/.test(token)) return false;

    return (
        token === token.toUpperCase() &&
        token.toUpperCase() !== token.toLowerCase()
    );
}

/**
 * Dòng "Áp dụng từ ngày 05/09/2026 - Học kỳ I" ở bất kỳ ô nào.
 * Không thấy ngày thì trả về rỗng để admin nhập trong hộp thoại.
 */
function getPeriodInfo(rows, sheetName) {
    for (const row of rows) {
        for (const cell of row) {
            const text = cellText(cell);
            const match = text.match(APPLY_DATE);

            if (!match) continue;

            const [, day, month, year, rawName] = match;

            if (Number(month) > 12 || Number(day) > 31) continue;

            return {
                applyDate: `${year}-${month.padStart(2, "0")}-${day.padStart(
                    2,
                    "0"
                )}`,
                name:
                    (rawName || "").trim() ||
                    cellText(sheetName) ||
                    "Thời khoá biểu",
            };
        }
    }

    return {
        applyDate: "",
        name: cellText(sheetName) || "Thời khoá biểu",
    };
}

function countLessons(schedule) {
    return Object.values(schedule).reduce(
        (total, days) =>
            total +
            Object.values(days).reduce(
                (count, day) =>
                    count +
                    Object.values(day).reduce(
                        (lessons, cell) =>
                            lessons +
                            (Array.isArray(cell)
                                ? cell.length
                                : cell
                                    ? 1
                                    : 0),
                        0
                    ),
                0
            ),
        0
    );
}

function cellText(value) {
    if (value === null || value === undefined) return "";

    return String(value).replace(/\s+/g, " ").trim();
}
