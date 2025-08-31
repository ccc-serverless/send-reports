import nodemailer from "nodemailer";
import fetch from "node-fetch";
import { render } from "@react-email/render";
import React from "react";
import TestReportEmail from "./TestReportEmail.js";
import { EMAIL_CONFIG, sampleTestData } from "./emailConfig.js";

async function sendTestReport(reportData = null) {
  try {
    console.log("🚀 Starting test report email process...");

    // Use provided data or fetch from URL
    let report;
    if (reportData) {
      console.log("📊 Using provided report data");
      report = reportData;
    } else {
      console.log("📊 Fetching report from URL...");
      try {
        const response = await fetch(EMAIL_CONFIG.reportUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch report: ${response.statusText}`);
        }
        report = await response.json();
      } catch (error) {
        console.log("⚠️ Could not fetch report, using sample data");
        report = sampleTestData;
      }
    }

    console.log("📧 Rendering email template...");
    const emailHtml = await render(React.createElement(TestReportEmail, { report }));

    console.log("📤 Sending email...");
    const transporter = nodemailer.createTransport(EMAIL_CONFIG.smtp);

    const mailOptions = {
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `${EMAIL_CONFIG.subject} - ${new Date().toLocaleDateString()}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    console.log(`📊 Report Summary:`);
    console.log(`   - Total Tests: ${report.tests || 0}`);
    console.log(`   - Passed: ${report.passes || 0}`);
    console.log(`   - Failed: ${report.failures || 0}`);
    console.log(`   - Duration: ${report.duration || 0}ms`);

    return { success: true, report };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
}

// Function to send email with custom data
export async function sendCustomReport(customData) {
  return await sendTestReport(customData);
}

// Function to send email with sample data
export async function sendSampleReport() {
  return await sendTestReport(sampleTestData);
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  sendTestReport();
}

export default sendTestReport;
