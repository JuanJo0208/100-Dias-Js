let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
};

let deviceType = '';

let draw = false;
let erase = false;

// Detecta si el dispositivo es táctil
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Asigna el tipo de dispositivo: táctil o mouse
deviceType = isTouchDevice() ? "touch" : "mouse";

// Genera la cuadrícula cuando se hace clic en el botón "submit-grid"
gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0; // Inicializamos el contador

    for (let i = 0; i < gridHeight.value; i++) {
        let div = document.createElement("div");
        div.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            // Evento para pintar o borrar
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => {
                if (!draw) return;
                let element = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                );
                if (element && element.id) {
                    checker(element.id);
                }
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }

        container.appendChild(div);
    }
});

// Función que chequea y pinta/borra celdas según el estado de "draw" y "erase"
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// Limpiar la cuadrícula
clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
});

// Activar la goma de borrar
eraseBtn.addEventListener("click", () => {
    erase = true;
});

// Activar la opción de pintar
paintBtn.addEventListener("click", () => {
    erase = false;
});

// Actualizar visualmente los valores del ancho
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

// Actualizar visualmente los valores del alto
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// Inicializar los valores al cargar la página
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};
