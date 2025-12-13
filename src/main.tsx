import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./style.css";

import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';


createRoot(document.getElementById("root")!).render(
    <MantineProvider {...({ withCssVariables: true, withGlobalStyles: true } as any)}>
        <App />
    </MantineProvider>
);
