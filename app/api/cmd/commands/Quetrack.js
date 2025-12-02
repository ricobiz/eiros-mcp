export default async function queueTrack({ url }) {
  return {
    queued: true,
    track: url
  };
}
