import { CircleCheck, CircleDashed, FileText } from "lucide-react";

const SummaryCard = ({data}) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-4.5">
      <div className="bg-slate-700 border border-slate-500 px-2 py-2.5 md:px-6 md:py-4 rounded-xl flex items-center gap-2 lg:gap-30">

        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <FileText className="bg-blue-600/30 text-blue-300 w-10 md:w-16 h-10 md:h-16 p-2 md:p-3.5 rounded-xl" />
          <div className="flex items-center md:items-baseline gap-2 md:gap-0 md:flex-col">
            <p className="text-white/70 text-xs md:text-xl">Total</p>
            <h4 className="text-white font-bold text-xs md:text-2xl">{data?.length ?? 0}</h4>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-6 items-center border-l border-slate-600 ps-6">
          <CircleDashed className="bg-orange-400/20 text-orange-300 w-10 md:w-16 h-10 md:h-16 p-2 md:p-3.5 rounded-xl" />
          <div className="flex items-center md:items-baseline gap-2 md:gap-0 md:flex-col">
            <p className="text-white/70 text-xs md:text-xl">In Progress</p>
            <h4 className="text-white font-bold text-xs md:text-2xl">{data?.filter(item=> !item.isCompleted).length ?? 0}</h4>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-6 items-center border-l border-slate-600 ps-6">
          <CircleCheck className="bg-green-500/30 text-green-300 w-10 md:w-16 h-10 md:h-16 p-2 md:p-3.5 rounded-xl" />
          <div className="flex items-center md:items-baseline gap-2 md:gap-0 md:flex-col">
            <p className="text-white/70 text-xs md:text-xl">Total</p>
            <h4 className="text-white font-bold text-xs md:text-2xl">{data?.filter(item=> item.isCompleted).length ?? 0}</h4>
          </div>
        </div>

      </div>
    </div>
  );
};
export default SummaryCard;
