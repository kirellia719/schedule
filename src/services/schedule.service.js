import { getActivePeriod } from "./period.service";
import { DAYS, PERIODS } from "../constants/timetable";
import { normalizeLessons } from "../utils/lesson";


/**
 * Lấy thời khóa biểu theo giáo viên
 *
 * Một tiết có thể có nhiều môn, nên mỗi ô là mảng bài học (hoặc null).
 */
export async function getTeacherSchedule(teacherName) {
    const period = await getActivePeriod();

    if (!period) return null;

    const normalizedName = (teacherName || "").trim();

    // Khởi tạo schedule rỗng
    const schedule = {};

    DAYS.forEach((day) => {
        schedule[day.key] = {};

        PERIODS.forEach((p) => {
            schedule[day.key][p.key] = null;
        });
    });


    // Duyệt toàn bộ lớp
    Object.entries(period.schedule || {}).forEach(
        ([className, classSchedule]) => {

            Object.entries(classSchedule || {}).forEach(
                ([day, daySchedule]) => {

                    if (!schedule[day]) return;

                    Object.entries(daySchedule || {}).forEach(
                        ([periodNumber, cell]) => {

                            if (!(periodNumber in schedule[day])) return;

                            const matches = normalizeLessons(cell)
                                .filter(
                                    (lesson) =>
                                        (lesson.teacher || "").trim() ===
                                        normalizedName
                                )
                                .map((lesson) => ({
                                    class: className,
                                    subject: lesson.subject,
                                    teacher: lesson.teacher,
                                }));

                            if (matches.length === 0) return;

                            const merged = normalizeLessons(
                                schedule[day][periodNumber]
                            );

                            matches.forEach((lesson) => {
                                const exists = merged.some(
                                    (item) =>
                                        item.class === lesson.class &&
                                        (item.subject || "") ===
                                        (lesson.subject || "")
                                );

                                if (!exists) {
                                    merged.push(lesson);
                                }
                            });

                            schedule[day][periodNumber] = merged;

                        }
                    );

                }
            );

        }
    );


    return {
        target: {
            type: "teacher",
            name: teacherName,
        },

        period: {
            id: period.id,
            name: period.name,
        },

        schedule,
    };
}



/**
 * Lấy thời khóa biểu theo lớp
 */
export async function getClassSchedule(className) {
    const period = await getActivePeriod();

    if (!period) return null;


    const classSchedule = (period.schedule || {})[className];


    if (!classSchedule) {
        return null;
    }


    // Chuẩn hóa dữ liệu lớp
    const schedule = {};


    DAYS.forEach((day) => {

        schedule[day.key] = {};

        PERIODS.forEach((p) => {

            const lessons = normalizeLessons(
                classSchedule?.[day.key]?.[p.key]
            ).map((lesson) => ({
                class: className,
                subject: lesson.subject,
                teacher: lesson.teacher,
            }));


            schedule[day.key][p.key] =
                lessons.length > 0 ? lessons : null;

        });

    });


    return {
        target: {
            type: "class",
            name: className,
        },

        period: {
            id: period.id,
            name: period.name,
        },

        schedule,
    };
}
