/*global chrome*/
let timerInterval;
let timerStatus;
let count = 0;
let endCycle = false;
// import { a } from '../src/utils/util';

function startFocus() {
  // console.log(a);
  chrome.storage.local.get("time").then(res => {
    console.log(res.time);
    if (!("time" in res)) chrome.storage.local.set({ time: 2 * 60, running: true, status: "focus" });
  });
  timerStatus = "focus";
  timerInterval = setInterval(() => {
    chrome.storage.local.get("time", (res) => {
      const currentTime = res.time;
      console.log(res.time)
      if (currentTime - 1 > 0) {
        chrome.storage.local.set({ time: currentTime - 1, status: "focus"});
        
      } else {
        clearInterval(timerInterval);
        timerStatus = "break";
        chrome.storage.local.set({ time: 30, running: true, status: "break"});
        // push notification for break timer right here
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'pomodoro.png',
          title: 'Break Notification',
          message: 'It\'s time for a 30-second break!'
        }, function(notificationId) {
          if (chrome.runtime.lastError) {
            console.error('Error creating notification:', chrome.runtime.lastError.message);
          } else {
            console.log('Notification created with ID:', notificationId);
          }
        });
        setTimeout(startBreak, 800); // Start break after 0.8 seconds
      }
    });
  }, 1000);
}

function startBreak() {
  timerStatus = "break";
  timerInterval = setInterval(() => {
    chrome.storage.local.get("time", (res) => {
      const currentTime = res.time;
      console.log(res.time)
      if (currentTime - 1 > 0) {
        chrome.storage.local.set({ time: currentTime - 1, status: "break"});
        
      } else {
        clearInterval(timerInterval);
        timerStatus = "focus";
        chrome.storage.local.set({ time: 2 * 60, running: false, status: "Ready for your next Pomodoro"});
        // push notification for ending cycle right here
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'pomodoro.png',
          title: 'Break Notification',
          message: "Congrats! You've done a Pomodoro Cycle! Open our extension & start a new one!"
        }, function(notificationId) {
          if (chrome.runtime.lastError) {
            console.error('Error creating notification:', chrome.runtime.lastError.message);
          } else {
            console.log('Notification created with ID:', notificationId);
          }
        });
        setTimeout(incrementCount, 1000);
      }
    });
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  chrome.storage.local.set({ time: 2 * 60, running: false, status: "Ready for a new Pomodoro"});
}

function incrementCount() {
  // if (timerStatus == "break") count += 1;
  count += 1;
  console.log(count);
}

function applyMode(value) {
  // console.log(value);
  chrome.storage.local.set({mode: value});
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("already installed!")
  chrome.storage.local.set({ time: 2 * 60, running: false, status: "Ready for a new Pomodoro?", mode: 'light'});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startCycle") {
    startFocus();
    incrementCount();
  } else if (request.action === "restartCycle") {
    stopTimer();
  } else if (request.action === "applyMode") {
    applyMode(request.input);
  }
});
