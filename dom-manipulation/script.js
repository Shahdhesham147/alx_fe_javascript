// قائمة الاقتباسات مع الفئات
let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// الحصول على عناصر الـ DOM
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuoteButton");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// دالة لاختيار وعرض اقتباس عشوائي
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><strong>- ${randomQuote.category}</strong>`;
}

// دالة لإضافة اقتباس جديد
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // إضافة الاقتباس إلى المصفوفة
    quotes.push({ text: quoteText, category: quoteCategory });

    // مسح الحقول بعد الإضافة
    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("Quote added successfully!");
}

// ربط الأحداث بالأزرار
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);

