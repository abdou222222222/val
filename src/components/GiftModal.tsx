import { useState, useEffect } from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

interface GiftModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GiftModal = ({ isOpen, onClose }: GiftModalProps) => {
    const [animationPhase, setAnimationPhase] = useState<'hidden' | 'gift-appearing' | 'gift-opening' | 'modal-showing'>('hidden');

    useEffect(() => {
        if (isOpen) {
            // Phase 1: Gift box appears
            setAnimationPhase('gift-appearing');

            // Phase 2: After 600ms, gift box opens
            setTimeout(() => {
                setAnimationPhase('gift-opening');
            }, 600);

            // Phase 3: After opening animation (1500ms total), show modal
            setTimeout(() => {
                setAnimationPhase('modal-showing');
            }, 2400);
        } else {
            setAnimationPhase('hidden');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        setAnimationPhase('hidden');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${animationPhase === 'modal-showing' ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            ></div>

            {/* Gift Box Animation */}
            {(animationPhase === 'gift-appearing' || animationPhase === 'gift-opening') && (
                <div className="relative z-20">
                    <div className={`gift-box-container ${animationPhase === 'gift-opening' ? 'opening' : ''}`}>
                        {/* Gift Box */}
                        <div className="gift-box">
                            {/* Box Base */}
                            <div className="box-base"></div>

                            {/* Box Ribbon Vertical */}
                            <div className="ribbon-vertical"></div>

                            {/* Box Ribbon Horizontal */}
                            <div className="ribbon-horizontal"></div>

                            {/* Box Lid */}
                            <div className="box-lid">
                                <div className="lid-top"></div>
                                <div className="bow">
                                    <div className="bow-left"></div>
                                    <div className="bow-right"></div>
                                    <div className="bow-center"></div>
                                </div>
                            </div>

                            {/* Sparkles that appear when opening */}
                            <div className="sparkles">
                                <div className="sparkle sparkle-1"></div>
                                <div className="sparkle sparkle-2"></div>
                                <div className="sparkle sparkle-3"></div>
                                <div className="sparkle sparkle-4"></div>
                                <div className="sparkle sparkle-5"></div>
                                <div className="sparkle sparkle-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Content - appears after gift opens */}
            {animationPhase === 'modal-showing' && (
                <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl animate-modal-pop text-center border border-white/50">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-200 blur-xl opacity-50 rounded-full animate-pulse-soft"></div>
                            <Heart size={80} className="text-rose-500 relative z-10 fill-rose-100 animate-float" />
                            <Sparkles size={24} className="text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                        </div>

                        <h2 className="font-romantic-header text-3xl text-rose-600">
                            A Special Gift For You
                        </h2>

                        <p className="font-romantic-script text-2xl text-gray-600 leading-relaxed">
                            "My love and affection, wrapped in this digital letter, just for you."
                        </p>

                        <div className="text-sm text-gray-400 font-inter italic mt-4">
                            💕 With all my heart 💕
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
