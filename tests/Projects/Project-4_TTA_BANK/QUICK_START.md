# 🚀 Quick Start Guide - TTA Bank Tests

## 30-Second Setup

```bash
# 1. Navigate to project
cd e:\Learning_Fundamentals_of_PWTS

# 2. Install dependencies
npm install
npx playwright install

# 3. Run tests
npx playwright test tests/Projects/Project-4_TTA_BANK --headed

# 4. View report
start tta-report/report_*.html
```

---

## What Gets Created

✅ **auth.json** - Authentication cookies  
✅ **tta-report/** - Custom HTML reports with screenshots  
✅ **playwright-report/** - Playwright HTML report  

---

## Test Flow

```
signup.spec.ts
    ↓
    Creates account (test@test.com)
    Saves cookies to auth.json
    ↓
transfer_funds.spec.ts
    ↓
    Loads cookies from auth.json
    Transfers $5000
    Verifies balance reduction
    ↓
Reports Generated
    ↓
    View in browser
```

---

## Expected Results

| Test | Status | Evidence |
|------|--------|----------|
| Signup | ✅ PASS | Dashboard shown, cookies saved |
| Transfer | ✅ PASS | Balance reduced by $5000 |
| Report | ✅ PASS | HTML file with screenshots |

---

## View Results

```bash
# Option 1: Custom reporter
start tta-report/report_*.html

# Option 2: Playwright report
npx playwright show-report

# Option 3: Check cookies
type auth.json

# Option 4: Check console logs
npx playwright test tests/Projects/Project-4_TTA_BANK --headed | tee test.log
```

---

## 📸 Screenshots Captured

✅ Form fields with data  
✅ Button clicks  
✅ Success messages  
✅ Balance before/after  
✅ Toast notifications  

---

## Console Output to Verify

```
✓ Signup successful and dashboard verified
✓ Cookies saved for subsequent tests
✓ Cookies loaded from signup session
Original Balance: $50000
✓ Amount 5000 entered
Toast Message: Transfer successful!
Updated Balance: $45000
✓ Balance verified - Reduced by: $5000
```

---

## 🐛 Quick Troubleshooting

| Error | Fix |
|-------|-----|
| "Cannot find module" | `npm install` |
| "Chromium not found" | `npx playwright install` |
| "Cookies not found" | Run signup test first |
| "Element not found" | Check URL is accessible |

---

## 📚 For More Details

- **Full Docs:** `README.md`
- **Verification Guide:** `VERIFICATION_GUIDE.md`
- **Project Root:** `../../README.md`

---

**That's it! Your tests are ready to run! 🎉**
