import React from "react";
import List from "@mui/material/List";
import TaskItem from "./TaskItem";
import { tasksState } from "../recoil/atom/taskAtom";
import { useRecoilValue } from "recoil";

const TaskList = () => {
  const tasks = useRecoilValue(tasksState);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {tasks &&
        tasks.map((taskObject) => (
          <TaskItem taskObject={taskObject} key={taskObject._id} />
        ))}
    </List>
  );
};

export default TaskList;
