# Your Pomo.

Demo here: 


## Description (Pitch Idea):
"Your Pomo." Chrome extension offers a straightforward Pomodoro Technique implementation with a 25-minute countdown timer for work sessions followed by a 5-minute break. Users can start, pause, and restart the timer without navigating to another timer tab, promoting work & study productivity.

**P/s: for testing purpose, I already set default timing 2-minute focus time and 30-second break time.**
**Tech-stacks: React.js, MUI, Chrome API(s), HTML, CSS.**

## Available Scripts

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Build your service-worker.js

- Call Chrome API(s) asynchronously & use timing functions to handle counting down & pushing notifications without opening extension pop-up.
- Break the code down as much as possible. 
- Chrome will play a role as an event listener to listen and resolve all requests (action) from our react server.

## Re-config your manifest.json

My application's sample:

```
{
  "short_name": "React App",
  "name": "Your Pomo.",
  "manifest_version": 3,
  "version": "1.0",
  "description": "Description of your extension", // Change to your own description, for this app, I'd like to update: no more tabs, just stay focused.
  "icons": {
    "16": "pomodoro.png",
    "32": "pomodoro.png",
    "48": "pomodoro.png",
    "128": "pomodoro.png"
  },
  "permissions": [
    "storage", 
    "notifications" // don't forget to add those fields, since forgetting will impact the activity of the whole extension.
  ],
  "background": {
    "service_worker": "service-worker.js" // since Google does not support manifest.json v2, we swith to the latest version v3 => now, our background script will be service-worker.js
  },
  "action": {
    "default_popup": "index.html",
    "default_title": "Open Extension"
  }
}
```

## React 

### Declaring chrome: 

For the extension noticing its context, don't forget to add `/*global chrome*/` at the first line of each script. Without doing that, "chrome is undefined" will stop the app running.

### Using hooks:

Split logics & UI(s) by using hook. Right now, there is a hook called "useTimer" to set states & send requests to background script.

### Using MUI library to facilitate interactive UI

Referring to this library, we will reorder some components and customize those components with in-file style.

## Deploy:

1. Register your google account to access google developer.
2. Read documentations to understand how to implement Chrome API.
3. Each time making changes in "service-worker.js" & "manifest.json", compile it by running commmand `npm run build`. => Remove the extension from the developer dashboard & Load unpacked of "build" folder again.
4. Without updating "service-worker.js", just normally `npm run build` & reload the extension to see the updates of react components.

## Notification Setting (optional, but highly recommended to maximize the use of this app).

Add extension ID to your allowed website in Privacy Setting & Turn on Chrome notifications (your local desktop & laptop setting) to receive the notifications from Your Pomo.
