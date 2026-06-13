import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskCard from "../components/TaskCard";

type Props = {
  logout: () => Promise<void>;
};

export default function DashboardScreen({
  logout
}: Props) {
  const [filters, setFilters] = useState({});

  const {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask
  } = useTasks(filters);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header logout={logout} />

      <div className="max-w-3xl mx-auto p-4 space-y-6">

        {/* FORM + FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskForm onCreate={createTask} />

          <TaskFilter
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* TASK GRID */}
        {isLoading ? (
          <div>Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
