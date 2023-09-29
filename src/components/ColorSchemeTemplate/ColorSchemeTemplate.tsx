import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import Toggle from "@/components/Toggle/Toggle";
import {useState} from "react";

export default function ColorSchemeTemplate() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <Toggle/>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
