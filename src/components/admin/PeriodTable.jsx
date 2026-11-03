import { useState } from "react";

import {
    CheckCircle,
    RadioButtonUnchecked,
    Edit,
    Delete,
    Visibility,
    CalendarMonth,
    MoreVert,
} from "@mui/icons-material";

import {
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";

function classCountOf(period) {
    return Object.keys(period?.schedule || {}).length;
}

const iconButton =
    "rounded-lg p-1.5 text-subtle transition hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent";

function ActivePill() {
    return (
        <span className="shrink-0 rounded-full bg-success-bg px-2 py-0.5 text-[10px] font-semibold text-success-ink">
            Đang áp dụng
        </span>
    );
}

export default function PeriodTable({
    periods = [],
    busyId = "",
    emptyTitle = "Chưa có bản thời khoá biểu",
    emptyHint = 'Bấm "Thêm Period" để nhập từ file Excel.',
    onView,
    onEdit,
    onDelete,
    onSetActive,
}) {
    const [menu, setMenu] = useState(null);

    function closeMenu() {
        setMenu(null);
    }

    function renderToggle(period, busy) {
        const disabled = period.active || busy;

        return (
            <button
                type="button"
                onClick={() => {
                    if (disabled) return;
                    onSetActive(period);
                }}
                disabled={disabled}
                title={
                    period.active
                        ? "Bản này đang được áp dụng"
                        : "Đặt làm bản áp dụng"
                }
                aria-label={`Đặt ${period.name} làm bản áp dụng`}
                className="shrink-0 disabled:cursor-default"
            >
                {period.active ? (
                    <CheckCircle
                        sx={{ fontSize: 19 }}
                        className="text-green-500"
                    />
                ) : (
                    <RadioButtonUnchecked
                        sx={{ fontSize: 19 }}
                        className="text-slate-300"
                    />
                )}
            </button>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,23,42,.06),0_10px_30px_-18px_rgba(15,23,42,.35)]">

            {/* ================= Desktop ================= */}

            <div className="hidden md:block">

                <div className="flex items-center gap-4 border-b border-line bg-head px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-head-ink">

                    <span className="flex-1">Bản thời khoá biểu</span>

                    <span className="w-28 text-right">Ngày áp dụng</span>

                    <span className="w-16 text-right">Thao tác</span>

                </div>

                {periods.length === 0 && (

                    <div className="px-5 py-16 text-center">

                        <CalendarMonth
                            sx={{ fontSize: 34 }}
                            className="mb-2 text-slate-300"
                        />

                        <div className="text-sm font-medium text-muted">
                            {emptyTitle}
                        </div>

                        <div className="mt-1 text-xs text-subtle">
                            {emptyHint}
                        </div>

                    </div>

                )}

                {periods.map((period) => {
                    const busy = busyId === period.id;

                    return (
                        <div
                            key={period.id}
                            className={`
                                flex
                                items-center
                                gap-4
                                border-b
                                border-line
                                px-5
                                py-3
                                transition-colors
                                last:border-0
                                hover:bg-surface-2
                                ${period.active ? "bg-success-soft shadow-[inset_3px_0_0_#16a34a]" : ""}
                                ${busy ? "opacity-60" : ""}
                            `}
                        >

                            <div className="flex min-w-0 flex-1 items-center gap-3">

                                {renderToggle(period, busy)}

                                <div className="min-w-0">

                                    <div className="flex items-center gap-2">

                                        <span className="truncate text-sm font-semibold text-ink">
                                            {period.name}
                                        </span>

                                        {period.active && <ActivePill />}

                                    </div>

                                    <div className="mt-0.5 text-xs text-subtle">
                                        {classCountOf(period)} lớp
                                    </div>

                                </div>

                            </div>

                            <div className="w-28 text-right text-sm tabular-nums text-muted">
                                {period.applyDate}
                            </div>

                            <div className="flex w-16 items-center justify-end gap-1">

                                <button
                                    type="button"
                                    onClick={() => onView(period)}
                                    disabled={busy}
                                    title="Xem thời khoá biểu"
                                    aria-label={`Xem ${period.name}`}
                                    className={`${iconButton} hover:text-primary`}
                                >
                                    <Visibility sx={{ fontSize: 18 }} />
                                </button>

                                <button
                                    type="button"
                                    onClick={(event) =>
                                        setMenu({
                                            period,
                                            anchor: event.currentTarget,
                                        })
                                    }
                                    disabled={busy}
                                    title="Thao tác khác"
                                    aria-label={`Thao tác với ${period.name}`}
                                    className={iconButton}
                                >
                                    <MoreVert sx={{ fontSize: 18 }} />
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* ================= Mobile ================= */}

            <div className="divide-y divide-slate-100 md:hidden">

                {periods.length === 0 && (
                    <div className="px-5 py-12 text-center">
                        <CalendarMonth
                            sx={{ fontSize: 32 }}
                            className="mb-2 text-slate-300"
                        />

                        <div className="text-sm font-medium text-muted">
                            {emptyTitle}
                        </div>

                        <div className="mt-1 text-xs text-subtle">
                            {emptyHint}
                        </div>
                    </div>
                )}

                {periods.map((period) => {
                    const busy = busyId === period.id;

                    return (
                        <div
                            key={period.id}
                            className={`
                                p-4
                                ${period.active ? "bg-success-soft shadow-[inset_3px_0_0_#16a34a]" : ""}
                                ${busy ? "opacity-60" : ""}
                            `}
                        >

                            <div className="flex items-start gap-3">

                                <div className="mt-0.5">
                                    {renderToggle(period, busy)}
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center gap-2">

                                        <span className="truncate text-sm font-semibold text-ink">
                                            {period.name}
                                        </span>

                                        {period.active && <ActivePill />}

                                    </div>

                                    <div className="mt-0.5 text-xs text-subtle">
                                        {period.applyDate} • {classCountOf(period)} lớp
                                    </div>

                                </div>

                            </div>

                            <div className="mt-3 flex items-center justify-end gap-1">

                                <button
                                    type="button"
                                    onClick={() => onView(period)}
                                    disabled={busy}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:text-slate-300"
                                >
                                    Xem
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onEdit(period)}
                                    disabled={busy}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-2 disabled:text-slate-300"
                                >
                                    Đổi tên
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(period)}
                                    disabled={period.active || busy}
                                    className="rounded-md px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:text-slate-300 disabled:hover:bg-transparent"
                                >
                                    Xoá
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Menu thao tác (desktop) */}

            <Menu
                anchorEl={menu?.anchor}
                open={Boolean(menu)}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >

                <MenuItem
                    onClick={() => {
                        onEdit(menu.period);
                        closeMenu();
                    }}
                    disabled={busyId === menu?.period?.id}
                    sx={{ fontSize: 14 }}
                >
                    <ListItemIcon>
                        <Edit sx={{ fontSize: 18 }} />
                    </ListItemIcon>

                    Đổi tên
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onDelete(menu.period);
                        closeMenu();
                    }}
                    disabled={
                        busyId === menu?.period?.id ||
                        Boolean(menu?.period?.active)
                    }
                    sx={{ fontSize: 14, color: "#dc2626" }}
                >
                    <ListItemIcon>
                        <Delete sx={{ fontSize: 18, color: "#dc2626" }} />
                    </ListItemIcon>

                    Xoá
                </MenuItem>

            </Menu>

        </div>
    );
}
