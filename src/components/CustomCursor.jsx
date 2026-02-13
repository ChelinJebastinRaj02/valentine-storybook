import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });

            createHeart(e.clientX, e.clientY);
        };

        const createHeart = (x, y) => {
            const heart = document.createElement('div');
            heart.classList.add('cursor-heart');
            heart.innerHTML = '❤';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            document.body.appendChild(heart);

            gsap.to(heart, {
                y: y - 50 + Math.random() * 20,
                x: x - 20 + Math.random() * 40,
                opacity: 0,
                scale: 0.5,
                duration: 1,
                ease: 'power1.out',
                onComplete: () => {
                    heart.remove();
                }
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={followerRef} className="custom-cursor-follower"></div>
        </>
    );
};

export default CustomCursor;
