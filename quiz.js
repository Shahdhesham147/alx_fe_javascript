
// دالة checkAnswer
function checkAnswer() {
    // تعريف الإجابة الصحيحة
    const correctAnswer = "4";

    // الحصول على الإجابة التي اختارها المستخدم
    const userAnswer = document.querySelector('input[name="quiz"]:checked');

    // التحقق إذا كان المستخدم اختار إجابة
    if (userAnswer) {
        // مقارنة الإجابة
        if (userAnswer.value === correctAnswer) {
            document.getElementById("feedback").textContent = "Correct! Well done.";
        } else {
            document.getElementById("feedback").textContent = "That's incorrect. Try again!";
        }
    } else {
        // في حالة عدم اختيار المستخدم لإجابة
        document.getElementById("feedback").textContent = "Please select an answer.";
    }
}

// إضافة مستمع الحدث للزر
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
