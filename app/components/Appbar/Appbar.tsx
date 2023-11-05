/* Appbar Page */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TasksIcon from "../../icon.ico";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";

export default function Appbar() {

  /* Logout and remove token from local storage */
  const logout = () =>{
    localStorage.removeItem('Token');
  }

  return (
    <Stack direction={{ xs: "row" }} spacing={{ xs: 20, sm: 10, md: 4 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Tasks Icon */}
          <Image src={TasksIcon} alt="TasksIcon" width={35} />

          {/* Tasks */}
          <Link
            href="../../pages/tasks"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "white",
            }}
          >
            <Typography variant="h6" marginLeft="20px">
              Tasks
            </Typography>
          </Link>

          {/* Users */}
          <Link
            href="/pages/users"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "white",
            }}
          >
            <Typography variant="h6" marginLeft="20px">
              Users
            </Typography>
          </Link>

          {/* Spacer */}
          <Box flexBasis={1000}></Box>

          {/* Logout */}
          <Link
            href="/auth/login"
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "white",
            }}
            onClick={logout}
          >
            <Typography variant="h6" marginLeft="20px">
              Logout
            </Typography>
          </Link>

          {/* Translate */}
          <Typography variant="h6" marginLeft="20px">
            Arabic
          </Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
