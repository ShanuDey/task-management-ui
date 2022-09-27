import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Layout from "../component/Layout";
import user from "../api/user";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailPreviewLink, setEmailPreviewLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const bodyJsonData = {
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const result = await user.createUser(bodyJsonData);
      if (result.error) {
        setErrorMsg(result.error);
        toast.error("Registration Failed !!");
      } else {
        setErrorMsg("success");
        setEmailPreviewLink(result.email_preview_link);
        toast.success("Registration completed. Verification email sent !!");
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{ minLength: 6 }}
              />
            </Grid>
            <Grid item xs={12}>
              {errorMsg !== "success" ? (
                <Typography color="red" align="center">
                  {errorMsg}
                </Typography>
              ) : (
                <Typography color="green" align="center">
                  Verification email sent !! <br />
                  {emailPreviewLink && (
                    <Link href={emailPreviewLink} target="_blank">
                      Dummy Email Preview
                    </Link>
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
