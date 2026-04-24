import React, { useState } from 'react';
import { 
  FlaskConical, 
  Layers, 
  Box, 
  LayoutGrid, 
  ChevronDown, 
  Search,
  ArrowRight,
  Info
} from 'lucide-react';

/* =========================
   Flat Components
========================= */

const subjects =['Biology', 'Chemistry', 'Physics', 'Mathematics']

const LabStat = ({ label, value, Icon }) => (
  <div className="border border-gray-200 bg-white p-4 flex flex-col items-center justify-center text-center">
    <Icon className="h-5 w-5 text-[#0056D2] mb-2" />
    <p className="text-xl font-bold text-gray-900">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
  </div>
);

const Lab = () => {
  const [activeTab, setActiveTab] = useState('canvas');

  return (
    <div className="h-screen flex flex-col bg-white font-sans overflow-hidden">
      
      {/* Header - Flat Branding */}
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
              <FlaskConical size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Virtual Lab</h1>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">Simulation Environment</p>
            </div>
          </div>
          <button className="p-2 border border-gray-200 hover:bg-gray-50">
            <LayoutGrid size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-white p-5 space-y-6">
        
        {/* Summary Section */}
        <div className="border border-gray-200">
          <div className="bg-[#0056D2] px-4 py-2 flex items-center gap-2">
            <Info size={14} className="text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Overview</span>
          </div>
          <div className="p-5 flex justify-between items-center gap-6">
            <div className="max-w-2xl">

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject Resources</h2>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
                Access separate Canvas simulations and interactive AR models tailored for each curriculum unit.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 ">
               {/* Grid items with negative margins/borders to prevent double lines */}
               <div className=""><LabStat icon={Layers} value="148" label="Canvas" Icon={Layers} /></div>
               <div className=""><LabStat icon={LayoutGrid} value="4" label="Subjects" Icon={LayoutGrid} /></div>
            </div>
          </div>
        </div>

        {/* Interaction Section */}
        <div className="border border-gray-200 bg-gray-50">
          {/* Subject Selector */}
          <div className="p-4 border-b border-gray-200 bg-white">
  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Select Domain</label>
  <div className="relative group">
    <button className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 text-sm font-semibold rounded-xs hover:border-gray-400 transition-colors">
      Biology
      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
    </button>
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xs shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
      {subjects.map((domain) => (
        <button 
          key={domain}
          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
        >
          {domain}
        </button>
      ))}
    </div>
  </div>
</div>

          {/* Toggle Tabs */}
          

          {/* Unit List */}
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
               <span className="bg-[#0056D2] text-white text-[10px] font-bold px-3 py-1">UNIT 01</span>
               <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="border border-dashed border-gray-300 py-10 flex flex-col items-center justify-center text-center">
               <div className="w-10 h-10 bg-gray-100 flex items-center justify-center mb-3">
                  <Search size={18} className="text-gray-400" />
               </div>
               <p className="text-sm font-bold text-gray-800 italic">No models available in this section</p>
               <p className="text-[10px] text-gray-500 uppercase mt-1">Please select another unit or subject</p>
            </div>
          </div>
        </div>

        {/* Footer Prompt */}
        <div className="border border-gray-200 p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 font-medium">Ready to explore visual concepts?</p>
            <button className="flex items-center gap-2 bg-[#0056D2] text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#0045b0] transition-colors">
              Request Access
              <ArrowRight size={14} />
            </button>
        </div>

      </main>
    </div>
  );
};

export default Lab;