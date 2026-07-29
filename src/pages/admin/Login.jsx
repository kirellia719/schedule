import { useState } from "react";
import {
    School,
    SchoolOutlined,
    LockOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import illustration from "@/assets/images/login-illustration.png";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            localStorage.setItem("admin", "true");
            window.location.href = "/admin";
            return;
        }

        alert("Sai tài khoản hoặc mật khẩu");
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F6FAFF]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EAF4FF_0%,#F6FAFF_55%,#F6FAFF_100%)]" />

                <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#DCEEFF] opacity-80 blur-3xl" />

                <div className="absolute -bottom-56 right-[-150px] h-[520px] w-[520px] rounded-full bg-[#DCEEFF] opacity-60 blur-3xl" />

                <div className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-[1700px]">
                <div className="relative hidden w-[58%] items-center justify-center lg:flex">
                    <div className="absolute left-32 top-60 opacity-30">
                        <div className="flex">
                            <div className="h-10 w-10 rounded-full bg-blue-200"></div>
                            <div className="-ml-3 h-14 w-14 rounded-full bg-blue-200"></div>
                            <div className="-ml-3 h-10 w-10 rounded-full bg-blue-200"></div>
                        </div>
                    </div>

                    <img
                        src={illustration}
                        alt=""
                        className="relative z-10 w-[82%] max-w-[760px] object-contain"
                    />
                </div>

                <div className="flex w-full items-center justify-center px-6 lg:w-[500px]">
                    <div className="w-full max-w-[560px] rounded-[28px] border border-white/70 bg-white/80 p-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(37,99,235,.12)]">
                        <div className="flex justify-center">
                            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-br from-[#EDF5FF] to-[#DCEBFF]">
                                <School
                                    sx={{
                                        fontSize: 30,
                                        color: "#2563eb",
                                    }}
                                />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-10">
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Tên đăng nhập
                                </label>

                                <div className="flex h-10 items-center rounded-md border border-[#D7E4F5] bg-white px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                                    <SchoolOutlined className="text-slate-400" />

                                    <input
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder="Nhập tên đăng nhập"
                                        className="ml-3 flex-1 bg-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Mật khẩu
                                </label>

                                <div className="flex h-10 items-center rounded-md border border-[#D7E4F5] bg-white px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                                    <LockOutlined className="text-slate-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Nhập mật khẩu"
                                        className="ml-3 flex-1 bg-transparent outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <VisibilityOff className="text-slate-400" />
                                        ) : (
                                            <Visibility className="text-slate-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-8 h-10 w-full rounded-md bg-gradient-to-r from-[#4E8DFF] to-[#3579F6] text-lg text-white shadow-lg shadow-blue-300/40 transition-all hover:from-[#3D7CF5] hover:to-[#286AE7]"
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
