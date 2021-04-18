export interface Task {
  title: string;
  description: string;
  createdAt: any;
  completed: boolean;
  id?: string;
}

export type filterStatus = 'all' | 'completed' | 'not completed';

export type sortingStatus = 'asc' | 'desc';
