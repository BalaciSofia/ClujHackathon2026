import { Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/button";
import { CustomDropdown } from "../components/ui/CustomDropdown";

export function Header({
  theme,
  toggleTheme,
  student,
  setStudent,
  faculties,
}) {
  return (
    <header
      className="bg-bg/85 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200"
      role="banner"
    >
      {/* Row 1: Brand + Theme toggle */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm font-bold tracking-tight text-text-h">
          peViitor.ro
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-7 w-7 rounded-lg text-text hover:text-text-h hover:bg-border/40 border-0 flex items-center justify-center"
          aria-label={theme === "light" ? "Dark mode" : "Light mode"}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Row 2: Faculty dropdown */}
      <div className="border-t border-border/60 px-3 py-2">
        <CustomDropdown
          value={student.faculty}
          onChange={(val) => setStudent({ ...student, faculty: val })}
          options={faculties}
          ariaLabel="Selectează facultatea ta"
        />
      </div>
    </header>
  );
}

