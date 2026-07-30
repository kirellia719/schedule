import AddIcon from "@mui/icons-material/Add";

export default function PeriodHeader({ onAdd }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                    Quản lý Thời khoá biểu
                </h1>

                {/* <p className="mt-1 text-sm text-slate-500">
                    Quản lý các thời khóa biểu theo từng giai đoạn áp dụng.
                </p> */}
            </div>

            <div
                onClick={onAdd}
                className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    gap-2
                    rounded-sm
                    bg-blue-600
                    px-4
                    text-sm
                    font-medium
                    text-white
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    active:scale-95
                    cursor-pointer
                "
            >
                <AddIcon sx={{ fontSize: 20 }} />

                <span>Thêm Period</span>
            </div>
        </div>
    );
}