import {
    CalendarMonth,
    Schedule,
    School,
    Person,
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
                w-[280px]
                shrink-0
                flex-col
                border-r
                border-slate-200
                bg-white
                transition-transform
                duration-300
                ${mobile ? "shadow-2xl" : ""}
            `}
        >
            {/* ================= Logo ================= */}

            <div className="border-b border-slate-200 p-6">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">

                        <School
                            sx={{
                                fontSize: 34,
                                color: "#2563eb",
                            }}
                        />

                    </div>

                    <div>

                        <h1 className="text-lg font-bold text-slate-800">
                            THỜI KHÓA BIỂU
                        </h1>

                        <p className="text-sm text-slate-500">
                            Admin Dashboard
                        </p>

                    </div>

                </div>

            </div>

            {/* ================= Menu ================= */}

            <nav className="flex-1 overflow-y-auto p-5">

                <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    MENU
                </div>

                <div className="space-y-2">

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
                                    gap-4
                                    rounded-sm
                                    px-4
                                    py-3
                                    transition-all

                                    ${isActive
                                        ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                                    }
                                `
                                }
                            >
                                <Icon fontSize="small" />

                                <span className="font-medium">
                                    {item.title}
                                </span>

                            </NavLink>
                        );
                    })}

                </div>

            </nav>

            {/* ================= Footer ================= */}

            <div className="border-t border-slate-200 p-5">

                <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">

                        <Person
                            sx={{
                                color: "#2563eb",
                            }}
                        />

                    </div>

                    <div className="flex-1">

                        <div className="font-semibold text-slate-800">
                            Admin
                        </div>

                        <div className="text-sm text-slate-500">
                            Quản trị hệ thống
                        </div>

                    </div>

                </div>

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        py-3
                        font-medium
                        text-red-600
                        transition
                        hover:bg-red-50
                    "
                >
                    <Logout fontSize="small" />

                    Đăng xuất

                </button>

            </div>

        </aside>
    );
}