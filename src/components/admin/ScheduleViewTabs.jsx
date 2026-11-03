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
        label: "Giáo viên",
        Icon: PersonIcon,
    },
    {
        key: "class",
        label: "Lớp",
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

    const currentOptions =
        activeTab === "teacher" ? teacherOptions : classOptions;

    /**
     * Mặc định chọn mục đầu tiên của tab đang mở.
     * Tính ngay khi render để đổi tab chỉ render một lần, không bị nháy.
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
        <div className="space-y-3">

            {/* Toolbar */}

            <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-2 shadow-sm lg:flex-row lg:items-center lg:justify-between">

                <div className="inline-flex items-center gap-1.5">

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
                                    gap-1.5
                                    rounded-full
                                    px-3
                                    py-1.5
                                    text-[13px]
                                    font-semibold
                                    transition-colors
                                    lg:flex-none
                                    ${isActive
                                        ? "bg-[#1669ec] font-bold text-white shadow-sm "
                                        : "border border-line bg-white text-[#334155] hover:bg-[#f5f8fd]"
                                    }
                                `}
                            >
                                <Icon sx={{ fontSize: 16 }} />

                                {label}
                            </button>
                        );
                    })}

                </div>

                <div className="flex items-center gap-2">

                    <div className="relative min-w-0 flex-1 lg:w-56 lg:flex-none">

                        <PersonIcon
                            sx={{ fontSize: 16 }}
                            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle"
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
                                h-9
                                w-full
                                appearance-none
                                truncate
                                rounded-lg
                                border
                                border-line
                                bg-white
                                pl-8
                                pr-8
                                text-sm
                                text-ink
                                transition
                                focus:border-primary
                                focus:outline-none
                                focus:ring-2
                                focus:ring-primary/20
                                disabled:cursor-not-allowed
                                disabled:bg-surface-2
                                disabled:text-subtle
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
                            sx={{ fontSize: 18 }}
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-subtle"
                        />

                    </div>

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
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            ${copied
                                ? "border-green-200 bg-success-bg text-success-ink"
                                : "border-line text-muted hover:bg-surface-2 hover:text-primary"
                            }
                        `}
                    >
                        {copied ? (
                            <CheckCircleIcon sx={{ fontSize: 17 }} />
                        ) : (
                            <ContentCopyIcon sx={{ fontSize: 17 }} />
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
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-line
                            text-slate-500
                            transition
                            hover:bg-slate-50
                            hover:text-primary
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        <VisibilityIcon sx={{ fontSize: 17 }} />
                    </button>

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
                <div className="rounded-2xl border border-line bg-white px-4 py-16 text-center text-sm text-muted shadow-sm">
                    Chưa có dữ liệu thời khoá biểu cho mục này.
                </div>
            )}

        </div>
    );
};

export default ScheduleViewTabs;
