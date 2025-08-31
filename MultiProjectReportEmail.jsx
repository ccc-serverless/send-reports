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

export default function MultiProjectReportEmail({ projects }) {
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

  const getStatusColor = (report) => {
    if (report?.failures > 0) return "#ef4444"; // Red for failures
    if (report?.passes > 0) return "#10b981"; // Green for passes
    return "#6b7280"; // Gray for no tests
  };

  const getStatusText = (report) => {
    if (report?.failures > 0) return "❌ Tests Failed";
    if (report?.passes > 0) return "✅ All Tests Passed";
    return "⚠️ No Tests Run";
  };

  const getOverallStatus = () => {
    const totalFailures = projects.reduce(
      (sum, project) => sum + (project.report?.failures || 0),
      0
    );
    const totalTests = projects.reduce(
      (sum, project) => sum + (project.report?.tests || 0),
      0
    );

    if (totalFailures > 0)
      return { color: "#ef4444", text: "❌ Some Projects Have Failures" };
    if (totalTests > 0)
      return { color: "#10b981", text: "✅ All Projects Passed" };
    return { color: "#6b7280", text: "⚠️ No Tests Run" };
  };

  const overallStatus = getOverallStatus();

  return (
    <Html>
      <Head>
        <title>{`Multi-Project Test Report - ${formatDate(new Date())}`}</title>
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
            maxWidth: "800px",
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
              backgroundColor: overallStatus.color,
              padding: "24px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "24px",
              }}
            >
              Smoke Test Report
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
                margin: "8px 0 0 0",
                opacity: 0.9,
              }}
            >
              {overallStatus.text}
            </Text>
            <Text
              style={{
                color: "#ffffff",
                fontSize: "14px",
                margin: "8px 0 0 0",
                opacity: 0.8,
              }}
            >
              {projects.length} Projects • {formatDate(new Date())}
            </Text>
          </Section>

          {/* Summary Stats */}
          <Section style={{ padding: "24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginBottom: "24px",
                marginInline: "24px",
                marginTop: "24px",
              }}
            >
              {/* Total Projects */}
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
                  Projects
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {projects.length}
                </Text>
              </div>

              {/* Total Tests */}
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
                  Total Tests
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#059669",
                    margin: 0,
                  }}
                >
                  {projects.reduce(
                    (sum, project) => sum + (project.report?.tests || 0),
                    0
                  )}
                </Text>
              </div>

              {/* Total Passed */}
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
                  {projects.reduce(
                    (sum, project) => sum + (project.report?.passes || 0),
                    0
                  )}
                </Text>
              </div>

              {/* Total Failed */}
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
                  {projects.reduce(
                    (sum, project) => sum + (project.report?.failures || 0),
                    0
                  )}
                </Text>
              </div>
            </div>
          </Section>

          {/* Project Cards */}
          <Section
            style={{ padding: "0 24px 24px 24px", marginBottom: "24px" }}
          >
            {projects.map((project, index) => {
              const report = project.report;
              const statusColor = getStatusColor(report);
              const statusText = getStatusText(report);

              return (
                <div
                  key={project._id || index}
                  style={{
                    backgroundColor: "#ffffff",
                    border: `2px solid ${statusColor}`,
                    borderRadius: "12px",
                    padding: "20px",
                    margin: "20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Project Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <Text
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#1f2937",
                          margin: 0,
                          textTransform: "capitalize",
                        }}
                      >
                        {project.project ||
                          project.title ||
                          `Project ${index + 1}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {formatDate(project.createdAt)}
                      </Text>
                    </div>
                    <div
                      style={{
                        backgroundColor: statusColor,
                        color: "#ffffff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {statusText}
                    </div>
                  </div>

                  {/* Project Stats Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {/* Tests */}
                    <div
                      style={{
                        backgroundColor: "#f8fafc",
                        padding: "12px",
                        borderRadius: "6px",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          textTransform: "uppercase",
                          margin: "0 0 4px 0",
                          fontWeight: "500",
                        }}
                      >
                        Tests
                      </Text>
                      <Text
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#0f172a",
                          margin: 0,
                        }}
                      >
                        {report?.tests || 0}
                      </Text>
                    </div>

                    {/* Passed */}
                    <div
                      style={{
                        backgroundColor: "#f0fdf4",
                        padding: "12px",
                        borderRadius: "6px",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          textTransform: "uppercase",
                          margin: "0 0 4px 0",
                          fontWeight: "500",
                        }}
                      >
                        Passed
                      </Text>
                      <Text
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#059669",
                          margin: 0,
                        }}
                      >
                        {report?.passes || 0}
                      </Text>
                    </div>

                    {/* Failed */}
                    <div
                      style={{
                        backgroundColor: "#fef2f2",
                        padding: "12px",
                        borderRadius: "6px",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          textTransform: "uppercase",
                          margin: "0 0 4px 0",
                          fontWeight: "500",
                        }}
                      >
                        Failed
                      </Text>
                      <Text
                        style={{
                          fontSize: "20px",
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
                        padding: "12px",
                        borderRadius: "6px",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "10px",
                          color: "#64748b",
                          textTransform: "uppercase",
                          margin: "0 0 4px 0",
                          fontWeight: "500",
                        }}
                      >
                        Duration
                      </Text>
                      <Text
                        style={{
                          fontSize: "20px",
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
                      padding: "12px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      color: "#6b7280",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                      }}
                    >
                      <div>Start: {formatDate(report?.start)}</div>
                      <div>End: {formatDate(report?.end)}</div>
                      <div>Suites: {report?.suites || 0}</div>
                      <div>Pass Rate: {report?.passPercent || 0}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Section>

          {/* Action Button */}
          <Section
            style={{
              padding: "0 24px 24px 24px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <Button
              href="https://ccc-smoke-testing.netlify.app/"
              style={{
                backgroundColor: overallStatus.color,
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              View All Reports
            </Button>
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
              This report was generated automatically by Glen Clarence (Lead)
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
