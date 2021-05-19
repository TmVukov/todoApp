import React, { FC, useEffect } from 'react';
import {
  getTasks,
  removeTask,
  taskCompleted,
} from '../../store/Tasks/taskThunks';
import { selectSortedTasks, setEditing } from '../../store/Tasks/taskSlice';
import { Task } from '../../store/Tasks/taskTypes';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskBox from '../task/Task';

interface ListProps {
  setTitle: any;
  setDescription: any;
  setId: any;
}

const List: FC<ListProps> = ({ setTitle, setDescription, setId }) => {
  const dispatch = useDispatch();

  const allTasks = useSelector(selectSortedTasks);
  //console.log(allTasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleTaskRemove = (id: string) => {
    dispatch(removeTask({ id }));
  };

  const startEditing = (title: string, description: string, id: string) => {
    dispatch(setEditing(true));
    setTitle(title);
    setDescription(description);
    setId(id); 
  };

  const handleTaskComplete = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(taskCompleted({ id, completed: e.target.checked }));
  };

  return (
    <div>
      {allTasks.map((task: Task) => {
        return (
          <TaskBox key={task.id}>
            <span>▶</span>

            <section className="task">
              <header className="task__info">
                <p>
                  <strong>{task.title}</strong>
                </p>
                <p>{task.description}</p>
                <p>{task.createdAt.slice(0, -3)}</p>
              </header>

              <div className="task__controls">
                <p
                  onClick={() =>
                    task.id &&
                    startEditing(task.title, task.description, task.id)
                  }
                >
                  edit
                </p>

                <p onClick={() => task.id && handleTaskRemove(task.id)}>
                  remove
                </p>
              </div>

              <div className="task__checkbox">
                <input
                  onChange={(e) => task.id && handleTaskComplete(task.id, e)}
                  checked={task.completed}
                  type="checkbox"
                />

                <div>{task.completed ? <p>Task completed!</p> : ''}</div>
              </div>

              <Link to={`/task/${task.id}`}>details</Link>
            </section>
          </TaskBox>
        );
      })}
    </div>
  );
};

export default List;
