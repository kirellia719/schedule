import { useEffect, useState } from "react";

import ViewerHeader from "@/components/admin/ViewerHeader";
import ScheduleViewTabs from "@/components/admin/ScheduleViewTabs";

import { getActivePeriod } from "@/services/period.service";

export default function ViewerPage() {

    const [period, setPeriod] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadData() {

            try {

                const activePeriod = await getActivePeriod();

                if (!activePeriod) return;
                setPeriod(activePeriod);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center">
                Đang tải...
            </div>
        );

    }

    return (

        <div className="">

            <ViewerHeader
                period={period}
            />

            <ScheduleViewTabs schedule={period?.schedule || {}} />

        </div>

    );

}