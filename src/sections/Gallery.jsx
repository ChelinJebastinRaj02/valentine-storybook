import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../utils/gallery';
import '../styles/Gallery.css';

const Gallery = () => {
    const [filter, setFilter] = useState('All');
    const [filteredImages, setFilteredImages] = useState(galleryImages);

    const categories = ['All', ...new Set(galleryImages.map(img => img.category))];

    useEffect(() => {
        if (filter === 'All') {
            setFilteredImages(galleryImages);
        } else {
            setFilteredImages(galleryImages.filter(img => img.category === filter));
        }
    }, [filter]);

    return (
        <section className="gallery-section">
            <h2 className="section-title">Our Sweet Memories</h2>

            <div className="filter-buttons">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <motion.div className="gallery-grid" layout>
                <AnimatePresence>
                    {filteredImages.map((image) => (
                        <motion.div
                            key={image.id}
                            className="gallery-item"
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, -5, 0],
                                transition: { duration: 0.4 }
                            }}
                        >
                            <img src={image.src} alt={image.alt} loading="lazy" />
                            <div className="overlay">
                                <span>{image.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default Gallery;
