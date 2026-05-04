# Learning Playwright Fundamentals with TypeScript

Complete hands-on learning project covering Playwright test automation fundamentals with TypeScript, including basic tests, advanced selectors, multi-browser testing, and custom reporting.

---

## 📁 Project Structure

```
Learning_Fundamentals_of_PWTS/
├── tests/
│   ├── 01_Basics/                  # Basic Playwright concepts
│   │   ├── Lab209.spec.ts
│   │   └── Lab210_Test_Annotations.spec.ts
│   ├── 02_first_tests/             # Initial test scripts
│   │   ├── 211_First_Running_Test.spec.ts
│   │   ├── 212_Browser_Context_Pages.spec.ts
│   │   └── ...
│   ├── 03_Locators_Commands/       # Selector and command techniques
│   │   ├── 219_Commands.spec.ts
│   │   ├── 220_GotoCommands.spec.ts
│   │   └── ...
│   ├── Tasks/                      # Practice tasks by date
│   │   ├── Task_APR16/
│   │   ├── Task_APR23/
│   │   └── ...
│   └── Projects/
│       └── Project-4_TTA_BANK/     # 🌟 TTA Bank Full Project with Custom Reporter
│           ├── signup.spec.ts
│           ├── transfer_funds.spec.ts
│           ├── customReporter.ts
│           └── README.md           # Detailed project documentation
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
└── README.md                        # This file
```

---

## 🌟 Featured Project: TTA Bank Automation

### Project 4 - TTA Bank Digital Application

A complete automation test suite for the TTA Bank digital banking application with:

- **✅ User Signup Test** - Account creation and authentication
- **💰 Fund Transfer Test** - Money transfer with balance verification
- **📊 Custom HTML Reporter** - Detailed reporting with screenshots, videos, and logs
- **🔐 Cookie Authentication** - Secure session management between tests
- **📸 Screenshot Capture** - Visual evidence of test execution
- **📝 Real-time Reporting** - Live test execution reports

### Quick Start

```bash
# Run all TTA Bank tests
npx playwright test tests/Projects/Project-4_TTA_BANK --headed

# View detailed documentation
cat tests/Projects/Project-4_TTA_BANK/README.md
```

**[👉 TTA Bank Project Details](tests/Projects/Project-4_TTA_BANK/README.md)**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Visual Studio Code (recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Learning_Fundamentals_of_PWTS

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Configuration

Ensure `tsconfig.json` includes proper types:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "types": ["node", "@playwright/test"],
    "strict": true
  }
}
```

---

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suite
```bash
# Run Project 4 TTA Bank tests
npx playwright test tests/Projects/Project-4_TTA_BANK --headed

# Run basic concepts tests
npx playwright test tests/01_Basics --headed

# Run specific test file
npx playwright test tests/02_first_tests/211_First_Running_Test.spec.ts --headed
```

### Run with Options
```bash
# Headed mode (visible browser)
npx playwright test --headed

# Debug mode (interactive inspector)
npx playwright test --debug

# Specific browser
npx playwright test --project=chromium

# Generate HTML report
npx playwright test --reporter=html

