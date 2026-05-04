# TTA Bank Automation Test Suite - Project 4

## 📋 Overview

This project contains automated test scripts for the **TTA Bank Digital Application** using **Playwright** test framework. The test suite includes signup and fund transfer functionalities with a **Custom TTA Reporter** for detailed test reporting with screenshots.

**Website:** https://tta-bank-digital-973242068062.us-west1.run.app/

---

## 📁 Project Structure

```
Project-4_TTA_BANK/
├── signup.spec.ts          # Signup test - Creates account and stores cookies
├── transfer_funds.spec.ts  # Transfer funds test - Uses saved cookies from signup
├── customReporter.ts       # Custom HTML reporter with screenshots and detailed logs
└── README.md              # This file
```

---

## 🧪 Test Cases

### 1. **Signup Test** (`signup.spec.ts`)

**Purpose:** Register a new user account and store authentication cookies for reuse

**Test Steps:**
1. Navigate to the TTA Bank application URL
2. Click on the "Sign up" button
3. Fill signup form with:
   - Full Name: `test`
   - Email: `test@test.com`
   - Password: `1234`
4. Click "Create Account" button
5. Verify dashboard is displayed
6. **Save cookies to `auth.json`** for use in other tests

**Expected Result:** ✅ Account created successfully, cookies saved for subsequent tests

---

### 2. **Transfer Funds Test** (`transfer_funds.spec.ts`)

**Purpose:** Verify fund transfer functionality and balance reduction

**Prerequisites:** 
- Signup test must run first to create `auth.json` with cookies

**Test Steps:**
1. Load cookies from signup session (`auth.json`)
2. Navigate to the application (automatically logged in with cookies)
3. Capture **Original Balance** from dashboard
4. Click "Transfer Funds" on sidebar
5. Enter transfer amount: `5000`
6. Wait for "Review Transfer" form
7. Click "Confirm Transfer" button
8. **Log toast notification message**
9. Navigate back to Dashboard
10. Capture **Updated Balance**
11. **Verify balance is reduced** by the transfer amount

**Expected Result:** ✅ Balance successfully reduced, toast message logged

---

## 🚀 Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests
```bash
npx playwright test tests/Projects/Project-4_TTA_BANK --headed
```

### Run Specific Test
```bash
# Run signup test only
npx playwright test tests/Projects/Project-4_TTA_BANK/signup.spec.ts --headed

# Run transfer funds test only
npx playwright test tests/Projects/Project-4_TTA_BANK/transfer_funds.spec.ts --headed
```

### Options Explained
- `--headed` : Run in headed mode (visible browser)
- `--debug` : Run in debug mode with Playwright Inspector
- `--reporter=list` : Show test results in list format
- `--reporter=html` : Generate HTML report (saved in `playwright-report/`)

---

## 📊 Custom Reporter Features

The **CustomTTAReporter** (`customReporter.ts`) provides:

### 1. **Detailed Test Reports**
- ✅ Test status (passed/failed/skipped)
- ⏱️ Test duration and timing
- 📁 File and suite information
- 🔍 Step-by-step execution details

### 2. **Screenshots Capture**
- 📸 Screenshots for each test step
- 🖼️ Visual evidence of test execution
- 🔴 Enhanced screenshots for failures
- Stored in: `tta-report/` directory

### 3. **Video & Trace Logs**
- 🎬 Video recording of test execution
- 🔍 Playwright trace files for debugging
- 📝 Console logs and error stack traces

### 4. **Real-time Reporting**
- 📡 Live report generation during test execution
- 🎯 Report file: `tta-report/report_YYYYMMDD_HHMMSS.html`
- Auto-generated with timestamp

### 5. **Test Statistics**
- 📊 Total tests executed
- ✅ Passed count
- ❌ Failed count
- ⏭️ Skipped count
- 🔄 Flaky tests detection

---

## 📸 Screenshots & Verification

### Screenshot Locations
```
tta-report/
├── report_YYYYMMDD_HHMMSS.html    # Main HTML report
├── screenshots/                    # Screenshot directory
│   ├── signup_step_1.png
│   ├── signup_step_2.png
│   ├── transfer_step_1.png
│   └── ...
└── videos/                         # Video recordings
```

