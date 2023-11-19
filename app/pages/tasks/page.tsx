/* Tasks Page */

"use client";
import ErrorSnackBar from "@/app/components/Notify/Error-Snackbar/ErrorSnackbar";
import Loading from "@/app/components/Notify/Loading/loading";
import SuccessSnackBar from "@/app/components/Notify/Success-Snackbar/successSnackbar";
import { Box, Grid, Button, Tooltip, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { DataGrid, renderActionsCell, useGridApiRef } from "@mui/x-data-grid";
import { TasksRowsInterface } from "@/app/DTOs/DTOs";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Image from "next/image";
import taskImage from "../../../public/images/task-image.png";
import AddTaskDialog from "./add-task-dialog";
import api from "@/app/api/api/api";
import ConfirmationDialog from "@/app/components/ConfirmationDialog/ConfirmationDialog";
import { confirmation } from "@/app/components/ConfirmationDialog/ConfirmationDialog";

const Tasks = () => {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(20);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const { confirm, setConfirm }: any = useContext(confirmation);
  const [rowData, setRowData] = useState({});

  /* Tasks Rows */
  const rows: Array<any> = tasks.map(
    (task: TasksRowsInterface, index: number) => {
      return {
        id: index + 1,
        img: renderActionsCell,
        username: task.userId.username,
        userID: task._id, //hidden , only for send to props
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        description: task.description,
        action: renderActionsCell,
      };
    }
  );

  /* Tasks Columns */
  const columns: Array<any> = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "img",
      headerName: "Image",
      width: 120,
      renderCell: () => (
        <Image src={taskImage} alt="taskImage" width={40} height={40} />
      ),
    },
    { field: "username", headerName: "Username", width: 120 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "deadline", headerName: "Deadline", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (rowData: any) => (
        <Box>
          <IconButton onClick={() => EditTask(rowData.row)}>
            <Tooltip title="Edit Task">
              <EditRoundedIcon color="primary" />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => DeleteTask(rowData.row.userID)}>
            <Tooltip title="Delete Task">
              <DeleteRoundedIcon color="error" />
            </Tooltip>
          </IconButton>
        </Box>
      ),
    },
  ];

  /* GET All Tasks */
  useEffect(() => {
    setShowLoading(true);
    const getData = async () => {
      try {
        const response = await api.get("/tasks/all-tasks", {
          onDownloadProgress: () => {
            setLoadingProgress(100);
          },
        });
        const tasksData = response.data.tasks;
        setTasks(tasksData);
        setTimeout(() => {
          setShowLoading(false);
          setLoadingProgress(20);
        }, 1000);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } catch (error: any) {
        setTimeout(() => {
          setShowLoading(false);
          setLoadingProgress(20);
        }, 1000);
        setShowError(true);
        setErrorMessage(error.response.data.message);
        setTimeout(() => {
          setShowError(false);
          if (
            error.response.data.message === "jwt expired" ||
            error.response.data.message === "jwt must be provided" ||
            error.response.data.message === "jwt malformed" ||
            error.response.data.message === "Not Authenticated.."
          ) {
            router.push("/pages/auth/login");
            localStorage.removeItem("Token");
          }
        }, 3000);
      }
    };
    getData();
  }, []);

  /* Open Add Task Dialog */
  function addTask() {
    setRowData({});
    setOpenAddTaskDialog(true);
  }

  /* Open Edit Task Dialog */
  function EditTask(rowData: any) {
    setRowData(rowData);
    setOpenAddTaskDialog(true);
  }

  function DeleteTask(rowUserId: any) {
    setOpenConfirmationDialog(true);
    console.log("Before Proccess : ", confirm);
    if (confirmation) {
      console.log("Delete Task has been successed");
      handleClose();
    } else {
      console.log("not");
    }

    /*       try {
        api.delete(`/tasks/delete-task/${rowUserId}`);
        setOpenConfirmationDialog(false);
      } catch (error) {
        console.log(error);
      } */
  }

  /* Close Add Task Dialog */
  const handleClose = () => {
    setRowData({});
    setOpenAddTaskDialog(false);
    setOpenConfirmationDialog(false);
  };

  return (
    <Grid
      container
      direction={"column"}
      bgcolor={"ButtonHighlight"}
      padding={2}
      borderRadius={8}
    >
      {/* Show Loading Animation Bar */}
      {showLoading && (
        <Grid item xs={1}>
          <Loading progress={loadingProgress} />
        </Grid>
      )}

      {/* Container */}
      <Grid container direction={"column"} item xs={11} padding={1} spacing={3}>
        <Grid item xs={4}>
          {/* Add Task Button */}
          <Button
            onClick={addTask}
            variant="contained"
            color="warning"
            sx={{ width: "150px", height: "40px", borderRadius: "13px" }}
          >
            Add-Task
          </Button>
        </Grid>

        {/* Tasks Table */}
        <Grid container item xs={8}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>

      {/* Show Success */}
      {showSuccess && <SuccessSnackBar message="Getting Tasks" />}
      {/* Show Error */}
      {showError && <ErrorSnackBar message={ErrorMessage} />}
      {/* Add Task Dialog */}
      <AddTaskDialog
        open={openAddTaskDialog}
        onClose={handleClose}
        rowDataProp={rowData}
      />
      {/* Confirmation Dialog */}
      {openConfirmationDialog && (
        <ConfirmationDialog
          message="delete this task"
          open={openConfirmationDialog}
          onClose={handleClose}
        />
      )}
    </Grid>
  );
};

export default Tasks;
