import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import '../styles/Letter.css';

gsap.registerPlugin(ScrollTrigger);

const Letter = ({ isModal = false }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const letterContent = [
        "My Dearest Love,",
        "From the moment our paths crossed, my world has been brighter.",
        "Every day with you is a new adventure, a new reason to smile.",
        "You are my compass, my anchor, and my sails.",
        "I promise to love you, cherish you, and stand by you,",
        "Today, tomorrow, and forever.",
        "Yours always,",
        "Me"
    ];

    useEffect(() => {
        const lines = textRef.current.children;

        if (!isModal) {
            gsap.fromTo(lines,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.8,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        } else {
            // Simple fade in for modal without ScrollTrigger
            gsap.fromTo(lines,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.5,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        }
    }, [isModal]);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed, user interaction needed first"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section className={`letter-section ${isModal ? 'modal-mode' : ''}`} ref={containerRef}>
            <div className="letter-container paper-texture">
                <div className="music-control" onClick={toggleMusic}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    <span className="music-label">Our Song</span>
                    <FaMusic className={`music-note ${isPlaying ? 'animate' : ''}`} />
                </div>

                <div className="letter-content" ref={textRef}>
                    {letterContent.map((line, index) => (
                        <p key={index} className="handwriting-text">{line}</p>
                    ))}
                </div>

                {/* Hidden Audio Element - User needs to provide 'our-song.mp3' in assets */}
                <audio ref={audioRef} loop>
                    <source src="/src/assets/audio/our-song.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </section>
    );
};

export default Letter;
