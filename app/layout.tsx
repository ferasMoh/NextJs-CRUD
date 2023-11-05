/* Index Page */

"use client";
import "./styles/globals.css";
import { Tilt_Neon } from "next/font/google";
import Appbar from "./components/Appbar/Appbar";
import { Box, Container, Theme, Typography, createTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { NextFont } from "next/dist/compiled/@next/font";
import axios from 'axios';

axios.interceptors.request.use((request):any => { console.log(request)})

/* custom new Font */
const tiltNeonFont:NextFont = Tilt_Neon({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout(props: React.PropsWithChildren) {
  /* check if showAppbar equal true then Appbar will be shown ,if false hide Appbar  */
  const pathName = usePathname();
  const showAppbar = !(pathName === "/auth/login") ? true : false;

  return (
    <html lang="en">
      <body>
        {showAppbar ? (
          <Box className={tiltNeonFont.className} >
            <Appbar />
            <Container className="container" maxWidth="md" style={{height:'100vh'}}>
              {props.children}
            </Container>
          </Box>
        ) : (
          <main className={tiltNeonFont.className}>{props.children}</main>
        )}
      </body>
    </html>
  );
}
