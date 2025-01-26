// تعريف دالة التحقق من الإجابة
function checkAnswer() {
    // الإجابة الصحيحة
    const correctAnswer = "4";

    // الحصول على الإجابة المختارة من المستخدم
    const userAnswer = document.querySelector('input[name="quiz"]:checked')?.value;

    // التأكد من أن المستخدم اختار إجابة
    if (userAnswer) {
        // التحقق من الإجابة
        if (userAnswer === correctAnswer) {
            document.getElementById('feedback').textContent = "Correct! Well done.";
        } else {
            document.getElementById('feedback').textContent = "That's incorrect. Try again!";
        }
    } else {
        // إذا لم يقم المستخدم باختيار أي إجابة
        document.getElementById('feedback').textContent = "Please select an answer.";
    }
}

// إضافة مستمع حدث للزر
document.getElementById('submit-answer').addEventListener('click', checkAnswer);
