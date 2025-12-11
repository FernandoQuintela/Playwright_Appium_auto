# 📌 A1QA Assignment – Web & Mobile Automation

This repository contains the implementation of both tasks requested in the **A1QA** technical assignment:

**Test Case 1** (WEB): Steam – Search & Validation using **Playwright**

**Test Case 2** (MOBILE): **Joplin** – Note Creation using **Appium + WebdriverIO**

All tests are fully automated, stable and runnable locally.

---

# 🚀 1. Web Automation (Playwright)

## Tech stack

- Node.js

- Playwright

- Page Object Model

- Built-in Playwright HTML Reporter

---

## How to run

From the root folder:

```bash
npm install
npx playwright install
npx playwright test --headed
```

---

## What the test does

- Opens Steam.

- Searches for **“The Stanley Parable”**.

- Validates that search results contain the expected titles.

- Navigates to the About Steam page via the Charts route
(due to dynamic layout changes in Steam's interface, **Charts → About** provides stable entry).

- Extracts **Online** and **Playing Now** statistics.

- Asserts that **Playing Now < Online**.

- This flow is stable and fully aligned with how Steam currently renders the UI (December 2025).

---

## Reporting

Playwright’s built-in reporter is used:

```bash
npx playwright show-report
```

---

# 📱 2. Mobile Automation (Appium + WebdriverIO)

## Tech stack

- Appium 2

- UiAutomator2 driver

- WebdriverIO

- Mocha test runner

---

## Requirements

- Android Studio installed

- Android emulator running

- Appium server running:

```bash
appium
```

- Joplin installed on the emulator

- Joplin language configured to English

- Location permission denied (prevents UI pop-ups interrupting automation)

---

## Environment setup

Set Android SDK paths:

```bash
ANDROID_HOME=C:\Users\<your_user>\AppData\Local\Android\Sdk
ANDROID_SDK_ROOT=%ANDROID_HOME%.
```

---

## How to run

From /mobile directory:

```bash
npm install
npm test
```

---

## What the mobile test does

- Opens Joplin.

- Waits for “All notes”.

- Taps “+” → “New note”.

- Types “Mobile automation” as the note title.

- Validates that the text was entered correctly.

- Closes the keyboard if visible.

---

## Both mobile tests pass:

- Note creation

- Device ping (system time)

---

## Reporting

Mocha’s built-in console report is used, which meets assignment requirements.

---

# 📂 Project Structure

```bash
a1qa-assignment/
│
├── tests/
│   └── steam.spec.js
├── page-objects/
│   ├── steamHome.page.js
│   ├── gameDetails.page.js
│   └── aboutSteam.page.js
│
└── mobile/
    ├── config/android.caps.js
    ├── tests/pingDevice.spec.js
    └── tests/noteCreation.spec.js

```


---


# ✔️ Notes

- No comments have been left inside test files unless required for type safety.

- Locator strategy for Steam was adjusted due to layout differences when accessing “About” directly.

- Mobile test flow was validated using a physical Joplin installation on the emulator.

---

## 🧠 Autor

Fernando Quintela
QA Automation Engineer

📍 Buenos Aires, Argentina

---
