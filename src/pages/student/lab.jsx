import { useContext, useEffect, useMemo, useState } from "react";
import {
  FlaskConical,
  Layers,
  Search,
  X,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { fetchVirtualLabResources } from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const LAB_TEXT = {
  en: {
    title: "Virtual Lab",
    subtitle: "Interactive 3D Models",
    overview: "Overview",
    subjectResources: "Subject Resources",
    subjectResourcesBody:
      "Choose a subject to browse live virtual lab models from EduTwin backend.",
    subjects: "Subjects",
    grade: "Grade",
    selectSubject: "Select Subject",
    loadingResources: "Loading virtual lab resources...",
    noModels: "No 3D models for this subject",
    tryAnother: "Try another subject",
    virtualModel: "Virtual Model",
    chapter: "Chapter",
    interactiveLesson: "Interactive lesson",
    missingUrl: "Resource URL is missing for this model.",
    openInNewTab: "Open in New Tab",
    backToList: "Back to list",
    loadError: "Unable to load virtual lab resources right now.",
  },
  om: {
    title: "Laabii Viirtuwaalii",
    subtitle: "Moodeelota 3D Wal-qunnamtii",
    overview: "Ilaalcha Waliigalaa",
    subjectResources: "Qabeenya Mata-duree",
    subjectResourcesBody:
      "Moodeelota laabii viirtuwaalii kallattiin ilaaluuf mata-duree filadhu.",
    subjects: "Mata-duree",
    grade: "Kutaa",
    selectSubject: "Mata-duree Filadhu",
    loadingResources: "Qabeenya laabii viirtuwaalii fe'amaa jira...",
    noModels: "Mata-duree kanaaf moodeeliin 3D hin jiru",
    tryAnother: "Mata-duree biraa yaali",
    virtualModel: "Moodeela Viirtuwaalii",
    chapter: "Boqonnaa",
    interactiveLesson: "Barnoota wal-qunnamtii",
    missingUrl: "Moodeela kanaaf URL qabeenyaa hin jiru.",
    openInNewTab: "Tab haaraa keessatti bani",
    backToList: "Gara tarree deebi’i",
    loadError: "Qabeenya laabii viirtuwaalii fe'uun hin danda’amne.",
  },
};

const SUBJECTS = ["Mathematics", "Biology", "Chemistry", "Physics"];
const SELECTED_GRADE = 9;

const LabStat = ({ label, value, Icon }) => (
  <div className="border border-gray-200 bg-white p-4 flex flex-col items-center justify-center text-center">
    <Icon className="h-5 w-5 text-[#0056D2] mb-2" />
    <p className="text-xl font-bold text-gray-900">{value}</p>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
      {label}
    </p>
  </div>
);

const Lab = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = LAB_TEXT[language] || LAB_TEXT.en;
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendSubject = useMemo(() => {
    const normalized = selectedSubject.toLowerCase();
    return normalized === "mathematics" ? "math" : normalized;
  }, [selectedSubject]);

  useEffect(() => {
    let active = true;

    const loadResources = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchVirtualLabResources({
          subject: backendSubject,
          grade: SELECTED_GRADE,
          interactionType: "CANVAS",
        });

        if (!active) return;

        const fetchedResources = Array.isArray(response?.resources)
          ? response.resources
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setResources(fetchedResources);
      } catch (fetchError) {
        if (!active) return;

        setError(fetchError.message || text.loadError);
        setResources([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadResources();

    return () => {
      active = false;
    };
  }, [backendSubject, text.loadError]);

  useEffect(() => {
    setSelectedResource(null);
  }, [selectedSubject]);

  return (
    <div className="h-screen flex flex-col bg-white font-sans overflow-hidden">
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
              <FlaskConical size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">
                {text.title}
              </h1>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tighter">
                {text.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-5 space-y-6">
        {!selectedResource ? (
          <>
            <div className="border border-gray-200 bg-white">
              <div className="bg-[#0056D2] px-4 py-2 flex items-center gap-2">
                <Layers size={14} className="text-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                  {text.overview}
                </span>
              </div>
              <div className="p-5 flex justify-between items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {text.subjectResources}
                  </h2>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-md">
                    {text.subjectResourcesBody}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <LabStat
                    label={text.subjects}
                    value={SUBJECTS.length}
                    Icon={Layers}
                  />
                  <LabStat
                    label={text.grade}
                    value={`${text.grade} ${SELECTED_GRADE}`}
                    Icon={FlaskConical}
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 bg-white">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-2">
                  {text.selectSubject}
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubject(sub);
                      }}
                      className={`px-4 py-1.5 text-sm font-semibold border transition-colors ${
                        selectedSubject === sub
                          ? "bg-[#0056D2] text-white border-[#0056D2]"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 space-y-4">
                {loading ? (
                  <div className="border border-dashed border-gray-300 py-10 flex flex-col items-center justify-center text-center">
                    <LoaderCircle
                      size={18}
                      className="text-gray-400 mb-3 animate-spin"
                    />
                    <p className="text-sm font-bold text-gray-800 italic">
                      {text.loadingResources}
                    </p>
                  </div>
                ) : error ? (
                  <div className="border border-red-200 bg-red-50 py-8 px-4 text-center">
                    <p className="text-sm font-semibold text-red-700">
                      {error}
                    </p>
                  </div>
                ) : resources.length === 0 ? (
                  <div className="border border-dashed border-gray-300 py-10 flex flex-col items-center justify-center text-center">
                    <Search size={18} className="text-gray-400 mb-3" />
                    <p className="text-sm font-bold text-gray-800 italic">
                      {text.noModels}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">
                      {text.tryAnother}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {resources.map((resource) => (
                      <button
                        key={
                          resource.id || resource._id || resource.resource_url
                        }
                        onClick={() => setSelectedResource(resource)}
                        className="flex items-center gap-3 p-4 border border-gray-200 hover:border-[#0056D2] hover:shadow-sm transition-colors group text-left"
                      >
                        <ExternalLink
                          size={20}
                          className="text-[#0056D2] group-hover:text-[#0045b0]"
                        />
                        <div className="text-left min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {resource.title ||
                              resource.topic ||
                              text.virtualModel}
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1 truncate">
                            {resource.chapter || text.chapter}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-[#0056D2] text-white px-4 py-3">
              <h2 className="text-lg font-bold">
                {selectedResource.title ||
                  selectedResource.topic ||
                  text.virtualModel}
              </h2>
              <button onClick={() => setSelectedResource(null)} className="p-1">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 bg-white border border-gray-200 p-4 flex flex-col">
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-medium">
                  {selectedResource.chapter || text.chapter}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {selectedResource.topic || text.interactiveLesson}
                </p>
              </div>

              {selectedResource.url || selectedResource.resource_url ? (
                <iframe
                  src={selectedResource.url || selectedResource.resource_url}
                  title={selectedResource.title || text.virtualModel}
                  className="w-full flex-1 border border-gray-200"
                  allow="fullscreen"
                />
              ) : (
                <div className="flex-1 border border-dashed border-gray-300 p-4 text-center text-gray-500 text-sm flex items-center justify-center">
                  {text.missingUrl}
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                {(selectedResource.url || selectedResource.resource_url) && (
                  <a
                    href={selectedResource.url || selectedResource.resource_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0056D2] text-white text-sm font-semibold hover:bg-[#0045b0]"
                  >
                    {text.openInNewTab} <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => setSelectedResource(null)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {text.backToList}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lab;
