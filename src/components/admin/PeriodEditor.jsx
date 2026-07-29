import {
    UploadFile,
    Save,
    CheckCircle,
} from "@mui/icons-material";

export default function PeriodEditor({
    period,
    value,
    onChange,
    onImport,
    onSave,
    onSetActive,
}) {
    if (!period) {
        return (
            <div className="flex h-full items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-700">
                        Chưa chọn Period
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Hãy chọn một Period ở bên trái để xem dữ liệu.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-slate-200 p-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <h2 className="text-2xl font-bold text-slate-900">
                                {period.name}
                            </h2>

                            {period.active && (
                                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                    <CheckCircle sx={{ fontSize: 16 }} />
                                    Active
                                </span>
                            )}

                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                            Cập nhật: {period.updatedAt}
                        </p>

                    </div>

                    {/* Toolbar */}

                    <div className="flex flex-wrap gap-3">

                        <button
                            onClick={onImport}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-300
                                px-4
                                py-2.5
                                transition
                                hover:bg-slate-100
                            "
                        >
                            <UploadFile fontSize="small" />

                            Import Excel
                        </button>

                        {!period.active && (
                            <button
                                onClick={() => onSetActive?.(period)}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-green-300
                                    bg-green-50
                                    px-4
                                    py-2.5
                                    text-green-700
                                    transition
                                    hover:bg-green-100
                                "
                            >
                                <CheckCircle fontSize="small" />

                                Đặt Active
                            </button>
                        )}

                        <button
                            onClick={onSave}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-2.5
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            <Save fontSize="small" />

                            Lưu
                        </button>

                    </div>

                </div>

            </div>

            {/* JSON */}

            <div className="flex-1 p-6">

                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    spellCheck={false}
                    className="
                        h-full
                        min-h-[600px]
                        w-full
                        resize-none
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        p-5
                        font-mono
                        text-sm
                        leading-7
                        outline-none
                        transition

                        focus:border-blue-500
                        focus:bg-white
                    "
                />

            </div>

        </div>
    );
}