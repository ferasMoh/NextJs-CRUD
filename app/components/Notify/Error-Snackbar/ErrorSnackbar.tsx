import { Alert, Snackbar, Stack } from "@mui/material";
import { useState } from "react";


const ErrorSnackBar = ({ message }: any) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <Alert
      severity="error"
      variant="filled"
      
    >
      Error Message : {message}
    </Alert>
  );
  return (
    <Stack>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={"Notify"}
        action={action}
      />
    </Stack>
  );
};

export default ErrorSnackBar;
