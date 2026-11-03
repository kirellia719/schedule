import { useRef, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Paper,
    Chip,
    IconButton, Tooltip
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { excelToJson } from "@/utils/excelToJson";

export default function ImportPeriodDialog({
    open,
    onClose,
    onSubmit,
}) {
    const inputRef = useRef();

    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [period, setPeriod] = useState(null);
    const [error, setError] = useState("");

    async function readFile(file) {
        if (!file || loading) return;

        setError("");
        setPeriod(null);

        try {
            setLoading(true);

            const result = await excelToJson(file);

            setPeriod(result);
        } catch (err) {
            console.error(err);

            setError(err?.message || "Không thể đọc file Excel.");
        } finally {
            setLoading(false);
        }
    }

    function handleChooseFile(e) {
        const file = e.target.files?.[0];

        if (file) {
            readFile(file);
        }
    }

    function handleDrop(e) {
        e.preventDefault();

        setDragging(false);

        const file = e.dataTransfer?.files?.[0];

        if (!file) return;

        if (!/\.(xlsx|xls)$/i.test(file.name)) {
            setError("Chỉ nhận file Excel (.xlsx, .xls).");
            return;
        }

        readFile(file);
    }

    function handleClose() {
        setPeriod(null);
        setError("");

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onClose();
    }

    async function handleImport() {
        if (!period || submitting) return;

        try {
            setSubmitting(true);
            setError("");

            await onSubmit(period);

            handleClose();
        } catch (err) {
            console.error(err);

            setError(err?.message || "Import thất bại.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleCopyJson() {
        try {
            await navigator.clipboard.writeText(
                JSON.stringify(period.schedule, null, 4)
            );

        } catch (err) {
            console.error(err);
        }
    }

    const classCount = period
        ? Object.keys(period.schedule).length
        : 0;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ fontSize: 18, fontWeight: 600 }}>
                Nhập thời khoá biểu
            </DialogTitle>

            <DialogContent dividers>

                {!period && !loading && (

                    <div className="py-4">

                        <div
                            onClick={() => inputRef.current?.click()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            className={`
                                flex
                                h-48
                                w-full
                                cursor-pointer
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                border-2
                                border-dashed
                                transition
                                ${dragging
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-300 hover:border-blue-500 hover:bg-slate-50"
                                }
                            `}
                        >
                            <UploadFileIcon
                                sx={{
                                    fontSize: 44,
                                }}
                                color="primary"
                            />

                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 1.5,
                                    fontSize: 16,
                                    fontWeight: 600,
                                }}
                            >
                                Chọn file Excel
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Kéo thả hoặc bấm để chọn file
                            </Typography>

                        </div>

                        <input
                            ref={inputRef}
                            hidden
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleChooseFile}
                        />

                    </div>

                )}

                {error && (

                    <div className="mt-4 whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                        {error}

                    </div>

                )}

                {loading && (

                    <div className="py-12 text-center">

                        Đang đọc file...

                    </div>

                )}

                {period && (

                    <div className="space-y-6">

                        <div className="flex items-center gap-2 text-green-600">

                            <CheckCircleIcon />

                            <Typography fontWeight={600}>
                                Đọc file thành công
                            </Typography>

                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <TextField
                                label="Tên Period"
                                value={period.name}
                                onChange={(e) =>
                                    setPeriod({
                                        ...period,
                                        name: e.target.value,
                                    })
                                }
                                fullWidth
                            />

                            <TextField
                                label="Ngày áp dụng"
                                type="date"
                                value={period.applyDate}
                                onChange={(e) =>
                                    setPeriod({
                                        ...period,
                                        applyDate: e.target.value,
                                    })
                                }
                                inputlabelprops={{
                                    shrink: true,
                                }}
                                fullWidth
                            />

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <Chip
                                color="primary"
                                label={`${classCount} lớp`}
                            />

                            <Chip
                                label={
                                    period.active
                                        ? "Active"
                                        : "Draft"
                                }
                                color={
                                    period.active
                                        ? "success"
                                        : "default"
                                }
                            />

                        </div>

                        <Paper
                            variant="outlined"
                            className="overflow-hidden"
                        >

                            <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-3">

                                <div className="text-sm font-semibold">
                                    Preview Schedule JSON
                                </div>

                                <Tooltip title="Copy JSON">
                                    <IconButton
                                        size="small"
                                        onClick={handleCopyJson}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                            </div>

                            <pre className="h-72 overflow-auto bg-slate-900 p-4 text-xs text-green-300">

                                {JSON.stringify(period.schedule, null, 4)}

                            </pre>

                        </Paper>

                    </div>

                )}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={handleClose}
                    disabled={submitting}
                >
                    Hủy
                </Button>

                {period && (

                    <Button
                        variant="contained"
                        onClick={handleImport}
                        disabled={submitting}
                    >
                        {submitting ? "Đang nhập..." : "Nhập"}
                    </Button>

                )}

            </DialogActions>

        </Dialog>
    );
}
