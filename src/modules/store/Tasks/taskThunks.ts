import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../firebase/config';
import { Task } from './taskTypes';

interface dataAdd {
  title: string;
  description: string;
}

interface dataRemove {
  id: string;
}

interface dataEdit {
  title: string;
  description: string;
  id: string;
}

interface dataCompleted {
  completed: boolean;
  id: string;
}

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const fetchedTasks: Task[] = [];

  const query = await database.collection('tasks').get();

  query.docs.forEach((doc) => {
    const { title, description, createdAt, completed } = doc.data();
    fetchedTasks.push({ title, description, createdAt, completed, id: doc.id });
  });
  return fetchedTasks; 
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (data: dataAdd) => {
    const newTask = {
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date().toLocaleString('de-DE'),
    };
    const ref = await database.collection('tasks').add(newTask);
    console.log(ref.id)

    return { ...newTask, id: ref.id };
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (data: dataRemove) => {
    await database.collection('tasks').doc(data.id).delete();

    return data.id;
  },
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (data: dataEdit) => {
    await database
      .collection('tasks')
      .doc(data.id)
      .update({ title: data.title, description: data.description });

    const updatedProps = { ...data } as any;

    return { ...updatedProps, id: data.id };
  },
);

export const taskCompleted = createAsyncThunk(
  'tasks/taskCompleted',
  async (data: dataCompleted) => {
    await database
      .collection('tasks')
      .doc(data.id)
      .update({ completed: data.completed });

    const updatedProps = { ...data } as any;

    return { ...updatedProps, id: data.id };
  },
);
