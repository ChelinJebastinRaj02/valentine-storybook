import React, { useState } from 'react';
import { reasons } from '../utils/reasons';
import '../styles/Reasons.css';

import confetti from 'canvas-confetti';

const ReasonCard = ({ text }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        if (!isFlipped) {
            // Pop effect!
            const rect = e.target.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 30,
                spread: 70,
                origin: { x, y },
                colors: ['#ffb7b2', '#ff69b4', '#ffd700'],
                disableForReducedMotion: true
            });
        }
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`reason-card ${isFlipped ? 'flipped' : ''}`}
            onClick={handleClick}
        >
            <div className="reason-card-inner">
                <div className="reason-card-front" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' }}>
                    <span className="heart-icon" style={{ fontSize: '3rem', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}>❤️</span>
                    <p style={{ fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Tap to Reveal!</p>
                </div>
                <div className="reason-card-back" style={{ background: '#fff0f5' }}>
                    <p style={{ color: '#d63384', fontWeight: '600' }}>{text}</p>
                </div>
            </div>
        </div>
    );
};

const Reasons = () => {
    return (
        <section className="reasons-section">
            <h2 className="section-title">Why I Love You</h2>
            <div className="reasons-grid">
                {reasons.map((reason, index) => (
                    <ReasonCard key={index} text={reason} />
                ))}
            </div>
        </section>
    );
};

export default Reasons;
