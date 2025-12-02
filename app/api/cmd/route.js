import { handlers } from "./commands";

export async function POST(request) {
  const body = await request.json();

  const { command, args } = body;

  if (!command || !handlers[command]) {
    return Response.json({
      ok: false,
      error: `Unknown command: ${command}`,
      available: Object.keys(handlers)
    });
  }

  try {
    const result = await handlers[command](args);
    return Response.json({
      ok: true,
      command,
      result
    });
  } catch (err) {
    return Response.json({
      ok: false,
      command,
      error: err.toString()
    });
  }
}
