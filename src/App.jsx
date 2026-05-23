import { useState, useEffect } from "react";
import { getJobs } from "./services/api";
import { Header } from "./layout/Header";
import { JobsPage } from "./pages/JobsPage";
import { DEFAULT_STUDENT, ALL_FACULTIES_OPTION } from "./utils/constants";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ubb-theme") || "light";
  });

  const [student, setStudent] = useState(DEFAULT_STUDENT);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    let active = true;
    getJobs().then((data) => {
      if (active) {
        setJobs(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const faculties = [
    ALL_FACULTIES_OPTION,
    ...new Set(jobs.flatMap((job) => job.f_tag || [])),
  ];

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ubb-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleApplyStart = (job) => {
    const applyUrl = job._root_ || job.url;
    if (applyUrl) {
      window.open(applyUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    if (student.faculty !== ALL_FACULTIES_OPTION) {
      const tags = job.f_tag || [];
      if (!tags.includes(student.faculty)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div
      className="bg-bg text-text transition-colors duration-200 flex flex-col"
      style={{ maxWidth: "300px", width: "100%" }}
    >
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        student={student}
        setStudent={setStudent}
        faculties={faculties}
      />

      <main className="flex-1 p-3" id="main-content">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-xs text-text/60 font-semibold gap-2">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Se încarcă joburile...</span>
          </div>
        ) : (
          <JobsPage
            filteredJobs={filteredJobs}
            totalJobsCount={jobs.length}
            onResetFilter={() =>
              setStudent({ ...student, faculty: ALL_FACULTIES_OPTION })
            }
            onApply={handleApplyStart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
