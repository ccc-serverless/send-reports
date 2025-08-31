import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables from .env file
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
  console.log("✅ .env file loaded successfully");
} catch (error) {
  console.log(
    "⚠️ .env file not found, using environment variables from system"
  );
  // Don't throw error, just continue with system environment variables
}

// Email Configuration
export const EMAIL_CONFIG = {
  // SMTP Configuration
  smtp: {
    host: process.env.EMAIL_HOST || "smtpout.secureserver.net",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for port 465
    auth: {
      user: process.env.EMAIL_USER || "glen.eg@cccsnv.com",
      pass: process.env.EMAIL_PASSWORD || "Glen@12345", // Use environment variable
    },
  },

  // Email Settings
  from: `"Test Reports" <${process.env.EMAIL_FROM || "glen.eg@cccsnv.com"}>`,
  to: process.env.EMAIL_TO || "glen.eg@cccsnv.com",
  subject: "Automated Test Report",

  // Report URL (for fetching real data)
  reportUrl: process.env.API_BASE_URL || "http://localhost:5000",
};

// Function to log all environment variables
export const logAllEnvironmentVariables = () => {
  console.log("\n=== ENVIRONMENT VARIABLES LOG ===");
  console.log("Timestamp:", new Date().toISOString());
  console.log("");

  console.log("=== EMAIL CONFIGURATION VARIABLES ===");
  console.log(
    "EMAIL_HOST:",
    process.env.EMAIL_HOST || "Not set (using default)"
  );
  console.log(
    "EMAIL_PORT:",
    process.env.EMAIL_PORT || "Not set (using default)"
  );
  console.log(
    "EMAIL_USER:",
    process.env.EMAIL_USER || "Not set (using default)"
  );
  console.log(
    "EMAIL_PASSWORD:",
    process.env.EMAIL_PASSWORD ? "****" : "Not set (using default)"
  );
  console.log(
    "EMAIL_FROM:",
    process.env.EMAIL_FROM || "Not set (using default)"
  );
  console.log("EMAIL_TO:", process.env.EMAIL_TO || "Not set (using default)");
  console.log(
    "API_BASE_URL:",
    process.env.API_BASE_URL || "Not set (using default)"
  );
  console.log("");

  console.log("=== NODE.JS ENVIRONMENT VARIABLES ===");
  console.log("NODE_ENV:", process.env.NODE_ENV || "Not set");
  console.log("NODE_VERSION:", process.env.NODE_VERSION || "Not set");
  console.log("NODE_PATH:", process.env.NODE_PATH || "Not set");
  console.log("");

  console.log("=== SYSTEM ENVIRONMENT VARIABLES ===");
  console.log("PATH:", process.env.PATH || "Not set");
  console.log("HOME:", process.env.HOME || "Not set");
  console.log("PWD:", process.env.PWD || "Not set");
  console.log("USER:", process.env.USER || "Not set");
  console.log("SHELL:", process.env.SHELL || "Not set");
  console.log("LANG:", process.env.LANG || "Not set");
  console.log("");

  console.log("=== ALL ENVIRONMENT VARIABLES (ALPHABETICAL) ===");
  const envVars = Object.keys(process.env).sort();
  envVars.forEach((key) => {
    const value = process.env[key];
    // Mask sensitive values
    if (
      key.toLowerCase().includes("password") ||
      key.toLowerCase().includes("secret") ||
      key.toLowerCase().includes("key")
    ) {
      console.log(`${key}: ****`);
    } else {
      console.log(`${key}: ${value}`);
    }
  });
  console.log("");
  console.log("=== END ENVIRONMENT VARIABLES LOG ===\n");
};

// Log environment variables when module is loaded (development only)
if (process.env.NODE_ENV !== "production") {
  logAllEnvironmentVariables();
}

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
