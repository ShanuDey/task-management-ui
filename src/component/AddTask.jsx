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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import taskApi from "../api/taskApi";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { tasksState } from "../recoil/atom/taskAtom";
import { useRecoilState } from "recoil";

const AddTask = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [cookies] = useCookies("token");
  const [, setTasks] = useRecoilState(tasksState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      date: data.get("date"),
      task: data.get("task"),
      status: data.get("status") ? "Completed" : "Incomplete",
    };
    try {
      const result = await taskApi.createTask(cookies.token, jsonData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Task Added !!");
        setTasks(result);
        event.target.reset();
      }
    } catch (err) {
      toast.error(err);
    }
    setIsEditing(false);
  };

  return (
    <Paper
      component="form"
      id="add-task-form"
      onSubmit={handleSubmit}
      sx={{
        padding: 2,
        marginBottom: 2,
      }}
      elevation={isEditing ? 1 : 0}
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
          placeholder="Add a new task"
          id="input-textfield"
          onFocus={() => setIsEditing(true)}
          required
          name="task"
          multiline={true}
        />
        <Stack display={isEditing ? "block" : "none"}>
          <IconButton
            type="button"
            color="default"
            sx={{ p: "10px" }}
            id="close-button"
            onClick={() => setIsEditing(false)}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            type="submit"
            color="success"
            sx={{ p: "10px" }}
            id="submit-button"
          >
            <DoneIcon />
          </IconButton>
        </Stack>
        <Stack display={isEditing ? "none" : "block"}>
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            id="add-button"
            onClick={() => setIsEditing(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
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
              <Checkbox value="completed" id="status" color="primary" name="status" />
            }
            label="Completed"
          />
          <TextField
            id="date"
            label="Date"
            name="date"
            type="date"
            size="small"
            margin="normal"
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

export default AddTask;
