import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Header = ({ period }) => {
    return (
        <header
            className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-line
                border-l-4
                border-l-brand-700
                bg-white
                px-4
                py-3.5
                shadow-sm
                sm:px-5
            "
        >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-head-bg">
                <CalendarMonthIcon
                    className="text-head-ink"
                    sx={{ fontSize: 18 }}
                />
            </div>

            <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                    <span className="truncate text-sm font-semibold text-ink">
                        {period?.name ?? "Chưa có thời khoá biểu"}
                    </span>

                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-2
                            py-0.5
                            text-[10px]
                            font-semibold
                            ${period?.active
                                ? "bg-success-bg text-success-ink"
                                : "bg-amber-100 text-amber-700"
                            }
                        `}
                    >
                        <span
                            className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${period?.active
                                    ? "bg-green-500"
                                    : "bg-amber-500"
                                }
                            `}
                        />

                        {period?.active ? "Đang áp dụng" : "Chưa áp dụng"}
                    </span>

                </div>

                <p className="mt-0.5 truncate text-xs text-muted">
                    {period?.applyDate
                        ? `Áp dụng từ ${period.applyDate}`
                        : "Chọn giáo viên hoặc lớp để tra cứu."}
                </p>

            </div>

        </header>
    );
};

export default Header;
