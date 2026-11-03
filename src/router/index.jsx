import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";

import TeacherViewer from "@/pages/viewer/TeacherViewer";
import ClassViewer from "@/pages/viewer/ClassViewer";

import Login from "@/pages/admin/Login";
import AdminLayout from "@/layouts/AdminLayout";

import PeriodPage from "@/pages/admin/PeriodPage";
import PeriodDetailPage from "@/pages/admin/PeriodDetailPage";
import ViewerPage from "@/pages/admin/ViewerPage";

import AdminRoute from "@/routes/AdminRoute";

export default function Router() {
    return (
        <Routes>

            {/* ================= Home ================= */}

            <Route
                path="/"
                element={<HomePage />}
            />

            {/* ================= Viewer ================= */}

            <Route
                path="/teacher/:teacherName"
                element={<TeacherViewer />}
            />

            <Route
                path="/class/:className"
                element={<ClassViewer />}
            />

            {/* ================= Login ================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            {/* ================= Admin ================= */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                {/* /admin -> /admin/viewer */}
                <Route
                    index
                    element={<Navigate to="viewer" replace />}
                />

                <Route
                    path="viewer"
                    element={<ViewerPage />}
                />

                <Route
                    path="period"
                    element={<PeriodPage />}
                />

                <Route
                    path="period/:periodId"
                    element={<PeriodDetailPage />}
                />

                {/* 404 trong Admin */}
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Route>

            {/* ================= Global 404 ================= */}

            <Route
                path="*"
                element={<NotFoundPage />}
            />

        </Routes>
    );
}
