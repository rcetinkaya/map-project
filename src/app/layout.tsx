"use client"
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";
//Redux
import { Provider } from 'react-redux'; 
import { store } from '@/redux/store'; 
import { metadata } from './metadata';
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ChakraProvider>
          <Provider store={store}> 
            {children}
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
