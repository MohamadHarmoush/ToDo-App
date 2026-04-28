import type { Task } from "../domain/Task";

type TaskListProps =  {
  tasks: Task[];
}
const TaskList = ({ tasks }: TaskListProps) => {
  return <div>we've {tasks.length} added.</div>;
};

export default TaskList;
