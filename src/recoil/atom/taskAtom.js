import { atom } from "recoil";

export const addTaskState = atom({
  key: "addTaskState", 
  default: null
});

export const editTaskState = atom({
  key: "editTaskState", 
  default: null
});

export const tasksState = atom({
  key: "tasksState", 
  default: []
});
