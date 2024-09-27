"use client"
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ChakraProvider } from "@chakra-ui/react";
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
            {children}
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
