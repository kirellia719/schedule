import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import Sidebar from "@/components/admin/Sidebar";
import { AdminHeaderContext } from "@/components/admin/adminHeader";

const PAGE_TITLES = [
    {
        prefix: "/admin/period",
        title: "Quản lý thời khoá biểu",
    },
    {
        prefix: "/admin/viewer",
        title: "Tra cứu thời khoá biểu",
    },
];

export default function AdminLayout() {
    const [open, setOpen] = useState(false);
    const [headerContent, setHeaderContent] = useState(null);
    const { pathname } = useLocation();

    const pageTitle =
        PAGE_TITLES.find((item) => pathname.startsWith(item.prefix))?.title ??
        "Quản trị";

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <AdminHeaderContext.Provider value={{ setContent: setHeaderContent }}>
            <div className="flex h-screen overflow-hidden bg-canvas">

                {/* Desktop */}
                <div className="hidden lg:block">
                    <Sidebar />
                </div>

                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className={`
                        fixed inset-0 z-40 bg-navy-900/50 transition-opacity duration-300 lg:hidden
                        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
                    `}
                />

                {/* Mobile Sidebar */}
                <div
                    className={`
                        fixed left-0 top-0 z-50 h-screen
                        transform transition-transform duration-300 ease-in-out lg:hidden
                        ${open ? "translate-x-0" : "-translate-x-full"}
                    `}
                >
                    <Sidebar
                        mobile
                        onClose={() => setOpen(false)}
                    />
                </div>

                {/* Content */}
                <main className="flex min-w-0 flex-1 flex-col overflow-hidden">

                    <header
                        className="
                            relative
                            flex
                            min-h-14
                            shrink-0
                            items-center
                            gap-2
                            border-b
                            border-line
                            bg-white
                            px-3
                            py-1.5
                            lg:px-8
                        "
                    >
                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Mở menu"
                            className="rounded-lg p-2 text-muted transition hover:bg-surface-2 lg:hidden"
                        >
                            <Menu />
                        </button>

                        {headerContent ?? (
                            <h1 className="truncate text-[17px] font-bold text-[#0f2b52]">
                                {pageTitle}
                            </h1>
                        )}

                        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#bcd7f7] via-[#dbe9fb] to-transparent" />
                    </header>

                    <div className="flex-1 overflow-y-auto">
                        <div className="mx-auto w-full max-w-[1280px] px-4 py-5 lg:px-8 lg:py-7">
                            <Outlet />
                        </div>
                    </div>

                </main>

            </div>
        </AdminHeaderContext.Provider>
    );
}
