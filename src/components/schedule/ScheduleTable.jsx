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

    const isTeacherView = view === "teacher";

    const renderCell = (dayKey, period) => {
        const lessons = normalizeLessons(
            schedule?.[dayKey]?.[period.key]
        );

        return (
            <td
                key={`${dayKey}-${period.key}`}
                className="
                    border-l
                    border-line
                    p-1
                    text-center
                    align-middle
                    sm:p-1.5
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
                                        ? "border-l border-line pl-1 sm:pl-1.5"
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
                                <div className="w-full truncate text-[10px] font-semibold text-head-ink sm:text-[11px] md:text-sm">
                                    {isTeacherView
                                        ? lesson.class
                                        : lesson.subject}
                                </div>

                                <div className="mt-0.5 w-full truncate text-[9px] text-muted sm:text-[10px] md:text-xs">
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
                <tr className="bg-session-bg">
                    <td
                        colSpan={DAYS.length + 1}
                        className="border-y border-line px-4 py-2"
                    >
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-session-ink">
                            {isMorning ? (
                                <LightMode
                                    sx={{ fontSize: 14 }}
                                    className="text-amber-500"
                                />
                            ) : (
                                <NightsStay
                                    sx={{ fontSize: 14 }}
                                    className="text-indigo-400"
                                />
                            )}

                            <span>{title}</span>
                        </div>
                    </td>
                </tr>

                {list.map(period => (
                    <tr
                        key={period.key}
                        className="border-b border-line transition-colors last:border-0 hover:bg-brand-50"
                    >
                        <td className="border-r border-line px-1 py-2 text-center align-middle">
                            <div className="text-xs font-semibold text-ink md:text-sm">
                                {period.label}
                            </div>

                            <div className="mt-0.5 hidden text-[10px] tabular-nums text-subtle md:block">
                                {period.start} – {period.end}
                            </div>
                        </td>

                        {DAYS.map(day => renderCell(day.key, period))}
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,.06),0_10px_30px_-18px_rgba(15,23,42,.35)]">

            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr className="border-b border-line bg-head">
                        <th
                            className="
                                w-14
                                border-r
                                border-line
                                px-1
                                py-2.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-head-ink
                                md:w-20
                            "
                        >
                            Tiết
                        </th>

                        {DAYS.map(day => (
                            <th
                                key={day.key}
                                className="
                                    px-1
                                    py-2.5
                                    text-xs
                                    font-semibold
                                    text-head-ink
                                    md:text-sm
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
