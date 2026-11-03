import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import ScheduleViewTabs from "@/components/admin/ScheduleViewTabs";
import { useSetAdminHeader } from "@/components/admin/adminHeader";

import { getActivePeriod } from "@/services/period.service";

export default function ViewerPage() {

    const [period, setPeriod] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const header = useMemo(() => {
        if (!period) return null;

        return (
            <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white shadow-sm shadow-blue-500/25">
                    <CalendarMonthIcon sx={{ fontSize: 18 }} />
                </div>

                <div className="min-w-0">

                    <div className="flex min-w-0 items-center gap-2">

                        <span className="truncate text-[15px] font-bold text-[#0f2b52]">
                            {period.name}
                        </span>

                        <span
                            className={`
                                hidden
                                shrink-0
                                items-center
                                gap-1.5
                                rounded-full
                                px-2
                                py-0.5
                                text-[10px]
                                font-semibold
                                sm:inline-flex
                                ${period.active
                                    ? "bg-success-bg text-success-ink"
                                    : "bg-amber-100 text-amber-700"
                                }
                            `}
                        >
                            <span
                                className={`
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    ${period.active ? "bg-green-500" : "bg-amber-500"}
                                `}
                            />

                            {period.active ? "Đang áp dụng" : "Chưa áp dụng"}
                        </span>

                    </div>

                    <p className="truncate text-xs text-muted">
                        {period.applyDate
                            ? `Áp dụng từ ${period.applyDate}`
                            : "Chưa có ngày áp dụng"}
                    </p>

                </div>

            </div>
        );
    }, [period]);

    useSetAdminHeader(header);

    useEffect(() => {

        async function loadData() {

            try {

                const activePeriod = await getActivePeriod();

                if (!activePeriod) return;
                setPeriod(activePeriod);

            } catch (err) {

                console.log(err);

                setError("Không tải được thời khoá biểu đang áp dụng.");

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    if (loading) {

        return (
            <div className="flex h-full min-h-[50vh] items-center justify-center text-slate-500">
                Đang tải...
            </div>
        );

    }

    if (!period) {

        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <h2 className="text-lg font-semibold text-slate-800">
                    Chưa có thời khoá biểu đang áp dụng
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    {error ||
                        "Hãy nhập file Excel và đặt một Period làm Active để tra cứu."}
                </p>

                <Link
                    to="/admin/period"
                    className="
                        mt-5
                        inline-flex
                        h-10
                        items-center
                        justify-center
                        rounded-sm
                        bg-blue-600
                        px-5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    Đi tới Quản lý
                </Link>

            </div>
        );

    }

    return (
        <ScheduleViewTabs schedule={period?.schedule || {}} />
    );

}
