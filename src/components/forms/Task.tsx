import React, { FormEvent, useState } from "react";
import { TaskInput, TaskModel       } from "../../models/task";


interface AddTaskProps {
  name?          : string;
  task?          : TaskModel;
  setTasks?      : React.Dispatch<React.SetStateAction<TaskModel[]>>;
  unmount        : () => void;
  submit         : (body: TaskInput) => void;
}

const Task: React.FC<AddTaskProps> = ({ 
  name,
  task,
  setTasks,
  unmount,
  submit,
}) => {
  const [body, setBody] = useState<TaskInput>({ ...task } as TaskInput);

  const inputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBody({ ...body, [target.name]: target.value });
  };

	return (
    <>
      <div
        className={`h-screen bg-black bg-opacity-30 flex justify-center items-center fixed w-screen left-0 top-0 px-2`}
      >
        <div
          className="absolute left-0 top-0 right-0 bottom-0"
          onClick={unmount}
        ></div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(body);
          }}

          className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 w-full md:w-max relative"
        >
          <div>
            <h1 className="text-3xl text-center mb-4 cursor-pointer">
              {name ? "Give task to " + name : "Create A Task"}
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-3">Task Title</label>
              <input
                name="title"
                type="text"
                required
                placeholder="Task Title"
                onChange={inputChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div>
              <label className="text-sm mb-3">Deadline</label>
              <input
                name="deadline"
                type="datetime-local"
                required
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
              ></textarea>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
              Add Task
            </button>
            <p className="mt-4 text-sm">
              <span
                onClick={unmount}
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

export default Task;