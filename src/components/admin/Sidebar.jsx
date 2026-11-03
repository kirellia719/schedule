import {
    CalendarMonth,
    Schedule,
    School,
    Logout,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const MENUS = [
    {
        title: "Quản lý",
        path: "/admin/period",
        icon: CalendarMonth,
    },
    {
        title: "Tra cứu",
        path: "/admin/viewer",
        icon: Schedule,
    },
];

export default function Sidebar({
    mobile = false,
    onClose,
}) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("admin");

        onClose?.();

        navigate("/login");
    }

    return (
        <aside
            className={`
                relative
                flex
                h-screen
                w-64
                shrink-0
                flex-col
                overflow-hidden
                border-r-2
                border-[#c3d7ef]
                bg-white
                shadow-[8px_0_24px_-16px_rgba(15,43,82,0.55)]
                transition-transform
                duration-300
                ${mobile ? "shadow-2xl" : ""}
            `}
        >
            {/* Hoạ tiết nền */}

            <svg
                aria-hidden="true"
                viewBox="0 0 240 180"
                fill="none"
                className="pointer-events-none absolute -bottom-8 left-0 w-full opacity-60"
            >
                <path
                    d="M0 120c38-26 62 12 108-8 30-13 52 6 80-6 20-8 38-4 52-12v86H0v-60Z"
                    fill="#e6effb"
                />
                <path
                    d="M0 146c34-18 66 10 104-6 34-14 58 8 88-2 18-6 34-2 48-8v50H0v-34Z"
                    fill="#d8e8f9"
                />
            </svg>

            {/* Logo */}

            <div className="relative z-10 px-5 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/25">
                        <School sx={{ fontSize: 24 }} />
                    </div>

                    <div className="min-w-0">

                        <div className="truncate text-[15px] font-bold leading-tight text-[#0f2b52]">
                            Thời khoá biểu
                        </div>

                        <div className="text-xs text-slate-500">
                            Quản trị
                        </div>

                    </div>

                </div>

            </div>

            {/* Menu */}

            <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-2">

                <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Điều hướng
                </div>

                <div className="space-y-1.5">

                    {MENUS.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose?.()}
                                className={({ isActive }) =>
                                    `
                                        flex
                                        items-center
                                        gap-3
                                        rounded-md
                                        px-3.5
                                        py-2.5
                                        text-sm
                                        transition-all

                                        ${isActive
                                        ? "bg-[#2070ee] font-semibold text-white shadow-md shadow-blue-500/25"
                                        : "font-medium text-slate-600 hover:bg-white hover:text-[#1d4ed8] hover:shadow-sm"
                                    }
                                    `
                                }
                            >
                                <Icon sx={{ fontSize: 20 }} />

                                <span>{item.title}</span>

                            </NavLink>
                        );
                    })}

                </div>

            </nav>

            {/* Logout */}

            <div className="relative z-10 border-t border-slate-200/70 p-3">

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-md
                        cursor-pointer
                        px-3.5
                        py-2.5
                        text-sm
                        font-medium
                        text-slate-500
                        transition-colors
                        hover:bg-white
                        hover:text-red-600
                        hover:shadow-sm
                    "
                >
                    <Logout sx={{ fontSize: 19 }} />

                    Đăng xuất

                </button>

            </div>

        </aside>
    );
}
