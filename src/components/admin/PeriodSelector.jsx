import { useState } from "react";
import {
    CalendarMonth,
    CheckCircle,
    ExpandMore,
    MoreVert,
    UploadFile,
    Save,
    Edit,
    Delete,
    Star,
} from "@mui/icons-material";

export default function PeriodSelector({
    period,
    periods = [],
    onSelect,
    onImport,
    onSave,
    onRename,
    onDelete,
    onSetActive,
}) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    if (!period) return null;

    return (
        <div className="rounded-sm border border-slate-200 bg-white px-5 py-4 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                {/* LEFT */}

                <div className="flex-1">

                    <div className="mb-3 flex items-center justify-between">

                        <span className="text-sm font-medium text-slate-500">
                            Period hiện tại
                        </span>

                        <div className="flex items-center gap-2">

                            <button
                                onClick={onImport}
                                className="
                                    inline-flex
                                    h-9
                                    items-center
                                    gap-2
                                    rounded-sm
                                    border
                                    border-slate-300
                                    px-3
                                    text-sm
                                    font-medium
                                    transition
                                    hover:bg-slate-50
                                "
                            >
                                <UploadFile sx={{ fontSize: 18 }} />

                                Import
                            </button>

                            <button
                                onClick={onSave}
                                className="
                                    inline-flex
                                    h-9
                                    items-center
                                    gap-2
                                    rounded-sm
                                    bg-blue-600
                                    px-4
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-blue-700
                                "
                            >
                                <Save sx={{ fontSize: 18 }} />

                                Lưu
                            </button>

                            <div className="relative">

                                <div
                                    onClick={() => setOpenMenu(!openMenu)}
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-sm
                                        border
                                        border-slate-300
                                        transition
                                        hover:bg-slate-50
                                    "
                                >
                                    <MoreVert sx={{ fontSize: 18 }} />
                                </div>

                                {openMenu && (
                                    <div className="absolute right-0 top-11 z-30 w-48 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-lg">

                                        {!period.active && (
                                            <button
                                                onClick={() => {
                                                    onSetActive(period);
                                                    setOpenMenu(false);
                                                }}
                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50"
                                            >
                                                <Star sx={{ fontSize: 18 }} />

                                                Đặt Active
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                onRename(period);
                                                setOpenMenu(false);
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50"
                                        >
                                            <Edit sx={{ fontSize: 18 }} />

                                            Đổi tên
                                        </button>

                                        <button
                                            onClick={() => {
                                                onDelete(period);
                                                setOpenMenu(false);
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <Delete sx={{ fontSize: 18 }} />

                                            Xóa
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* PERIOD */}

                    <div className="relative">

                        <button
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className="
                                flex
                                h-10
                                w-full
                                items-center
                                justify-between
                                rounded-sm
                                border
                                border-slate-300
                                px-4
                                transition
                                hover:border-blue-500
                            "
                        >

                            <div className="flex items-center gap-2">

                                {period.active && (
                                    <CheckCircle
                                        sx={{ fontSize: 18 }}
                                        className="text-green-500"
                                    />
                                )}

                                <span className="text-lg font-semibold text-slate-900">
                                    {period.name}
                                </span>

                            </div>

                            <ExpandMore sx={{ fontSize: 20 }} />

                        </button>

                        {openDropdown && (

                            <div className="absolute left-0 right-0 top-12 z-20 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-lg">

                                {periods.map(item => (

                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            onSelect(item);
                                            setOpenDropdown(false);
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                                    >

                                        {item.active ? (
                                            <CheckCircle
                                                sx={{ fontSize: 18 }}
                                                className="text-green-500"
                                            />
                                        ) : (
                                            <CalendarMonth
                                                sx={{ fontSize: 18 }}
                                                className="text-slate-400"
                                            />
                                        )}

                                        <div>

                                            <div className="text-sm font-semibold text-slate-800">
                                                {item.name}
                                            </div>

                                            <div className="text-xs text-slate-500">
                                                {item.applyDate}
                                            </div>

                                        </div>

                                    </button>

                                ))}

                            </div>

                        )}

                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">

                        <CalendarMonth sx={{ fontSize: 17 }} />

                        <span>Áp dụng từ</span>

                        <span className="font-medium text-slate-700">
                            {period.applyDate}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}