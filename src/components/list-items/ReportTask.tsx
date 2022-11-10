import React, { useState } from "react";
import { ReportModel     } from "../../models/report";
import { TaskModel       } from "../../models/task";

interface TaskProps {
  task: TaskModel;
  addTask: TaskModel;
  setReports: React.Dispatch<React.SetStateAction<ReportModel[]>>;
  isAdding: boolean;
}

const Task: React.FC<TaskProps> = ({
  task,
  addTask,
  setReports,
  isAdding,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData({ ...editData, [target.name]: target.value });
  };

  const editTask = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      TaskModel.update(task.id, editData)
    }
  };

  const deleteTask = () => {
    if (window.confirm("Are you sure to delete task from report?")) {
      ReportModel.delete(task.id).then(() => {
        setReports(reports => reports.filter(({ id }) => id !== task.id));
      });
    }
  };

  return (
    <div className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-full">
          {isEditing ? (
            <>
              <div className="text-sm leading-5 mb-2 text-indigo-500">
                <input
                  name="taskStart"
                  onChange={changeHandler}
                  className="text-sm bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                  type="time"
                  defaultValue={new Date(task.taskStart ?? "").format("hh:ii")}
                />
                〜
                <input
                  name="taskEnd"
                  onChange={changeHandler}
                  className="text-sm bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                  type="time"
                  defaultValue={new Date(task.taskEnd ?? "").format("hh:ii")}
                />
              </div>
              <input
                name="title"
                onChange={changeHandler}
                className="text-sm leading-5 mb-2 font-medium text-gray-900 block w-full bg-gray-50 px-1 py-2 rounded ring-1 outline-none border-0 focus:ring-indigo-500 ring-gray-200"
                defaultValue={task.title}
              />
              <textarea
                name="description"
                onChange={changeHandler}
                className="text-sm leading-5 mb-2 text-gray-500 block w-full bg-gray-50 px-1 py-2 rounded ring-1 border-0 focus:ring-indigo-500 ring-gray-200"
                defaultValue={task.description}
              />
            </>
          ) : (
            <>
              <div className="text-sm leading-5 mb-2 text-indigo-500">
                {new Date(task.taskStart ?? "").format("hh:ii")} 〜{" "}
                {new Date(task.taskEnd ?? "").format("hh:ii")}
              </div>
              <h3 className="text-sm leading-5 mb-2 font-medium text-gray-900">
                {task.title}
              </h3>
              <p className="text-sm leading-5 mb-2 text-gray-500 whitespace-pre-line">
                {task.description}
              </p>
            </>
          )}
          <div>
            <button
              className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-yellow-500 hover:bg-yellow-600 mr-1 text-white cursor-pointer"
              onClick={editTask}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
            <button
              className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              onClick={deleteTask}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
