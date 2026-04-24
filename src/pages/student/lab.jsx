import React, { useState } from 'react';
import { 
  FlaskConical, 
  Layers, 
  Box, 
  LayoutGrid, 
  ChevronDown, 
  MessageSquare, 
  BookOpen, 
  Home, 
  User,
  Menu
} from 'lucide-react';

const Lab = () => {
  const [selectedSubject, setSelectedSubject] = useState('Biology');
  const [activeTab, setActiveTab] = useState('canvas'); // 'canvas' or 'ar'

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-slate-800">
      
      {/* Top Header */}
     

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        
        {/* Stats Card */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-100/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full mb-4">
            <FlaskConical size={14} className="text-blue-600" />
            <span className="text-[10px] font-bold text-blue-600 uppercase">Lab by Subject</span>
          </div>
          
          <h2 className="text-3xl font-black mb-2">Virtual Lab</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
            Each subject has separate Canvas simulations and AR models.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <StatBox icon={<Layers size={18}/>} count="148" label="Canvas Models" color="blue" />
            <StatBox icon={<Box size={18}/>} count="2" label="AR Models" color="blue" />
            <StatBox icon={<LayoutGrid size={18}/>} count="4" label="subjects" color="blue" />
          </div>
        </div>

        {/* Filter Selection Card */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-6 shadow-xl shadow-slate-100/50">
          <div className="relative mb-4">
            <button className="w-full flex justify-between items-center px-5 py-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-blue-900 font-bold text-sm">
              {selectedSubject}
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <button 
              onClick={() => setActiveTab('canvas')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs transition-all ${activeTab === 'canvas' ? 'bg-[#0056D2] text-white shadow-lg shadow-blue-200' : 'bg-blue-50/50 text-blue-600 border border-blue-100'}`}
            >
              <Layers size={16} /> Canvas Models
            </button>
            <button 
              onClick={() => setActiveTab('ar')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs transition-all ${activeTab === 'ar' ? 'bg-[#0056D2] text-white shadow-lg shadow-blue-200' : 'bg-blue-50/50 text-blue-600 border border-blue-100'}`}
            >
              <Box size={16} /> AR Models
            </button>
          </div>

          <div className="inline-block px-5 py-2 bg-[#0056D2] text-white rounded-full text-xs font-bold mb-4 shadow-md shadow-blue-100">
            {selectedSubject} Unit 1
          </div>

          <div className="py-4 border-t border-slate-50">
            <p className="text-slate-400 text-sm font-medium italic">No canvas models yet.</p>
          </div>
        </div>

        {/* Placeholder / Empty State */}
        <div className="bg-blue-50/30 border-2 border-dashed border-blue-100 rounded-[40px] py-20 px-10 text-center">
            <p className="text-blue-900/60 font-bold text-sm">
              Use the filters to display lab content.
            </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      
    </div>
  );
};

// Helper Components
const StatBox = ({ icon, count, label }) => (
  <div className="bg-white border border-blue-50 rounded-3xl p-3 flex flex-col items-center text-center shadow-sm">
    <div className="text-blue-600 mb-2">{icon}</div>
    <span className="text-lg font-black block leading-none">{count}</span>
    <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{label}</span>
  </div>
);

const NavIcon = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
    {icon}
    <span className="text-[10px] font-bold tracking-tight">{label}</span>
  </div>
);

export default Lab;