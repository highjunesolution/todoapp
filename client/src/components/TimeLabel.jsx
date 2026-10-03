import { Calendar } from "lucide-react";
import { formatDateTime, formatDateTimeFromNow } from "../utils/moment";

export const CreatedAtLabel = ({ dt }) => {
  return (
    <p className="text-[0.6rem] md:text-xs lg:text-sm text-slate-400 flex items-center gap-2">
      <span className="inline-block w-4 h-4">
        <Calendar className="h-full w-full" />
      </span>
      Created
      <span>{formatDateTime(dt)}</span>
    </p>
  );
};

export const UpdatedAtLabel = ({ dt }) => {
  return (
    <p className="text-[0.6rem] md:text-xs lg:text-sm text-slate-400 flex items-center gap-2">
      <span className="inline-block w-1 h-1 bg-slate-400 rounded-full"></span>
      Updated
      <span>{formatDateTimeFromNow(dt)}</span>
    </p>
  );
};
