import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import GlobalAnimations from './components/GlobalAnimations';
import ExplodingHeart from './components/ExplodingHeart';
import MusicPlayer from './components/MusicPlayer';
import Storybook from './components/Storybook';
import './App.css';

function App() {
  const [hasExploded, setHasExploded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (hasExploded) {
      setTimeout(() => {
        setShowContent(true);
      }, 500); // Slight delay for explosion to clear
    }
  }, [hasExploded]);

  return (
    <div className="app-container">
      <CustomCursor />
      <MusicPlayer />
      <GlobalAnimations />

      <AnimatePresence>
        {!hasExploded && (
          <ExplodingHeart onExplode={() => setHasExploded(true)} />
        )}
      </AnimatePresence>

      {showContent && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="main-content"
          style={{ overflow: 'hidden', height: '100vh' }} // Lock body scroll for book view
        >
          <Storybook />
        </motion.main>
      )}
    </div>
  );
}

export default App;