# View report
npx playwright show-report
```

---

## 📊 Reporting

### Standard HTML Report
After test execution, view the report:

```bash
npx playwright show-report
```

### Custom TTA Reporter (Project 4)
For Project 4 TTA Bank tests:

1. Tests generate custom HTML reports with:
   - Step-by-step execution details
   - Screenshots for each action
   - Video recordings
   - Console logs and errors
   - Real-time statistics

2. Reports saved to:
   ```
   tta-report/report_YYYYMMDD_HHMMSS.html
   ```

3. Open report:
   ```bash
   # Windows
   start tta-report/report_*.html
   
   # macOS
   open tta-report/report_*.html
   
   # Linux
   xdg-open tta-report/report_*.html
   ```

---

## 📚 Learning Path

### Level 1: Basics
- Test structure and annotations
- Basic selectors (CSS, XPath)
- Simple interactions (click, fill, type)

**Files:** `tests/01_Basics/`

### Level 2: First Tests
- Browser contexts and pages
- Multiple browser instances
- Page navigation

**Files:** `tests/02_first_tests/`

### Level 3: Advanced Locators
- Playwright locators API
- Role-based selectors
- XPath expressions
- Visual locators

**Files:** `tests/03_Locators_Commands/`

### Level 4: Practice Tasks
- Real-world scenarios
- Form automation
- Login flows
- Data verification

**Files:** `tests/Tasks/`

### Level 5: Full Project
- Complete application testing
- Custom reporters
- Cookie management
- Advanced assertions

**Files:** `tests/Projects/Project-4_TTA_BANK/`

---

## 🎯 Test Statistics

| Test Suite | Count | Status |
|-----------|-------|--------|
| Basics | 2 | ✅ Learning |
| First Tests | 5 | ✅ Learning |
| Locators & Commands | 6 | ✅ Learning |
| Tasks | Multiple | ✅ Practice |
| **TTA Bank Project** | **2** | **✅ Complete** |

---

## 📋 Checklist for TTA Bank Tests

- [x] Signup test - Account creation and authentication
- [x] Transfer funds test - Money transfer functionality
- [x] Cookie authentication - Session persistence
- [x] Balance verification - Amount reduction confirmation
- [x] Toast notifications - Message logging
- [x] Screenshot capture - Visual evidence
- [x] Custom reporter - Detailed HTML reports
- [x] Error handling - Timeout and retry logic
- [x] TypeScript types - Strict type checking

---

## 🔧 Configuration Files

### `playwright.config.ts`
```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30000,
  expect: { timeout: 5000 },
  use: { trace: 'on-first-retry' },
  reporter: 'html',
  projects: [{ name: 'chromium' }]
});
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node", "@playwright/test"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### `package.json`
```json
{
  "devDependencies": {
    "@playwright/test": "^latest",
    "@types/node": "^latest",
    "typescript": "^latest"
  }
}
```

---

## 💡 Key Concepts Covered

✅ Selectors (CSS, XPath, Accessibility)  
✅ Interactions (Click, Fill, Type, Hover)  
✅ Navigation (Goto, Back, Forward, Reload)  
✅ Wait Strategies (WaitForSelector, WaitForNavigation)  
✅ Multiple Contexts & Pages  
✅ Screenshots & Videos  
✅ Assertions & Expectations  
✅ Error Handling & Retries  
✅ Custom Reporters  
✅ Cookie Management  
✅ Form Automation  
✅ API Testing Concepts  

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Tests fail with "element not found"**
- Ensure page has loaded: `await page.waitForLoadState('networkidle')`
- Increase timeouts: `{ timeout: 10000 }`
- Use `--debug` mode to inspect elements

**Issue: "Cannot find module" error**
- Run: `npm install`
- Check `tsconfig.json` has `"node"` in types

**Issue: Browser automation fails**
- Install browsers: `npx playwright install`
- Check internet connection
- Verify application URL is accessible

**Issue: Screenshots not captured**
- Ensure test fails or explicitly capture: `await page.screenshot()`
- Check disk space in `playwright-report/`

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Test API Reference](https://playwright.dev/docs/api/class-test)
- [Selector Guide](https://playwright.dev/docs/selectors)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

## 👥 Contributors

Created as part of The Testing Academy learning initiative.

**Website:** https://thetestingacademy.com

---

## 📄 License

This project is for educational purposes as part of Playwright Fundamentals learning.

---

## 🔗 Quick Links

- [TTA Bank Project README](tests/Projects/Project-4_TTA_BANK/README.md)
- [Playwright Official Docs](https://playwright.dev)
- [The Testing Academy](https://thetestingacademy.com)

---

**Last Updated:** May 4, 2026  
**Playwright Version:** Latest  
**TypeScript Version:** Latest
