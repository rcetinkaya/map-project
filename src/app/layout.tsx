"use client"
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Box, ChakraProvider } from "@chakra-ui/react";
import TopMenu from "./components/topMenu";

//Redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ChakraProvider>
          <Provider store={store}>
            <TopMenu />
            <Box pt="16"> 
              {children}
            </Box>
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
