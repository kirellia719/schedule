import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function PeriodHeader({
    onAdd,
    query = "",
    onQueryChange,
}) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full sm:max-w-xs">

                <SearchIcon
                    sx={{ fontSize: 18 }}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
                />

                <input
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange?.(event.target.value)}
                    placeholder="Tìm theo tên hoặc ngày"
                    aria-label="Tìm Period"
                    className="
                        h-10
                        w-full
                        rounded-lg
                        border
                        border-line
                        bg-white
                        pl-9
                        pr-3
                        text-sm
                        text-ink
                        transition
                        placeholder:text-subtle
                        focus:border-primary
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary/20
                    "
                />

            </div>

            <button
                type="button"
                onClick={onAdd}
                className="
                    inline-flex
                    h-10
                    shrink-0
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-primary
                    px-4
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-primary-strong
                    active:scale-[.98]
                "
            >
                <AddIcon sx={{ fontSize: 18 }} />

                Thêm Period
            </button>

        </div>
    );
}
