import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '../utils/quiz';
import '../styles/Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple clicks

        setSelectedOption(option);
        const correct = option === quizQuestions[currentQuestion].correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ffccd5', '#ffd700']
            });
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizQuestions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowScore(true);
                if (score + (correct ? 1 : 0) === quizQuestions.length) {
                    triggerBigConfetti();
                }
            }
        }, 1500);
    };

    const triggerBigConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    return (
        <section className="quiz-section">
            <h2 className="section-title">How well do you know us?</h2>

            <div className="quiz-container glass-panel">
                {showScore ? (
                    <div className="score-section">
                        <div className="heart-trophy">🏆</div>
                        <h3>You scored {score} out of {quizQuestions.length}</h3>
                        <p className="score-message">
                            {score === quizQuestions.length
                                ? "Perfect Score! You know everything about us! ❤️"
                                : "Good job! But maybe we need more dates? 😉"}
                        </p>
                        <button className="reset-btn" onClick={resetQuiz}>Play Again</button>
                    </div>
                ) : (
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
                        </div>
                        <div className={`question-text ${isCorrect === true ? 'correct-anim' : isCorrect === false ? 'wrong-anim' : ''}`}>
                            {quizQuestions[currentQuestion].question}
                        </div>
                        <div className="answer-section">
                            {quizQuestions[currentQuestion].options.map((option) => (
                                <button
                                    key={option}
                                    className={`option-btn 
                    ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''}
                    ${selectedOption && option === quizQuestions[currentQuestion].correctAnswer ? 'correct' : ''}
                  `}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Quiz;
