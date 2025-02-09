// قائمة الاقتباسات الأساسية
let quotes = [
    { text: "Believe in yourself!", category: "Motivation" },
    { text: "Stay positive, work hard, make it happen.", category: "Inspiration" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Motivation" }
];

// تحميل البيانات المخزنة محليًا عند تشغيل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
    populateCategories();
    showRandomQuote();
});

// عرض اقتباس عشوائي
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <strong>${randomQuote.category}</strong></p>`;
    } else {
        quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    }
}

// إضافة اقتباس جديد
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes();
        populateCategories();
        showRandomQuote();
        
        // تفريغ الحقول بعد الإضافة
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both quote and category!");
    }
}

// حفظ الاقتباسات في Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// تحميل الاقتباسات من Local Storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// تعبئة قائمة الفئات في الفلتر
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(q => q.category))]; // استخراج الفئات الفريدة
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// تصفية الاقتباسات بناءً على الفئة المختارة
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");

    let filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);

    quoteDisplay.innerHTML = filteredQuotes.length > 0
        ? filteredQuotes.map(q => `<p>"${q.text}" - <strong>${q.category}</strong></p>`).join("")
        : "<p>No quotes available for this category.</p>";
}

// تعيين زر إظهار اقتباس جديد
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
