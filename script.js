function init(){
    renderAllDishes();
}

function renderAllDishes(){
    let dishContainerRef = document.getElementById('order_dishes_container');
    dishContainerRef.innerHTML = '';

    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        dishContainerRef.innerHTML += renderSingleDish(dishIndex);
    }
}

function renderSingleDish(dishIndex){
    return `
            <div class="single_dish_container">
                <div class="dish_name_and_add_dish_container">
                    <h3>${dishes[dishIndex].name}</h3>
                    <img onclick="addDishtoBasket(${dishIndex})" class="plus_sign" src="/assets/icons/logo/plus_sign.png" alt="plus_sign">
                </div>
                <p class="dish_description">${dishes[dishIndex].description}</p>
                <p class="dish_price_text">${(dishes[dishIndex].price).toFixed(2)} €</p>
            </div>
    `
}

function addDishtoBasket(dishIndex){
    let basketContainerRef = document.getElementById('basket');
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);

    document.getElementById('empty_basket_information').classList.add('d_none');
    
    if (dishes[dishIndex].amount == 0) {
        dishes[dishIndex].amount++;
        basketContainerRef.innerHTML += renderSingleBasketDish(dishIndex);
    } else {
        dishes[dishIndex].amount++;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
        currentPriceOfTheOrderedDishesRef.innerHTML = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2) + ' €';
    }
}

function renderSingleBasketDish(dishIndex){
    return `
            <div id="single_dish_inside_the_basket${dishIndex}" class="single_dish_inside_the_basket">
                <h4>${dishes[dishIndex].name}</h4>
                <div class="calculation_bar">
                    <div class="add_subtract_dish_bar">
                        <img onclick="subtractDish(${dishIndex})" class="basket_icons" src="/assets/icons/logo/orange_minus_basket.png" alt="">
                        <p id="amountOfDish${dishIndex}">${dishes[dishIndex].amount}</p>
                        <img onclick="addDish(${dishIndex})" class="basket_icons" src="/assets/icons/logo/orange_plus_basket.png" alt="">
                    </div>
                    <div class="result_and_remove_dish_bar">
                        <p id="priceOfDish${dishIndex}">${(dishes[dishIndex].price).toFixed(2)} €</p>
                        <img class="basket_icons" src="/assets/icons/logo/remove_dishes_basket.png" alt="">
                    </div>
                </div>
            </div>
    `
}

function addDish(dishIndex){
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);

    dishes[dishIndex].amount++;
    currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;

    let newPriceAddition = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2);
    currentPriceOfTheOrderedDishesRef.innerHTML = newPriceAddition + ' €';
}

function subtractDish(dishIndex){
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);
    let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${dishIndex}`);
    let basketContainerRef = document.getElementById('basket');

    if (dishes[dishIndex].amount  == 1) {
        dishes[dishIndex].amount--;
        singleDishInsideTheBasketRef.remove();

        if(dishes[0].amount == 0 && dishes[1].amount == 0 && dishes[2].amount == 0 && dishes[3].amount == 0 && dishes[4].amount == 0){
            document.getElementById('empty_basket_information').classList.remove('d_none');
        }

    } else {
        let newPriceSubtraction = ((((dishes[dishIndex].amount * dishes[dishIndex].price) / dishes[dishIndex].amount)) * (dishes[dishIndex].amount - 1)).toFixed(2);
        currentPriceOfTheOrderedDishesRef.innerHTML = newPriceSubtraction + ' €';

        dishes[dishIndex].amount--;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
    }
}