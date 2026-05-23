import { MapPin, Coins } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

export function JobCard({ job, onApply }) {
  return (
    <Card
      className="relative flex flex-col justify-between overflow-hidden hover:border-text/30 hover:shadow-sm"
      style={{ maxWidth: "280px", width: "100%" }}
    >
      <CardHeader className="p-4 pb-0 flex flex-col space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-3 items-center">
            <div
              className={`h-10 w-10 rounded-xl bg-gradient-to-br ${job.logoBg} flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0`}
              aria-hidden="true"
            >
              {job.company.split(" ")[0].substring(0, 2).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-xs font-bold text-text-h m-0 text-left leading-snug">
                {job.title}
              </CardTitle>
              <p className="text-[11px] font-semibold text-text text-left mt-0.5">
                {job.company}
              </p>
            </div>
          </div>
        </div>

        {/* Salary, Location */}
        {/* <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[11px] font-medium text-text">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-text/70 shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Coins className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
            {job.salary}
          </span>
        </div> */}
      </CardHeader>

      <CardContent className="p-4 pt-3 flex-1 flex flex-col justify-between">
        {/* Tags */}
        <div
          className="flex flex-wrap gap-1"
          aria-label="Tehnologii și competențe"
        >
          {(job.tags.length > 2
            ? [...job.tags.slice(0, 2), "..."]
            : job.tags
          ).map((tag, idx) => (
            <Badge key={`${tag}-${idx}`} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pb-0 px-0 pt-0 flex items-center">
        <Button
          onClick={() => onApply(job)}
          className="w-full text-xs rounded-none"
          aria-label={`Aplică la jobul ${job.title} de la ${job.company}`}
        >
          Aplică
        </Button>
      </CardFooter>
    </Card>
  );
}
