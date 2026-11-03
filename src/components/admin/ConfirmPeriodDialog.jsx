import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function ConfirmPeriodDialog({
    open,
    title,
    message,
    confirmLabel = "Xoá",
    onClose,
    onConfirm,
}) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setError("");
            setBusy(false);
        }
    }, [open]);

    async function handleConfirm() {
        if (busy) return;

        try {
            setBusy(true);
            setError("");

            await onConfirm();

            onClose();
        } catch (err) {
            console.error(err);

            setError(err?.message || "Thao tác thất bại.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={busy ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>

                <DialogContentText>{message}</DialogContentText>

                {error && (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </div>
                )}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={busy}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirm}
                    disabled={busy}
                >
                    {busy ? "Đang xử lý..." : confirmLabel}
                </Button>

            </DialogActions>
        </Dialog>
    );
}
