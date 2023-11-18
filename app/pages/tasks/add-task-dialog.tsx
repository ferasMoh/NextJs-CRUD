"use client";

import * as React from "react";
import { useForm, useFormContext } from "react-hook-form";
import moment from "Moment";
import axios from "axios";
import api from "@/app/api/api/api";
import {
  Typography,
  FormControl,
  Dialog,
  Button,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DialogPropsInterface {
  open: boolean;
  onClose: () => void;
  rowDataProp: any;
}

const AddTaskDialog = ({
  open,
  onClose,
  rowDataProp,
}: DialogPropsInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rowData, setRowData] = React.useState();
  const [users, setUsers] = React.useState([]);
  const [title, setTitle] = React.useState(rowDataProp.title || "");
  const [userID, setUserID] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePath, setImagePath] = React.useState("");
  const [deadline, setDeadline] = React.useState(
    moment(rowDataProp.deadline || "").format("MM/DD/YYYY")
  );
  const [description, setDescription] = React.useState(
    rowDataProp.description || ""
  );

  /* Add Task Form */
  const addTaskForm: any = new FormData();
  addTaskForm.append("title", title);
  addTaskForm.append("userId", userID);
  addTaskForm.append("image", imageFile);
  addTaskForm.append("deadline", deadline);
  addTaskForm.append("description", description);

  /* Fill input fields by row data */
  React.useEffect(() => {
    if (rowDataProp) {
      setRowData(rowDataProp);
      setTitle(rowDataProp.title);
      setDeadline(rowDataProp.deadline);
      setDescription(rowDataProp.description);
    }
  }, rowDataProp && [rowDataProp.title, rowDataProp.deadline, rowDataProp.description]);

  /* Get Users */
  React.useEffect(() => {
    const getUsers = async () => {
      const response = await api.get("/auth/users");
      const usersData = response?.data.users;
      setUsers(usersData);
      return users;
    };
    getUsers();
  }, []);

  /* Add Task */
  const addTask = async (event: any) => {
    try {
      const response = await api.post("/tasks/add-task", addTaskForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response && response.data && response.data.path) {
        console.log("Path:", response.data.path);
      } else {
        console.log("Path is not");
      }
    } catch (error: any) {
      console.log("Error is : ", error);
    }
  };

  /* Edit Task */
  const EditTask = async () => {
    try {
      const response = await api.put(
        `/tasks/edit-task/${userID}`,
        addTaskForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("response is ", response);
    } catch (error) {
      console.log("error is ", error);
    }

    //onClose();
  };

  /* Upload Image */
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
    setImagePath(event.target.value);
  };

  /* Cancel Dialog then clear all values data*/
  const cancelDialog = () => {
    setTitle("");
    setUserID("");
    setImagePath("");
    setImageFile(null);
    setDeadline(moment().format("MM/DD/YYYY"));
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(rowDataProp.title ? EditTask : addTask)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"500px"}
          padding={4}
        >
          <Typography variant="h4" fontWeight={800} color={"secondary"}>
            '' {rowDataProp.title ? "EDIT" : "ADD"} TASK ''
          </Typography>
          <br />
          <FormControl fullWidth>
            {/* Title Field */}
            <FormControl>
              <TextField
                type="text"
                label="Title"
                value={title}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "This title should be 5 letters or more .",
                  },
                })}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {errors.title && (
                <p style={{ color: "red", fontSize: "15px" }}>
                  {errors.title.message?.toString()}
                </p>
              )}
            </FormControl>
            <br />

            {/* UserId Field */}
            <FormControl>
              <InputLabel id="usersLabel">Select User</InputLabel>
              <Select
                labelId="usersLabel"
                id="usersLabel"
                label="Select User"
                value={userID}
                {...register("userID", { required: true })}
                onChange={(e: any) => {
                  setUserID(e.target.value);
                  rowDataProp.username && (rowDataProp.username = "");
                }}
              >
                <MenuItem value="" sx={{ height: "40px" }}></MenuItem>
                {users.map((user: any, index: number) => {
                  return (
                    <MenuItem key={index} value={user._id}>
                      {user.username}
                    </MenuItem>
                  );
                })}
              </Select>

              {rowDataProp.username && (
                <Typography variant="body1" mt={1} fontWeight={600}>
                  {" "}
                  User is : {rowDataProp.username}
                </Typography>
              )}

              {errors.userID && !userID && (
                <p style={{ color: "red", fontSize: "15px" }}>
                  User is required *
                </p>
              )}
            </FormControl>

            <br />

            {/* Image Field */}
            <FormControl>
              <Button
                variant="contained"
                color="info"
                component="label"
                sx={{ textTransform: "capitalize" }}
              >
                Upload Image
                <TextField
                  type="file"
                  {...register("imageFile", { required: true })}
                  onChange={(e: any) => {
                    uploadImage(e);
                  }}
                  sx={{ display: "none" }}
                />
              </Button>
              {errors.imageFile && !imageFile && (
                <p style={{ color: "red", fontSize: "15px" }}>
                  Image is required *
                </p>
              )}
              {/* Show Image Path when uploaded */}
              {imagePath && (
                <Typography variant="body1" marginTop={2}>
                  <span style={{ fontWeight: "600" }}>Image path</span> :{" "}
                  {imagePath}
                </Typography>
              )}
            </FormControl>
            <br />

            {/* Deadline Field */}
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(deadline)}
                  {...register("deadline", { required: true })}
                  onChange={(event: any) => {
                    setDeadline(moment(event.$d).format("MM/DD/YYYY"));
                  }}
                />
              </LocalizationProvider>
              {errors.deadline && !deadline && (
                <p style={{ color: "red", fontSize: "15px" }}>
                  Deadline is required *
                </p>
              )}
            </FormControl>
            <br />

            {/* Description Field */}
            <FormControl>
              <TextField
                type="text"
                label="Description"
                value={description}
                {...register("description", { required: true })}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {errors.description && !description && (
                <p style={{ color: "red", fontSize: "15px" }}>
                  Description is required *
                </p>
              )}
            </FormControl>
            <br />

            {/* Buttons */}
            <FormControl>
              <Button type="submit" variant="contained" color="secondary">
                {rowDataProp.title ? "Edit-Task" : "Add-Task"}
              </Button>

              {/* Cancel Button */}
              <Button
                variant="contained"
                color="error"
                onClick={cancelDialog}
                sx={{ marginTop: "5px" }}
              >
                Cancel
              </Button>
            </FormControl>
          </FormControl>
        </Box>
      </form>
    </Dialog>
  );
};

export default AddTaskDialog;