### View Reports
1. **After test execution**, open the HTML report:
   ```bash
   # Windows
   start tta-report/report_YYYYMMDD_HHMMSS.html
   
   # macOS
   open tta-report/report_YYYYMMDD_HHMMSS.html
   
   # Linux
   xdg-open tta-report/report_YYYYMMDD_HHMMSS.html
   ```

2. **Alternative HTML Report:**
   ```bash
   npx playwright show-report
   ```

---

## 🔐 Authentication & Cookies

### How Cookie Authentication Works

1. **First Run (Signup Test):**
   - Creates new account
   - Captures session cookies from browser
   - Saves to `auth.json` in project root

2. **Subsequent Tests (Transfer Funds):**
   - Loads cookies from `auth.json`
   - Applies cookies to browser context
   - User remains authenticated without re-login

### Cookie File Location
```
e:\Learning_Fundamentals_of_PWTS\auth.json
```

### Cookie Format
```json
[
  {
    "name": "sessionId",
    "value": "...",
    "domain": "tta-bank-digital-973242068062.us-west1.run.app",
    "path": "/",
    "expires": 1234567890,
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  }
]
```

---

## 📝 Console Output Example

```
▶️  STARTING: TTA Bank Signup Test
   📁 File: signup.spec.ts
   📍 Suite: Project-4_TTA_BANK
   ─────────────────────────────────────────────────────
✓ Signup successful and dashboard verified
✓ Cookies saved for subsequent tests
   ⏱️ Duration: 15.234s

▶️  STARTING: TTA Bank Transfer Funds Test
   📁 File: transfer_funds.spec.ts
   📍 Suite: Project-4_TTA_BANK
   ─────────────────────────────────────────────────────
⏳ Waiting for cookies file from signup test...
✓ Cookies loaded from signup session
Original Balance: $50000
✓ Amount 5000 entered
✓ Review Transfer form appeared
✓ Confirm Transfer button clicked
Toast Message: Transfer successful!
Updated Balance: $45000
✓ Balance verified - Reduced by: $5000
   ⏱️ Duration: 22.567s
```

---

## ✅ Verification Checklist

After running tests, verify:

- [ ] **Signup Test Passes**
  - Account created successfully
  - Dashboard displayed
  - `auth.json` file created in project root

- [ ] **Transfer Funds Test Passes**
  - Cookies loaded successfully
  - Original balance captured
  - Amount entered correctly
  - Toast message logged to console
  - Updated balance displayed
  - Balance reduction verified

- [ ] **Screenshots Generated**
  - Check `tta-report/` directory
  - Screenshots captured for each step
  - Visual verification of actions

- [ ] **Report Generated**
  - HTML report created with timestamp
  - Report contains all test details
  - Open in browser to view

---

## 🐛 Troubleshooting

### Issue: "Cookies file not found"
**Solution:** 
- Run signup test first: `npx playwright test .../signup.spec.ts --headed`
- Ensure `auth.json` is created in project root
- Wait for signup to complete before running transfer test

### Issue: "Balance element not found"
**Solution:**
- Wait for page to fully load: `await page.waitForLoadState('networkidle')`
- Check if "Total Balance" text is visible on dashboard
- Increase timeout values if network is slow

### Issue: "Element not visible" error
**Solution:**
- Add `await page.waitForTimeout(2000)` for element rendering
- Ensure proper wait conditions before interactions
- Use `scrollIntoViewIfNeeded` for off-screen elements

### Issue: Test timeout
**Solution:**
- Increase timeout in test: `{ timeout: 10000 }`
- Check internet connection
- Verify application is accessible

---

## 🎯 Test Configuration

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "types": ["node", "@playwright/test"],
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Key Dependencies
- **@playwright/test** - Test framework
- **@types/node** - TypeScript Node definitions
- **playwright** - Browser automation

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Custom Reporters Guide](https://playwright.dev/docs/test-reporters)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

## 👨‍💻 Author Information

**Custom Reporter Author:** Pramod Dutta  
**Website:** https://thetestingacademy.com  
**Reporter Version:** 1.0.0

---

## 📄 License

This project is part of the Learning Fundamentals of Playwright Test Suite.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Playwright documentation
3. Check test output in `tta-report/` directory
4. Enable debug mode: `--debug` flag
