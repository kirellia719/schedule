import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ScheduleViewTabs from "@/components/admin/ScheduleViewTabs";
import { getPeriodById, setActivePeriod } from "@/services/period.service";

export default function PeriodDetailPage() {
    const { periodId } = useParams();

    const [period, setPeriod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            setLoading(true);
            setError("");

            try {
                const data = await getPeriodById(periodId);

                if (cancelled) return;

                setPeriod(data);

                if (!data) {
                    setError("Không tìm thấy Period này.");
                }
            } catch (err) {
                if (cancelled) return;

                console.error(err);
                setError("Không tải được Period.");
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, [periodId]);

    async function handleSetActive() {
        if (!period || period.active || busy) return;

        setBusy(true);

        try {
            await setActivePeriod(period.id);

            setPeriod((prev) => ({ ...prev, active: true }));
        } catch (err) {
            console.error(err);
            setError("Không thể đặt Period này làm bản áp dụng.");
        } finally {
            setBusy(false);
        }
    }

    const classCount = Object.keys(period?.schedule || {}).length;

    return (
        <div className="space-y-3">

            <Link
                to="/admin/period"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-muted transition hover:text-primary"
            >
                <ArrowBackIcon sx={{ fontSize: 18 }} />

                Quay lại danh sách Period
            </Link>

            {loading && (
                <div className="h-28 animate-pulse rounded-2xl border border-line bg-white" />
            )}

            {!loading && error && !period && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && period && (
                <>
                    <header className="rounded-2xl border border-line border-l-4 border-l-brand-700 bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,.06),0_10px_30px_-18px_rgba(15,23,42,.35)] sm:px-5">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] shadow-sm shadow-blue-500/25">
                                    <CalendarMonthIcon
                                        className="text-white"
                                        sx={{ fontSize: 20 }}
                                    />
                                </div>

                                <div className="min-w-0">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h1 className="truncate text-sm font-semibold text-ink">
                                            {period.name}
                                        </h1>

                                        <span
                                            className={`
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                border
                                                px-2.5
                                                py-0.5
                                                text-xs
                                                font-medium
                                                ${period.active
                                                    ? "border-green-200 bg-success-bg text-success-ink"
                                                    : "border-line bg-surface-2 text-muted"
                                                }
                                            `}
                                        >
                                            {period.active
                                                ? "Đang áp dụng"
                                                : "Chưa áp dụng"}
                                        </span>

                                    </div>

                                    <p className="mt-0.5 truncate text-sm text-muted">
                                        {classCount} lớp • Áp dụng từ {period.applyDate}
                                    </p>

                                </div>

                            </div>

                            {!period.active && (
                                <button
                                    type="button"
                                    onClick={handleSetActive}
                                    disabled={busy}
                                    className="
                                        inline-flex
                                        h-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        bg-primary
                                        px-4
                                        text-sm
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-primary-strong
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    <CheckCircleIcon sx={{ fontSize: 18 }} />

                                    {busy ? "Đang cập nhật..." : "Đặt làm bản áp dụng"}
                                </button>
                            )}

                        </div>

                    </header>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <ScheduleViewTabs schedule={period.schedule || {}} />
                </>
            )}

        </div>
    );
}
