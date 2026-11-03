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
                flex
                h-screen
                w-64
                shrink-0
                flex-col
                border-r
                border-line
                bg-brand-800
                text-muted
                transition-transform
                duration-300
                ${mobile ? "shadow-2xl" : ""}
            `}
        >
            {/* Logo */}

            <div className="border-b border-line">

                <div className="flex items-center gap-3 px-5 py-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                        <School sx={{ fontSize: 22 }} />
                    </div>

                    <div className="min-w-0">

                        <div className="truncate text-[15px] font-semibold leading-tight text-ink">
                            Thời khoá biểu
                        </div>

                        <div className="text-xs text-muted">
                            Quản trị
                        </div>

                    </div>

                </div>

            </div>

            {/* Menu */}

            <nav className="flex-1 overflow-y-auto px-3 py-4">

                <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                    Điều hướng
                </div>

                <div className="space-y-1">

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
                                        rounded-lg
                                        px-3
                                        py-2.5
                                        text-sm
                                        transition-colors

                                        ${isActive
                                            ? "bg-white font-semibold text-primary shadow-sm"
                                            : "font-medium text-muted hover:bg-white/80 hover:text-ink"
                                        }
                                    `
                                }
                            >
                                <Icon sx={{ fontSize: 19 }} />

                                <span>{item.title}</span>

                            </NavLink>
                        );
                    })}

                </div>

            </nav>

            {/* Logout */}

            <div className="border-t border-line p-3">

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-muted
                        transition-colors
                        hover:bg-red-50
                        hover:text-red-700
                    "
                >
                    <Logout sx={{ fontSize: 19 }} />

                    Đăng xuất

                </button>

            </div>

        </aside>
    );
}
