const StatCard = ({ name, icon: Icon, value, color }) => {
    return (
        <div
            className="bg-gray-800 overflow-hidden bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-gray-400">
                    <Icon 
                        size={20}
                        className="mr-2"
                        style={{ color }}
                    />
                    {name}
                </span>
                <p className="mt-3 text-3xl font-semibold text-gray-100">
                    {value}
                </p>
            </div>
        </div>
    );
};

export default StatCard;