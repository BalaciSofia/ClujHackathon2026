import { CustomDropdown } from "../components/ui/CustomDropdown";
import { Checkbox } from "../components/ui/checkbox";

export function Sidebar({
  filterByProfile,
  setFilterByProfile,
  student,
  setStudent,
  faculties,
}) {
  return (
    <aside className="lg:col-span-1 space-y-6 text-left">
      <div className="bg-code-bg/40 border border-border p-5 rounded-2xl space-y-5 sticky top-24">
        <h2 className="text-sm font-bold text-text-h uppercase tracking-wider m-0">
          Filtrează Joburile
        </h2>

        {/* Faculty Dropdown */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-text mb-1.5">
            Facultate
          </span>
          <CustomDropdown
            value={student.faculty}
            onChange={(val) => setStudent({ ...student, faculty: val })}
            options={faculties}
            ariaLabel="Selectează facultatea ta"
          />
        </div>

        {/* Faculty auto-match checkbox */}
        <div className="pt-4 border-t border-border/60">
          <div className="flex items-center gap-3">
            <Checkbox
              id="profile-match-checkbox"
              checked={filterByProfile}
              onCheckedChange={setFilterByProfile}
            />
            <label
              htmlFor="profile-match-checkbox"
              className="text-xs font-bold text-text-h cursor-pointer select-none"
            >
              Filtru facultate
            </label>
          </div>
          <p className="text-[11px] text-text mt-2 leading-relaxed">
            Afișează exclusiv ofertele recomandate pentru facultatea selectată.
          </p>
        </div>
      </div>
    </aside>
  );
}
