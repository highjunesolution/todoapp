import { Check, ChevronDown, Plus, Search } from "lucide-react";

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-4 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <div className="bg-blue-500 p-3.5 rounded-2xl text-white">
          <Check strokeWidth={6} />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-white text-4xl font-bold">My Tasks</h4>
          <p className="text-white/60 text-sm">Stay focused. Make progress</p>
        </div>
      </div>
      <div className="flex items-center gap-4 h-10">
        <div className="relative hidden md:block">
          <input
            type="text"
            className="bg-slate-700 border placeholder:text-slate-400 border-slate-500 pl-10 px-4.5 py-2 rounded-xl hidden md:block outline-0 text-white"
            placeholder="Search task..."
          />
          <Search className="text-slate-400 absolute top-2 left-2 w-4.5"/>
        </div>
        <div className="w-40 relative hidden md:block">
          <select
            name=""
            id=""
            className="bg-slate-700 border text-slate-200 border-slate-500 w-full h-full px-6 py-2 rounded-xl appearance-none outline-0"
          >
            <option value="">All tasks</option>
            <option value={0}>In progress</option>
            <option value={1}>Completed</option>
          </select>
          <ChevronDown className="text-slate-200 absolute top-2 right-4" />
        </div>
        <button className="bg-linear-to-r from-blue-500 to-blue-700 py-2 px-6 rounded-xl flex text-white">
          <Plus /> New task
        </button>
      </div>
    </div>
  );
};
export default Header;
