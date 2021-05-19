import { useState, FC } from 'react';
import './Homepage.scss';
import { auth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterStatusChanged,
  sortingStatusChanged,
  getSearchValue,
} from '../../store/Tasks/taskSlice';
import { setUser } from '../../store/Auth/authSlice';
import { RootState } from '../../store/store';
import Form from '../../todo/form/Form';
import List from '../../todo/list/List';

const Homepage: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [id, setId] = useState<string>('');
  const dispatch = useDispatch();

  const { sortValue } = useSelector((state: RootState) => state.tasks);

  const handleFilterChange = (value: string) => {
    dispatch(filterStatusChanged(value));
  };

  const handleSortChange = (value: string) => {
    dispatch(sortingStatusChanged(value));
  };

  const handleSearch = (value: string) => {
    dispatch(getSearchValue(value));
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div className="home__container">
        <div className="home__top">
          <p>user: {auth.currentUser && auth.currentUser.email}</p>

          {auth.currentUser?.displayName && (
            <p>Welcome {auth.currentUser.displayName}</p>
          )}

          <input
            onChange={(e) => handleSearch(e.currentTarget.value)}
            type="search"
            placeholder="Search..."
          />

          <select
            defaultValue={sortValue}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="desc">date desc</option>
            <option value="asc">date asc</option>
          </select> 

          <button onClick={handleLogout}>log out</button>
        </div>

        <div
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            handleFilterChange(e.target.value)
          }
        >
          <input type="radio" value="all" name="task" defaultChecked />
          <label htmlFor="all">All</label>
          <input type="radio" value="completed" name="task" />
          <label htmlFor="completed">Completed</label>
          <input type="radio" value="not completed" name="task" />
          <label htmlFor="not completed">Not Completed</label>
        </div>
      </div>

      <Form
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        id={id}
      />

      <List setTitle={setTitle} setDescription={setDescription} setId={setId} />
    </div>
  );
};
export default Homepage;
