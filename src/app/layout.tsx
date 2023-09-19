"use client"

import './globals.css'
import React, {useState} from "react";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import HeaderBar from "@/components/HeaderBar/HeaderBar";

export default function RootLayout({children}: { children: any }) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <html>
        <head>
            <script src="../gojs/release/go.js"></script>
            <script src="https://cdnjs.com/libraries/Chart.js"></script>
        </head>
        <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <HeaderBar />
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
        </body>
        </html>
    )
}
