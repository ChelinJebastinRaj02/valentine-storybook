import React, { useState, useRef, useEffect } from 'react';
import { FaMusic, FaPlay, FaPause, FaForward, FaBackward, FaList } from 'react-icons/fa';
import '../styles/MusicPlayer.css';

const playlist = [
    { title: "Our Song", artist: "Artist Name", src: "/src/assets/audio/song1.mp3" },
    { title: "Romantic Melody", artist: "Piano", src: "/src/assets/audio/song2.mp3" },
    { title: "Love Ballad", artist: "Singer", src: "/src/assets/audio/song3.mp3" }
];

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("User interaction required"));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
        setIsPlaying(true);
    };

    const selectTrack = (index) => {
        setCurrentTrack(index);
        setIsPlaying(true);
    };

    return (
        <div className={`music-player-container ${isOpen ? 'open' : ''}`}>
            <div className="music-toggle" onClick={() => setIsOpen(!isOpen)}>
                <FaMusic className={isPlaying ? 'spin' : ''} />
            </div>

            <div className="music-player-body glass-panel">
                <div className="now-playing">
                    <div className="track-info">
                        <h4>{playlist[currentTrack].title}</h4>
                        <p>{playlist[currentTrack].artist}</p>
                    </div>
                    <div className="controls">
                        <button onClick={prevTrack}><FaBackward /></button>
                        <button onClick={togglePlay} className="play-btn">
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                        <button onClick={nextTrack}><FaForward /></button>
                    </div>
                </div>

                <div className="playlist">
                    <h5>Playlist</h5>
                    <ul>
                        {playlist.map((track, index) => (
                            <li
                                key={index}
                                className={index === currentTrack ? 'active' : ''}
                                onClick={() => selectTrack(index)}
                            >
                                {index + 1}. {track.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <audio
                    ref={audioRef}
                    src={playlist[currentTrack].src}
                    onEnded={nextTrack}
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
