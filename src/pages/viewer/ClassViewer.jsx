import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ViewerLayout from "../../layouts/ViewerLayout";
import ViewerHeader from "../../components/viewer/ViewerHeader";
import Schedule from "../../components/schedule/Schedule";
import { getClassSchedule } from "../../services/schedule.service";

export default function ClassViewer() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { className } = useParams();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getClassSchedule(className);

                setData(result);

            } catch (error) {
                console.error("Lỗi tải thời khóa biểu lớp:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, [className]);


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
                        Không tìm thấy thời khóa biểu lớp.
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

                <div className="p-2 md:p-6 bg-white">

                    <Schedule
                        schedule={data.schedule}
                        view="class"
                    />

                </div>

            </ViewerLayout>

        </div>
    );
}