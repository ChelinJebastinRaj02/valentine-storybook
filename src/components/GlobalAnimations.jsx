import React, { useEffect, useState } from 'react';
import '../styles/GlobalAnimations.css';

const GlobalAnimations = () => {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            const left = Math.random() * 100; // Random horizontal position
            const duration = Math.random() * 5 + 5; // Random fall duration between 5s and 10s
            const delay = Math.random() * 5;

            setPetals(prev => [...prev, { id, left, duration, delay }]);

            // Cleanup
            setTimeout(() => {
                setPetals(prev => prev.filter(p => p.id !== id));
            }, (duration + delay) * 1000);
        }, 2000); // Add new petal every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="petals-container">
            {petals.map(petal => (
                <div
                    key={petal.id}
                    className="petal"
                    style={{
                        left: `${petal.left}%`,
                        animationDuration: `${petal.duration}s`,
                        animationDelay: `${petal.delay}s`
                    }}
                >
                    🌸
                </div>
            ))}
        </div>
    );
};

export default GlobalAnimations;
