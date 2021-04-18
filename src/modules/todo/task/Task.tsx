import { FC } from "react";
import "./Task.scss";

interface TaskProps {
  children: any;
}

const TaskBox: FC<TaskProps> = ({ children }) => {
  return <div className="task__container">{children}</div>;
};

export default TaskBox;





