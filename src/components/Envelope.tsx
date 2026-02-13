import { useState } from 'react';
import heartImage from '../assets/page1/Heart.png';
import stickerImage from '../assets/page1/February 14th Valentine\'s Day Postage Stamp Sticker.png';
import stickerImage2 from '../assets/page1/stamp of happy valantyne.png';

interface EnvelopeProps {
    onOpen: () => void;
}

export const Envelope = ({ onOpen }: EnvelopeProps) => {
    const [isOpening, setIsOpening] = useState(false);

    const handleClick = () => {
        if (isOpening) return;
        setIsOpening(true);
        setTimeout(() => {
            onOpen();
        }, 100);
    };

    return (
        <div
            className={`relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-1000 ease-in-out ${isOpening ? 'scale-[1.5] opacity-0' : 'animate-fade-in'}`}
            onClick={handleClick}
        >
            <svg
                viewBox="0 0 300 200"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Background (Inside of Envelope) */}
                <rect x="0" y="0" width="300" height="200" className="fill-rose-100" />

                {/* Letter Preview (Optional, peeking out) */}
                <rect x="20" y="20" width="260" height="160" className="fill-white" opacity="0.8" />


                {/* Bottom Flap */}
                <path d="M0,200 L150,100 L300,200 L0,200 Z" className="fill-rose-200 contrast-125" />

                {/* Left Flap */}
                <path d="M0,0 L150,100 L0,200 L0,0 Z" className="fill-rose-200" />

                {/* Right Flap */}
                <path d="M300,0 L150,100 L300,200 L300,0 Z" className="fill-rose-200" />

                {/* Top Flap (The one that opens) */}
                <g
                    className={`origin-[150px_0px] transition-transform duration-700 ease-in-out z-50`}
                    style={{
                        transformOrigin: '150px 0px',
                        transform: isOpening ? 'scaleY(-1)' : 'scaleY(1)',
                    }}
                >
                    <path d="M0,0 L150,110 L300,0 L0,0 Z" className="fill-rose-300 drop-shadow-md" />
                    {/* Seal - Heart image with "For you" text overlay */}
                    <foreignObject x="115" y="75" width="70" height="70">
                        <div className="relative w-full h-full flex items-center justify-center group cursor-pointer">
                            <img
                                src={heartImage}
                                alt="heart seal"
                                className={`w-full h-full object-contain  transition-transform scale-[60%] duration-200 ${!isOpening && 'group-hover:scale-[65%] group-active:scale-[75%]'}`}
                            />
                            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none  transition-all duration-300 ${!isOpening && 'group-hover:scale-105'}`}>
                                <span className="text-white font-romantic-script -translate-y-0.5 font-semibold text-[10px] drop-shadow-lg" style={{ textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.6)' }}>
                                    For you
                                </span>
                            </div>
                        </div>
                    </foreignObject>
                </g>
            </svg>
            <div className="absolute top-1/6 left-1/8 hover:scale-110 transition-transform duration-200">
                {/* add the stickers here as a img and pos abslutly */}
                <img src={stickerImage} alt="" className="w-48 " />
            </div>
            <div className="absolute bottom-1/12 right-1/6 hover:scale-110 rotate-12 transition-transform duration-200">
                {/* add the stickers here as a img and pos abslutly */}
                <img src={stickerImage2} alt="" className="w-48 " />
            </div>
        </div>
    );
};
