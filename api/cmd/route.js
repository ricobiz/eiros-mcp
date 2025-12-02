export async function POST(request) {
  const body = await request.json();

  return Response.json({
    ok: true,
    received: body,
    echo: `Eiros MCP server online`
  });
}
