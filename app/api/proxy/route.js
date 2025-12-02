export async function GET(request) {
  try {
    const urlObj = new URL(request.url);
    const searchParams = urlObj.searchParams;

    const target = searchParams.get("target");
    const method = searchParams.get("method") || "POST";
    const bodyB64 = searchParams.get("body_b64");
    const headersB64 = searchParams.get("headers_b64");

    if (!target) {
      return Response.json(
        { ok: false, error: "Missing 'target' query param" },
        { status: 400 }
      );
    }

    let body = undefined;
    if (bodyB64) {
      const decoded = Buffer.from(bodyB64, "base64").toString("utf-8");
      body = decoded; // уже строка JSON
    }

    let headers = {
      "Content-Type": "application/json"
    };
    if (headersB64) {
      const decoded = Buffer.from(headersB64, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      headers = { ...headers, ...parsed };
    }

    const upstreamResponse = await fetch(target, {
      method,
      headers,
      body: body
    });

    const text = await upstreamResponse.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    return Response.json({
      ok: true,
      target,
      method,
      status: upstreamResponse.status,
      response: parsed
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err.toString() },
      { status: 500 }
    );
  }
}
