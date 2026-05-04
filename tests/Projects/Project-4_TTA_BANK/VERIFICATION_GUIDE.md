# 📸 TTA Bank Test Verification Guide

## Overview

This guide helps you verify test execution through screenshots, custom reporter outputs, and console logs.

---

## 🎬 Test Execution Verification Steps

### Step 1: Run the Tests

```bash
cd e:\Learning_Fundamentals_of_PWTS

# Run signup test first
npx playwright test tests/Projects/Project-4_TTA_BANK/signup.spec.ts --headed

# Then run transfer funds test
npx playwright test tests/Projects/Project-4_TTA_BANK/transfer_funds.spec.ts --headed
```

### Step 2: Check Console Output

**Expected Signup Test Output:**
```
▶️  STARTING: TTA Bank Signup Test
   📁 File: signup.spec.ts
   📍 Suite: Project-4_TTA_BANK
   ─────────────────────────────────────────────────────
✓ Signup successful and dashboard verified
✓ Cookies saved for subsequent tests
   ⏱️ Duration: 15.234s

[chromium] › tests\Projects\Project-4_TTA_BANK\signup.spec.ts:5:5 › TTA Bank Signup Test (15s)
✓ Passed (15s)
```

**Expected Transfer Funds Test Output:**
```
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

[chromium] › tests\Projects\Project-4_TTA_BANK\transfer_funds.spec.ts:5:5 › TTA Bank Transfer Funds Test (22s)
✓ Passed (22s)
```

---

## 📁 Generated Files After Test Execution

### Directory Structure

```
Learning_Fundamentals_of_PWTS/
├── auth.json                        # ✅ Saved cookies
├── tta-report/                      # ✅ Custom reporter output
│   ├── report_20260504_143022.html  # ✅ Main HTML report with timestamp
│   ├── screenshots/                 # ✅ Captured screenshots
│   │   ├── 2026-05-04T14-30-22-signup-1.png
│   │   ├── 2026-05-04T14-30-35-signup-2.png
│   │   ├── 2026-05-04T14-30-45-transfer-1.png
│   │   └── ...
│   └── videos/                      # ✅ Test recordings
│       ├── test-0.webm
│       └── ...
└── playwright-report/               # ✅ Standard Playwright report
    ├── index.html
    └── ...
```

---

## 🔍 Verification Checklist

### ✅ Cookies File Verification

```bash
# Check if cookies were saved
cd e:\Learning_Fundamentals_of_PWTS
dir auth.json
```

**Expected `auth.json` Content:**
```json
[
  {
    "name": "sessionId",
    "value": "abc123xyz789...",
    "domain": "tta-bank-digital-973242068062.us-west1.run.app",
    "path": "/",
    "expires": 1234567890,
    "httpOnly": true,
    "secure": true,
    "sameSite": "Lax"
  },
  {
    "name": "userId",
    "value": "user_test@test.com",
    "domain": "tta-bank-digital-973242068062.us-west1.run.app",
    "path": "/",
    "httpOnly": false,
    "secure": false
  }
]
```

---

### 🎬 Custom Reporter Verification

#### 1. Open HTML Report

```bash
# Windows
start tta-report/report_*.html

# macOS
open tta-report/report_*.html

# Linux
xdg-open tta-report/report_*.html
```

#### 2. Report Contents to Verify

**A. Test Summary Section**
- ✅ Total tests: 2
- ✅ Passed: 2
- ✅ Failed: 0
- ✅ Skipped: 0
- ✅ Total duration: ~37 seconds

**B. Signup Test Details**
- Test name: "TTA Bank Signup Test"
- Status: ✅ PASSED
- Duration: ~15 seconds
- Browser: Chromium
- Steps executed: 6-8 steps
- Screenshots: 3-5 images

**C. Transfer Funds Test Details**
- Test name: "TTA Bank Transfer Funds Test"
- Status: ✅ PASSED
- Duration: ~22 seconds
- Browser: Chromium
- Steps executed: 10-12 steps
- Screenshots: 5-7 images
- Log messages: Toast notification captured

---

### 📸 Screenshots Verification

#### Expected Screenshots Locations

**Signup Test Screenshots:**
1. Initial page load
2. Signup button click
3. Form fields filled
4. Create account clicked
5. Dashboard displayed

**Transfer Funds Test Screenshots:**
1. Dashboard with original balance
2. Transfer funds sidebar click
3. Amount entered (5000)
4. Review transfer form
5. Confirm transfer clicked
6. Toast notification
7. Dashboard with updated balance

#### Verify Screenshots

```bash
# List screenshot files
dir tta-report\screenshots\

# Open specific screenshot
start tta-report\screenshots\*.png
```

**Each screenshot should show:**
- ✅ Correct page state
- ✅ Form fields with data
- ✅ Button highlights during clicks
- ✅ Success messages
- ✅ Updated balance values

---

### 📊 Balance Verification

#### In Console Output

Look for:
```
Original Balance: $50000
Updated Balance: $45000
✓ Balance verified - Reduced by: $5000
```

**Verification Steps:**
- [ ] Original balance is captured (non-zero number)
- [ ] Updated balance is captured (non-zero number)
- [ ] Updated balance < Original balance
- [ ] Reduction amount = 5000 (transfer amount)
- [ ] Toast message logged to console

---

## 🎯 Test Validation Scenarios

### Scenario 1: Signup Test Success
**Expected Flow:**
1. Page loads successfully
2. Sign up button visible and clickable
3. Form fields appear
4. Data entry successful
5. Account created
6. Dashboard displayed
7. Cookies saved to `auth.json`

