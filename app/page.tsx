/* App Page */

"use client";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const admin: any = localStorage.getItem("role") === "admin";
  const user: any = localStorage.getItem("role") === "user";
  useEffect(() => {
    admin
      ? router.push("/pages/tasks")
      : user
      ? router.push("/pages/tasks-user")
      : router.push("/pages/auth/login-user");
  }, []);

  return <Box></Box>;
};

export default Home;
