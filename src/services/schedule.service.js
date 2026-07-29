import { getActivePeriod } from "./period.service";
import { DAYS, PERIODS } from "../constants/timetable";


/**
 * Lấy thời khóa biểu theo giáo viên
 */
export async function getTeacherSchedule(teacherName) {
    const period = await getActivePeriod();

    if (!period) return null;


    // Khởi tạo schedule rỗng
    const schedule = {};

    DAYS.forEach((day) => {
        schedule[day.key] = {};

        PERIODS.forEach((p) => {
            schedule[day.key][p.key] = null;
        });
    });


    // Duyệt toàn bộ lớp
    Object.entries(period.schedule).forEach(
        ([className, classSchedule]) => {

            Object.entries(classSchedule || {}).forEach(
                ([day, daySchedule]) => {

                    Object.entries(daySchedule || {}).forEach(
                        ([periodNumber, lesson]) => {

                            if (!lesson) return;


                            if (lesson.teacher !== teacherName) {
                                return;
                            }


                            schedule[day][periodNumber] = {
                                class: className,
                                subject: lesson.subject,
                                teacher: lesson.teacher,
                            };

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


    const classSchedule = period.schedule[className];


    if (!classSchedule) {
        return null;
    }


    // Chuẩn hóa dữ liệu lớp
    const schedule = {};


    DAYS.forEach((day) => {

        schedule[day.key] = {};

        PERIODS.forEach((p) => {

            const lesson =
                classSchedule?.[day.key]?.[p.key];


            schedule[day.key][p.key] =
                lesson
                    ? {
                        class: className,
                        subject: lesson.subject,
                        teacher: lesson.teacher,
                    }
                    : null;

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