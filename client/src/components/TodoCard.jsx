import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoBodySchema } from "../utils/schema";
import { createTodo, removeTodo, updateTodo } from "../api/api";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import StatusTodo from "./StatusTodo";
import { CreatedAtLabel, UpdatedAtLabel } from "./TimeLabel";

const TodoCard = ({ data, onUpdate }) => {
  const debounceRef = useRef(null);

  const {
    // formState: { errors, isSubmitting },
    formState: { errors },
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
        prev.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)),
      );
      if (value.isCompleted) {
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

  const handleFormChange = (event) => {
    const form = event.currentTarget;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      form.requestSubmit();
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);
  return (
    <form
      onChange={handleFormChange}
      onSubmit={handleSubmit(data?.id ? hdlUpdate : hdlAdd)}
      className="col-span-12 lg:col-span-6 relative overflow-hidden bg-white rounded-2xl px-6 py-6 flex flex-col gap-4"
      id="form-todo"
    >
      <div className="flex justify-between items-center gap-x-4">
        <div className="relative h-6 w-6">
          <input
            type="checkbox"
            {...register("isCompleted")}
            className="peer h-6 w-6 appearance-none rounded-md
               border-2 border-slate-300 cursor-pointer
               checked:bg-blue-500 checked:border-blue-500"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2
               -translate-x-1/2 -translate-y-1/2
               h-5 w-5 text-white invisible peer-checked:visible"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>
        <input
          type="text"
          className={`
            flex-1 border text-md outline-0 p-2 rounded-xl border-slate-300 font-semibold 
            focus:shadow-2xl focus:shadow-blue-300 focus:ring focus:ring-sky-500 ${errors["title"] && "focus:bg-red-100"}
            ${data?.id ? "text-black bg-slate-100" : "text-sky-600"}
          `}
          maxLength={20}
          placeholder="title"
          name="title"
          {...register("title")}
        />
        <StatusTodo status={data?.isCompleted}/>
        <button
          type="button"
          className="cursor-pointer hover:bg-slate-100 p-1.5 rounded-md text-slate-400"
          onClick={() =>
            data?.id
              ? hdlRemove(data.id, data.title)
              : hdlRemoveTemp(data.tempId)
          }
        >
          <Trash />
        </button>
      </div>
      <textarea
        className={`
          border h-40 border-slate-300 rounded-xl 
          p-4 outline-0 text-sm text-slate-600
          ${data?.id && "bg-slate-100" }
          `}
        placeholder="tell more anything..."
        maxLength={500}
        name="description"
        {...register("description")}
      ></textarea>
      <div className="flex gap-6 items-center">
        <CreatedAtLabel dt={data.createdAt}/>
        <UpdatedAtLabel dt={data?.updatedAt}/>
      </div>

      {/* {isSubmitting && (
        <div className="absolute bg-slate-100/40 inset-0 flex items-center justify-center">
          <RotateCw size={70} className="animate-spin" />
        </div>
      )} */}
    </form>
  );
};
export default TodoCard;
