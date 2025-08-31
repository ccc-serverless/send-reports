// Integration Example: How to use the email system from your main application
import { sendCustomReport } from "./sendTestReport.js";

// Example 1: Send email after Cypress tests complete
export async function sendCypressReport(cypressResults) {
  try {
    // Transform Cypress results to our email format
    const reportData = {
      tests: cypressResults.totalTests,
      passes: cypressResults.passed,
      failures: cypressResults.failed,
      duration: cypressResults.duration,
      start: cypressResults.startTime,
      end: cypressResults.endTime,
      suites: cypressResults.suites,
      passPercent: (cypressResults.passed / cypressResults.totalTests) * 100,
    };

    const result = await sendCustomReport(reportData);

    if (result.success) {
      console.log("✅ Cypress report email sent successfully");
    } else {
      console.error("❌ Failed to send Cypress report email:", result.error);
    }

    return result;
  } catch (error) {
    console.error("❌ Error in sendCypressReport:", error);
    throw error;
  }
}

// Example 2: Send email after Jest tests complete
export async function sendJestReport(jestResults) {
  try {
    const reportData = {
      tests: jestResults.numTotalTests,
      passes: jestResults.numPassedTests,
      failures: jestResults.numFailedTests,
      duration: jestResults.testResults.reduce(
        (total, result) => total + result.duration,
        0
      ),
      start: jestResults.startTime,
      end: jestResults.endTime,
      suites: jestResults.numTotalTestSuites,
      passPercent:
        (jestResults.numPassedTests / jestResults.numTotalTests) * 100,
    };

    const result = await sendCustomReport(reportData);

    if (result.success) {
      console.log("✅ Jest report email sent successfully");
    } else {
      console.error("❌ Failed to send Jest report email:", result.error);
    }

    return result;
  } catch (error) {
    console.error("❌ Error in sendJestReport:", error);
    throw error;
  }
}

// Example 3: Send email with custom data
export async function sendCustomTestReport(customData) {
  try {
    // Validate required fields
    const requiredFields = ["tests", "passes", "failures", "duration"];
    const missingFields = requiredFields.filter(
      (field) => !(field in customData)
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const result = await sendCustomReport(customData);

    if (result.success) {
      console.log("✅ Custom test report email sent successfully");
    } else {
      console.error(
        "❌ Failed to send custom test report email:",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error("❌ Error in sendCustomTestReport:", error);
    throw error;
  }
}

// Example 4: Conditional email sending based on test results
export async function sendConditionalReport(testResults) {
  try {
    // Only send email if there are failures or if it's a critical test suite
    const shouldSendEmail = testResults.failures > 0 || testResults.isCritical;

    if (!shouldSendEmail) {
      console.log("ℹ️ No email sent - all tests passed and not critical");
      return { success: true, skipped: true };
    }

    const reportData = {
      tests: testResults.tests,
      passes: testResults.passes,
      failures: testResults.failures,
      duration: testResults.duration,
      start: testResults.start,
      end: testResults.end,
      suites: testResults.suites,
      passPercent: (testResults.passes / testResults.tests) * 100,
    };

    const result = await sendCustomReport(reportData);

    if (result.success) {
      console.log("✅ Conditional test report email sent successfully");
    } else {
      console.error(
        "❌ Failed to send conditional test report email:",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error("❌ Error in sendConditionalReport:", error);
    throw error;
  }
}

// Usage examples:
/*
// In your Cypress configuration or after tests
import { sendCypressReport } from './email-templates/integration-example.js';

// After Cypress tests complete
const cypressResults = {
  totalTests: 15,
  passed: 14,
  failed: 1,
  duration: 12000,
  startTime: "2025-08-31T10:00:00.000Z",
  endTime: "2025-08-31T10:12:00.000Z",
  suites: 3
};

await sendCypressReport(cypressResults);

// In your Jest configuration or after tests
import { sendJestReport } from './email-templates/integration-example.js';

// After Jest tests complete
const jestResults = {
  numTotalTests: 25,
  numPassedTests: 23,
  numFailedTests: 2,
  numTotalTestSuites: 5,
  startTime: 1693478400000,
  endTime: 1693478520000,
  testResults: [
    { duration: 5000 },
    { duration: 3000 },
    // ... more test results
  ]
};

await sendJestReport(jestResults);
*/
