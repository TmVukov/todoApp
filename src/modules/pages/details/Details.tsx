import { FC, useEffect } from 'react';
import './Details.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../store/Tasks/taskThunks';
import { selectTaskById } from '../../store/Tasks/taskSlice';
import { RootState } from '../../store/store';
import { Task } from '../../store/Tasks/taskTypes';
import { Link, useParams } from 'react-router-dom';

const Details: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const selectedTask = useSelector((state: RootState) =>
    selectTaskById(state, id),
  ) as Task;
  // console.log(selectedTask);

  return (
    <div>
      <Link to="/">home</Link>

      {selectedTask &&
        [selectedTask].map((task: Task) => (
          <section key={task.id} className="details">
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.createdAt.slice(0, -3)}</p>
            <p>{task.completed ? 'Task is completed!' : 'Still pending :P'}</p>
          </section>
        ))}
    </div>
  );
};

export default Details;
