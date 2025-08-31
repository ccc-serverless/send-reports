import nodemailer from "nodemailer";
import fetch from "node-fetch";
import { render } from "@react-email/render";
import React from "react";
import MultiProjectReportEmail from "./MultiProjectReportEmail.js";
import { EMAIL_CONFIG } from "./emailConfig.js";

// Project IDs - all 6 projects
const PROJECT_IDS = [
  "68b05ec609d4cadd37167c7e", // vysaha
  "68b0225f2359580bbd1c5bea", // skillcencus
  "68b022552359580bbd1c5be9", // prapti
  "68b022482359580bbd1c5be8", // jayaho
  "68b0223b2359580bbd1c5be7", // ccctraining
  "68b022292359580bbd1c5be6", // cccsnv
];

const API_BASE_URL = process.env.API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/reports/project`;

async function fetchProjectReport(projectId, startDate = "2025-08-31") {
  try {
    const url = `${API_ENDPOINT}/${projectId}?startDate=${startDate}`;
    console.log(`📊 Fetching report for project ${projectId}...`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch report for project ${projectId}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.log(`⚠️ No reports found for project ${projectId}`);
      return null;
    }

    // Get the latest report
    const latestReport = data.data[0];
    console.log(
      `✅ Found report for project ${projectId}: ${latestReport.title}`
    );

    return {
      _id: latestReport._id,
      title: latestReport.title,
      project: latestReport.project,
      createdAt: latestReport.createdAt,
      report: latestReport.content.stats, // Extract the stats from content
    };
  } catch (error) {
    console.error(
      `❌ Error fetching report for project ${projectId}:`,
      error.message
    );
    return null;
  }
}

async function sendMultiProjectReport(
  projectIds = PROJECT_IDS,
  startDate = "2025-08-31"
) {
  try {
    console.log("🚀 Starting multi-project test report email process...");
    console.log(`📋 Fetching reports for ${projectIds.length} projects...`);

    // Fetch reports for all projects
    const projectPromises = projectIds.map((projectId) =>
      fetchProjectReport(projectId, startDate)
    );

    const projectResults = await Promise.all(projectPromises);

    // Filter out null results (failed fetches)
    const projects = projectResults.filter((project) => project !== null);

    if (projects.length === 0) {
      throw new Error("No project reports could be fetched");
    }

    console.log(`📊 Successfully fetched ${projects.length} project reports`);

    // Render the email template
    console.log("📧 Rendering multi-project email template...");
    const emailHtml = await render(
      React.createElement(MultiProjectReportEmail, { projects })
    );

    // Send the email
    console.log("📤 Sending multi-project report email...");
    const transporter = nodemailer.createTransport(EMAIL_CONFIG.smtp);

    const mailOptions = {
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `Multi-Project Test Report - ${projects.length} Projects - ${new Date().toLocaleDateString()}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    // Log summary
    console.log("✅ Multi-project email sent successfully!");
    console.log(`📊 Report Summary:`);
    console.log(`   - Projects: ${projects.length}`);

    const totalTests = projects.reduce(
      (sum, project) => sum + (project.report?.tests || 0),
      0
    );
    const totalPasses = projects.reduce(
      (sum, project) => sum + (project.report?.passes || 0),
      0
    );
    const totalFailures = projects.reduce(
      (sum, project) => sum + (project.report?.failures || 0),
      0
    );

    console.log(`   - Total Tests: ${totalTests}`);
    console.log(`   - Total Passed: ${totalPasses}`);
    console.log(`   - Total Failed: ${totalFailures}`);

    // Log individual project summaries
    projects.forEach((project) => {
      console.log(
        `   - ${project.project}: ${project.report?.tests || 0} tests, ${project.report?.passes || 0} passed, ${project.report?.failures || 0} failed`
      );
    });

    return {
      success: true,
      projects,
      summary: {
        totalProjects: projects.length,
        totalTests,
        totalPasses,
        totalFailures,
      },
    };
  } catch (error) {
    console.error("❌ Error sending multi-project email:", error);
    return { success: false, error: error.message };
  }
}

// Function to send with custom project IDs
export async function sendCustomMultiProjectReport(projectIds, startDate) {
  return await sendMultiProjectReport(projectIds, startDate);
}

// Function to send with default project IDs
export async function sendDefaultMultiProjectReport() {
  return await sendMultiProjectReport();
}

// Function to send with sample data for testing
export async function sendSampleMultiProjectReport() {
  const sampleProjects = [
    {
      _id: "68b05ec609d4cadd37167c7e",
      title: "Report file: vysaha-report-[timestamp]_08312025_122208.json",
      project: "vysaha",
      createdAt: "2025-08-31T12:22:15.312Z",
      report: {
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
      },
    },
    {
      _id: "68b0225f2359580bbd1c5bea",
      title: "Report file: skillcencus-report-[timestamp]_08312025_122208.json",
      project: "skillcencus",
      createdAt: "2025-08-31T12:22:14.195Z",
      report: {
        suites: 2,
        tests: 8,
        passes: 7,
        pending: 0,
        failures: 1,
        start: "2025-08-31T12:21:59.692Z",
        end: "2025-08-31T12:22:08.185Z",
        duration: 12000,
        testsRegistered: 8,
        passPercent: 87.5,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    },
    {
      _id: "68b022552359580bbd1c5be9",
      title: "Report file: prapti-report-[timestamp]_08312025_122208.json",
      project: "prapti",
      createdAt: "2025-08-31T12:22:13.152Z",
      report: {
        suites: 1,
        tests: 3,
        passes: 3,
        pending: 0,
        failures: 0,
        start: "2025-08-31T12:21:59.692Z",
        end: "2025-08-31T12:22:08.185Z",
        duration: 5000,
        testsRegistered: 3,
        passPercent: 100,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    },
    {
      _id: "68b022482359580bbd1c5be8",
      title: "Report file: jayaho-report-[timestamp]_08312025_122208.json",
      project: "jayaho",
      createdAt: "2025-08-31T12:22:11.663Z",
      report: {
        suites: 1,
        tests: 6,
        passes: 5,
        pending: 0,
        failures: 1,
        start: "2025-08-31T12:21:59.692Z",
        end: "2025-08-31T12:22:08.185Z",
        duration: 8000,
        testsRegistered: 6,
        passPercent: 83.3,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    },
    {
      _id: "68b0223b2359580bbd1c5be7",
      title: "Report file: ccctraining-report-[timestamp]_08312025_122208.json",
      project: "ccctraining",
      createdAt: "2025-08-31T12:22:10.283Z",
      report: {
        suites: 2,
        tests: 4,
        passes: 4,
        pending: 0,
        failures: 0,
        start: "2025-08-31T12:21:59.692Z",
        end: "2025-08-31T12:22:08.185Z",
        duration: 6000,
        testsRegistered: 4,
        passPercent: 100,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    },
    {
      _id: "68b022292359580bbd1c5be6",
      title: "Report file: cccsnv-report-[timestamp]_08312025_122208.json",
      project: "cccsnv",
      createdAt: "2025-08-31T12:22:09.404Z",
      report: {
        suites: 1,
        tests: 7,
        passes: 6,
        pending: 0,
        failures: 1,
        start: "2025-08-31T12:21:59.692Z",
        end: "2025-08-31T12:22:08.185Z",
        duration: 9500,
        testsRegistered: 7,
        passPercent: 85.7,
        pendingPercent: 0,
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
    },
  ];

  return await sendMultiProjectReport(
    sampleProjects.map((p) => p._id),
    "2025-08-31"
  );
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  sendDefaultMultiProjectReport();
}

export default sendMultiProjectReport;
