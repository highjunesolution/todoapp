import TodoCard from "./components/TodoCard";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getTodos } from "./api/api";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";

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
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header setTodo={setTodo}/>
        <SummaryCard data={todo}/>
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-4 flex flex-col gap-y-4">
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
