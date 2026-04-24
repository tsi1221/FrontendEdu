// Lab.jsx
import { useState } from 'react';
import {
  FlaskConical,
  Layers,
  Search,
  X,
  Maximize2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { lessonsByGradeSubject } from './demo'; // <-- import

const SUBJECTS = ['Mathematics', 'Biology', 'Chemistry', 'Physics'];
const SELECTED_GRADE = 9;

const LabStat = ({ label, value, Icon }) => (
  <div className="border border-gray-200 bg-white p-4 flex flex-col items-center justify-center text-center">
    <Icon className="h-5 w-5 text-[#0056D2] mb-2" />
    <p className="text-xl font-bold text-gray-900">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
  </div>
);

const Lab = () => {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0].toLowerCase());
  const [expandedUnit, setExpandedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const gradeData = lessonsByGradeSubject[SELECTED_GRADE] || {};
  const units = gradeData[selectedSubject] || [];

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
    setExpandedUnit(null);
  };

  const closeLesson = () => setSelectedLesson(null);

  return (
    <div className="h-screen flex flex-col bg-white font-sans overflow-hidden">
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
              <FlaskConical size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">Virtual Lab</h1>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">
                Interactive 3D Models
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-5 space-y-6">
        {!selectedLesson ? (
          <>
            <div className="border border-gray-200 bg-white">
              <div className="bg-[#0056D2] px-4 py-2 flex items-center gap-2">
                <Layers size={14} className="text-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Overview</span>
              </div>
              <div className="p-5 flex justify-between items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Subject Resources</h2>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
                    Choose a subject to browse available 3D models (mock data).
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <LabStat label="Subjects" value={SUBJECTS.length} Icon={Layers} />
                  <LabStat label="Grade" value={`Grade ${SELECTED_GRADE}`} Icon={FlaskConical} />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-white">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">
                  Select Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubject(sub.toLowerCase());
                        setExpandedUnit(null);
                      }}
                      className={`px-4 py-1.5 text-sm font-semibold border transition-colors ${
                        selectedSubject === sub.toLowerCase()
                          ? 'bg-[#0056D2] text-white border-[#0056D2]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 space-y-4">
                {units.length === 0 ? (
                  <div className="border border-dashed border-gray-300 py-10 flex flex-col items-center justify-center text-center">
                    <Search size={18} className="text-gray-400 mb-3" />
                    <p className="text-sm font-bold text-gray-800 italic">
                      No 3D models for this subject
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">
                      Try another subject
                    </p>
                  </div>
                ) : (
                  units.map(unit => {
                    const isExpanded = expandedUnit === unit.unit;
                    return (
                      <div key={unit.unit} className="border border-gray-200 bg-white">
                        <button
                          onClick={() => setExpandedUnit(isExpanded ? null : unit.unit)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-[#0056D2] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                              {unit.unit.split(':')[0]}
                            </span>
                            <span className="text-sm font-semibold text-gray-800">{unit.unit}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown size={18} className="text-gray-600" />
                          ) : (
                            <ChevronRight size={18} className="text-gray-600" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {unit.lessons.map(lesson => (
                                <button
                                  key={lesson}
                                  onClick={() => openLesson({ name: lesson, unit: unit.unit })}
                                  className="flex items-center gap-3 p-4 border border-gray-200 hover:border-[#0056D2] hover:shadow-sm transition-colors group"
                                >
                                  <Maximize2 size={20} className="text-[#0056D2] group-hover:text-[#0045b0]" />
                                  <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-800">
                                      {lesson.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                      View Details
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                            {unit.lessons.length === 0 && (
                              <p className="text-gray-500 text-sm italic">No lessons in this unit.</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-[#0056D2] text-white px-4 py-3">
              <h2 className="text-lg font-bold">
                {selectedLesson.name.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <button onClick={closeLesson} className="p-1">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 bg-white border border-gray-200 p-6 flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded mb-4">
                <Maximize2 size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-800 font-bold text-xl mb-2">
                {selectedLesson.name.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Unit: {selectedLesson.unit}
              </p>
              <div className="border border-dashed border-gray-300 p-4 text-center text-gray-500 text-sm">
                <p>3D interactive model would be displayed here.</p>
                <p className="text-xs mt-1">(mock data – no external iframe)</p>
              </div>
              <button onClick={closeLesson} className="mt-4 text-[#0056D2] font-semibold text-sm">
                ← Back to list
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lab;