import bouquet from '../assets/page2/bouquet.png';
import violetFlower from '../assets/page2/VilotFlower.png';

import { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';
// DOMPurify removed for zero-dependency approach as planned


interface LetterProps {
    content: string;
    onOpenGift: () => void;
}

export const Letter = ({ content, onOpenGift }: LetterProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay to allow envelope animation to finish conceptually or just fade in
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative w-full max-w-xl mx-auto p-8 md:p-12 bg-[#ffffff] rounded-sm paper-shadow paper-texture transform rotate-1 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none paper-grain"></div>

            <div className="relative z-10 flex flex-col items-center">
                <img
                    src={bouquet}
                    alt=""
                    className="absolute -top-24 -right-32 -rotate-12 w-28 md:w-36 opacity-65 animate-float-subtle-delayed"
                    style={{ animationDelay: '0.5s' }}
                />
                <img
                    src={violetFlower}
                    alt=""
                    className="absolute -left-24     -bottom-16 w-24 md:w-48 opacity-70 animate-float-subtle-delayed"
                    style={{ animationDelay: '1s' }}
                />
                {/* Letter Content */}
                <div
                    className="font-romantic-header text-gray-800 text-lg md:text-xl leading-relaxed text-center prose prose-pink max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Separator */}
                <div className="w-16 h-1 bg-rose-200 rounded-full mb-8 opacity-50"></div>

                {/* Gift Button */}
                <button
                    onClick={onOpenGift}
                    className="group relative px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-inter font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                    <Gift size={18} className="animate-pulse-soft" />
                    <span>View Your Gift</span>
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
};
