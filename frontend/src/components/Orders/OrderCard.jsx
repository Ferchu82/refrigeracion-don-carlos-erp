const OrderCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Orden #{order.id?.slice(-8)}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    order.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                }`}>
                {order.status}
            </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Cliente:</span> {order.clientName}</p>
            <p><span className="font-medium">Equipo:</span> {order.equipment}</p>
            <p><span className="font-medium">Técnico:</span> {order.assignedTo?.name || 'Sin asignar'}</p>
        </div>
    </div>
);

export default OrderCard;