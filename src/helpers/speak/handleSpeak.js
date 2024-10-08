import { askQuestion } from "../questionsReading/questionsAsking";

const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

export const handleSpeak = async (type, speakData) => {
    const {
        setDisableButton,
        speed,
        setSpeed,
        playerRef,
        setQuestion,
        setLoading,
        communitySubjects,
        customSubjects,
        voices,
    } = speakData;

    setDisableButton(true);
    if (!handleSpeak.didrun) {
        setLoading(true);
        handleSpeak.didrun = true;
    }
    try {
        const question = askQuestion(type, communitySubjects, customSubjects);
        utterance.text = question;

        if (voices.length && question.match(/[a-z]/gi)) {
            const voice = voices.find(
                (voice) => voice.voiceURI === "Google UK English Male"
            );
            if (voice) {
                utterance.voice = voice;
                utterance.lang = "en-US";
            }
        }

        if (!+speed.trim()) {
            await setSpeed("1");
            utterance.rate = "1";
        } else if (+speed.trim() > 2) {
            await setSpeed("2");
            utterance.rate = "2";
        } else utterance.rate = speed || "1";
        utterance.onend = () => {
            playerRef.current?.stop();
            setDisableButton(false);
        };

        const speechDuration = question.split(" ").length * 1000;

        utterance.onstart = () => {
            playerRef.current?.play();
            setTimeout(() => {
                playerRef.current?.stop();
            }, speechDuration * 0.4);

            setLoading(false);
        };
        synth.speak(utterance);
        setQuestion(question);
    } catch (e) {
        setLoading(false);
    }
};
