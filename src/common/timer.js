/*global chrome*/
import { Button } from '@mui/material';
import { useTimer } from '../hooks/useTimer';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { useTheme } from '../theme';

function Timer() {
  const { time, running, status, restartCycle, startCycle } = useTimer();
  const { mode } = useTheme();
  // console.log(running);

  return (
    <div className='timer'>
      <style>
        {`
          .timer {
            width: 100%;
          }
          .timer-wrapper {
            display: flex;
            align-items: center;
            justify-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
          }
          .remaining-time {
            color: #f8475e;
            font-size: 32px;
            font-weight: bold;
          }
          .timer-btn {
            color: #f8475e;
            border: 2px solid #f8475e;
            margin: 8px 0px;
            font-weight: bold;
            flex: 1;
          }
          .btn-group {
            display: flex;
            flex-direction: column;
            width: 50%;
            // margin-bottom: 10%;
          }
          .timer-status {
            color: #f8475e;
            font-weight: bold;
            font-size: 16px;
          }
        `}

      </style>
      <div className='timer-wrapper'>
        <div className='timer-status'> {status} </div>
        <p className='remaining-time'>{time}</p>
        {/* <p>Status: {status} </p>
      <p> {running ? 'Yes' : 'No'} </p> */}
        <div className='btn-group'>
          <Button onClick={startCycle} className='timer-btn start-btn'
            disabled={status === "focus" || status === "break"} variant='outlined'
            sx={{
              ...(mode === 'light' && {
                '&:disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)', // Change background color
                  color: 'rgba(0, 0, 0, 0.26)', // Change text color
                },
              }),
            }}> Start </Button>
          <Button onClick={restartCycle} className='timer-btn' variant='outlined'> <RestartAltOutlinedIcon /> </Button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
