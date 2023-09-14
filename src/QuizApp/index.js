import React, { useState, useEffect } from "react";
import { quizData } from "./quizData";
import Result from "./Result";
import Question from "./Questions";
import "./styles.css";

function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(15);
    const [userAnswers, setUserAnswers] = useState([]);

    const progress = (currentQuestion / quizData.length) * 100;

    const handleAnswerSubmit = (selectedOption) => {
        if (selectedOption === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        const questionData = quizData[currentQuestion];
        const userAnswer = {
            question: questionData.question,
            options: questionData.options,
            selectedOption,
            correctAnswer: questionData.correctAnswer,
        };
        setUserAnswers([...userAnswers, userAnswer]);
        if (currentQuestion + 1 < quizData.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
        setTimeRemaining(15);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setTimeRemaining(15);
        setUserAnswers([]);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            } else if (currentQuestion + 1 < quizData.length) {
                setCurrentQuestion(currentQuestion + 1);
                setTimeRemaining(15);
            } else {
                setShowResult(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentQuestion, timeRemaining]);

    return (
        <div className="container">
            <div className="sub-container">
                {showResult ? (
                    <Result
                        score={score}
                        restartQuiz={restartQuiz}
                        userAnswers={userAnswers}
                    />
                ) : (
                    <>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <Question
                            questionData={quizData[currentQuestion]}
                            onAnswerSubmit={handleAnswerSubmit}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default QuizApp;
