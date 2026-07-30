import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-100">

            {/* Desktop */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Overlay */}
            <div
                onClick={() => setOpen(false)}
                className={`
                    fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden
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
            <main className="flex flex-1 flex-col overflow-hidden">

                {/* Mobile Header */}
                <header
                    className="
            sticky
            top-0
            z-30
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-slate-200
            bg-white
            px-4
            lg:hidden
        "
                >
                    <button
                        onClick={() => setOpen(true)}
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                    >
                        <Menu />
                    </button>

                    <h1 className="ml-4 text-lg font-semibold text-slate-800">
                        Dashboard
                    </h1>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-2 md:p-4 lg:p-6">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}