import { useEffect, useState } from "react";

import PeriodHeader from "@/components/admin/PeriodHeader";
import PeriodTable from "@/components/admin/PeriodTable";
import ImportPeriodDialog from "@/components/admin/ImportPeriodDialog";

import { getPeriods, createPeriod, setActivePeriod, deletePeriod } from "@/services/period.service";

export default function PeriodPage() {
    const [periods, setPeriods] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openImport, setOpenImport] = useState(false);

    useEffect(() => {
        loadPeriods();
    }, []);

    async function loadPeriods() {
        setLoading(true);

        try {
            const data = await getPeriods();

            setPeriods(data);
        } finally {
            setLoading(false);
        }
    }

    async function handleImport(period) {
        try {

            await createPeriod(period);

            await loadPeriods();

            setOpenImport(false);

        } catch (err) {

            console.error(err);

            alert("Import thất bại.");

        }
    }

    function handleView(period) {
        console.log(period);

        // TODO:
        // navigate(`/admin/period/${period.id}`);
    }

    function handleRename(period) {
        console.log(period);

        // TODO
    }

    async function handleDelete(period) {

        if (period.active) {
            alert("Không thể xóa Period đang Active.");
            return;
        }

        const ok = window.confirm(
            `Bạn có chắc muốn xóa "${period.name}"?`
        );

        if (!ok) return;

        try {

            await deletePeriod(period.id);

            await loadPeriods();

        } catch (err) {

            console.error(err);

            alert("Không thể xóa Period.");

        }

    }

    async function handleSetActive(period) {
        try {
            await setActivePeriod(period.id);

            await loadPeriods();
        } catch (err) {
            console.error(err);
            alert("Không thể cập nhật Period Active.");
        }
    }

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                Đang tải...
            </div>
        );
    }

    return (
        <>
            <div className="flex h-full flex-col gap-6">

                <PeriodHeader
                    onAdd={() => setOpenImport(true)}
                />

                <PeriodTable
                    periods={periods}
                    onView={handleView}
                    onEdit={handleRename}
                    onDelete={handleDelete}
                    onSetActive={handleSetActive}
                />

            </div>

            <ImportPeriodDialog
                open={openImport}
                onClose={() => setOpenImport(false)}
                onSubmit={handleImport}
            />
        </>
    );
}