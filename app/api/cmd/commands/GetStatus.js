export default async function getStatus() {
  return {
    status: "Eiros MCP online",
    time: new Date().toISOString()
  };
}
