import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { createContext } from "vm";

export const confirmation: any = React.createContext(false);

const ConfirmationDialog = ({ message, open, onClose }: any) => {
  const [confirm, setConfirm] = React.useState(false);

  function handleConfirm() {
    setConfirm(true);
  }
  console.log("from dialog : ", confirm);

  return (
    <confirmation.Provider value={{ confirm, setConfirm }}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmation Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DeleteForeverRoundedIcon fontSize="large" />
            Are you sure you want to {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" onClick={handleConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </confirmation.Provider>
  );
};

export default ConfirmationDialog;
