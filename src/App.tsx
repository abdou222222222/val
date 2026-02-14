import { useEffect, useState } from 'react';
import { decodeLetter } from './utils/urlEncoder';
import { Envelope } from './components/Envelope';
import { Letter } from './components/Letter';
import { GiftModal } from './components/GiftModal';
import { Decorations } from './components/Decorations';
import { Editor } from './components/Editor';
import { RotateDevicePrompt } from './components/RotateDevicePrompt';

const ViewerMode = ({ content }: { content: string }) => {
  const [step, setStep] = useState<'envelope' | 'letter'>('envelope');
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setStep('letter');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <RotateDevicePrompt />
        <Decorations />

      <div className={`z-10 w-full flex items-center justify-center min-h-[60vh] ${step === 'envelope' ? 'w-full h-screen' : 'max-w-4xl p-4'}`}>
        {step === 'envelope' ? (
          <Envelope onOpen={handleOpenEnvelope} />
        ) : (
          <>
          <Letter content={content} onOpenGift={() => setIsGiftOpen(true)} />
          </>
        )}
      </div>

      <GiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
    </div>
  );
};

const CreatorMode = () => (
  <Editor />
);

const ErrorState = () => (
  <div className="flex items-center justify-center min-h-screen text-rose-600 font-romantic-header text-2xl">
    Invalid or corrupted letter 💔
  </div>
);

function App() {
  const [mode, setMode] = useState<'create' | 'view' | 'loading'>('loading');
  const [letterContent, setLetterContent] = useState<string>('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');

    if (data) {
      const decoded = decodeLetter(data);
      console.log(decoded);
      if (decoded) {
        setLetterContent(decoded.message);
        setMode('view');
      } else {
        setIsError(true);
      }
    } else {
      setMode('create');
    }
  }, []);

  if (isError) return <ErrorState />;
  if (mode === 'loading') return null;

  return (
    <div className="min-h-screen w-full bg-rose-100 text-gray-800 relative overflow-hidden">
      {mode === 'view' ? <ViewerMode content={letterContent} /> : <CreatorMode />}
    </div>
  );
}

export default App;
