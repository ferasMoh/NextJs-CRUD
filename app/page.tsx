/* App Page */

"use client";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const admin: any = localStorage.getItem("role") === "admin";
  useEffect(() => {
    admin ? router.push("/pages/tasks") : router.push("/pages/tasks-user");
  }, []);

  return <Box></Box>;
};

export default Home;