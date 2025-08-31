# Email Templates for Test Reports

This directory contains React Email templates for sending automated test reports.

## Structure

```
email-templates/
├── TestReportEmail.jsx     # Main email template component
├── emailConfig.js          # Email configuration and utilities
├── sendTestReport.js       # Email sender script
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Features

- **Modern Email Design**: Clean, responsive email template with status-based colors
- **Dynamic Content**: Automatically adapts based on test results
- **Configurable**: Easy to customize SMTP settings and email content
- **Multiple Usage Options**: Can send sample data or custom test reports

## Quick Start

### 1. Install Dependencies

```bash
cd src/email-templates
npm install
```

### 2. Configure Email Settings

Edit `emailConfig.js` to update:
- SMTP server settings
- Email addresses
- Report URL

### 3. Send Test Email

```bash
# Send with sample data
npm run send:sample

# Send with custom data
node sendTestReport.js
```

## Usage Examples

### Send Sample Report

```javascript
import { sendSampleReport } from './sendTestReport.js';

await sendSampleReport();
```

### Send Custom Report

```javascript
import { sendCustomReport } from './sendTestReport.js';

const customData = {
  tests: 10,
  passes: 8,
  failures: 2,
  duration: 15000,
  start: "2025-08-31T12:00:00.000Z",
  end: "2025-08-31T12:15:00.000Z",
  suites: 2,
  passPercent: 80
};

await sendCustomReport(customData);
```

### Import in Other Files

```javascript
import TestReportEmail from './TestReportEmail.jsx';
import { formatDuration, getStatusColor } from './emailConfig.js';
```

## Email Template Features

### Status-Based Design
- **Green Header**: All tests passed
- **Red Header**: Tests failed
- **Gray Header**: No tests run

### Responsive Layout
- Grid-based stats display
- Mobile-friendly design
- Professional styling

### Dynamic Content
- Automatic duration formatting (ms → s → m)
- Date formatting
- Pass rate calculation
- Status indicators

## Configuration

### SMTP Settings
Update the `EMAIL_CONFIG.smtp` object in `emailConfig.js`:

```javascript
smtp: {
  host: "your-smtp-host.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@domain.com",
    pass: "your-password"
  }
}
```

### Email Settings
```javascript
from: '"Your App" <noreply@yourdomain.com>',
to: "recipient@domain.com",
subject: "Test Report",
```

## Development

### Build JSX
```bash
npm run build
```

### Watch Mode
```bash
npm run dev
```

### Testing
The template includes sample data for testing. You can modify `sampleTestData` in `emailConfig.js` to test different scenarios.

## Data Structure

The email template expects a report object with these properties:

```javascript
{
  tests: number,           // Total number of tests
  passes: number,          // Number of passed tests
  failures: number,        // Number of failed tests
  duration: number,        // Test duration in milliseconds
  start: string,           // Start time (ISO string)
  end: string,            // End time (ISO string)
  suites: number,          // Number of test suites
  passPercent: number,    // Pass percentage
  // ... other optional properties
}
```

## Troubleshooting

### Common Issues

1. **JSX Import Error**: Make sure to build the JSX file first with `npm run build`
2. **SMTP Connection**: Verify your SMTP settings and credentials
3. **Missing Dependencies**: Run `npm install` to install all required packages

### Debug Mode
Add console logs to see the email HTML:
```javascript
console.log('Generated HTML:', emailHtml);
```
