import { ChevronDown } from "@geist-ui/react-icons";
import { useState } from "react";
import useAuthFetch from "../../utils/authFetchHook";
import Task from "./Task";

const Report = ({
  report: { tasks, notes, date, id: reportId },
  setReports,
}: any) => {
  const authFetch = useAuthFetch();
  const [isShown, setIsShown] = useState(
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
  );
  const [isEditing, setIsEditing] = useState(!notes);
  const [editNotes, setEditNotes] = useState("");

  const editReport = () => {
    setIsEditing(!isEditing);

    if (isEditing)
      authFetch
        .put("/reports/" + reportId, {
          notes: editNotes,
        })
        .then((res: any) => setReports(res.data.reports));
  };

  return (
    <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
        <div className="min-w-full">
          <div
            onClick={() => setIsShown(!isShown)}
            className="px-6 py-3 flex justify-between items-center border-b cursor-pointer border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            {new Date(date).toLocaleDateString()}
            <ChevronDown
              size={20}
              className={`transition transform ${isShown ? "rotate-180" : ""}`}
            />
          </div>

          <div
            className={`bg-white transition duration-500 overflow-hidden transform origin-top ${
              isShown ? "scale-y-100 block" : "scale-y-0 hidden"
            }`}
          >
            {tasks.map(
              (
                { taskStart, taskEnd, title, description, id }: any,
                i: number
              ) => (
                  <Task
                    key={i}
                    setReports={setReports}
                    id={id}
                    reportId={reportId}
                    taskStart={taskStart}
                    taskEnd={taskEnd}
                    title={title}
                    description={description}
                  />
              )
            )}
          </div>
          <div
            className={`px-6 py-3 border-b border-gray-300 bg-gray-50 text-left text-sm leading-5 font-medium transform origin-top transition duration-500 ${
              isShown ? "scale-y-100 block" : "scale-y-0 hidden"
            }`}
          >
            <h3>NOTES</h3>
            {isEditing ? (
              <textarea
                className="text-gray-600 my-2 bg-gray-100 bg-opacity-30 rounded border-0 ring-1 ring-gray-200 focus:ring-indigo-500 w-full"
                defaultValue={notes}
                onChange={({ target }: any) => setEditNotes(target.value)}
              />
            ) : (
              <p className="text-gray-600 my-2 whitespace-pre-line">{notes}</p>
            )}
            <div>
              <button
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-yellow-500 hover:bg-yellow-600 mr-1 text-white cursor-pointer"
                onClick={editReport}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
