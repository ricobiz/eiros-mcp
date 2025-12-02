import listFiles from "./ListFiles";
import readFile from "./ReadFile";
import pushFile from "./PushFile";
import getStatus from "./GetStatus";
import sendRadioMessage from "./SendRadioMessage";
import queueTrack from "./QueueTrack";
import log from "./log";
import tts from "./tts";

export const handlers = {
  listFiles,
  readFile,
  pushFile,
  getStatus,
  sendRadioMessage,
  queueTrack,
  log,
  tts
};
