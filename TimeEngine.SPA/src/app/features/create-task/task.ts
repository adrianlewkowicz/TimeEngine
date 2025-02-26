export interface Task {
  id: string;
  title: string;
  description: string;
  skills: string[];
  projectId: string;
  status: number;
  estimationJunior: number;
  estimationMid: number;
  estimationSenior: number;
}
