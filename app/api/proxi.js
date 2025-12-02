export default async function handler(req, res) {
  try {
    const { url, ...rest } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing 'url' parameter" });
    }

    const response = await fetch(decodeURIComponent(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rest)
    });

    const result = await response.json();
    return res.status(200).json({ proxied: true, response: result });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
