import React    from "react";
import ReactDOM from "react-dom";
import Task     from "../forms/Task";
import { TaskModel, TaskInput } from "../../models/task";


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
  const updateTask = ({id, ...body}: TaskInput) => {
    TaskModel.update(id!, body)
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
