import React, { FormEvent, useState } from "react";
import { TaskModel, TaskInput       } from "../../models/task";


interface EditTaskProps {
  setIsEditingTask: (value: boolean) => void;
  setTasks        : React.Dispatch<React.SetStateAction<TaskModel[]>>;
  task            : TaskModel;
}

const EditTask: React.FC<EditTaskProps> = ({
  setIsEditingTask,
  setTasks,
  task,
}) => {
  const [body, setBody] = useState<TaskInput>(task);
  
  const inputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBody({ ...body, [target.name]: target.value });
  };
  const editTask = (event: FormEvent) => {
    event.preventDefault();

    TaskModel.update(task.id, body).then((task) => {
      setTasks((tasks) => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index] = task;
        return [...tasks];
      });

      setIsEditingTask(false);
    });
  };
  
  return (
    <>
      <div
        className={`min-h-screen bg-black bg-opacity-30 flex justify-center items-center fixed w-screen z-50 left-0 top-0 px-2`}
      >
        <div
          className="absolute left-0 top-0 right-0 bottom-0"
          onClick={() => setIsEditingTask(false)}
        ></div>
        <form
          onSubmit={editTask}
          className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 w-full md:w-max relative"
        >
          <div>
            <h1 className="text-3xl font-normal text-center mb-4 cursor-pointer">
              Edit Task
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-3">Task Title</label>
              <input
                name="title"
                defaultValue={task.title}
                type="text"
                placeholder="Task Title"
                onChange={inputChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div>
              <label className="text-sm mb-3">Deadline</label>
              <input
                name="deadline"
                defaultValue={task.deadline.format("YYYY-MM-DDTHH:mm")}
                type="datetime-local"
                placeholder="Deadline"
                onChange={inputChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div>
              <label className="text-sm mb-3">Task Description</label>
              <textarea
                name="description"
                placeholder="Task Description"
                onChange={inputChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                defaultValue={task.description}
              ></textarea>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
              Save Task
            </button>
            <p className="mt-4 text-sm">
              <span
                onClick={() => setIsEditingTask(false)}
                className="underline cursor-pointer"
              >
                Cancel
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTask;
