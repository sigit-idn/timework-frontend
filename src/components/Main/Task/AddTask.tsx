import { FormEvent, useContext, useState } from "react";
import { TaskContext } from "../../../config/contexts";
import { Task } from "../../../interfaces/task";
import useAuthFetch from "../../../utils/authFetchHook";

const AddTask = ({ setIsAddingTask, userId, name }: any) => {
  const [body, setBody] = useState<Task>({
    employeeId: userId,
  } as Task);
  const authFetch = useAuthFetch();
  const { tasks, setTasks } = useContext(TaskContext);

  const inputChange = ({ target }: any) => {
    setBody({ ...body, [target.name]: target.value });
  };
  const addTask = (event: FormEvent) => {
    event.preventDefault();
    authFetch
      .post(`/tasks`, body)
      .then(() => {
        setTasks([...tasks, body]);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddingTask(false);
      });
  };

  return (
    <>
      <div
        className={`min-h-screen bg-black bg-opacity-30 flex justify-center items-center fixed w-screen left-0 top-0 px-2`}
      >
        <div
          className="absolute left-0 top-0 right-0 bottom-0"
          onClick={() => setIsAddingTask(false)}
        ></div>
        <form
          onSubmit={addTask}
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
                onClick={() => setIsAddingTask(false)}
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

export default AddTask;
