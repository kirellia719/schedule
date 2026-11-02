import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ViewerHeader from "@/components/admin/ViewerHeader";
import ScheduleViewTabs from "@/components/admin/ScheduleViewTabs";

import { getActivePeriod } from "@/services/period.service";

export default function ViewerPage() {

    const [period, setPeriod] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

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

        <div className="space-y-4">

            <ViewerHeader
                period={period}
            />

            <ScheduleViewTabs schedule={period?.schedule || {}} />

        </div>

    );

}
