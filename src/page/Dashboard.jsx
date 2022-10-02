import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import { useRecoilState } from "recoil";
import { Avatar, Box, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useCookies } from "react-cookie";
import { tasksState } from "../recoil/atom/taskAtom";
import AddTask from "../component/AddTask";
import TaskList from "../component/TaskList";
import taskApi from "../api/taskApi";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [, setTasks] = useRecoilState(tasksState);

  const [cookies] = useCookies("token");

  useEffect(() => {
    if (!cookies.token) navigate("/login");

    (async () => {
      try {
        const result = await taskApi.getTasks(cookies.token);
        if (result.error) {
          toast.error(result.error);
        } else {
          setTasks(result);
        }
      } catch (err) {
        toast.error(err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Tasks
        </Typography>
        <AddTask />
        <TaskList />
      </Box>
    </Layout>
  );
};

export default Dashboard;
