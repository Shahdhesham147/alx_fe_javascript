// دالة لجمع الأرقام
function add(number1, number2) {
    return number1 + number2;
}

// دالة لطرح الأرقام
function subtract(number1, number2) {
    return number1 - number2;
}

// دالة لعملية الضرب
function multiply(number1, number2) {
    return number1 * number2;
}

// دالة للقسمة
function divide(number1, number2) {
    if (number2 === 0) {
        alert("Cannot divide by zero");
        return "Infinity";
    }
    return number1 / number2;
}

// ربط الأحداث بالأزرار
document.getElementById('add').addEventListener('click', function() {
    const number1 = parseFloat(document.getElementById('number1').value) || 0;
    const number2 = parseFloat(document.getElementById('number2').value) || 0;
    const result = add(number1, number2);
    document.getElementById('calculation-result').textContent = result;
});

document.getElementById('subtract').addEventListener('click', function() {
    const number1 = parseFloat(document.getElementById('number1').value) || 0;
    const number2 = parseFloat(document.getElementById('number2').value) || 0;
    const result = subtract(number1, number2);
    document.getElementById('calculation-result').textContent = result;
});

document.getElementById('multiply').addEventListener('click', function() {
    const number1 = parseFloat(document.getElementById('number1').value) || 0;
    const number2 = parseFloat(document.getElementById('number2').value) || 0;
    const result = multiply(number1, number2);
    document.getElementById('calculation-result').textContent = result;
});

document.getElementById('divide').addEventListener('click', function() {
    const number1 = parseFloat(document.getElementById('number1').value) || 0;
    const number2 = parseFloat(document.getElementById('number2').value) || 0;
    const result = divide(number1, number2);
    document.getElementById('calculation-result').textContent = result;
});
