import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Layout from "../component/Layout";

const Welcome = () => {
  return (
    <Layout>
      <Box marginTop="20vh" textAlign="center">
        <Typography variant="h1" color="#264653" marginBottom="20px">
          Task Manager
        </Typography>
        <Button variant="outlined">GET STARTED</Button>
      </Box>
    </Layout>
  );
};

export default Welcome;
