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
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };

        // إضافة الاقتباس إلى المصفوفة
        quotes.push(newQuote);
        saveQuotes();  // حفظ في Local Storage

        populateCategories(); // تحديث القائمة المنسدلة
        filterQuotes(); // إعادة تحميل الاقتباسات

        // تفريغ الحقول
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both quote and category!");
    }
}
function createAddQuoteForm() {
    const formContainer = document.createElement("div");

    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteBtn">Add Quote</button>
    `;

    document.body.appendChild(formContainer);

    // إضافة حدث عند الضغط على زر الإضافة
    document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
function showRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        document.getElementById("quoteDisplay").innerText = `"${quote.text}" - (${quote.category})`;
    } else {
        document.getElementById("quoteDisplay").innerText = "No quotes available.";
    }
}
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes(); // حفظ في Local Storage
                populateCategories(); // تحديث الفئات
                filterQuotes(); // إعادة تحميل القائمة
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON format!");
            }
        } catch (error) {
            alert("Error reading JSON file.");
        }
    };

    fileReader.readAsText(file);
}

