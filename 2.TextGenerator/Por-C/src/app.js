let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");


let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Cursive",
    "Poppins",
    "Montserrat",
    "Monsieur La Doulaise",
]

const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, true);
    highlighter(scriptButtons, true);

    fontList.map((font) =>{
        let option = document.createElement("option");
        option.value = font;
        option.innerHTML = font;
        fontName.appendChild(option);
    });

    for(let i = 1; i <= 20; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (comando, defectoUi, value)=>{
    document.execCommand(comando, defectoUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () =>{
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () =>{
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () =>{
    let userLink = prompt("Enter a URL?")
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    }else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

const highlighter = (nombreClase, remocion) =>{
    nombreClase.forEach((button) =>{
        button.addEventListener("click", () =>{
            if (remocion) {
                let yaActivo = false;

                if(button.classList.contains("active")){
                    yaActivo = true;
                }

                highlighterRemove(nombreClase);

                if(!yaActivo){
                    button.classList.add("active");
                }
            }else{
                button.classList.toogle("active");
            }
        });
    });
};

const highlighterRemove = (nombreClase) =>{
    nombreClase.forEach((button) =>{
        button.classList.remove("active");
    });
};


window.onload = initializer();
