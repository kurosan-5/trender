import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AlertProvider } from "@/context/AlertContext";
import ShowAlert from "@/components/ShowAlert";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import StoreProvider from "@/redux/StoreProvider";
import ResponsiveAppBar from "@/components/AppBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TRENDER",
  description: "TRENDERは交流を深める新型SNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <AlertProvider>
              <ResponsiveAppBar />
              <ShowAlert />
              <main style={{ paddingTop: 74}}>
                {children}
              </main>
            </AlertProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
