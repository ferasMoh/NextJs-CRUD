/* Appbar Page */

"use client";
import * as React from "react";
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TasksIcon from "../../icon.ico";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function Appbar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  /* Logout and remove token from local storage */
  const logout = () => {
    setOpenConfirmation(true);
    handleLogoutConfirmation(false);
  };

  function handleLogoutConfirmation(confirmation: any) {
    if (confirmation === true) {
      setOpenConfirmation(false);
      localStorage.removeItem("Token");
      pathName === "/pages/tasks" || pathName === "/pages/users"
        ? router.push("/pages/auth/login-admin")
        : router.push("/pages/auth/login-user");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
  }

  /* Change Language */
  function changeLanguage(lang: string) {
    const savedLang: any = localStorage.setItem("language", lang);
    i18n.changeLanguage(savedLang);
    window.location.reload();
  }

  function onClose() {
    setOpenConfirmation(false);
  }

  const pathName = usePathname();

  return (
    <Stack direction={{ xs: "row" }}>
      <AppBar position="static" color="secondary" sx={{ borderRadius: "10px" }}>
        <Toolbar>
          {/* Tasks Icon */}
          <Image src={TasksIcon} alt="TasksIcon" width={35} />

          {/* Tasks */}
          <Button
            href={
              localStorage.getItem("role") === "admin"
                ? "/pages/tasks"
                : "/pages/tasks-user"
            }
            color={
              pathName === "/pages/tasks" || pathName === "/pages/tasks-user"
                ? "warning"
                : "inherit"
            }
            sx={{ marginLeft: "15px" }}
          >
            {t("appbar.tasks")}
          </Button>

          {/* Users */}
          <Button
            href={
              localStorage.getItem("role") === "admin"
                ? "/pages/users"
                : "/pages/users-admins"
            }
            color={
              pathName === "/pages/users" || pathName === "/pages/users-admins"
                ? "warning"
                : "inherit"
            }
            sx={{ marginLeft: "15px" }}
          >
            {t("appbar.users")}
          </Button>

          {/* Spacer */}
          <Box flexBasis={"100%"}></Box>

          {/* Logout */}
          <Button color="inherit" onClick={logout}>
            {t("appbar.logout")}
          </Button>

          {/* Translate */}
          <Box marginLeft={2} fontStyle={"italic"} width={150}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="language-input">
                {t("appbar.language")}
              </InputLabel>
              <Select
                labelId="language-input"
                value={localStorage.getItem("language")}
                onChange={(e: any) => changeLanguage(e.target.value)}
                sx={{ color: "wheat" }}
              >
                <MenuItem value="en">{t("appbar.english")}</MenuItem>
                <MenuItem value="ar">{t("appbar.arabic")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>

      {openConfirmation && (
        <ConfirmationDialog
          open={true}
          message={t("appbar.logout")}
          onClose={onClose}
          handleConfirmation={handleLogoutConfirmation}
        />
      )}
    </Stack>
  );
}
