export default interface Task {
  _id?: string;
  title: string;
  text?: string;
  priority: string;
  createdAt?: string;
  //change the date to string on the backend side
  updatedAt?: string;
}
