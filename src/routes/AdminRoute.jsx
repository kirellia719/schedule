import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/services/auth.service";

export default function AdminRoute({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}