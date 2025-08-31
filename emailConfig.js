import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables from env.config file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, ".env");

try {
  const envContent = readFileSync(envPath, "utf8");
  const envLines = envContent.split("\n");

  envLines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts.join("=").trim();
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  throw new Error("Required env.config file not found");
}

// Email Configuration
export const EMAIL_CONFIG = {
  // SMTP Configuration
  smtp: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },

  // Email Settings
  from: `"Test Reports" <${process.env.EMAIL_FROM}>`,
  to: process.env.EMAIL_TO,
  subject: "Automated Test Report",

  // Report URL (for fetching real data)
  reportUrl: process.env.API_BASE_URL,
};

// Email utility functions
export const formatDuration = (duration) => {
  if (!duration) return "0ms";
  if (duration < 1000) return `${duration}ms`;
  if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
  return `${(duration / 60000).toFixed(1)}m`;
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
};

export const getStatusColor = (report) => {
  if (report?.failures > 0) return "#ef4444"; // Red for failures
  if (report?.passes > 0) return "#10b981"; // Green for passes
  return "#6b7280"; // Gray for no tests
};

export const getStatusText = (report) => {
  if (report?.failures > 0) return "❌ Tests Failed";
  if (report?.passes > 0) return "✅ All Tests Passed";
  return "⚠️ No Tests Run";
};

// Sample test data for development
export const sampleTestData = {
  suites: 1,
  tests: 5,
  passes: 5,
  pending: 0,
  failures: 0,
  start: "2025-08-31T12:21:59.692Z",
  end: "2025-08-31T12:22:08.185Z",
  duration: 8493,
  testsRegistered: 5,
  passPercent: 100,
  pendingPercent: 0,
  other: 0,
  hasOther: false,
  skipped: 0,
  hasSkipped: false,
};
