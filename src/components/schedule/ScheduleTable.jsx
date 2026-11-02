import { DAYS, PERIODS } from "@/constants/timetable";
import {
    LightMode,
    NightsStay,
} from "@mui/icons-material";
import { normalizeLessons } from "@/utils/lesson";

export default function ScheduleTable({ schedule, view = "teacher" }) {
    // Tìm tiết cuối cùng có dữ liệu
    const maxPeriod = Math.max(
        0,
        ...Object.values(schedule ?? {}).flatMap(day =>
            Object.entries(day)
                .filter(([, lesson]) => lesson)
                .map(([period]) => Number(period))
        )
    );

    // Tổng số tiết trong tuần
    // const totalLessons = Object.values(schedule ?? {}).reduce(
    //     (total, day) => {
    //         return (
    //             total +
    //             Object.values(day).filter(
    //                 lesson => lesson
    //             ).length
    //         );
    //     },
    //     0
    // );

    // Chỉ lấy các tiết cần hiển thị
    const periods = PERIODS.filter(
        period => Number(period.key) <= maxPeriod
    );

    const morningPeriods = periods.filter(
        period => Number(period.key) <= 4
    );

    const afternoonPeriods = periods.filter(
        period => Number(period.key) >= 5
    );

    const renderCell = (dayKey, period) => {
        const lessons = normalizeLessons(
            schedule?.[dayKey]?.[period.key]
        );

        const isTeacherView = view === "teacher";

        return (
            <td
                key={`${dayKey}-${period.key}`}
                className="
                    border
                    border-slate-200
                    p-0.5
                    text-center
                    align-middle
                    sm:p-1
                    md:p-2
                "
            >
                {lessons.length > 0 && (
                    <div className="flex w-full items-stretch justify-center overflow-hidden">
                        {lessons.map((lesson, index) => (
                            <div
                                key={`${lesson.subject}-${lesson.teacher}-${index}`}
                                className={`
                                    min-w-0
                                    flex-1
                                    ${index > 0
                                        ? "border-l border-slate-200 pl-1 sm:pl-1.5"
                                        : ""
                                    }
                                `}
                                title={[
                                    isTeacherView
                                        ? lesson.class
                                        : lesson.subject,
                                    isTeacherView
                                        ? lesson.subject
                                        : lesson.teacher,
                                ]
                                    .filter(Boolean)
                                    .join(" · ")}
                            >
                                {/* Dòng chính: view lớp là môn, view giáo viên là lớp */}
                                <div className="w-full truncate font-semibold text-[9px] text-blue-900 sm:text-[11px] md:text-base">
                                    {isTeacherView
                                        ? lesson.class
                                        : lesson.subject}
                                </div>

                                {/* Dòng phụ: view lớp là giáo viên, view giáo viên là môn */}
                                <div className="mt-0.5 w-full truncate text-[8px] text-slate-500 sm:text-[10px] md:text-sm">
                                    {isTeacherView
                                        ? lesson.subject
                                        : lesson.teacher}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </td>
        );
    };

    const renderSession = (title, list) => {
        if (!list.length) return null;

        const isMorning = title === "SÁNG";

        return (
            <>
                <tr className="bg-blue-50">
                    <td
                        colSpan={DAYS.length + 1}
                        className="border border-slate-200 px-4 py-2"
                    >
                        <div className="flex items-center gap-2 font-semibold text-blue-900">
                            {isMorning ? (
                                <LightMode
                                    className="text-yellow-500"
                                    fontSize="small"
                                />
                            ) : (
                                <NightsStay
                                    className="text-indigo-400"
                                    fontSize="small"
                                />
                            )}

                            <span>{title}</span>
                        </div>
                    </td>
                </tr>

                {list.map(period => (
                    <tr key={period.key}>
                        <td
                            className="
                                w-10
                                border
                                border-slate-200
                                bg-slate-50
                                px-1
                                py-2
                                text-center
                                md:w-20
                            "
                        >
                            <div className="font-bold text-blue-900 text-[9px] sm:text-[11px] md:text-base">
                                {period.label}
                            </div>

                            {/* Desktop */}
                            <div className="mt-1 hidden md:block text-[11px] text-slate-500 whitespace-nowrap">
                                {period.start} - {period.end}
                            </div>
                        </td>

                        {DAYS.map(day => renderCell(day.key, period))}
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr className="bg-slate-100">
                        <th
                            className="
                                w-10
                                border
                                border-slate-200
                                py-2
                                text-[10px]
                                font-bold
                                md:w-20
                                md:text-base
                            "
                        >
                            Tiết
                        </th>

                        {DAYS.map(day => (
                            <th
                                key={day.key}
                                className="
                                    border
                                    border-slate-200
                                    py-2
                                    text-[10px]
                                    font-bold
                                    md:text-base
                                "
                            >
                                {day.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {renderSession("SÁNG", morningPeriods)}
                    {renderSession("CHIỀU", afternoonPeriods)}
                </tbody>
            </table>
        </div>
    );
}
