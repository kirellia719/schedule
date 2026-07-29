const USERNAME = "admin";
const PASSWORD = "admin";

export async function login(username, password) {
    if (username === USERNAME && password === PASSWORD) {
        localStorage.setItem("admin", "true");
        return true;
    }

    throw new Error("Sai tài khoản hoặc mật khẩu.");
}

export function logout() {
    localStorage.removeItem("admin");
}

export function isLoggedIn() {
    return localStorage.getItem("admin") === "true";
}