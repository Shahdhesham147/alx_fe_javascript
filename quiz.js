function checkAnswer() {
    // الإجابة الصحيحة هي 4
    const correctAnswer = "4";
    
    // استرجاع إجابة المستخدم المحددة
    const userAnswer = document.querySelector('input[name="quiz"]:checked');
    
    // إذا لم يتم اختيار إجابة، يتم الخروج من الدالة
    if (!userAnswer) {
        document.getElementById("feedback").textContent = "Please select an answer!";
        return;
    }
    
    // مقارنة إجابة المستخدم بالإجابة الصحيحة
    if (userAnswer.value === correctAnswer) {
        document.getElementById("feedback").textContent = "Correct! Well done.";
    } else {
        document.getElementById("feedback").textContent = "That's incorrect. Try again!";
    }
}

// استرجاع زر "Submit Answer" وإضافة مستمع الحدث له
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
