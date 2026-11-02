import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Header = ({ period }) => {
    return (
        <header
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-4
                shadow-sm
                sm:px-6
                sm:py-5
            "
        >
            <div
                className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                "
            >

                {/* Title */}

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                        "
                    >
                        <CalendarMonthIcon
                            className="text-blue-700"
                            sx={{ fontSize: 22 }}
                        />
                    </div>

                    <div className="min-w-0">

                        <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
                            Tra cứu thời khoá biểu
                        </h1>

                        <p className="mt-0.5 truncate text-sm text-slate-500">
                            {period?.applyDate
                                ? `Áp dụng từ ${period.applyDate}`
                                : "Chọn giáo viên hoặc lớp để xem lịch dạy, lịch học."}
                        </p>

                    </div>

                </div>

                {/* Status */}

                <div className="flex flex-wrap items-center gap-2">

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-700
                        "
                    >
                        {period?.name ?? "Chưa có thời khoá biểu"}
                    </span>

                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            ${period?.active
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
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

            </div>
        </header>
    );
};

export default Header;
