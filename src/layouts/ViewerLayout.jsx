// src/layouts/ViewerLayout.jsx

export default function ViewerLayout({ header, children }) {
    return (
        <div className="view-layout w-full max-w-[1200px]">
            {/* Header */}
            <header className="header">
                {header}
            </header>

            {/* Main */}
            <main className="main">
                {children}
            </main>
        </div>
    );
}
