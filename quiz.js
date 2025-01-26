// دالة checkAnswer
function checkAnswer() {
    // الإجابة الصحيحة
    const correctAnswer = "4";

    // الحصول على العنصر الذي تم اختياره بواسطة المستخدم
    const userAnswer = document.querySelector('input[name="quiz"]:checked');

    // التأكد من أن المستخدم قد اختار إجابة
    if (userAnswer) {
        // مقارنة الإجابة المختارة مع الإجابة الصحيحة
        if (userAnswer.value === correctAnswer) {
            document.getElementById("feedback").textContent = "Correct! Well done.";
        } else {
            document.getElementById("feedback").textContent = "That's incorrect. Try again!";
        }
    } else {
        // إذا لم يختار المستخدم إجابة
        document.getElementById("feedback").textContent = "Please select an answer.";
    }
}

// إضافة مستمع الحدث للزر
document.getElementById("submit-answer").addEventListener("cl


