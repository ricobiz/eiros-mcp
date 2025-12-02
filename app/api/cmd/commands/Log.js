export default async function log({ message }) {
  console.log("[EirosLog]", message);
  return { logged: true };
}
