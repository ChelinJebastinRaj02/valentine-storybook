import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Landing from '../sections/Landing';
import Timeline from '../sections/Timeline';
import Reasons from '../sections/Reasons';
import Gallery from '../sections/Gallery';
import Letter from '../sections/Letter';
import GiftBox from '../sections/GiftBox';
import '../styles/Storybook.css';

const pages = [
    { component: Landing, title: "Us" },
    { component: Timeline, title: "Our Journey" },
    { component: Reasons, title: "Why I Love You" },
    { component: Gallery, title: "Memories" },
    { component: Letter, title: "My Letter" },
    { component: GiftBox, title: "For You" }
];

const Storybook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection) => {
        const nePage = currentPage + newDirection;
        if (nePage >= 0 && nePage < pages.length) {
            setDirection(newDirection);
            setCurrentPage(nePage);
        }
    };

    const variants = {
        enter: (direction) => ({
            rotateY: direction > 0 ? 110 : -110,
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            transformOrigin: direction > 0 ? "right center" : "left center"
        }),
        center: {
            zIndex: 1,
            rotateY: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            transformOrigin: "center center"
        },
        exit: (direction) => ({
            zIndex: 0,
            rotateY: direction < 0 ? 110 : -110,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            transformOrigin: direction < 0 ? "right center" : "left center"
        })
    };

    const CurrentComponent = pages[currentPage].component;

    return (
        <div className="storybook-container">
            <div className="book-spine"></div>

            <div className="storybook-content">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            rotateY: { type: "spring", stiffness: 100, damping: 20 },
                            x: { type: "spring", stiffness: 100, damping: 20 },
                            opacity: { duration: 0.3 }
                        }}
                        className="storybook-page"
                    >
                        <div className="page-number">Page {currentPage + 1} of {pages.length}</div>
                        <CurrentComponent />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Click zones with visual cues */}
            <div className={`click-zone left ${currentPage === 0 ? 'hidden' : ''}`} onClick={() => paginate(-1)}>
                <div className="edge-cue left"></div>
                <FaChevronLeft className="edge-icon" />
            </div>
            <div className={`click-zone right ${currentPage === pages.length - 1 ? 'hidden' : ''}`} onClick={() => paginate(1)}>
                <div className="edge-cue right"></div>
                <FaChevronRight className="edge-icon" />
            </div>
        </div>
    );
};

export default Storybook;
