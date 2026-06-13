import { TaskFilters } from "../types/api";

type Props = {
  filters: TaskFilters;
  setFilters: (f: TaskFilters) => void;
};

export default function TaskFilter({
  filters,
  setFilters
}: Props) {
  return (
    <div className="bg-white p-3 rounded shadow space-y-2">
      <input
        className="w-full p-2 border rounded"
        placeholder="Title filter"
        value={filters.title || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            title: e.target.value
          })
        }
      />

      <select
        className="w-full p-2 border rounded"
        value={
          filters.done === undefined
            ? ""
            : String(filters.done)
        }
        onChange={(e) =>
          setFilters({
            ...filters,
            done:
              e.target.value === ""
                ? undefined
                : e.target.value ===
                  "true"
          })
        }
      >
        <option value="">All</option>
        <option value="true">Done</option>
        <option value="false">
          Pending
        </option>
      </select>
    </div>
  );
}
