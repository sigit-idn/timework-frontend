import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import { TaskModel, TaskInput       } from "../../models/task";
import Task from "../forms/Task";


interface EditTaskProps {
  setTasks     : React.Dispatch<React.SetStateAction<TaskModel[]>>;
  task         : TaskModel;
  unmountModal : () => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  setTasks,
  task,
  unmountModal,
}) => {
  const updateTask = (body: TaskInput) => {
    TaskModel.update(task.id, body)
      .then((task) => {
        unmountModal();
        setTasks((tasks: TaskModel[]) => {
          const newTasks = tasks?.map((t) => {
            if (t.id === task.id) {
              return task;
            }

            return t;
          });

          return newTasks;
        });
      })
      .catch(console.error);
  };

  return ReactDOM.createPortal(
    <Task unmount={unmountModal} submit={updateTask} task={task} />,
    document.body
  );
};

export default EditTask;
