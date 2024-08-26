export interface Task {
  id: number;
  date: Date;
  title: string;
  description: string;
  assignedUser: string;
  userInitials: string;
  username: string;
  status: 'Open' | 'In Progress' | 'Closed';
}
