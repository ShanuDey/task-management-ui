import React from "react";
import Header from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./Footer";

const theme = createTheme();

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      
        {children}
      
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
