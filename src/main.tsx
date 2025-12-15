import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./style.css";

import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { PGProvider } from "./context/PGContext";


createRoot(document.getElementById("root")!).render(
    <PGProvider>
        <MantineProvider {...({ withCssVariables: true, withGlobalStyles: true } as any)}>
            <App />
        </MantineProvider>
    </PGProvider>
);
