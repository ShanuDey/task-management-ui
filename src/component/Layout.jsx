import React from "react";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
      </Container>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

export default Layout;
