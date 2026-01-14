import { motion } from 'framer-motion';
import CharacterRoots from './character/CharacterRoots';
import CharacterBody from './character/CharacterBody';
import CharacterHead from './character/CharacterHead';
import CharacterSpores, { SVGDefinitions } from './character/CharacterSpores';

interface TreeCharacterProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting' | 'surprised' | 'sad' | 'excited';
  isTalking?: boolean;
}

export default function TreeCharacter({ emotion, isTalking = false }: TreeCharacterProps) {
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
      case 'surprised':
        return {
          y: [0, -18, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.5, repeat: 1 }
        };
      case 'sad':
        return {
          y: [0, 5, 0],
          rotate: [0, 1, -1, 0],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        };
      case 'excited':
        return {
          y: [0, -15, 0, -10, 0],
          rotate: [0, -8, 8, -5, 0],
          scale: [1, 1.06, 1.02, 1.04, 1],
          transition: { duration: 1.2, repeat: Infinity }
        };
      default:
        return {
          y: [0, -8, 0],
          rotate: [0, 1, -1, 0],
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
        return { shape: 'wide', glow: 1.0, size: 1.0 };
      case 'surprised':
        return { shape: 'wide', glow: 1.0, size: 1.3 };
      case 'sad':
        return { shape: 'normal', glow: 0.4, size: 0.75 };
      case 'excited':
        return { shape: 'wide', glow: 1.0, size: 1.15 };
      default:
        return { shape: 'normal', glow: 0.7, size: 0.85 };
    }
  };

  const getMouth = () => {
    switch (emotion) {
      case 'happy':
        return 'M160 325 Q200 350 240 325';
      case 'thinking':
        return 'M175 325 Q200 332 225 325';
      case 'greeting':
        return 'M170 325 Q200 340 230 325';
      case 'surprised':
        return 'M185 330 Q200 340 215 330';
      case 'sad':
        return 'M175 330 Q200 320 225 330';
      case 'excited':
        return 'M165 325 Q200 345 235 325';
      default:
        return 'M175 325 Q200 335 225 325';
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
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl scale-90"
      >
        <SVGDefinitions />
        <CharacterRoots />
        <CharacterBody emotion={emotion} />
        <CharacterHead emotion={emotion} eyes={eyes} mouthPath={mouthPath} isTalking={isTalking} />
        <CharacterSpores emotion={emotion} />
      </svg>
    </motion.div>
  );
}