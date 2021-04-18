interface User {
  email: string;
  id: string;
}

export interface AuthState {
  user: User | null;
}
