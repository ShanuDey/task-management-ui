import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Layout from "../component/Layout";
import userApi from "../api/userApi";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userAtom";
import { useCookies } from "react-cookie";
import { tasksState } from "../recoil/atom/taskAtom";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [, setUser] = useRecoilState(userState);
  const [, setTasks] = useRecoilState(tasksState);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const data = new FormData(event.currentTarget);
    const bodyJsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const result = await userApi.loginUser(bodyJsonData);
      if (result.error) {
        setErrorMsg(result.error);
        toast.error("Login Failed !!");
      } else {
        toast.success("Login Successful !!");
        setUser({
          first_name: result.user.first_name,
          email: result.user.email,
        });
        setTasks(result.user.tasks);
        let date = new Date();
        date.setHours(date.getHours() + 2);
        setCookie("token", result.userToken.token, { expires: date });
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{ minLength: 6 }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Grid item xs={12}>
            {errorMsg && (
              <Typography color="red" align="center">
                {errorMsg}
              </Typography>
            )}
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Login
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {/* Forgot password? */}
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
