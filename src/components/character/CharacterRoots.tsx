import { motion } from 'framer-motion';

export default function CharacterRoots() {
  return (
    <motion.g
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      {/* Центральные корни */}
      {[
        { x1: 245, y1: 550, x2: 250, y2: 680, thickness: 5, delay: 0 },
        { x1: 255, y1: 550, x2: 252, y2: 700, thickness: 4, delay: 0.1 },
        { x1: 240, y1: 555, x2: 235, y2: 690, thickness: 3.5, delay: 0.2 },
        { x1: 260, y1: 555, x2: 265, y2: 685, thickness: 3.5, delay: 0.15 },
        { x1: 250, y1: 560, x2: 248, y2: 705, thickness: 3, delay: 0.25 },
      ].map((root, i) => (
        <motion.g key={`root-center-${i}`}>
          <motion.path
            d={`M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
            stroke="#3d2817"
            strokeWidth={root.thickness}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
            animate={{
              d: [
                `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
                `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? -8 : 8)} ${(root.y1 + root.y2) / 2} ${root.x2 + (i % 2 ? 3 : -3)} ${root.y2}`,
                `M${root.x1} ${root.y1} Q${(root.x1 + root.x2) / 2 + (i % 2 ? 10 : -10)} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
              ]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: root.delay,
              ease: 'easeInOut'
            }}
          />
          <motion.path
            d={`M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`}
            stroke="#2d1810"
            strokeWidth={root.thickness * 0.6}
            strokeLinecap="round"
            fill="none"
            opacity={0.5}
            animate={{
              d: [
                `M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`,
                `M${root.x2} ${root.y2} Q${root.x2 + 4} ${root.y2 + 10} ${root.x2 + 6} ${root.y2 + 15}`,
                `M${root.x2} ${root.y2} Q${root.x2 - 5} ${root.y2 + 10} ${root.x2 - 8} ${root.y2 + 15}`,
              ]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: root.delay + 0.2,
              ease: 'easeInOut'
            }}
          />
        </motion.g>
      ))}

      {/* Боковые корни слева */}
      {[
        { x1: 220, y1: 540, x2: 180, y2: 660, thickness: 4, delay: 0.3 },
        { x1: 210, y1: 545, x2: 160, y2: 680, thickness: 3, delay: 0.35 },
        { x1: 225, y1: 550, x2: 190, y2: 650, thickness: 3.5, delay: 0.28 },
      ].map((root, i) => (
        <motion.path
          key={`root-left-${i}`}
          d={`M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
          stroke="#3d2817"
          strokeWidth={root.thickness}
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
          animate={{
            d: [
              `M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
              `M${root.x1} ${root.y1} Q${root.x1 - 15} ${(root.y1 + root.y2) / 2} ${root.x2 + 5} ${root.y2}`,
              `M${root.x1} ${root.y1} Q${root.x1 - 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
            ]
          }}
          transition={{
            duration: 3.5 + i * 0.3,
            repeat: Infinity,
            delay: root.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Боковые корни справа */}
      {[
        { x1: 280, y1: 540, x2: 320, y2: 660, thickness: 4, delay: 0.32 },
        { x1: 290, y1: 545, x2: 340, y2: 680, thickness: 3, delay: 0.37 },
        { x1: 275, y1: 550, x2: 310, y2: 650, thickness: 3.5, delay: 0.3 },
      ].map((root, i) => (
        <motion.path
          key={`root-right-${i}`}
          d={`M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`}
          stroke="#3d2817"
          strokeWidth={root.thickness}
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
          animate={{
            d: [
              `M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
              `M${root.x1} ${root.y1} Q${root.x1 + 15} ${(root.y1 + root.y2) / 2} ${root.x2 - 5} ${root.y2}`,
              `M${root.x1} ${root.y1} Q${root.x1 + 20} ${(root.y1 + root.y2) / 2} ${root.x2} ${root.y2}`,
            ]
          }}
          transition={{
            duration: 3.5 + i * 0.3,
            repeat: Infinity,
            delay: root.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </motion.g>
  );
}