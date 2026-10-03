import { Check, CircleDashed } from "lucide-react";

const StatusTodo = ({ status }) => {
  return (
    <div className={`px-2.5 rounded-xl py-1.5 text-xs lg:text-sm font-semibold flex gap-1.5 items-center ${status ? "text-green-600 bg-green-200/20" : "text-orange-600 bg-orange-200/20"}`}>
      <span className={`inline-block w-6 h-6 p-1 rounded-xl`}>
        {status ? <Check className="w-full h-full" /> : <CircleDashed className="w-full h-full" />}
      </span>
      <p className="hidden sm:block">{status ? "Completed" : "In progress"}</p>
    </div>
  );
};
export default StatusTodo;
