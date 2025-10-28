import React from 'react';
import { Flag, MapPin } from "lucide-react";

const Legend: React.FC = () => {
    const items = [
        { color: 'bg-green-500', label: 'Start', icon: MapPin },
        { color: 'bg-red-500', label: 'End', icon: Flag },
        { color: 'bg-gray-800', label: 'Wall', icon: null },
        { color: 'bg-green-200', label: 'Open Set', icon: null },
        { color: 'bg-red-200', label: 'Closed Set', icon: null },
        { color: 'bg-purple-500', label: 'Current', icon: null },
        { color: 'bg-yellow-400', label: 'Path', icon: null },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Legend</h3>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={`w-6 h-6 ${item.color} rounded border border-gray-300 flex items-center justify-center`}>
                            {item.icon && <item.icon size={16} className="text-white" />}
                        </div>
                        <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                <p><strong>Click:</strong> Toggle wall</p>
                <p><strong>Drag:</strong> Draw walls</p>
            </div>
        </div>
    );
};

export { Legend };