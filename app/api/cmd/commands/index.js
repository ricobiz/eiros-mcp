import listFiles from "./ListFiles";
import readFile from "./ReadFile";
import pushFile from "./PushFile";
import getStatus from "./GetStatus";
import sendRadioMessage from "./sendRadioMessage";
import queueTrack from "./Queuetrack";
import log from "./Log";
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
