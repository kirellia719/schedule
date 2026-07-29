import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Header = ({ period }) => {
    return (
        <header className="w-full bg-white border-b border-gray-200 px-6 py-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">

                {/* Left: Page title */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Tra cứu
                    </h1>
                </div>


                {/* Right: Schedule info */}
                <div className="flex items-center gap-3">

                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                        <CalendarMonthIcon
                            className="text-blue-900"
                            fontSize="medium"
                        />
                    </div>


                    {/* Schedule name + status */}
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-gray-800">
                            {period?.name}
                        </span>

                        <span className="flex items-center gap-2 text-sm text-green-600">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {period?.active ? "Đang hoạt động" : "Ngưng hoạt động"}
                        </span>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;