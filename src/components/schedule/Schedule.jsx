import ScheduleTable from "./ScheduleTable";

export default function Schedule({ schedule, view }) {
    return (
        <div
            className="
                overflow-x-auto
                rounded-2xl
                [scrollbar-width:none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
            "
        >
            <ScheduleTable schedule={schedule} view={view} />
        </div>
    );
}
