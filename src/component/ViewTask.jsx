import React, { useState, useEffect } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import taskApi from "../api/taskApi";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { tasksState } from "../recoil/atom/taskAtom";
import { toast } from "react-toastify";

const ViewTask = ({ taskObject, setIsEditing }) => {
  const [cookies] = useCookies("token");
  const [, setTasks] = useRecoilState(tasksState);
  const [checked, setChecked] = useState(false);
  const labelId = `tasks-listitem-label-${taskObject.task.replace(/\s/g, "")}`;
  const date = new Date(taskObject.date).toDateString();

  useEffect(() => {
    setChecked(taskObject.status === "Completed");
  }, [taskObject.status]);

  const handleDelete = async () => {
    try {
      const result = await taskApi.deleteTask(cookies.token, taskObject._id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Task deleted !!");
        setTasks(result);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleChecked = async () => {
    try {
      const result = await taskApi.updateTask(cookies.token, taskObject._id, {
        status: !checked ? "Completed" : "Incomplete",
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Task status updated !!");
        setTasks(result);
      }
    } catch (err) {
      toast.error(err);
    }
    setChecked(!checked);
  };

  return (
    <ListItem
      key={taskObject._id}
      secondaryAction={
        <IconButton
          sx={{ p: "10px" }}
          edge="end"
          id="delete-icon"
          color="error"
          onClick={handleDelete}
        >
          <DeleteForeverIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            onClick={handleChecked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={taskObject.task}
          secondary={date}
          onDoubleClick={() => setIsEditing(true)}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ViewTask;
