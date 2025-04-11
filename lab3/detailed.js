document.addEventListener("DOMContentLoaded", function () {
    const shirtName = localStorage.getItem("selectedShirt");
    const shirt = shirts.find(s => s.name === shirtName);

    if (!shirt) {
        document.getElementById("shirt-details").innerHTML = "<p>Футболка не найдена.</p>";
        return;
    }

    let colorsHTML = "";
    let firstColor = Object.keys(shirt.colors)[0];

    for (let color in shirt.colors) {
        colorsHTML += `<button class="color-button ${color === firstColor ? 'active' : ''}" 
            style="background-color:${color}; 
                   color: black; 
                   border: 2px solid #5b5959; 
                   border-radius: 5px;" 
            data-color="${color}">${color}</button>`;
    }

    document.getElementById("shirt-details").innerHTML = `
        <img id="shirt-image" class="shirt-image" src="${shirt.colors[firstColor].front}" alt="${shirt.name}">
        <div class="shirt-info-container">
            <h1>${shirt.name}</h1>
            <p><strong>${shirt.price}</strong></p>
            <p>${shirt.description || "Описание отсутствует."}</p>
            <div class="button-container">
                <button id="front-btn">Front</button>
                <button id="back-btn">Back</button>
            </div>
            <div class="color-buttons">${colorsHTML}</div>
        </div>
    `;

    document.querySelectorAll(".color-button").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".color-button").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            let color = this.getAttribute("data-color");
            document.getElementById("shirt-image").src = shirt.colors[color].front;
        });
    });

    document.getElementById("front-btn").addEventListener("click", () => {
        let color = document.querySelector(".color-button.active")?.getAttribute("data-color") || firstColor;
        document.getElementById("shirt-image").src = shirt.colors[color]?.front;
    });

    document.getElementById("back-btn").addEventListener("click", () => {
        let color = document.querySelector(".color-button.active")?.getAttribute("data-color") || firstColor;
        document.getElementById("shirt-image").src = shirt.colors[color]?.back;
    });
});
