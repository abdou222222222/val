import { Smartphone } from 'lucide-react';

export const RotateDevicePrompt = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-rose-50 flex flex-col items-center justify-center p-8 text-center portrait:flex hidden">
            <div className="animate-float mb-8 text-rose-500">
                <Smartphone size={64} className="rotate-90" />
            </div>
            <h2 className="text-2xl font-romantic-header text-rose-600 mb-4">
                Please Rotate Your Device
            </h2>
            <p className="text-rose-800/80 font-romantic-script text-xl">
                This experience is best viewed in landscape mode for a magical full-screen envelope view.
            </p>
        </div>
    );
};
