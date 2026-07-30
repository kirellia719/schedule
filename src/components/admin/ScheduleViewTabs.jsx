import { useMemo, useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Schedule from "@/components/schedule/Schedule";

const ScheduleViewTabs = ({ schedule = {} }) => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [selectedValue, setSelectedValue] = useState("");

  /**
   * Danh sách lớp
   */
  const classOptions = useMemo(() => {
    return Object.keys(schedule).sort();
  }, [schedule]);

  /**
   * Danh sách giáo viên
   */
  const teacherOptions = useMemo(() => {
    const teachers = new Set();

    Object.values(schedule).forEach((classSchedule) => {
      Object.values(classSchedule || {}).forEach((daySchedule) => {
        Object.values(daySchedule || {}).forEach((lesson) => {
          if (lesson?.teacher) {
            teachers.add(lesson.teacher);
          }
        });
      });
    });

    return [...teachers].sort();
  }, [schedule]);

  /**
   * Dropdown hiện tại
   */
  const currentOptions =
    activeTab === "teacher" ? teacherOptions : classOptions;

  /**
   * Chọn mặc định
   */
  useEffect(() => {
    if (currentOptions.length > 0) {
      setSelectedValue(currentOptions[0]);
    } else {
      setSelectedValue("");
    }
  }, [activeTab, currentOptions]);

  /**
   * Tạo lịch giáo viên từ dữ liệu gốc
   */
  const teacherSchedule = useMemo(() => {
    if (!selectedValue) return {};

    const result = {};

    Object.entries(schedule).forEach(([className, classSchedule]) => {
      Object.entries(classSchedule || {}).forEach(([day, daySchedule]) => {
        if (!result[day]) {
          result[day] = {};
        }

        Object.entries(daySchedule || {}).forEach(([period, lesson]) => {
          if (lesson?.teacher === selectedValue) {
            result[day][period] = {
              class: className,
              subject: lesson.subject,
              teacher: lesson.teacher,
            };
          } else if (!(period in result[day])) {
            result[day][period] = null;
          }
        });
      });
    });

    return result;
  }, [schedule, selectedValue]);

  /**
   * Lịch lớp
   */
  const classSchedule = useMemo(() => {
    return schedule[selectedValue] || {};
  }, [schedule, selectedValue]);

  return (
    <div className="rounded-xl bg-white p-2 shadow-sm sm:p-6 mt-2">

      {/* Header */}

      <div
        className="
                flex
                flex-col
                gap-4
                border-b
                border-gray-200
                pb-4
                sm:flex-row
                sm:items-end
                sm:justify-between
            "
      >

        {/* Tabs */}

        <div className="flex flex-1">

          <button
            onClick={() => setActiveTab("teacher")}
            className={`
                        relative
                        flex-1
                        pb-3
                        text-center
                        text-sm
                        font-medium
                        transition
                        ${activeTab === "teacher"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }
                    `}
          >
            Theo giáo viên

            {activeTab === "teacher" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600" />
            )}

          </button>

          <button
            onClick={() => setActiveTab("class")}
            className={`
                        relative
                        flex-1
                        pb-3
                        text-center
                        text-sm
                        font-medium
                        transition
                        ${activeTab === "class"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
              }
                    `}
          >
            Theo lớp

            {activeTab === "class" && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600" />
            )}

          </button>

        </div>

        {/* Select */}

        <div className="relative w-full sm:w-auto">

          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="
                        w-full
                        appearance-none
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-2.5
                        pr-10
                        text-sm
                        focus:border-blue-500
                        focus:outline-none
                        sm:min-w-[240px]
                    "
          >

            {currentOptions.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

          <KeyboardArrowDownIcon
            className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                    "
            fontSize="small"
          />

        </div>

      </div>

      {/* Content */}

      <div className="mt-5 overflow-x-auto">

        {activeTab === "teacher" ? (
          <Schedule
            schedule={teacherSchedule}
            view="teacher"
          />
        ) : (
          <Schedule
            schedule={classSchedule}
            view="class"
          />
        )}

      </div>

    </div>
  );
};

export default ScheduleViewTabs;