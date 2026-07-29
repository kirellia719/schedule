import HeaderBg from "@/assets/images/header-bg.png";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function ViewerHeader({
    title,
    subtitle,
    avatar,
}) {
    return (
        <header
            className="relative overflow-hidden bg-white p-3"
            style={{
                backgroundImage: `url(${HeaderBg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="relative flex flex-col gap-4 md:p-2 md:flex-row md:items-center md:justify-between md:px-8">

                {/* LEFT */}
                <div className="hidden items-center gap-5 md:flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                        <SchoolRoundedIcon fontSize="large" />
                    </div>

                    <div>
                        <p className="font-bold text-blue-900">
                            THỜI KHÓA BIỂU
                        </p>

                        <h1 className="text-sm text-slate-600">
                            Năm học 2026 - 2027
                        </h1>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full rounded-2xl border border-slate-200  p-3 shadow-sm md:w-auto">
                    <div className="flex items-center justify-between gap-3">

                        <div className="flex-1">
                            <p className="font-bold text-blue-900 text-sm md:text-base">
                                {title}
                            </p>

                            {subtitle && (
                                <p className="text-xs text-slate-600 md:text-sm">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div className="h-12 w-12 overflow-hidden rounded-full md:h-14 md:w-14">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <AccountCircleRoundedIcon
                                        fontSize="large"
                                        className="text-blue-400"
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </header>
    );
}