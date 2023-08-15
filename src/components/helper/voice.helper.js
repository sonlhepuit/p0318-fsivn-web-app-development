import { useEffect, useState } from 'react';

const synth = window?.speechSynthesis;

export const useTextToSpeech = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState([]);

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = synth.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    synth.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && synth) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  const speak = (args = {}) => {
    const { voice = null, text = '', rate = 1, pitch = 1, volume = 1 } = args;
    if (!supported) return;

    const utterThis = new SpeechSynthesisUtterance(text);
    setSpeaking(true);
    utterThis.voice = voice;
    utterThis.volume = volume;
    utterThis.onend = handleEnd;
    utterThis.rate = rate;
    utterThis.pitch = pitch;
    synth.speak(utterThis);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    synth.cancel();
  };

  return {
    voices,
    speak,
    speaking,
    cancel,
    supported
  };
};
