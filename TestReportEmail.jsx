import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";

export default function TestReportEmail({ report }) {
  const formatDuration = (duration) => {
    if (!duration) return "0ms";
    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${(duration / 1000).toFixed(1)}s`;
    return `${(duration / 60000).toFixed(1)}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = () => {
    if (report?.failures > 0) return "#ef4444"; // Red for failures
    if (report?.passes > 0) return "#10b981"; // Green for passes
    return "#6b7280"; // Gray for no tests
  };

  const getStatusText = () => {
    if (report?.failures > 0) return "❌ Tests Failed";
    if (report?.passes > 0) return "✅ All Tests Passed";
    return "⚠️ No Tests Run";
  };

  return (
    <Html>
      <Head>
        <title>{`Test Report - ${formatDate(report?.start)}`}</title>
      </Head>
      <Body
        style={{
          backgroundColor: "#f8fafc",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: getStatusColor(),
              padding: "24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Test Report Summary
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                margin: "8px 0 0 0",
                opacity: 0.9,
              }}
            >
              {getStatusText()}
            </Text>
          </Section>

          {/* Stats Grid */}
          <Section style={{ padding: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {/* Total Tests */}
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 8px 0",
                    fontWeight: "500",
                  }}
                >
                  Total Tests
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {report?.tests || 0}
                </Text>
              </div>

              {/* Passed Tests */}
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 8px 0",
                    fontWeight: "500",
                  }}
                >
                  Passed
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#059669",
                    margin: 0,
                  }}
                >
                  {report?.passes || 0}
                </Text>
              </div>

              {/* Failed Tests */}
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 8px 0",
                    fontWeight: "500",
                  }}
                >
                  Failed
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#dc2626",
                    margin: 0,
                  }}
                >
                  {report?.failures || 0}
                </Text>
              </div>

              {/* Duration */}
              <div
                style={{
                  backgroundColor: "#fffbeb",
                  padding: "16px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 8px 0",
                    fontWeight: "500",
                  }}
                >
                  Duration
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#d97706",
                    margin: 0,
                  }}
                >
                  {formatDuration(report?.duration)}
                </Text>
              </div>
            </div>

            {/* Additional Details */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  margin: "0 0 8px 0",
                  fontWeight: "500",
                }}
              >
                Test Details
              </Text>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                <div>Start Time: {formatDate(report?.start)}</div>
                <div>End Time: {formatDate(report?.end)}</div>
                <div>Suites: {report?.suites || 0}</div>
                <div>Pass Rate: {report?.passPercent || 0}%</div>
              </div>
            </div>

            {/* Action Button */}
            <div style={{ textAlign: "center" }}>
              <Button
                href="#"
                style={{
                  backgroundColor: getStatusColor(),
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "inline-block",
                }}
              >
                View Full Report
              </Button>
            </div>
          </Section>

          {/* Footer */}
          <Hr style={{ margin: "0", borderColor: "#e5e7eb" }} />
          <Section
            style={{
              padding: "16px 24px",
              backgroundColor: "#f9fafb",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              This report was generated automatically by your testing system.
            </Text>
            <Text
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: "4px 0 0 0",
              }}
            >
              Generated on {formatDate(new Date())}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
