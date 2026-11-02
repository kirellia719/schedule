import { useEffect, useState } from "react";

import PeriodHeader from "@/components/admin/PeriodHeader";
import PeriodTable from "@/components/admin/PeriodTable";
import ImportPeriodDialog from "@/components/admin/ImportPeriodDialog";

import { getPeriods, createPeriod, setActivePeriod, deletePeriod } from "@/services/period.service";

export default function PeriodPage() {
    const [periods, setPeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openImport, setOpenImport] = useState(false);

    useEffect(() => {
        loadPeriods();
    }, []);

    async function loadPeriods() {
        setLoading(true);
        setError("");

        try {
            const data = await getPeriods();

            setPeriods(data);
        } catch (err) {
            console.error(err);

            setError("Không tải được danh sách Period.");
        } finally {
            setLoading(false);
        }
    }

    async function handleImport(period) {
        await createPeriod(period);

        await loadPeriods();

        setOpenImport(false);
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
            <div className="flex flex-col gap-6">
                <div className="h-12 w-72 max-w-full animate-pulse rounded-sm bg-slate-200" />

                <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </div>
        );
    }

    return (
        <>
            <div className="flex h-full flex-col gap-6">

                <PeriodHeader
                    onAdd={() => setOpenImport(true)}
                    periods={periods}
                />

                {error && (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={loadPeriods}
                            className="shrink-0 rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium transition hover:bg-red-100"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

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
