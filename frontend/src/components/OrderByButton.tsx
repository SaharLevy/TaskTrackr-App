import Dropdown from "react-bootstrap/Dropdown";
import ITask from "../types/task";
import * as Sorts from "../HelperFunctions/TaskSorts";

interface orderByProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const OrderByButton: React.FC<orderByProps> = ({ tasks, setTasks }) => {
  const handleOrderByPriority = () => {
    const sortedTasks = Sorts.sortByPriority(tasks);
    setTasks(sortedTasks);
  };
  const handleOrderByDate = (orderBy: "createdAt" | "updatedAt") => {
    const sortedTasks = Sorts.sortByDate(tasks, orderBy);
    setTasks(sortedTasks);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Order By</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleOrderByPriority}>Priority</Dropdown.Item>
        <Dropdown.Item onClick={() => handleOrderByDate("createdAt")}>
          Created At
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleOrderByDate("updatedAt")}>
          Updated At
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrderByButton;
