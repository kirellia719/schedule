import ScheduleTable from "./ScheduleTable";

export default function Schedule({ schedule, view }) {
    return (
        <div className="overflow-x-auto">
            <ScheduleTable schedule={schedule} view={view} />
        </div>
    );
}
