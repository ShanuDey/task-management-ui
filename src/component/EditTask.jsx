import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { tasksState } from "../recoil/atom/taskAtom";
import taskApi from "../api/taskApi";
import { toast } from "react-toastify";

const EditTask = ({ taskObject, isEditing, setIsEditing }) => {
  const [cookies] = useCookies("token");
  const [, setTasks] = useRecoilState(tasksState);
  const date = new Date(taskObject.date).toDateString();
  const [checked, setChecked] = useState(taskObject.status === "Completed");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {};
    if (data.get("date") !== dayjs(date).format("YYYY-MM-DD"))
      jsonData.date = data.get("date");

    if (taskObject.task !== data.get("task")) jsonData.task = data.get("task");

    const status = data.get("status") ? "Completed" : "Incomplete";
    if (taskObject.status !== status) jsonData.status = status;
    console.log(jsonData);
    try {
      const result = await taskApi.updateTask(
        cookies.token,
        taskObject._id,
        jsonData
      );
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Task edited successfully !!");
        setTasks(result);
      }
    } catch (err) {
      toast.error(err);
    }
    setIsEditing(false);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          defaultValue={taskObject.task}
          inputProps={{ "aria-label": "edit task" }}
          required
          name="task"
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => setIsEditing(false)}
        >
          <CloseIcon color="error" />
        </IconButton>
        <IconButton
          type="submit"
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <DoneIcon color="success" />
        </IconButton>
      </Paper>
      <Collapse in={isEditing}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          marginTop={2}
          display={isEditing ? "block" : "none"}
        >
          <FormControlLabel
            control={
              <Checkbox
                value="completed"
                color="primary"
                checked={checked}
                onClick={() => setChecked(!checked)}
                name="status"
              />
            }
            label="Completed"
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            defaultValue={dayjs(date).format("YYYY-MM-DD")}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default EditTask;
