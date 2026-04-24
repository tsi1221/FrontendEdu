import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  HardDrive, 
  FileCode, 
  Download, 
  ExternalLink, 
  Lock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const LabAccessDrive = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
      
      {/* Top Header - Navigation focused */}
      <div className="border-b border-gray-200 bg-white shrink-0 h-[10%]">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-gray-600" />
            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Back to Lab</span>
          </button>
          
        </div>
      </div>

      {/* Main Centered Content */}
      <main className="w-full h-[80%]  bg-gray-50 flex justify-center items-center p-6 border-2 `border-gray-200 rounded-xs">
        
        {/* Centered Drive Container */}
        <div className='w-full h-full border border-gray-200 bg-white rounded-md p-6 flex flex-col gap-4'>
          <h1>Cnavas</h1>
        </div>
          
          
      </main>
    </div>
  );
};

/* =========================
   Helper Component: AssetRow
========================= */

const AssetRow = ({ name, size, type, icon, isLocked = false }) => (
  <div className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group ${isLocked ? 'opacity-50' : ''}`}>
    <div className="flex items-center gap-4">
      <div className="text-gray-400 group-hover:text-[#0056D2] transition-colors">
        {isLocked ? <Lock size={18} /> : icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{type}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{size}</span>
        </div>
      </div>
    </div>
    
    {!isLocked ? (
      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0056D2] group-hover:translate-x-1 transition-all" />
    ) : (
      <span className="text-[9px] font-black bg-gray-100 text-gray-500 px-2 py-1 uppercase tracking-widest">Pro Only</span>
    )}
  </div>
);

export default LabAccessDrive;