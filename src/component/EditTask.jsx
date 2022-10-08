import React, { useState } from "react";
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
  const date = dayjs(taskObject.date).format("YYYY-MM-DD");
  const [checked, setChecked] = useState(taskObject.status === "Completed");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {};
    if (data.get("date") !== date) jsonData.date = data.get("date");
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
      id="edit-task-form"
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
          id="input-textarea"
          required
          name="task"
          multiline={true}
          rows={3}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          color="default"
          id="close-button"
          onClick={() => setIsEditing(false)}
        >
          <CloseIcon c />
        </IconButton>
        <IconButton
          type="submit"
          color="success"
          sx={{ p: "10px" }}
          id="submit-button"
        >
          <DoneIcon />
        </IconButton>
      </Paper>
      <Collapse in={isEditing}>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={2}
          marginTop={2}
          display={isEditing ? "flex" : "none"}
        >
          <FormControlLabel
            control={
              <Checkbox
                value="completed"
                id="status"
                color="primary"
                checked={checked}
                onClick={() => setChecked(!checked)}
                name="status"
              />
            }
            label={checked ? "Completed" : "Incomplete"}
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            name="date"
            size="small"
            margin="normal"
            defaultValue={date}
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
