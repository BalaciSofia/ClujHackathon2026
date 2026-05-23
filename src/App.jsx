import { useState, useEffect } from "react";
import { getJobs } from "./services/api";
import { Header } from "./layout/Header";
import { JobsPage } from "./pages/JobsPage";
import { FACULTIES, DEFAULT_STUDENT, ALL_FACULTIES_OPTION } from "./utils/constants";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ubb-theme") || "light";
  });

  const [student, setStudent] = useState(DEFAULT_STUDENT);

  const [filterByProfile] = useState(true);
  const [jobs] = useState(() => getJobs());

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
    window.open(
      `https://peviitor.ro/rezultate?q=${encodeURIComponent(job.title)}&country=Rom%C3%A2nia`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Filter logic - show all when 'Toate' is selected, otherwise filter by faculty
  const filteredJobs = jobs.filter((job) => {
    if (student.faculty !== ALL_FACULTIES_OPTION && job.faculty !== student.faculty) {
      return false;
    }
    return true;
  });

  return (
    <div
      className="bg-bg text-text transition-colors duration-200 flex flex-col"
      style={{ maxWidth: "300px", width: "100%", minHeight: "100vh" }}
    >
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        student={student}
        setStudent={setStudent}
        faculties={FACULTIES}
      />

      <main className="flex-1 p-3" id="main-content">
        <JobsPage
          filteredJobs={filteredJobs}
          onApply={handleApplyStart}
        />
      </main>
    </div>
  );
}


export default App;
