import { motion } from 'framer-motion';
import CharacterRoots from './character/CharacterRoots';
import CharacterBody from './character/CharacterBody';
import CharacterHead from './character/CharacterHead';
import CharacterSpores, { SVGDefinitions } from './character/CharacterSpores';

interface TreeCharacterProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeCharacter({ emotion }: TreeCharacterProps) {
  const getAnimationProps = () => {
    switch (emotion) {
      case 'greeting':
        return {
          rotate: [0, -3, 3, -2, 0],
          y: [0, -15, 0],
          transition: { duration: 1.5, repeat: 1 }
        };
      case 'thinking':
        return {
          rotate: [0, 2, -2, 0],
          y: [0, -5, 0],
          transition: { duration: 4, repeat: Infinity }
        };
      case 'happy':
        return {
          y: [0, -25, -15, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 1.08, 1.03, 1],
          transition: { duration: 1, repeat: 2 }
        };
      case 'presenting':
        return {
          rotate: [0, 5, -5, 0],
          y: [0, -8, 0],
          transition: { duration: 2 }
        };
      default:
        return {
          y: [0, -12, 0],
          rotate: [0, 2, -2, 0],
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  const getEyes = () => {
    switch (emotion) {
      case 'happy':
        return { shape: 'happy', glow: 1.0, size: 1.1 };
      case 'thinking':
        return { shape: 'normal', glow: 0.5, size: 0.9 };
      case 'greeting':
        return { shape: 'wide', glow: 1.0, size: 1.2 };
      default:
        return { shape: 'normal', glow: 0.8, size: 1.0 };
    }
  };

  const getMouth = () => {
    switch (emotion) {
      case 'happy':
        return 'M160 315 Q200 340 240 315';
      case 'thinking':
        return 'M170 315 Q200 325 230 315';
      case 'greeting':
        return 'M165 315 Q200 335 235 315';
      default:
        return 'M170 315 Q200 330 230 315';
    }
  };

  const eyes = getEyes();
  const mouthPath = getMouth();

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      {...getAnimationProps()}
    >
      <svg
        width="700"
        height="1000"
        viewBox="0 0 500 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        <SVGDefinitions />
        <CharacterRoots />
        <CharacterBody emotion={emotion} />
        <CharacterHead emotion={emotion} eyes={eyes} mouthPath={mouthPath} />
        <CharacterSpores emotion={emotion} />
      </svg>
    </motion.div>
  );
}
