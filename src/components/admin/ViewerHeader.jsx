import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Header = ({ period }) => {
    return (
        <header
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-4
                shadow-sm
                sm:px-6
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

                <div className="hidden sm:block">

                    <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                        Tra cứu
                    </h1>

                </div>

                {/* Period */}

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            sm:h-12
                            sm:w-12
                        "
                    >

                        <CalendarMonthIcon
                            className="text-blue-700"
                            fontSize="small"
                        />

                    </div>

                    <div className="min-w-0">

                        <div
                            className="
                                truncate
                                text-sm
                                font-semibold
                                text-slate-800
                                sm:text-base
                            "
                        >
                            {period?.name ?? "Chưa có thời khóa biểu"}
                        </div>

                        <div
                            className="
                                mt-1
                                flex
                                items-center
                                gap-2
                                text-xs
                                sm:text-sm
                            "
                        >

                            <span
                                className={`
                                    h-2
                                    w-2
                                    rounded-full
                                    ${period?.active
                                        ? "bg-green-500"
                                        : "bg-slate-400"
                                    }
                                `}
                            />

                            <span
                                className={
                                    period?.active
                                        ? "text-green-600"
                                        : "text-slate-500"
                                }
                            >
                                {period?.active
                                    ? "Đang áp dụng"
                                    : "Chưa có thời khóa biểu đang áp dụng"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Header;