import { FormEvent, useState } from "react";
import { Task } from "../../../interfaces/task";
import useAuthFetch from "../../../utils/authFetchHook";

const EditTask = ({
  setIsEditingTask,
  title,
  setTasks,
  tasks,
  deadline,
  description,
  isWorking,
  reportId,
  id,
}: any) => {
  const [body, setBody] = useState<Task>({
    title,
    deadline,
    description,
    isWorking,
    reportId
  });
  const authFetch = useAuthFetch();

  const taskDeadline = new Date(
    new Date(deadline.length ? deadline : new Date())
      .toString()
      .replace(/GMT.*/, "UTC")
  )
    .toISOString()
    .match(/.+T\d{2}:\d{2}/);

  const inputChange = ({ target }: any) => {
    setBody({ ...body, [target.name]: target.value });
  };
  const editTask = (event: FormEvent) => {
    event.preventDefault();

    authFetch
      .put("/tasks/" + id, body)
      .then(() => {
        setTasks(
          tasks?.map((task: Task) =>
            task.id == id ? { ...task, ...body } : task
          )
        );
        setIsEditingTask(false);
      })
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
                defaultValue={title}
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
                defaultValue={taskDeadline ? taskDeadline[0] : ""}
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
                defaultValue={description}
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
