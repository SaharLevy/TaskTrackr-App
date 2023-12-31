import Dropdown from "react-bootstrap/Dropdown";

const OrderByButton = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Order By</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Priority</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Created At</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Updated At</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrderByButton;
