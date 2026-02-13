import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../styles/ExplodingHeart.css';

const ExplodingHeart = ({ onExplode }) => {
    const [isExploding, setIsExploding] = useState(false);
    const [clicks, setClicks] = useState(0);
    const REQUIRED_CLICKS = 10; // Explicitly set to > 5 as requested (10 is a good "game" number)

    const handleClick = () => {
        if (isExploding) return;

        const newClicks = clicks + 1;
        setClicks(newClicks);

        // Visual feedback for every click (mini burst)
        confetti({
            particleCount: 15,
            spread: 40,
            origin: { y: 0.5 },
            colors: ['#ff0000', '#ffccd5']
        });

        if (newClicks >= REQUIRED_CLICKS) {
            setIsExploding(true);

            // Massive explosion
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 10,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff0000', '#ffccd5', '#ffffff']
                });
                confetti({
                    particleCount: 10,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff0000', '#ffccd5', '#ffffff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();

            // Trigger page transition after delay
            setTimeout(() => {
                onExplode();
            }, 1500);
        }
    };

    return (
        <AnimatePresence>
            {!isExploding && (
                <motion.div
                    className="exploding-heart-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 20, transition: { duration: 1.5 } }}
                >
                    <motion.div
                        className="giant-heart"
                        onClick={handleClick}
                        whileHover={{ scale: 1 + clicks * 0.1 }}
                        whileTap={{ scale: 0.9 + clicks * 0.1 }}
                        animate={{
                            scale: [1 + clicks * 0.05, 1.05 + clicks * 0.05, 1 + clicks * 0.05],
                            x: [0, -clicks * 2, clicks * 2, -clicks * 2, 0], // Shake intensity increases
                            filter: [
                                `drop-shadow(0 0 ${20 + clicks * 5}px rgba(255,0,0,${0.4 + clicks * 0.1}))`,
                                `drop-shadow(0 0 ${40 + clicks * 10}px rgba(255,0,0,${0.8 + clicks * 0.2}))`,
                                `drop-shadow(0 0 ${20 + clicks * 5}px rgba(255,0,0,${0.4 + clicks * 0.1}))`
                            ]
                        }}
                        transition={{
                            duration: 0.8 / (1 + clicks * 0.5), // Beats faster as it gets "angry"
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ❤️
                        <div className="click-me-text" style={{
                            fontSize: clicks > 5 ? '1.5rem' : '1.2rem',
                            width: '200px',
                            color: '#fff',
                            textShadow: '0 0 10px rgba(0,0,0,0.5)'
                        }}>
                            {clicks === 0 ? "Unlock My Heart" :
                                clicks === 1 ? "Every beat is for you" :
                                    clicks === 2 ? "You're my everything" :
                                        clicks === 3 ? "Closer to our story" :
                                            clicks === 4 ? "Hold on tighter" :
                                                clicks === 5 ? "Almost there, love" :
                                                    clicks === 6 ? "One heart, one soul" :
                                                        clicks === 7 ? "I found home in you" :
                                                            clicks === 8 ? "Forever starts now" :
                                                                clicks === 9 ? "Nearly broken open!" : "POUR OUT MY LOVE!"}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExplodingHeart;
