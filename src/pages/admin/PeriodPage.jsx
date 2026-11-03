import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, Snackbar } from "@mui/material";

import PeriodHeader from "@/components/admin/PeriodHeader";
import PeriodTable from "@/components/admin/PeriodTable";
import ImportPeriodDialog from "@/components/admin/ImportPeriodDialog";
import ConfirmPeriodDialog from "@/components/admin/ConfirmPeriodDialog";
import RenamePeriodDialog from "@/components/admin/RenamePeriodDialog";

import {
    getPeriods,
    createPeriod,
    setActivePeriod,
    deletePeriod,
    updatePeriod,
} from "@/services/period.service";

function sortPeriods(list) {
    return [...list].sort((a, b) => {
        const byDate = String(b.applyDate || "").localeCompare(
            String(a.applyDate || "")
        );

        if (byDate !== 0) return byDate;

        return String(a.name || "").localeCompare(
            String(b.name || ""),
            "vi"
        );
    });
}

export default function PeriodPage() {
    const [periods, setPeriods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");

    const [openImport, setOpenImport] = useState(false);
    const [renameTarget, setRenameTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [busyId, setBusyId] = useState("");

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const navigate = useNavigate();

    useEffect(() => {
        loadPeriods();
    }, []);

    function showToast(message, severity = "success") {
        setToast({
            open: true,
            message,
            severity,
        });
    }

    function closeToast() {
        setToast((prev) => ({ ...prev, open: false }));
    }

    async function loadPeriods() {
        setLoading(true);
        setError("");

        try {
            const data = await getPeriods();

            setPeriods(sortPeriods(data));
        } catch (err) {
            console.error(err);

            setError("Không tải được danh sách Period.");
        } finally {
            setLoading(false);
        }
    }

    async function handleImport(period) {
        const id = await createPeriod(period);

        setPeriods((prev) =>
            sortPeriods([...prev, { id, ...period }])
        );

        setOpenImport(false);

        showToast(`Đã nhập "${period.name}".`);
    }

    function handleView(period) {
        navigate(`/admin/period/${period.id}`);
    }

    async function handleSetActive(period) {
        if (period.active || busyId) return;

        setBusyId(period.id);

        try {
            await setActivePeriod(period.id);

            setPeriods((prev) =>
                prev.map((item) => ({
                    ...item,
                    active: item.id === period.id,
                }))
            );

            showToast(`"${period.name}" là bản đang áp dụng.`);
        } catch (err) {
            console.error(err);

            showToast("Không thể cập nhật Period Active.", "error");
        } finally {
            setBusyId("");
        }
    }

    async function confirmDelete() {
        const period = deleteTarget;

        if (!period) return;

        await deletePeriod(period.id);

        setPeriods((prev) => prev.filter((item) => item.id !== period.id));

        showToast(`Đã xoá "${period.name}".`);
    }

    async function handleRename(period, name) {
        await updatePeriod(period.id, { name });

        setPeriods((prev) =>
            sortPeriods(
                prev.map((item) =>
                    item.id === period.id ? { ...item, name } : item
                )
            )
        );

        showToast(`Đã đổi tên thành "${name}".`);
    }

    const visiblePeriods = useMemo(() => {
        const keyword = query.trim().toLowerCase();

        if (!keyword) return periods;

        return periods.filter((period) =>
            [period.name, period.applyDate]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(keyword))
        );
    }, [periods, query]);

    const searching = query.trim().length > 0;

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-10 w-full max-w-xs animate-pulse rounded-lg bg-slate-200/70" />

                <div className="h-72 animate-pulse rounded-2xl border border-line bg-white" />
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">

                <PeriodHeader
                    onAdd={() => setOpenImport(true)}
                    query={query}
                    onQueryChange={setQuery}
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
                    periods={visiblePeriods}
                    busyId={busyId}
                    emptyTitle={
                        searching ? "Không tìm thấy bản phù hợp" : undefined
                    }
                    emptyHint={
                        searching
                            ? "Thử từ khoá khác hoặc tạo bản mới."
                            : undefined
                    }
                    onView={handleView}
                    onEdit={setRenameTarget}
                    onDelete={setDeleteTarget}
                    onSetActive={handleSetActive}
                />

            </div>

            <ImportPeriodDialog
                open={openImport}
                onClose={() => setOpenImport(false)}
                onSubmit={handleImport}
            />

            <RenamePeriodDialog
                period={renameTarget}
                onClose={() => setRenameTarget(null)}
                onSubmit={handleRename}
            />

            <ConfirmPeriodDialog
                open={Boolean(deleteTarget)}
                title="Xoá Period"
                message={
                    deleteTarget
                        ? `Bạn có chắc muốn xoá "${deleteTarget.name}"? Thao tác này không thể hoàn tác.`
                        : ""
                }
                confirmLabel="Xoá"
                onClose={() => setDeleteTarget(null)}
                onConfirm={confirmDelete}
            />

            <Snackbar
                open={toast.open}
                autoHideDuration={2500}
                onClose={closeToast}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={closeToast}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
}
