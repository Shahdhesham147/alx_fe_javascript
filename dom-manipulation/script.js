// استرجاع الاقتباسات من Local Storage أو استخدام القيم الافتراضية
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

// الحصول على عناصر DOM
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuoteButton");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const exportButton = document.getElementById("exportQuotes");
const importFile = document.getElementById("importFile");

// دالة لحفظ الاقتباسات في Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// دالة لاختيار وعرض اقتباس عشوائي
function showRandomQuote() {
    if (quotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // حفظ آخر اقتباس في Session Storage
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));

    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><strong>- ${randomQuote.category}</strong>`;
}

// دالة لاستعادة آخر اقتباس من Session Storage عند تحميل الصفحة
function loadLastQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
    if (lastQuote) {
        quoteDisplay.innerHTML = `"${lastQuote.text}" <br><strong>- ${lastQuote.category}</strong>`;
    }
}

// دالة لإضافة اقتباس جديد
function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText === "" || quoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // إضافة الاقتباس إلى القائمة وتحديث Local Storage
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();

    // مسح الحقول بعد الإضافة
    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("Quote added successfully!");
}

// دالة لتصدير الاقتباسات إلى ملف JSON
function exportQuotes() {
    const jsonQuotes = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// دالة لاستيراد الاقتباسات من ملف JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON file format!");
            }
        } catch (error) {
            alert("Error reading JSON file!");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// تحميل الاقتباسات السابقة عند فتح الصفحة
window.addEventListener("DOMContentLoaded", () => {
    loadLastQuote();
});

// ربط الأحداث بالأزرار
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);
exportButton.addEventListener("click", exportQuotes);
importFile.addEventListener("change", importFromJsonFile);
