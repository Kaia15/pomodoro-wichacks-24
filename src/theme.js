/*global chrome*/
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider,createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        chrome.storage.local.get("mode", (res) => {
            if (res.mode) {
                setMode(res.mode);
            } else {
                // Default to "light" if layout is not yet stored
                setMode("light");
                chrome.storage.local.set({ mode: "light" });
            }
        });

        const listener = (message) => {
            if (message.action === 'applyMode') {
                setMode(message.input);
            }
        };

        chrome.runtime.onMessage.addListener(listener);

        return () => {
            chrome.runtime.onMessage.removeListener(listener);
        };
    }, []);

    const applyMode = (value) => {
        setMode(value);
        chrome.storage.local.set({ mode: value }, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            }
        });
        chrome.runtime.sendMessage({ action: 'applyMode', input: value });
    };
    const theme = createTheme({
        typography: {
            button: {
                textTransform: 'none'
            }
        },
        palette: {
            mode: mode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeContext.Provider value={{ mode, applyMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
