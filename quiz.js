function checkAnswer() {
    // The correct answer is 4
    const correctAnswer = "4";
    
    // Retrieve the user's selected answer
    const userAnswer = document.querySelector('input[name="quiz"]:checked');
    
    // If no answer is selected, exit the function
    if (!userAnswer) {
        document.getElementById("feedback").textContent = "Please select an answer!";
        return;
    }
    
    // Compare the selected answer with the correct answer
    if (userAnswer.value === correctAnswer) {
        document.getElementById("feedback").textContent = "Correct! Well done.";
    } else {
        document.getElementById("feedback").textContent = "That's incorrect. Try again!";
    }
}

// Attach event listener to the submit button
document.getElementById("submit-answer").addEventListener("click", checkAnswer);


