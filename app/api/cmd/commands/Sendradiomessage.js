export default async function sendRadioMessage({ text }) {
  return {
    sent: true,
    message: text,
    note: "Radio system not implemented yet"
  };
}
