let field = document.getElementById('field');
let ok = document.getElementById('ok');
let alert = document.getElementById('alert');
let sectionTwo = document.getElementById('section2');
let tableau = sectionTwo.querySelectorAll('p');
let main = document.getElementById('main');
let img = document.getElementById('img');
let rotate = document.getElementById('rotate');

async function verif() {
    let codeEan = field.value.trim();
    try {
        const response = await fetch('https://fr.openfoodfacts.org/api/v0/product/' + codeEan);
        const data = await response.json();

        if (data.status_verbose == "product not found") {
            alert.innerHTML = "Code introuvable";
            console.log(data);
            return false;
        }

        if (codeEan.length === 13 && Number(codeEan)) {
            alert.innerHTML = "Code pris en compte, un instant...";
            alert.style.color = "green";
            console.log('bla');
            return true;
        } else if (codeEan.length < 13 || isNaN(codeEan)) {
            alert.innerHTML = "Merci de saisir un code valide";
            alert.style.color = "red";
            console.log('blo');
            return false;
        }
    }

    catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return false;
    }
}

 async function display() {
    let codeEan = field.value.trim();
    try  {
        const response = await fetch('https://fr.openfoodfacts.org/api/v0/product/' + codeEan);
        const data = await response.json();
    
            console.log(data);
            img.setAttribute('src', data.product.image_url);
            rotate.style.visibility = "hidden";
            tableau[0].innerHTML += data.code;
            tableau[1].innerHTML += data.product.product_name;
            tableau[2].innerHTML += data.product.brands;
            tableau[3].innerHTML += data.product.categories;
            tableau[4].innerHTML += data.product.ingredients_text_fr;
            tableau[5].innerHTML += data.product.allergens;
            tableau[6].innerHTML += data.product.packaging_old;
            console.log('https://fr.openfoodfacts.org/api/v0/product/' + codeEan);
            console.log(data._id);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return false;
    }
}

ok.addEventListener('click', async () => {
    if (await verif()) {
        main.style.display = "none";
        sectionTwo.style.visibility = "visible";
        sectionTwo.style.display = "block";
        display();
    }
})

field.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        display();

        if (await verif()) {
            main.style.display = "none";
            sectionTwo.style.visibility = "visible";
            sectionTwo.style.display = "block";
        } else {
            main.style.display = "visible";
            sectionTwo.style.visibility = "hidden";
            sectionTwo.style.display = "none";
        }

    }
})
