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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-50">

                        <tr className="border-b border-slate-200">

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Tên
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Ngày áp dụng
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                                className="
                                    border-b
                                    border-slate-100
                                    transition
                                    hover:bg-slate-50
                                "
                            >

                                {/* Tên */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

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

                                {/* Apply */}

                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {period.applyDate}
                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">

                                    <div
                                        onClick={() => onSetActive(period)}
                                        title={period.active ? "Tắt Active" : "Đặt Active"}
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
        transition-all
        duration-200
        cursor-pointer
        ${period.active
                                                ? "border-green-200 bg-green-100 text-green-700 hover:bg-green-200"
                                                : "border-slate-200 bg-slate-100 text-slate-600 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                                            }
    `}
                                    >
                                        {period.active ? (
                                            <CheckCircle sx={{ fontSize: 14 }} />
                                        ) : (
                                            <RadioButtonUnchecked sx={{ fontSize: 14 }} />
                                        )}

                                        {period.active ? "Active" : "Draft"}
                                    </div>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center justify-center gap-2">

                                        <button
                                            onClick={() => onView(period)}
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-500
                                                transition
                                                hover:bg-blue-50
                                                hover:text-blue-600
                                            "
                                            title="Xem"
                                        >
                                            <Visibility fontSize="small" />
                                        </button>

                                        <button
                                            onClick={() => onEdit(period)}
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-500
                                                transition
                                                hover:bg-amber-50
                                                hover:text-amber-600
                                            "
                                            title="Đổi tên"
                                        >
                                            <Edit fontSize="small" />
                                        </button>

                                        <button
                                            onClick={() => onDelete(period)}
                                            className="
                                                rounded-lg
                                                p-2
                                                text-slate-500
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-600
                                            "
                                            title="Xóa"
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

        </div>
    );
}