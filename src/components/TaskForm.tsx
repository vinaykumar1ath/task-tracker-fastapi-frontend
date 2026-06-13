import { useState } from "react";
import { TaskCreate } from "../types/api";

type Props = {
  onCreate: (task: TaskCreate) => void;
};

export default function TaskForm({
  onCreate
}: Props) {
  const [title, setTitle] =
    useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onCreate({
      title,
      description
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-2"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
