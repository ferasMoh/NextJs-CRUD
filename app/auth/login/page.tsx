/* Login Page */

"use client";
import {
  Box,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import * as React from "react";
import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Image from "next/image";
import LoginImage from "../../../public/login.png";
import TasksIcon from "../../icon.ico";
import SuccessSnackBar from "../../components/Notify/Success-Snackbar/successSnackbar";
import ErrorSnackBar from "@/app/components/Notify/Error-Snackbar/ErrorSnackbar";
import Loading from "@/app/components/Notify/Loading/loading";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginDataInterface } from "../../DTOs/DTOs";


const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = () => {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /* Login data email and password */
  const loginData: loginDataInterface = {
    email: email,
    password: password,
    role: "admin",
  };

  /* Send email and password to api */
  /* Get Token then navigat to Tasks Page */
  const sendData = async () => {
    try {
      const response = await axios.create().post("https://crud-db-801e.onrender.com/auth/login", loginData);
      localStorage.setItem("Token", response.data.token);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/pages/tasks");
      }, 3000);
    } catch (error:any) {
      setErrorMessage(JSON.stringify(error.response?.data.message));
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Login Image */}
      <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <Image
          src={LoginImage}
          style={{ width: "80%", height: "100vh" }}
          alt="Login Picture"
        />
      </Box>

      {/* Login Box */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          flexDirection: "column",
          backgroundColor: "#e2eafd",
        }}
      >
        {/* Tasks Logo and Heading */}
        <Image src={TasksIcon} alt="TasksIcon" width={60} />
        <h1 style={{ marginTop: "20px" }}>Login</h1>
        <br />

        {/* Login Form */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormControl>
            {/* Email Field */}
            <TextField
              variant="standard"
              type="email"
              label="Email"
              value={email}
              {...register("email", { required: true })}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && !email && (
              <p style={{ color: "red", fontSize: "13px" }}>
                Email is required *
              </p>
            )}
            <br />

            {/* Password Field */}
            <TextField
              variant="standard"
              label="Password"
              value={password}
              {...register("password", { required: true })}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              /* endAdornment has Eye icon to show or hide password */
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {password ? (
                        showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )
                      ) : null}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && !password && (
              <p style={{ color: "red", fontSize: "13px" }}>
                Password is required *
              </p>
            )}
            <br />

            {/* Login Button */}
            <Button type="submit" variant="contained" onClick={sendData}>
              Login
            </Button>
          </FormControl>
        </form>
      </Box>

      {/* Check to show Success and Error Snackbar */}
      {showSuccess && <SuccessSnackBar message="Login" />}
      {showError && <ErrorSnackBar message={ErrorMessage} />}
      {showLoading && <Loading />}
    </Box>
  );
};

export default Login;
