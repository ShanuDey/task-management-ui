import React from "react";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

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
    </ThemeProvider>
  );
};

export default Layout;
