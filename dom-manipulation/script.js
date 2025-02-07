// استرجاع الاقتباسات من Local Storage أو استخدام قيم افتراضية
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// استرجاع الفئة المختارة من Local Storage أو استخدام القيمة الافتراضية "all"
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// الحصول على عناصر DOM
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuoteButton");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");

// دالة لحفظ الاقتباسات في Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// دالة لتحديث القائمة المنسدلة بالفئات المتاحة
function populateCategories() {
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = selectedCategory;
}

// دالة لاختيار وعرض اقتباس عشوائي بناءً على الفئة المختارة
function showRandomQuote() {
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available for this category.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><strong>- ${randomQuote.category}</strong>`;
}

// دالة لتحديث الاقتباسات بناءً على الفئة المختارة
function filterQuotes() {
    selectedCategory = categoryFilter.value;
    localStorage.setItem("selectedCategory", selectedCategory);
    showRandomQuote();
}

// دالة لإضافة اقتباس جديد
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();
    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories();
    newQuoteText.value = "";
    newQuoteCategory.value = "";
    alert("Quote added successfully!");
}

// تحميل البيانات عند فتح الصفحة
window.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    filterQuotes();
});

// ربط الأحداث بالأزرار
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);
categoryFilter.addEventListener("change", filterQuotes);
