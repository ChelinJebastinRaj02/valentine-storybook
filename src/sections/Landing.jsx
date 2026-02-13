import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/Landing.css';

const Landing = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const heartRef = useRef(null);

    // Start date: Example date, should be configurable
    const startDate = new Date('2023-02-14T00:00:00');
    useEffect(() => {
        // Animation Timeline
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, delay: -0.5 }
            )
            .fromTo(heartRef.current,
                { scale: 0, rotation: -45 },
                { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' },
                "-=1"
            );
    }, []);

    return (
        <section className="landing-section">
            <div className="landing-content">
                <div ref={heartRef} className="floating-heart">
                    ❤️
                </div>
                <h1 ref={titleRef} className="main-title">
                    To My <span className="highlight">Valentine</span>
                </h1>
                <p ref={subtitleRef} className="subtitle">
                    Loving you for
                </p>
                <div className="poetic-intro" style={{
                    marginTop: '2rem',
                    maxWidth: '600px',
                    margin: '2rem auto',
                    lineHeight: '1.8',
                    fontStyle: 'italic',
                    color: '#ffd700',
                    fontSize: '1.3rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    <p>"In the book of my life, every chapter is written with your name. You are the melody that my heart beats to, and the light that guides me home."</p>
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>To the one who holds my soul, forever.</p>
                </div>
            </div>
        </section>
    );
};

export default Landing;
