import {
    CheckCircle,
    RadioButtonUnchecked,
    Edit,
    Delete,
    Visibility,
} from "@mui/icons-material";

export default function PeriodTable({
    periods = [],
    onView,
    onEdit,
    onDelete,
    onSetActive,
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* ================= Desktop ================= */}

            <div className="hidden overflow-x-auto md:block">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr className="border-b border-slate-200">

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Tên
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Ngày áp dụng
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Trạng thái
                            </th>

                            <th className="w-48 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Thao tác
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {periods.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="py-16 text-center text-slate-500"
                                >
                                    Chưa có Period nào.
                                </td>

                            </tr>

                        )}

                        {periods.map((period) => (

                            <tr
                                key={period.id}
                                className="border-b border-slate-100 transition hover:bg-slate-50"
                            >

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSetActive(period)}>

                                        {period.active ? (
                                            <CheckCircle
                                                sx={{ fontSize: 20 }}
                                                className="text-green-500"
                                            />
                                        ) : (
                                            <RadioButtonUnchecked
                                                sx={{ fontSize: 18 }}
                                                className="text-slate-300"
                                            />
                                        )}

                                        <div>

                                            <div className="font-semibold text-slate-800">
                                                {period.name}
                                            </div>

                                            <div className="text-xs text-slate-500">
                                                {period.id}
                                            </div>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {period.applyDate}
                                </td>

                                <td className="px-6 py-4 text-center">

                                    <div
                                        className={`
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            border
                                            px-3
                                            py-1
                                            text-xs
                                            font-medium
                                            transition
                                            ${period.active
                                                ? "border-green-200 bg-green-100 text-green-700"
                                                : "border-slate-200 bg-slate-100 text-slate-600"
                                            }
                                        `}
                                    >

                                        {period.active ? (
                                            <CheckCircle sx={{ fontSize: 14 }} />
                                        ) : <></>}

                                        {period.active ? "Active" : "Draft"}

                                    </div>

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex items-center justify-center gap-2">

                                        <button
                                            onClick={() => onView(period)}
                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <Visibility fontSize="small" />
                                        </button>

                                        <button
                                            onClick={() => onEdit(period)}
                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                                        >
                                            <Edit fontSize="small" />
                                        </button>

                                        <button
                                            onClick={() => onDelete(period)}
                                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Delete fontSize="small" />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* ================= Mobile ================= */}

            <div className="space-y-3 p-3 md:hidden">

                {periods.length === 0 && (

                    <div className="rounded-xl border border-slate-200 bg-white py-10 text-center text-slate-500">
                        Chưa có Period nào.
                    </div>

                )}

                {periods.map((period) => (

                    <div
                        key={period.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                        {/* Header */}

                        <div className="flex items-start gap-3">

                            {/* Active */}

                            <button
                                onClick={() => onSetActive(period)}
                                className="mt-0.5 shrink-0 cursor-pointer"
                            >
                                {period.active ? (
                                    <CheckCircle
                                        sx={{ fontSize: 22 }}
                                        className="text-green-500"
                                    />
                                ) : (
                                    <RadioButtonUnchecked
                                        sx={{ fontSize: 22 }}
                                        className="text-slate-300"
                                    />
                                )}
                            </button>

                            {/* Info */}

                            <div className="min-w-0 flex-1">

                                <div className="truncate font-semibold text-slate-800">
                                    {period.name}
                                </div>

                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                                    <span>{period.id}</span>

                                    <span>•</span>

                                    <span>{period.applyDate}</span>

                                </div>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-3">

                            <button
                                onClick={() => onView(period)}
                                className="
                        flex
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1.5
                        text-xs
                        text-blue-600
                        hover:bg-blue-50
                    "
                            >
                                <Visibility sx={{ fontSize: 18 }} />
                                Xem
                            </button>

                            <button
                                onClick={() => onEdit(period)}
                                className="
                        flex
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1.5
                        text-xs
                        text-amber-600
                        hover:bg-amber-50
                    "
                            >
                                <Edit sx={{ fontSize: 18 }} />
                                Sửa
                            </button>

                            <button
                                onClick={() => onDelete(period)}
                                className="
                        flex
                        items-center
                        gap-1
                        rounded-md
                        px-2
                        py-1.5
                        text-xs
                        text-red-600
                        hover:bg-red-50
                    "
                            >
                                <Delete sx={{ fontSize: 18 }} />
                                Xóa
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}