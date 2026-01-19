import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const healthCheck = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      checks: {
        memory: getMemoryUsage(),
        api: await checkApiConnection(),
      },
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    // ✅ Retorna erro se algo estiver errado
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}

function getMemoryUsage() {
  const usage = process.memoryUsage();
  return {
    rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(usage.external / 1024 / 1024)} MB`,
  };
}

async function checkApiConnection() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/v1/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    return {
      status: response.ok ? "connected" : "error",
      statusCode: response.status,
      url: apiUrl,
    };
  } catch (error) {
    return {
      status: "disconnected",
      error: error instanceof Error ? error.message : "Connection failed",
    };
  }
}
