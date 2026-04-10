const StatsCard = ({ title, value, icon, bgColor = 'bg-blue-500', hoverColor = 'hover:bg-blue-600' }) => (
    <div className={`${bgColor} ${hoverColor} text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium opacity-90">{title}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl text-2xl">{icon}</div>
        </div>
    </div>
);

export default StatsCard;