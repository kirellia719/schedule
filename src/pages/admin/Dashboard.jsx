import { Outlet } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
}