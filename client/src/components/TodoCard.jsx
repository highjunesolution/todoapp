import { Flag, RotateCw, X } from "lucide-react";
import { formatDateTime } from "../utils/moment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoBodySchema } from "../utils/schema";
import { createTodo, removeTodo, updateTodo } from "../api/api";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const TodoCard = ({ data, onUpdate }) => {
  const debounceRef = useRef(null)

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(todoBodySchema),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      isCompleted: data?.isCompleted ?? false,
    },
  });

  const hdlAdd = async (value) => {
    try {
      const res = await createTodo(value);
      onUpdate((prev) =>
        prev.map((item) =>
          item.tempId === data.tempId ? res.data.result : item,
        ),
      );
      // toast.success(`${value.title} is created`);
    } catch (error) {
      console.log(error?.response?.data?.message || "Network error");
    }
  };

  const hdlUpdate = async (value) => {
    try {
      const res = await updateTodo(data.id, value);
      const updatedTodo = res.data.result;
      onUpdate((prev) =>
        prev.map((item) =>
          item.id === updatedTodo.id ? updatedTodo : item,
        ),
      );
      if(value.isCompleted) {
        toast.success(`${value.title} good job!`);
      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.warning(
        error?.response?.data?.message ||
          "Something went wrong please try again",
      );
    }
  };

  const hdlRemove = async (id, title) => {
    try {
      await removeTodo(id);
      toast.info(`${title} removed!`);
      onUpdate((value) => value.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const hdlRemoveTemp = (tempId) => {
    onUpdate((value) => value.filter((item) => item.tempId !== tempId));
  };

  const handleFormChange = (event)=> {
    const form = event.currentTarget;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(()=>{
      form.requestSubmit();
    }, 5000)
  }

  useEffect(()=>{
    return ()=> clearTimeout(debounceRef.current);
  }, [])
  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleSubmit(data?.id ? hdlUpdate : hdlAdd)}
      className="col-span-12 md:col-span-6 relative overflow-hidden bg-white rounded-2xl px-6 py-6 flex flex-col gap-4"
      id="form-todo"
    >
      <div className="flex justify-between gap-x-2">
        <input
          type="text"
          className={`flex-1 border text-md outline-0 p-2 rounded-xl border-slate-100 text-sky-400 font-semibold focus:shadow-2xl focus:shadow-blue-300 focus:ring focus:ring-sky-500 ${errors["title"] && "focus:bg-red-100"}`}
          maxLength={20}
          placeholder="title"
          name="title"
          {...register("title")}
        />
        <button
          type="button"
          className="cursor-pointer hover:bg-slate-100 p-1.5 rounded-md text-slate-400"
          onClick={() =>
            data?.id
              ? hdlRemove(data.id, data.title)
              : hdlRemoveTemp(data.tempId)
          }
        >
          <X />
        </button>
      </div>
      <textarea
        className="border h-40 border-slate-200 rounded-xl p-4 outline-0 text-sm focus:shadow-2xl focus:border-slate-100 text-slate-600"
        placeholder="tell more anything..."
        maxLength={500}
        name="description"
        {...register("description")}
      ></textarea>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            name="isCompleted"
            {...register("isCompleted")}
          />
          <span className=" text-blue-400">
            <Flag size={18} />
          </span>
        </div>
        <p className="text-sm text-slate-400">
          {formatDateTime(data?.updatedAt ? data.updatedAt : data?.createdAt)}
        </p>
      </div>

      {isSubmitting && (
        <div className="absolute bg-slate-100/40 inset-0 flex items-center justify-center">
          <RotateCw size={70} className="animate-spin" />
        </div>
      )}
    </form>
  );
};
export default TodoCard;
