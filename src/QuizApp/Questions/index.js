import React, { useState, useEffect, useCallback } from "react";
import "../styles.css";

function Question({ questionData, onAnswerSubmit }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(15);

    const handleSubmit = useCallback(() => {
        onAnswerSubmit(selectedOption);
        setSelectedOption("");
        setTimeRemaining(15);
    }, [onAnswerSubmit, selectedOption]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(timeRemaining - 1);
            } else {
                handleSubmit();
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [handleSubmit, timeRemaining]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <h2>{questionData.question}</h2>
            <p>Time Remaining: {timeRemaining} seconds</p>
            <form>
                {questionData.options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </form>
            <button onClick={handleSubmit} className="submit-button">
                Submit
            </button>
        </div>
    );
}

export default Question;
