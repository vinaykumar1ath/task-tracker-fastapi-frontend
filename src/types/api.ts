export interface ApiMessage {
  msg?: string;
  message?: string;
  detail?: string;
}

export interface UserData {
  username: string;
  password: string;
  email?: string | null;
}

export interface Task {
  id?: number | null;
  title: string;
  description: string;
  user_id?: number;
  done?: boolean | null;
}

export interface TaskCreate {
  title: string;
  description: string;
}

export interface TaskUpdate {
  title?: string | null;
  description?: string | null;
  done?: boolean | null;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface TaskFilters {
  id?: number;
  title?: string;
  done?: boolean;
}
