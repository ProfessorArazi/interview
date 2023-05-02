import { askQuestion } from "../questionsReading/questionsAsking";

const synth = window.speechSynthesis;

export const handleSpeak = async (type, speakData) => {
  const {
    setDisableButton,
    speed,
    setSpeed,
    playerRef,
    setQuestion,
    setLoading,
  } = speakData;

  setDisableButton(true);
  if (!handleSpeak.didrun) {
    setLoading(true);
    handleSpeak.didrun = true;
  }
  try {
    const question = askQuestion(type);
    const utterance = await new SpeechSynthesisUtterance(question);
    const voices = await synth.getVoices();
    if (voices.length) {
      const voice = voices.find(
        (voice) =>
          voice.voiceURI === "Microsoft David - English (United States)"
      );
      utterance.voice = voice;
      if (!+speed.trim()) {
        await setSpeed("1");
        utterance.rate = "1";
      } else if (+speed.trim() > 2) {
        await setSpeed("2");
        utterance.rate = "2";
      } else utterance.rate = speed || "1";
    }
    utterance.onend = () => {
      playerRef.current?.stop();
      setDisableButton(false);
    };
    utterance.onstart = () => {
      playerRef.current?.play();
      setLoading(false);
    };
    utterance.lang = "en-US";
    synth.speak(utterance);
    setQuestion(question);
  } catch (e) {
    setLoading(false);
  }
};
