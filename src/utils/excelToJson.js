import * as XLSX from "xlsx";

export async function excelToJson(file) {
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
        type: "array",
    });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
    });

    const { name, applyDate } = getPeriodInfo(rows);

    const schedule = parseSchedule(rows);

    return {
        id: crypto.randomUUID(),
        name,
        applyDate,
        active: false,
        schedule,
    };
}

function getPeriodInfo(rows) {
    let name = "";
    let applyDate = "";

    const regex =
        /Áp dụng từ ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})\s*-\s*(.+)/i;

    for (const row of rows) {
        for (const cell of row) {
            const text = String(cell || "").trim();

            if (!text) continue;

            const match = text.match(regex);

            if (!match) continue;

            const [, day, month, year, periodName] = match;

            applyDate = `${year}-${month.padStart(
                2,
                "0"
            )}-${day.padStart(2, "0")}`;

            name = periodName.trim();

            return {
                name,
                applyDate,
            };
        }
    }

    throw new Error(
        "Không tìm thấy thông tin 'Áp dụng từ ngày ... - Tên thời khóa biểu' trong file Excel."
    );
}

function parseSchedule(rows) {
    //-----------------------------------
    // Danh sách lớp
    //-----------------------------------

    const classNames = [];

    for (let c = 3; c < rows[2].length; c++) {
        const className = String(rows[2][c] || "").trim();

        if (className) {
            classNames.push(className);
        }
    }

    //-----------------------------------

    const schedule = {};

    classNames.forEach((className) => {
        schedule[className] = {};
    });

    //-----------------------------------

    let currentDay = "";

    for (let r = 3; r < rows.length; r++) {
        const row = rows[r];

        // Merge cell cột Thứ
        if (row[0]) {
            currentDay = String(row[0])
                .replace("Thứ", "")
                .trim();
        }

        if (!currentDay) continue;

        const period = String(row[2] || "").trim();

        if (!period) continue;

        classNames.forEach((className, index) => {
            if (!schedule[className][currentDay]) {
                schedule[className][currentDay] = {};
            }

            const value = String(row[index + 3] || "").trim();

            schedule[className][currentDay][period] = value
                ? parseLesson(value)
                : null;
        });
    }

    return schedule;
}

function parseLesson(text) {
    const index = text.indexOf("-");

    if (index === -1) {
        return {
            subject: text.trim(),
            teacher: "",
        };
    }

    return {
        subject: text.substring(0, index).trim(),
        teacher: text.substring(index + 1).trim(),
    };
}