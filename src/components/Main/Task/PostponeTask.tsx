import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthFetch from "../../../utils/authFetchHook";

const PostponeTask = ({
  setIsPostponingTask,
  title,
  setTasks,
  description,
}: any) => {
  const authFetch = useAuthFetch();
  const [body, setBody] = useState({
    title,
    description,
    task_start: localStorage.getItem("task_start"),
    task_end: new Date(),
  });

  const [progress, setProgress] = useState("50");
  const redirect = useNavigate();

  const inputChange = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBody({ ...body, [target.name]: target.value });
  };

  useEffect(
    () =>
      setBody({
        ...body,
        title: body.title.replace(/\s*\(\d{1,3}%\)/, "") + ` (${progress}%)`,
      }),
    [progress]
  );

  const postponeTask = (event: any) => {
    event.preventDefault();
    authFetch
      .post("/reports/task", body)
      .then((res: any) => setIsPostponingTask(false) & setTasks(res.data.tasks))
      .catch((url) => redirect(url));
  };

  return (
    <>
      <div
        className={`min-h-screen bg-black bg-opacity-30 flex justify-center items-center fixed w-screen z-50 left-0 top-0 px-2`}
      >
        <div
          className="absolute left-0 top-0 right-0 bottom-0"
          onClick={() => setIsPostponingTask(false)}
        ></div>
        <form
          onSubmit={postponeTask}
          className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 w-full md:w-max relative"
        >
          <div>
            <h1 className="text-3xl font-normal text-center mb-4 cursor-pointer">
              Report current progress
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm mb-3">Task Title</label>
              <input
                name="title"
                value={body.title}
                type="text"
                placeholder="Task Title"
                onChange={inputChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
            </div>
            <div>
              <label className="text-sm mb-3">Progress</label>
              <input
                placeholder="Progress"
                type="range"
                onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                  setProgress(target.value)
                }
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
                value={body.description}
              ></textarea>
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">
              Postpone
            </button>
            <p className="mt-4 text-sm">
              <span
                onClick={() => setIsPostponingTask(false)}
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

export default PostponeTask;
