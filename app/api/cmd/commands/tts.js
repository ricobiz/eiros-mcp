export default async function tts({ text }) {
  return {
    ok: true,
    text,
    audio: null   // здесь вставим генерацию через твой TTS позже
  };
}
