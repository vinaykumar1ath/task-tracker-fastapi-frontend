import { useState } from "react";
import { Task, TaskUpdate } from "../types/api";

type Props = {
  task: Task;
  onUpdate: (data: { id: number; data: TaskUpdate }) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({
  task,
  onUpdate,
  onDelete
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onUpdate({
      id: task.id!,
      data: {
        title,
        description
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-3 rounded shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-600"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-bold">{task.title}</h3>

          <p className="text-sm text-gray-600">
            {task.description}
          </p>

          <p className="text-xs mt-1">
            Status: {task.done ? "Done" : "Pending"}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                onUpdate({
                  id: task.id!,
                  data: { done: !task.done }
                })
              }
              className="text-blue-600"
            >
              Toggle
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id!)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
