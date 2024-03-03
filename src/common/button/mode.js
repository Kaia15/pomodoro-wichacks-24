import { Button } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "../../theme";

export default function ModeButtonGroup() {
    const {applyMode} = useTheme();
    return (
        <div className="mode-btn-group">
            <style>
                {`
                    .mode-btn-group {
                        width: 50%;
                        border: 2px solid #f8475e;
                        border-radius: 4px;
                        display: flex;
                        flex-direction: row;
                        margin-top: 6px;
                    }
                    .light-mode-btn {
                        flex: 1;
                        width: 100%;
                        border-right: 1px solid #f8475e;
                        border-radius: 0px;
                        color: #f8475e;
                    }
                    .dark-mode-btn {
                        flex: 1;
                        width: 100%;
                        border-left: 1px solid #f8475e;
                        color: #f8475e;
                        border-radius: 0px;
                    }
                `}
            </style>
            <Button className="light-mode-btn" onClick={() => applyMode("light")}>
                <LightModeIcon />
            </Button>
            <Button className="dark-mode-btn" onClick={() => applyMode("dark")}>
                <DarkModeIcon />
            </Button>
        </div>
    )
}