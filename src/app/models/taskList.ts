
export interface Tasks {
  id: number;
  name: string;
  description: string;
  subTasks: SubTasks[],
  completed: boolean;
}

export interface SubTasks {
  id: number;
  name: string;
  completed: boolean;
}