import { Link } from "react-router-dom";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <div className="max-w-md text-center">

                <ErrorOutlineOutlinedIcon
                    sx={{ fontSize: 80 }}
                    className="text-blue-500"
                />

                <h1 className="mt-6 text-6xl font-bold text-slate-800">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-slate-700">
                    Không tìm thấy trang
                </h2>

                <p className="mt-3 text-slate-500">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                </p>

                <Link
                    to="/"
                    className="
                        mt-8
                        inline-flex
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    Quay về trang chủ
                </Link>

            </div>
        </div>
    );
}
