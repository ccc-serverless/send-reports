import { sendCustomReport } from './sendTestReport.js';

// Test different scenarios
async function testScenarios() {
  console.log('🧪 Testing different email scenarios...\n');

  // Scenario 1: All tests passed
  console.log('📧 Sending "All Tests Passed" scenario...');
  await sendCustomReport({
    tests: 15,
    passes: 15,
    failures: 0,
    duration: 12500,
    start: "2025-08-31T10:00:00.000Z",
    end: "2025-08-31T10:12:30.000Z",
    suites: 3,
    passPercent: 100
  });

  console.log('\n⏳ Waiting 2 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scenario 2: Some tests failed
  console.log('📧 Sending "Some Tests Failed" scenario...');
  await sendCustomReport({
    tests: 20,
    passes: 17,
    failures: 3,
    duration: 18000,
    start: "2025-08-31T11:00:00.000Z",
    end: "2025-08-31T11:18:00.000Z",
    suites: 4,
    passPercent: 85
  });

  console.log('\n⏳ Waiting 2 seconds...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Scenario 3: All tests failed
  console.log('📧 Sending "All Tests Failed" scenario...');
  await sendCustomReport({
    tests: 8,
    passes: 0,
    failures: 8,
    duration: 5000,
    start: "2025-08-31T12:00:00.000Z",
    end: "2025-08-31T12:05:00.000Z",
    suites: 2,
    passPercent: 0
  });

  console.log('\n✅ All test scenarios completed!');
}

// Run the test scenarios
testScenarios().catch(console.error);
