import { useRef, useEffect, useCallback } from "react";
import { JobCard } from "../components/ui/JobCard";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";

export function JobsPage({ filteredJobs, onApply }) {
  const cardRefs = useRef([]);
  const listRef = useRef(null);

  const updateHeight = useCallback(() => {
    if (!listRef.current) return;
    const heights = cardRefs.current
      .filter(Boolean)
      .map((el) => el.offsetHeight);
    if (heights.length === 0) return;
    const maxH = Math.max(...heights);
    listRef.current.style.maxHeight = `${maxH}px`;
  }, []);

  // Observe all card elements and keep maxHeight equal to the tallest one
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredJobs.length);
    const observer = new ResizeObserver(updateHeight);
    cardRefs.current.filter(Boolean).forEach((el) => observer.observe(el));
    updateHeight();
    return () => observer.disconnect();
  }, [filteredJobs, updateHeight]);

  return (
    <div className="flex flex-col gap-3">
      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="border border-dashed border-border rounded-2xl p-8 text-center bg-code-bg/30">
          <Search className="w-8 h-8 text-text/40 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-text-h m-0">
            Nicio ofertă găsită
          </h3>
          <p className="text-xs text-text mt-1 leading-relaxed">
            Nu există oferte disponibile în acest moment.
          </p>
        </div>
      ) : (
        <div
          ref={listRef}
          className="flex flex-col gap-3 overflow-y-auto snap-y snap-mandatory"
        >
          {filteredJobs.map((job, idx) => (
            <div
              key={job.id}
              ref={(el) => { cardRefs.current[idx] = el; }}
              className="snap-start shrink-0"
            >
              <JobCard job={job} onApply={onApply} />
            </div>
          ))}
        </div>
      )}

      {/* Button: Mai multe peViitor */}
      <Button
        variant="outline"
        className="w-full py-2.5 mt-1 border-indigo-600/30 hover:border-indigo-600/60 text-indigo-600 dark:text-indigo-400 font-bold"
        onClick={() => window.open("https://peviitor.ro/", "_blank", "noopener,noreferrer")}
      >
        Mai multe peViitor
      </Button>
    </div>
  );
}
