export interface loginDataInterface {
  email: string;
  password: string;
  role: string;
}

export interface TasksRowsInterface {
  id : number;
  userId?:any;
  _id : number;
  username : string;
  title : string;
  deadline : Date;
  status : string;
  description : string;
}

export interface AddTaskInterface {
  title : string,
  username : string,
  imageFile : File,
  deadline : Date,
  description : string
}