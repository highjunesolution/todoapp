import { Plus } from "lucide-react";
import TodoCard from "./components/TodoCard";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getTodos } from "./api/api";

const App = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodos()
      .then((value) => setTodo(value.data.result))
      .catch((err) => console.log(err?.response?.data));
  }, []);

  useEffect(() => {
    console.log(todo);
  }, [todo]);
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col gap-y-4">
          <button
            className="bg-sky-100 ms-auto px-4 py-2 rounded-2xl cursor-pointer"
            onClick={() =>
              setTodo((prev) => [
                {
                  tempId: crypto.randomUUID(),
                  createdAt: new Date(),
                },
                ...prev,
              ])
            }
          >
            <Plus className="text-sky-600" />
          </button>
          <div className="grid grid-cols-12 gap-8">
            {todo.length &&
              todo.map((item) => (
                <TodoCard
                  key={item.id ?? item.tempId}
                  data={item}
                  onUpdate={setTodo}
                />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default App;
