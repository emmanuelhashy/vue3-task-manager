export type TaskItem = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  completed: boolean;
  editing: boolean;
};

export type State = {
  loading: boolean;
  tasks: TaskItem[];
  showCreateModal: boolean;
  showEditModal: boolean;
  showTaskModal: boolean;
  editModalTaskId: number | undefined;
  showTaskId: number | undefined;
};

export const state: State = {
  loading: false,
  tasks: [],
  showCreateModal: false,
  showEditModal: false,
  showTaskModal: false,
  editModalTaskId: undefined,
  showTaskId: undefined,
};
