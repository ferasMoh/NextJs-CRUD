import { Alert, Snackbar, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";


const ErrorSnackBar = ({ message }: any) => {
  const [open, setOpen] = useState(true);
  const BoxMedia = useMediaQuery("(max-width:800px)");


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
        sx={BoxMedia ? {width : '30%'} : {width : '450px'}}
      />
    </Stack>
  );
};

export default ErrorSnackBar;
