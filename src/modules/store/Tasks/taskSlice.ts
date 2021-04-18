import {
  createSlice,
  createEntityAdapter,
  isAnyOf,
  createSelector,
} from '@reduxjs/toolkit';
import {
  getTasks,
  addTask,
  removeTask,
  editTask,
  taskCompleted,
} from './taskThunks';
import { Task, filterStatus, sortingStatus } from './taskTypes';
import { RootState } from '../store';

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task.id as string,
});

const initialState = tasksAdapter.getInitialState({
  status: 'all' as filterStatus,
  sortValue: 'desc' as sortingStatus,
  searchValue: '',
  editing: false,
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    //destructuring payloads just to see the values using
    filterStatusChanged(state, { payload: filterStatus }) {
      state.status = filterStatus;
    },
    sortingStatusChanged(state, { payload: sortValue }) {
      state.sortValue = sortValue;
    },
    getSearchValue(state, { payload: searchValue }) {
      state.searchValue = searchValue;
    },
    setEditing(state, { payload: editingValue }) {
      state.editing = editingValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, { payload: tasksArr }) => {
        tasksAdapter.setAll(state, tasksArr);
      })
      .addCase(addTask.fulfilled, (state, { payload: newTaskObj }) => {
        tasksAdapter.addOne(state, newTaskObj);
      })
      .addCase(removeTask.fulfilled, (state, { payload: id }) => {
        tasksAdapter.removeOne(state, id);
      })
      .addMatcher(
        isAnyOf(editTask.fulfilled, taskCompleted.fulfilled),
        (state, { payload: updatedTaskObj }) => {
          tasksAdapter.upsertOne(state, updatedTaskObj);
        },
      );
  },
});

export const {
  filterStatusChanged,
  sortingStatusChanged,
  getSearchValue,
  setEditing,
} = tasksSlice.actions;

export const {
  selectAll: selectTasks,
  selectById: selectTaskById,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

const searchTasks = createSelector(
  selectTasks,
  (state) => state.tasks.searchValue,
  (tasks, searchValue) => {
    return tasks.filter((task) => {
      if (searchValue!.length) {
        return (
          task.title?.includes(searchValue!) ||
          task.description?.includes(searchValue!)
        );
      }
      return tasks;
    });
  },
);

const selectFilteredTasks = createSelector(
  searchTasks,
  (state) => state.tasks.status,
  (tasks, status) => {    
    const allTasks = status === 'all';

    if (allTasks) return tasks;
    
    const completedTasks = status === 'completed';

    return tasks.filter((task) => task.completed === completedTasks);
  },
);

export const selectSortedTasks = createSelector(
  selectFilteredTasks,
  (state) => state.tasks.sortValue,
  (tasks, sortValue) => {
    return tasks.sort((a, b) => {
      if (sortValue === 'asc') {
        return a.createdAt.localeCompare(b.createdAt);
      }
      return b.createdAt.localeCompare(a.createdAt);
    });
  },
);

export default tasksSlice.reducer;
