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
    console.log("handle submit");
    const data = new FormData(event.currentTarget);
    const jsonData = {
      date: data.get("date"),
      task: data.get("task"),
      status: data.get("status") ? "Completed" : "Incomplete",
    };
    console.log(jsonData);
    try {
      const result = await taskApi.createTask(cookies.token, jsonData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Task Added !!");
        setTasks(result)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper
      component="form"
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
          inputProps={{ "aria-label": "add new task" }}
          onFocus={() => setIsEditing(true)}
          required
          name="task"
        />
        <Stack display={isEditing ? "block" : "none"}>
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
        </Stack>
        <Stack display={isEditing ? "none" : "block"}>
          <IconButton
            type="submit"
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <AddIcon />
          </IconButton>
        </Stack>
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
              <Checkbox value="completed" color="primary" name="status" />
            }
            label="Completed"
          />
          <TextField
            id="date"
            label="Date"
            name="date"
            type="date"
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
