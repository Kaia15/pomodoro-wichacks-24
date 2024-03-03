import Timer from "../common/timer";
import ModeButtonGroup from "../common/button/mode";
import { useTheme } from "../theme";

export default function MainLayout() {
    const { mode } = useTheme();

    return (
        <div className="app-wrapper">
            <style>
                {`
                    .app-wrapper {
                    width: 100%;
                    padding-top: 10%;
                    padding-bottom: 10%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background-color: ${mode === "light" ? 'white' : '#05050E'};
                    }
                `}
            </style>

            <Timer />
            <ModeButtonGroup />
        </div>
    );
}