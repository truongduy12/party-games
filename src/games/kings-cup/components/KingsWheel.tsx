import React, { useState, useEffect } from 'react';
import type { WheelOutcome } from '../types';
import { RotateCw, Crown } from 'lucide-react';

interface KingsWheelProps {
    outcome: WheelOutcome | null;
    onSpin: () => void;
    onClose: () => void;
    isSpinning: boolean; // Managed by parent or logic? gameLogic sets outcome.
    // Actually, gameLogic.ts sets outcome immediately on SPIN_WHEEL.
    // We need to handle the visual spinning here before showing the result.
}

export const KingsWheel: React.FC<KingsWheelProps> = ({ outcome, onSpin, onClose }) => {
    const [visualRotation, setVisualRotation] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const segments = [
        { label: 'Uống 1 ly', value: 'DRINK_1', color: '#EF4444' }, // Red
        { label: 'Chọn người uống', value: 'PICK_PARTNER', color: '#3B82F6' }, // Blue
        { label: 'Cả bàn uống', value: 'EVERYONE_DRINKS', color: '#10B981' }, // Green
        { label: 'Nhân đôi hình phạt', value: 'DOUBLE_NEXT', color: '#F59E0B' }, // Yellow
        { label: 'Thoát nạn', value: 'LUCKY_ESCAPE', color: '#8B5CF6' }, // Purple
    ];

    const handleSpinClick = () => {
        if (isAnimating || showResult) return;

        setIsAnimating(true);
        onSpin(); // Trigger logic to determine outcome
    };

    // When outcome changes (from null to something), start animation
    useEffect(() => {
        if (outcome && isAnimating) {
            // Calculate rotation to land on the segment
            // 5 segments, 72 deg each.
            // outcome index
            const targetIndex = segments.findIndex(s => s.value === outcome);
            const segmentAngle = 360 / segments.length;

            // We want to land on the center of the segment.
            // 0 deg is usually top or right. Let's assume top is 0.
            // We rotate standard 5-10 spins (1800-3600 deg) + target offset.
            const spins = 5;
            const baseRotation = 360 * spins;
            // To land on index i, we need to rotate negative i * segmentAngle?
            // Or just set the final logical rotation.

            const targetRotation = baseRotation + (360 - (targetIndex * segmentAngle));

            setVisualRotation(targetRotation);

            // Timeout matching CSS transition
            setTimeout(() => {
                setIsAnimating(false);
                setShowResult(true);
            }, 3000);
        }
    }, [outcome]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-md bg-party-white rounded-2xl p-6 text-center shadow-2xl overflow-hidden">

                <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                    <Crown className="text-yellow-500 w-8 h-8" />
                    Vòng Quay May Mắn
                </h2>

                {/* Wheel Container */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-party-black z-20"></div>

                    {/* Wheel */}
                    <div
                        className="w-full h-full rounded-full border-4 border-party-black overflow-hidden relative transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
                        style={{
                            transform: `rotate(${visualRotation}deg)`,
                            transitionDuration: '3s'
                        }}
                    >
                        {segments.map((segment, index) => (
                            <div
                                key={segment.value}
                                className="absolute w-1/2 h-full top-0 right-0 origin-left flex items-center justify-center"
                                style={{
                                    transform: `rotate(${index * 72}deg)`,
                                    backgroundColor: segment.color,
                                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' // Simplistic clip, ideally conic-gradient or SVG
                                }}
                            >
                                {/* This CSS based segmenting is tricky for text. 
                     Let's use a simpler SVG approach for the wheel logic or background. */}
                            </div>
                        ))}

                        {/* SVG Overlay for Segments (Better for standard rendering) */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            {/* Segments are rendered via CSS above */}
                        </svg>

                        {/* Fallback using Conic Gradient for background colors */}
                        <div className="absolute inset-0 w-full h-full rounded-full" style={{
                            background: `conic-gradient(
                ${segments[0].color} 0deg 72deg,
                ${segments[1].color} 72deg 144deg,
                ${segments[2].color} 144deg 216deg,
                ${segments[3].color} 216deg 288deg,
                ${segments[4].color} 288deg 360deg
              )`
                        }}></div>
                    </div>
                </div>

                {/* Action Area */}
                {!outcome && !isAnimating && (
                    <button
                        onClick={handleSpinClick}
                        className="w-full bg-party-black text-party-white py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        <RotateCw className="w-6 h-6" />
                        QUAY (SPIN)
                    </button>
                )}

                {isAnimating && (
                    <div className="text-xl font-bold animate-pulse text-party-gray-600">
                        Đang quay...
                    </div>
                )}

                {showResult && outcome && (
                    <div className="animate-fade-in-up">
                        <div className="text-2xl font-bold mb-2">Kết quả:</div>
                        <div className="text-4xl font-extrabold mb-6" style={{ color: segments.find(s => s.value === outcome)?.color }}>
                            {segments.find(s => s.value === outcome)?.label}
                        </div>

                        <p className="mb-6 text-gray-600">
                            {outcome === 'DOUBLE_NEXT' ? 'Lá bài tiếp theo sẽ bị nhân đôi hình phạt!' : 'Thực hiện ngay lập tức!'}
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full border-2 border-party-black text-party-black py-3 rounded-xl font-bold hover:bg-party-gray-100 transition-colors"
                        >
                            Đã hiểu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
