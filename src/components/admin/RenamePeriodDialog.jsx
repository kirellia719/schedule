import { useEffect, useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

export default function RenamePeriodDialog({
    period,
    onClose,
    onSubmit,
}) {
    const [name, setName] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!period) return;

        setName(period.name || "");
        setError("");
        setBusy(false);
    }, [period]);

    async function handleSubmit(event) {
        event?.preventDefault();

        if (!period || busy) return;

        try {
            setBusy(true);
            setError("");

            await onSubmit(period, name.trim());

            onClose();
        } catch (err) {
            console.error(err);

            setError(err?.message || "Không đổi được tên Period.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <Dialog
            open={Boolean(period)}
            onClose={busy ? undefined : onClose}
            maxWidth="xs"
            fullWidth
        >
            <form onSubmit={handleSubmit}>

                <DialogTitle>Đổi tên Period</DialogTitle>

                <DialogContent dividers>

                    <TextField
                        autoFocus
                        fullWidth
                        label="Tên Period"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={busy}
                        error={Boolean(error)}
                    />

                    {error && (
                        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                </DialogContent>

                <DialogActions>

                    <Button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                    >
                        Hủy
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={busy || !name.trim()}
                    >
                        {busy ? "Đang lưu..." : "Lưu"}
                    </Button>

                </DialogActions>

            </form>
        </Dialog>
    );
}
