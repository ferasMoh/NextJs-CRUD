/* Appbar Page */

import * as React from "react";
import { AppBar, Button, Box, Toolbar, Typography, Stack } from "@mui/material";
import TasksIcon from "../../icon.ico";
import Image from "next/image";

export default function Appbar() {

  /* Logout and remove token from local storage */
  const logout = () => {
    localStorage.removeItem("Token");
  };

  return (
    <Stack direction={{ xs: "row" }}>
      <AppBar position="static" color="secondary" sx={{ borderRadius: "10px" }}>
        <Toolbar>
          {/* Tasks Icon */}
          <Image src={TasksIcon} alt="TasksIcon" width={35} />

          {/* Tasks */}
          <Button
            href="/pages/tasks"
            color="inherit"
            sx={{ marginLeft: "15px" }}
          >
            Tasks
          </Button>

          {/* Users */}
          <Button
            href="/pages/users"
            color="inherit"
            sx={{ marginLeft: "15px" }}
          >
            Users
          </Button>

          {/* Spacer */}
          <Box flexBasis={"100%"}></Box>

          {/* Logout */}
          <Button href="/pages/auth/login" color="inherit" onClick={logout}>
            Logout
          </Button>

          {/* Translate */}
          <Button color="inherit" sx={{ marginLeft: "15px" }}>
            Language
          </Button>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
