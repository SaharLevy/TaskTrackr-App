import { ObjectId } from "mongoose";

export default interface ITask {
  _id?: ObjectId;
  title: string;
  text?: string;
  priority: string;
  createdAt?: string;
  //change the date to string on the backend side
  updatedAt?: string;
}
