import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../styles/GiftBox.css';

const GiftBox = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;

        setIsOpen(true);

        // Confetti explosion
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 },
            colors: ['#ffccd5', '#d4af37', '#fff']
        });

        // Animation handled by CSS class data-open
    };

    return (
        <section className="gift-section">
            <h2 className="section-title">A Special Surprise</h2>

            <motion.div
                className={`gift-container ${isOpen ? 'open' : ''}`}
                onClick={handleOpen}
                animate={!isOpen ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="gift-box">
                    <div className="gift-lid">
                        <div className="gift-bow"></div>
                    </div>
                    <div className="gift-body"></div>
                </div>

                <div className="gift-content">
                    <div className="gift-card">
                        <motion.div
                            className="inner-heart"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        >
                            ❤️
                        </motion.div>
                        <h3 className="mind-blowing-text">My Infinite Love</h3>
                        <div className="love-words">
                            <p>Every moment with you is a gift I never knew I deserved.</p>
                            <p>You are my sunshine, my moon, and all my stars.</p>
                            <p>I love you beyond the boundaries of time and space.</p>
                            <p className="highlight-phrase">Forever & Always</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {!isOpen && <p className="click-hint">Click to open</p>}
        </section>
    );
};

export default GiftBox;
