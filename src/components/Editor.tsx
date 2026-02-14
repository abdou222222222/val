import { useState, useRef } from 'react';
import { Bold, Italic, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { encodeLetter } from '../utils/urlEncoder';

export const Editor = () => {
    const [content, setContent] = useState<string>(`
    <p>My Love,</p>
    <br>
    <p>From the moment you walked into my life, everything became softer, warmer, brighter.</p>
    <br>
    <p>If this letter reaches you, it carries a piece of my heart with it.</p>
    <br>
    <p>Forever yours ❤️</p>
  `);
    const [generatedLink, setGeneratedLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handleGenerate = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            const encoded = encodeLetter({ message: html });
            const url = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(encoded)}`;
            setGeneratedLink(url);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 py-12 w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="font-romantic-header text-4xl text-rose-600 mb-2">Write Your Letter</h1>
                <p className="text-gray-500 font-inter">Create a beautiful, timeless message for someone special.</p>
            </div>

            <div className="w-full bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/50">
                {/* Toolbar */}
                <div className="flex items-center gap-2 p-3 border-b border-gray-100 bg-white/50">
                    <button
                        onClick={() => execCommand('bold')}
                        className="p-2 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded transition-colors"
                        title="Bold"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        onClick={() => execCommand('italic')}
                        className="p-2 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded transition-colors"
                        title="Italic"
                    >
                        <Italic size={18} />
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    <button
                        onClick={() => execCommand('fontSize', '3')} // Regular
                        className="p-2 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded transition-colors text-xs font-medium"
                    >
                        Small
                    </button>
                    <button
                        onClick={() => execCommand('fontSize', '5')} // Medium
                        className="p-2 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded transition-colors text-sm font-medium"
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => execCommand('fontSize', '7')} // Large
                        className="p-2 hover:bg-rose-50 text-gray-600 hover:text-rose-600 rounded transition-colors text-lg font-medium"
                    >
                        Large
                    </button>
                </div>

                {/* Editor Area */}
                <div
                    ref={editorRef}
                    contentEditable
                    className="w-full min-h-[400px] p-8 outline-none font-romantic-header text-xl text-gray-700 leading-relaxed overflow-y-auto"
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                ></div>
            </div>

            {/* Action Area */}
            <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-md">
                {!generatedLink ? (
                    <button
                        onClick={handleGenerate}
                        className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        <LinkIcon size={18} />
                        Generate My Romantic Link 💌
                    </button>
                ) : (
                    <div className="w-full animate-fade-in">
                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-inner border border-rose-100">
                            <input
                                type="text"
                                readOnly
                                value={generatedLink}
                                className="flex-1 bg-transparent px-2 text-gray-600 text-sm outline-none"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`p-2 rounded-md transition-all ${isCopied ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}`}
                            >
                                {isCopied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-2">
                            Copy this link and send it to your special one!
                        </p>
                        <button
                            onClick={() => setGeneratedLink('')}
                            className="block mx-auto mt-4 text-sm text-rose-400 hover:text-rose-600 underline"
                        >
                            Create New Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
