import React from "react";
import "../styles.css";

function Result({ score, restartQuiz, userAnswers }) {
    return (
        <div>
            <heder className="header">
                <h2>
                    Your Score: {score} / {userAnswers.length}
                </h2>
                <button onClick={restartQuiz} className="submit-button">
                    Restart Quiz
                </button>
            </heder>
            <hr />

            {userAnswers.map((answer, index) => (
                <div key={index} className="answer">
                    <p>{answer.question}</p>
                    {answer.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={option}
                                    checked={option === answer.selectedOption}
                                    disabled
                                />
                                {option}
                            </label>
                        </div>
                    ))}
                    <p>Correct Answer: {answer.correctAnswer}</p>
                </div>
            ))}
        </div>
    );
}

export default Result;
