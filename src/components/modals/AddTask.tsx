import React    from "react";
import ReactDOM from "react-dom";
import { TaskInput, TaskModel } from "../../models/task";

import Task from "../forms/Task";


interface AddTaskProps {
  setTasks    : React.Dispatch<React.SetStateAction<TaskModel[]>>;
  unmountModal: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ setTasks, unmountModal }) => {

  const addTask = async (body: TaskInput) => {
    TaskModel.create(body)
      .then((task) => {
        unmountModal();
        setTasks((tasks) => [...tasks, task]);
      })
      .catch(console.error);
  };


  return ReactDOM.createPortal(
    <Task unmount={unmountModal} submit={addTask} />,
    document.body
  );
};

export default AddTask;