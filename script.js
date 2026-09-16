let selectedItem = "";
let selectedPrice = 0;
let selectedImage = "";
let quantity = 1;

function orderItem(itemName, price) {
    const phone = "917306600733";
    const message = 
`🍰 Fine Laban

Hello!

I would like to order.

Dessert : ${itemName}

Price : ₹${price}

Quantity : 1

Please confirm availability.

Thank you.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function openOrderModal(name, price, image) {
    selectedItem = name;
    selectedPrice = Number(price);
    selectedImage = image;
    quantity = 1;

    document.getElementById("modalTitle").innerHTML = name;
    document.getElementById("modalPrice").innerHTML = "₹" + price;
    document.getElementById("modalImage").src = image;

    document.getElementById("qty").innerHTML = quantity;
    document.getElementById("totalPrice").innerHTML = price;

    document.getElementById("orderModal").style.display = "flex";
}

function increaseQty() {
    quantity++;
    updateTotal();
}

function decreaseQty() {
    if (quantity > 1) {
        quantity--;
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById("qty").innerHTML = quantity;
    document.getElementById("totalPrice").innerHTML = selectedPrice * quantity;
}

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}

// 1. Background-click listener to close modal
window.addEventListener("click", function (event) {
    const modal = document.getElementById("orderModal");
    if (event.target === modal) {
        closeModal();
    }
});

// 2. WhatsApp submission with validation for empty fields/orders
function sendWhatsApp() {
    const phone = "917306600733"; // Replace with your WhatsApp number

    // Prevent submitting without a selected item or invalid quantity
    if (!selectedItem || quantity < 1 || selectedPrice <= 0) {
        alert("Please select a valid item before placing an order.");
        return;
    }

    const nameInput = document.getElementById("customerName");
    const phoneInput = document.getElementById("customerPhone");
    const addressInput = document.getElementById("customerAddress");
    const noteInput = document.getElementById("customerNote");
    const phoneRegex = /^[0-9]{10}$/;
    const name = nameInput ? nameInput.value.trim() : "";
    const customerPhone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const note = noteInput ? noteInput.value.trim() : "";

    // Require essential customer details
    if (!name) {
        alert("Please enter your name.");
        if (nameInput) nameInput.focus();
        return;
    }

    if (!customerPhone) {
        alert("Please enter your phone number.");
        if (phoneInput) phoneInput.focus();
        return;
    }

    if (!phoneRegex.test(customerPhone.replace(/[^0-9]/g, ''))) {
        alert("Please enter a valid 10-digit phone number.");
        if (phoneInput) phoneInput.focus();
        return;
    }

    if (!address) {
        alert("Please provide your delivery address.");
        if (addressInput) addressInput.focus();
        return;
    }

    const total = selectedPrice * quantity;

    const message = 
`🍰 Fine Laban

Customer : ${name}

Phone : ${customerPhone}

Address :
${address}

Dessert : ${selectedItem}

Price : ₹${selectedPrice}

Quantity : ${quantity}

Total : ₹${total}

Special Note :
${note || "None"}

Please confirm availability.

Thank you.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
    closeModal();
}