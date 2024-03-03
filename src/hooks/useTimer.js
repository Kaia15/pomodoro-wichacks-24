/*global chrome*/
import { useState, useEffect } from 'react';
import { renderTime } from '../utils/util';
export const useTimer = () => {
    const [time, setTime] = useState(renderTime(2*60));
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(""); // 'focus' or 'break'
    
    useEffect(() => {
        setInterval(() => chrome.storage.local.get(["time", "status", "running"], (res) => {
            setTime(renderTime(res["time"]));
            setStatus(res["status"]);
            setRunning(res["running"]);
        }), 1000);
    }, []);

    useEffect(() => {
        if (!running) {
            setStatus("Ready for a new Pomodoro?");
        }
    }, [running])

    // Handle starting the cycle
    function startCycle() {
        chrome.runtime.sendMessage({ action: 'startCycle' });
        setRunning(true);
    }

    // Handle restarting the cycle
    function restartCycle() {
        setStatus("Ready for a new Pomodoro?");
        // setIsMounted(false);
        chrome.runtime.sendMessage({ action: 'restartCycle' });
    }

    // console.log(running);

    return {
        time, running, status, restartCycle, startCycle
    }
}