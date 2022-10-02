import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userAtom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function ButtonAppBar() {
  const [cookies, , removeCookie] = useCookies("token");
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleRedirectToHome = () => {
    navigate("/");
  };

  const handleLogoutButtonClick = () => {
    toast.success("Logout successful !!");
    setUser(null);
    removeCookie("token");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleRedirectToHome}
          >
            <AssignmentTurnedInIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={handleRedirectToHome}
          >
            Task Manager
          </Typography>
          {cookies.token ? (
            <Button color="inherit" onClick={handleLogoutButtonClick}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginButtonClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
