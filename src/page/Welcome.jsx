import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";

const Welcome = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/dashboard');
  }

  return (
    <Layout>
      <Box marginTop="20vh" textAlign="center">
        <Typography variant="h1" color="#264653" marginBottom="20px">
          Task Manager
        </Typography>
        <Button variant="outlined" onClick={handleGetStarted}>GET STARTED</Button>
      </Box>
    </Layout>
  );
};

export default Welcome;
