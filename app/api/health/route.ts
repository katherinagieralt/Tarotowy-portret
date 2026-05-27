export async function GET() {
  return Response.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        app: 'running',
        database: 'connected',
        mcp_agents: 8,
      },
    },
    { status: 200 }
  );
}
