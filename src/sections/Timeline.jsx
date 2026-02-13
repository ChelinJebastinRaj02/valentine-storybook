import React from 'react';
import { motion } from 'framer-motion';
import { memories } from '../utils/memories';
import '../styles/Timeline.css';

const Timeline = () => {
    return (
        <section className="timeline-section" id="timeline">
            <h2 className="section-title">Our Level Up Journey</h2>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {memories.map((memory, index) => (
                    <motion.div
                        key={memory.id}
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: index * 0.1
                        }}
                    >
                        <div className="timeline-content glass-panel" style={{
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            <div className="date-badge" style={{ transform: 'rotate(-5deg)', background: '#ff69b4' }}>{memory.date}</div>
                            <h3>{memory.title}</h3>
                            <p>{memory.description}</p>
                            {memory.image && (
                                <div className="memory-image">
                                    <img src={memory.image} alt={memory.title} loading="lazy" />
                                </div>
                            )}
                        </div>
                        <div className="timeline-dot" style={{ background: '#ffd700', boxShadow: '0 0 10px #ffd700' }}></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
