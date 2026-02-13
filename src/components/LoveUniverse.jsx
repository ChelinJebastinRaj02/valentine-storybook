import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { loveQuotes } from '../utils/loveQuotes';
import Letter from '../sections/Letter';
import '../styles/LoveUniverse.css';

const LoveUniverse = () => {
    const [floatingElements, setFloatingElements] = useState([]);
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        // Generate floating quotes
        const quoteElements = loveQuotes.map((quote) => ({
            type: 'quote',
            content: quote,
            id: `quote-${quote.id}`,
            style: {
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
            },
            delay: Math.random() * -20,
            duration: Math.random() * 15 + 15
        }));

        setFloatingElements([...quoteElements]);
    }, []);

    const handleScreenClick = (e) => {
        // "Heart Blow" effect on touch/click
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        confetti({
            particleCount: 20,
            spread: 60,
            origin: { x, y },
            shapes: ['heart'],
            colors: ['#ff0000', '#ff69b4', '#ffffff'],
            scalar: 1.2
        });
    };

    return (
        <div className="love-universe" onClick={handleScreenClick}>
            <div className="universe-background"></div>

            {floatingElements.map((el) => {
                return (
                    <motion.div
                        key={el.id}
                        className="floating-quote"
                        style={el.style}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: el.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: el.delay
                        }}
                        whileHover={{ scale: 1.2, zIndex: 100, opacity: 1, color: '#ff69b4' }}
                        onClick={(e) => { e.stopPropagation(); }}
                    >
                        "{el.content.text}"
                    </motion.div>
                );
            })}

            {/* Floating Bottle/Letter Trigger */}
            <motion.div
                className="floating-bottle"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onClick={(e) => { e.stopPropagation(); setShowLetter(true); }}
                whileHover={{ scale: 1.2 }}
            >
                💌
                <div className="bottle-label">Read Me</div>
            </motion.div>

            {/* Love Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        className="letter-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => { e.stopPropagation(); setShowLetter(false); }}
                    >
                        <motion.div
                            className="letter-modal-content"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setShowLetter(false)}>×</button>
                            <Letter isModal={true} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="center-message" style={{ pointerEvents: 'none' }}>
                <h1 style={{ textShadow: '0 0 20px rgba(255,100,100,0.5)' }}>Forever Yours</h1>
                <p>Touch the screen to send love</p>
            </div>
        </div>
    );
};

export default LoveUniverse;