**How to Verify:**
- ✅ Check console for success messages
- ✅ Verify `auth.json` file exists
- ✅ See "Cookies saved for subsequent tests" message
- ✅ Screenshot shows dashboard

### Scenario 2: Transfer Funds Test Success
**Expected Flow:**
1. Cookies loaded from `auth.json`
2. Authenticated dashboard displayed
3. Original balance captured
4. Transfer funds initiated
5. Amount entered successfully
6. Review form displayed
7. Transfer confirmed
8. Toast message shown
9. Dashboard updated
10. Balance reduced by transfer amount

**How to Verify:**
- ✅ Check console for "Cookies loaded" message
- ✅ Verify original balance is displayed
- ✅ Verify transfer amount (5000) shown
- ✅ Toast message in console
- ✅ Updated balance less than original
- ✅ Reduction confirmed

---

## 🔧 Advanced Verification

### View Test Trace Files (Debug)

```bash
# Run with trace enabled
npx playwright test tests/Projects/Project-4_TTA_BANK --trace=on

# View trace
npx playwright show-trace test-results/<test-name>/trace.zip
```

### View Video Recordings

```bash
# Videos are in test results
dir playwright-report\data\

# Open video
start test-results\<test-name>\video.webm
```

### Generate Detailed Report

```bash
# Run with JSON reporter
npx playwright test tests/Projects/Project-4_TTA_BANK --reporter=json > results.json

# View JSON results
type results.json
```

---

## 📋 Troubleshooting Verification Issues

### Issue: "No Screenshots Captured"

**Solution:**
1. Check if `tta-report/` directory exists
2. Run tests in headed mode: `--headed`
3. Check customReporter.ts configuration
4. Ensure test doesn't skip screenshot steps

### Issue: "Cookies Not Saved"

**Solution:**
1. Check file permissions on project folder
2. Run signup test again
3. Verify `auth.json` created in root directory
4. Check console for "Cookies saved" message

### Issue: "Report Not Generated"

**Solution:**
1. Verify `tta-report/` directory was created
2. Check file name format: `report_YYYYMMDD_HHMMSS.html`
3. Open HTML file in browser
4. Check browser console for JavaScript errors

### Issue: "Balance Verification Failed"

**Solution:**
1. Verify balance elements are visible on page
2. Check console for original/updated balance logs
3. Ensure wait times are adequate
4. Check page structure matches selector

---

## 📸 Visual Inspection Guide

### What Good Screenshots Look Like

**✅ Signup Step - Form Filled**
```
┌─────────────────────────────────────┐
│  TTA Bank Signup                    │
├─────────────────────────────────────┤
│ Full Name: [test            ]       │
│ Email: [test@test.com       ]       │
│ Password: [****             ]       │
│                                     │
│ [Create Account Button]             │
└─────────────────────────────────────┘
```

**✅ Dashboard - Balance Shown**
```
┌─────────────────────────────────────┐
│  Dashboard                          │
├─────────────────────────────────────┤
│ Total Balance                       │
│ $50000                              │
│                                     │
│ [Transfer Funds] [Other Actions]    │
└─────────────────────────────────────┘
```

**✅ Transfer Confirmation**
```
┌─────────────────────────────────────┐
│  ✓ Transfer successful!             │
│                                     │
│  Total Balance                      │
│  $45000                             │
└─────────────────────────────────────┘
```

---

## 🎓 Manual Verification Steps

If automatic verification fails, manually verify:

### Test 1: Signup
1. [ ] Navigate to application URL
2. [ ] Click signup button
3. [ ] Enter: Full Name = "test"
4. [ ] Enter: Email = "test@test.com"
5. [ ] Enter: Password = "1234"
6. [ ] Click "Create Account"
7. [ ] Dashboard displays

### Test 2: Transfer
1. [ ] Login with saved account
2. [ ] Navigate to dashboard
3. [ ] Note current balance (e.g., $50,000)
4. [ ] Click "Transfer Funds"
5. [ ] Enter amount: 5000
6. [ ] Click "Confirm Transfer"
7. [ ] Toast message appears
8. [ ] Navigate to dashboard
9. [ ] New balance = Old balance - 5000

---

## 📞 Verification Complete

When all checks pass:

✅ **Tests Verified Successfully**
- Signup test working
- Transfer funds test working
- Cookies properly managed
- Balance verification accurate
- Screenshots captured
- Custom reporter generated
- All console logs present

**Next Steps:**
- Review HTML report in detail
- Share report with team
- Document findings
- Plan additional test cases

---

## 📄 Report Template

**Verification Report Summary**
```
Date: [YYYY-MM-DD]
Execution Time: [HH:MM:SS]
Total Tests: 2
Passed: 2
Failed: 0
Pass Rate: 100%

Signup Test: ✅ PASS
- Cookies saved: YES
- Screenshots: 5
- Duration: 15s

Transfer Funds Test: ✅ PASS
- Cookies loaded: YES
- Original Balance: $50,000
- Transfer Amount: $5,000
- Updated Balance: $45,000
- Balance Reduced: YES ✅
- Toast Message: Logged ✅
- Screenshots: 7
- Duration: 22s

Custom Reporter: ✅ GENERATED
- Location: tta-report/report_YYYYMMDD_HHMMSS.html
- Screenshots: 12
- Videos: 2
- Total Size: ~50MB

Status: ✅ ALL TESTS PASSED
```

---

**Happy Testing! 🎉**