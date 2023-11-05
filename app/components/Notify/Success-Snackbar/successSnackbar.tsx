import { Alert, Snackbar, Stack } from "@mui/material";
import { useState } from "react";

const SuccessSnackBar = ({ message }: any) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <Alert
      severity="success"
      variant="filled"
    >
      {message} has been Successfully
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

export default SuccessSnackBar;
