import { useMemo, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Schedule from "@/components/schedule/Schedule";
import { normalizeLessons } from "@/utils/lesson";

const TABS = [
    {
        key: "teacher",
        label: "Theo giáo viên",
        Icon: PersonIcon,
    },
    {
        key: "class",
        label: "Theo lớp",
        Icon: SchoolIcon,
    },
];

const ScheduleViewTabs = ({ schedule = {} }) => {
    const [activeTab, setActiveTab] = useState("teacher");
    const [selection, setSelection] = useState({});
    const [copied, setCopied] = useState(false);

    /**
     * Danh sách lớp
     */
    const classOptions = useMemo(() => {
        return Object.keys(schedule).sort((a, b) =>
            a.localeCompare(b, "vi")
        );
    }, [schedule]);

    /**
     * Danh sách giáo viên
     */
    const teacherOptions = useMemo(() => {
        const teachers = new Set();

        Object.values(schedule).forEach((classSchedule) => {
            Object.values(classSchedule || {}).forEach((daySchedule) => {
                Object.values(daySchedule || {}).forEach((cell) => {
                    normalizeLessons(cell).forEach((lesson) => {
                        const teacher = (lesson.teacher || "").trim();

                        if (teacher) {
                            teachers.add(teacher);
                        }
                    });
                });
            });
        });

        return [...teachers].sort((a, b) => a.localeCompare(b, "vi"));
    }, [schedule]);

    /**
     * Dropdown hiện tại
     */
    const currentOptions =
        activeTab === "teacher" ? teacherOptions : classOptions;

    /**
     * Mặc định chọn mục đầu tiên của tab đang mở.
     * Tính ngay khi render (thay vì setState trong useEffect) để đổi tab
     * chỉ render một lần, không bị nháy dữ liệu cũ.
     */
    const picked = selection[activeTab];

    const selectedValue =
        picked && currentOptions.includes(picked)
            ? picked
            : currentOptions[0] ?? "";

    function handleTabChange(key) {
        setActiveTab(key);
        setCopied(false);
    }

    function handleSelect(value) {
        setSelection((prev) => ({
            ...prev,
            [activeTab]: value,
        }));

        setCopied(false);
    }

    /**
     * Đường dẫn công khai của mục đang chọn
     */
    const publicPath = useMemo(() => {
        if (!selectedValue) return "";

        return activeTab === "teacher"
            ? `/teacher/${encodeURIComponent(selectedValue)}`
            : `/class/${encodeURIComponent(selectedValue)}`;
    }, [activeTab, selectedValue]);

    /**
     * Tạo lịch giáo viên từ dữ liệu gốc
     */
    const teacherSchedule = useMemo(() => {
        if (!selectedValue) return {};

        const result = {};

        Object.entries(schedule).forEach(([className, classSchedule]) => {
            Object.entries(classSchedule || {}).forEach(([day, daySchedule]) => {
                if (!result[day]) {
                    result[day] = {};
                }

                Object.entries(daySchedule || {}).forEach(([period, cell]) => {
                    const matches = normalizeLessons(cell)
                        .filter(
                            (lesson) =>
                                (lesson.teacher || "").trim() ===
                                selectedValue
                        )
                        .map((lesson) => ({
                            class: className,
                            subject: lesson.subject,
                            teacher: lesson.teacher,
                        }));

                    if (matches.length === 0) {
                        if (!(period in result[day])) {
                            result[day][period] = null;
                        }

                        return;
                    }

                    const merged = normalizeLessons(result[day][period]);

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

                    result[day][period] = merged;
                });
            });
        });

        return result;
    }, [schedule, selectedValue]);

    /**
     * Lịch lớp
     */
    const classSchedule = useMemo(() => {
        return schedule[selectedValue] || {};
    }, [schedule, selectedValue]);

    async function handleCopyLink() {
        if (!publicPath) return;

        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}${publicPath}`
            );

            setCopied(true);
        } catch (err) {
            console.error(err);
        }
    }

    function handleOpenViewer() {
        if (!publicPath) return;

        window.open(publicPath, "_blank", "noopener,noreferrer");
    }

    const hasOptions = currentOptions.length > 0;

    return (
        <div className="space-y-4">

            {/* Toolbar */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-3
                    shadow-sm
                    sm:p-4
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Tabs + số lượng */}

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">

                    <div className="inline-flex w-full rounded-xl bg-slate-100 p-1 sm:w-auto">

                        {TABS.map(({ key, label, Icon }) => {
                            const isActive = activeTab === key;

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleTabChange(key)}
                                    aria-pressed={isActive}
                                    className={`
                                        inline-flex
                                        flex-1
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        font-medium
                                        transition-colors
                                        duration-150
                                        sm:flex-none
                                        sm:px-4
                                        ${isActive
                                            ? "bg-white text-blue-700 shadow-sm"
                                            : "text-slate-600 hover:text-slate-900"
                                        }
                                    `}
                                >
                                    <Icon sx={{ fontSize: 18 }} />

                                    <span>{label}</span>
                                </button>
                            );
                        })}

                    </div>

                    <span className="hidden text-xs text-slate-500 sm:inline">
                        {activeTab === "teacher"
                            ? `${teacherOptions.length} giáo viên`
                            : `${classOptions.length} lớp`}
                    </span>

                </div>

                {/* Select + Actions */}

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                    <div className="relative w-full sm:w-[260px]">

                        <PersonIcon
                            sx={{ fontSize: 18 }}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                            value={selectedValue}
                            onChange={(e) => handleSelect(e.target.value)}
                            disabled={!hasOptions}
                            aria-label={
                                activeTab === "teacher"
                                    ? "Chọn giáo viên"
                                    : "Chọn lớp"
                            }
                            className="
                                h-10
                                w-full
                                appearance-none
                                truncate
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                pl-9
                                pr-9
                                text-sm
                                text-slate-800
                                transition
                                focus:border-blue-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-100
                                disabled:cursor-not-allowed
                                disabled:bg-slate-50
                                disabled:text-slate-400
                            "
                        >

                            {currentOptions.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            ))}

                        </select>

                        <KeyboardArrowDownIcon
                            sx={{ fontSize: 20 }}
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            type="button"
                            onClick={handleCopyLink}
                            disabled={!publicPath}
                            title={
                                copied
                                    ? "Đã sao chép liên kết"
                                    : "Sao chép liên kết tra cứu"
                            }
                            aria-label="Sao chép liên kết tra cứu"
                            className={`
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                transition
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                                ${copied
                                    ? "border-green-200 bg-green-50 text-green-600"
                                    : "border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                                }
                            `}
                        >
                            {copied ? (
                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                            ) : (
                                <ContentCopyIcon sx={{ fontSize: 18 }} />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleOpenViewer}
                            disabled={!publicPath}
                            title="Mở trang tra cứu công khai"
                            aria-label="Mở trang tra cứu công khai"
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-300
                                text-slate-500
                                transition
                                hover:bg-slate-50
                                hover:text-blue-600
                                disabled:cursor-not-allowed
                                disabled:opacity-40
                            "
                        >
                            <VisibilityIcon sx={{ fontSize: 18 }} />
                        </button>

                    </div>

                </div>

            </div>

            {/* Content */}

            {hasOptions ? (
                <div
                    key={`${activeTab}-${selectedValue}`}
                    className="view-fade-in"
                >
                    <Schedule
                        schedule={
                            activeTab === "teacher"
                                ? teacherSchedule
                                : classSchedule
                        }
                        view={activeTab}
                    />
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-16 text-center text-slate-500 shadow-sm">
                    Chưa có dữ liệu thời khoá biểu cho mục này.
                </div>
            )}

        </div>
    );
};

export default ScheduleViewTabs;
