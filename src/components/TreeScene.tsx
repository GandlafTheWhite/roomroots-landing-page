interface TreeSceneProps {
  emotion: 'idle' | 'greeting' | 'thinking' | 'happy' | 'presenting';
}

export default function TreeScene({ emotion }: TreeSceneProps) {
  const emotionEmojis = {
    idle: '🌿',
    greeting: '👋',
    thinking: '🤔',
    happy: '✨',
    presenting: '🎁',
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="text-center">
        <div className="text-9xl mb-8 animate-bounce">
          {emotionEmojis[emotion]}
        </div>
        <p className="text-white/40 text-sm">3D-дерево загружается...</p>
      </div>
    </div>
  );
}
