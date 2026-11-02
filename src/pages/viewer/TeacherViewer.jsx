import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ViewerLayout from "../../layouts/ViewerLayout";
import ViewerHeader from "../../components/viewer/ViewerHeader";
import Schedule from "../../components/schedule/Schedule";
import { getTeacherSchedule } from "../../services/schedule.service";

export default function TeacherViewer() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { teacherName } = useParams();

    useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            setLoading(true);
            setData(null);

            try {
                const result = await getTeacherSchedule(teacherName);

                if (cancelled) return;

                setData(result);
            } catch (error) {
                if (cancelled) return;

                console.error("Lỗi tải thời khóa biểu:", error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };
    }, [teacherName]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center bg-slate-100">
                <ViewerLayout>
                    <div className="py-20 text-center">
                        Đang tải thời khóa biểu...
                    </div>
                </ViewerLayout>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex justify-center bg-slate-100">
                <ViewerLayout>
                    <div className="py-20 text-center">
                        Không tìm thấy thời khóa biểu.
                    </div>
                </ViewerLayout>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center bg-slate-100">
            <ViewerLayout
                header={
                    <ViewerHeader
                        title={data.target.name}
                        subtitle={data.period.name}
                    />
                }
            >
                <div className="p-2 md:p-6  bg-white ">
                    <Schedule schedule={data.schedule} />
                </div>
            </ViewerLayout>
        </div>
    );
}
