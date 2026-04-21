import React from 'react';
import {  CheckCircle2, AlertCircle, Info, Trash2 } from 'lucide-react';

const Notification = () => {
  const notifications = [
    { 
      id: 1, 
      type: 'success', 
      title: 'Booking Confirmed', 
      desc: 'Unit A-402 Green Valley booking has been successfully processed.', 
      time: '2 mins ago',
      icon: <CheckCircle2 size={18} className="text-green-500" />,
      bg: 'bg-green-50'
    },
    { 
      id: 2, 
      type: 'alert', 
      title: 'Installment Overdue', 
      desc: 'Client Rohan Sharma has missed the March installment for Skyline Residency.', 
      time: '1 hour ago',
      icon: <AlertCircle size={18} className="text-red-500" />,
      bg: 'bg-red-50'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'New Contest Active', 
      desc: 'The "Top 3 Advisor in Recruitment" contest is now live. Check your status!', 
      time: '3 hours ago',
      icon: <Info size={18} className="text-blue-500" />,
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Notification Center</h2>
        <button className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
          <Trash2 size={12} /> CLEAR ALL
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((note) => (
          <div 
            key={note.id} 
            className="bg-white p-4 rounded-[8px] border border-gray-100 shadow-sm flex items-start gap-4 hover:border-blue-100 transition-all cursor-pointer"
          >
            <div className={`shrink-0 w-10 h-10 ${note.bg} rounded-[8px] flex items-center justify-center`}>
              {note.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-gray-800">{note.title}</h4>
                <span className="text-[10px] text-gray-400">{note.time}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{note.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;