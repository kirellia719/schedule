import ScheduleTable from "./ScheduleTable";

export default function Schedule({ schedule, view }) {
    console.log("Schedule data:", schedule);
    return (
        <section className="
            bg-white
            shadow-[0_10px_40px_rgba(15,23,42,.05)]
        ">
            <div className="overflow-x-auto">
                <ScheduleTable schedule={schedule} view={view} />
            </div>
        </section>
    );
}