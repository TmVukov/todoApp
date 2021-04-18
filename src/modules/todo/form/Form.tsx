import { FC, FormEvent } from 'react';
import './Form.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../../store/Tasks/taskThunks';
import { setEditing } from '../../store/Tasks/taskSlice';
import { RootState } from '../../store/store';

interface FormProps {
  title: string;
  setTitle: any;
  description: string;
  setDescription: any;  
  id: string;
}

const Form: FC<FormProps> = ({
  title,
  setTitle,
  description,
  setDescription,  
  id,
}) => {
  const dispatch = useDispatch();
  const { editing } = useSelector((state: RootState)=>state.tasks)

  const handleTask = (e: FormEvent) => {
    e.preventDefault();

    if (editing) {
      dispatch(editTask({ title, description, id }));      
      dispatch(setEditing(false))
      setTitle('');
      setDescription('');
    } else {
      dispatch(addTask({ title, description }));
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <form onSubmit={handleTask} className="list__form">
        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          value={title}
          placeholder="Enter title"
          required
        />

        <input
          onChange={(e) => setDescription(e.currentTarget.value)}
          type="text"
          value={description}
          placeholder="Enter description"
        />

        <button>{editing ? 'Edit Task' : 'Add Task'}</button>
      </form>
    </div>
  );
};
export default Form;
