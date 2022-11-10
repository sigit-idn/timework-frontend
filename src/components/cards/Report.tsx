import React, { useState } from "react";
import { ChevronDown     } from "@geist-ui/react-icons";
import { ReportModel     } from "../../models/report";
import { TaskModel       } from "../../models/task";

import Task from "../list-items/ReportTask";


interface ReportProps {
  report: ReportModel;
  setReports: React.Dispatch<React.SetStateAction<ReportModel[]>>;
}

const Report: React.FC<ReportProps> = ({ 
  report, 
  setReports 
}) => {
  const [isShown, setIsShown] = useState(
    new Date().format("yyyy-mm-dd") === report.date
  );
  const [isEditing, setIsEditing] = useState(!report.notes);
  const [editNotes, setEditNotes] = useState(report.notes);

  const editReport = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      ReportModel.update(report.id, { notes: editNotes })
        .then(() => {
          setReports((reports: ReportModel[]) => {
            return reports.map(({ id }: ReportModel) => {
              if (id === report.id) {
                return { ...report, notes: editNotes };
              }

              return report;
            });
          });
        })
        .catch((err) => console.error(err));
    }
  };    

  return (
    <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded-lg border-b border-gray-200">
        <div className="min-w-full">
          <div
            onClick={() => setIsShown(!isShown)}
            className="px-6 py-3 flex justify-between items-center border-b cursor-pointer border-gray-300 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            {new Date(report.date).toLocaleDateString()}
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
            {report.tasks?.map(
              (task: TaskModel, i: number) => (
                  <Task
                    key={i}
                    setReports={setReports}
                    task={task}
                    addTask={task}
                    isAdding={false}
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
                defaultValue={report.notes}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => setEditNotes(value)}
              />
            ) : (
              <p className="text-gray-600 my-2 whitespace-pre-line">{report.notes}</p>
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
