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
                <p>${dishes[dishIndex].description}</p>
                <p class="dish_price_text">${(dishes[dishIndex].price).toFixed(2)} €</p>
            </div>
    `
}

function addDishtoBasket(dishIndex){
    let basketContainerRef = document.getElementById('basket');
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);

    let responsiveBasketContainerRef = document.getElementById('responsive_basket_dishes_container');
    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);

    document.getElementById('empty_basket_information').classList.add('d_none');

    document.getElementById('basket_bottom_separator').classList.remove('d_none');
    document.getElementById('total_price_area').classList.remove('d_none');
    document.getElementById('after_order_message_container').classList.add('d_none');

    document.getElementById('basket_bottom_separator_responsive').classList.remove('d_none');
    document.getElementById('total_price_area_responsive').classList.remove('d_none');
    document.getElementById('after_order_message_container_responsive').classList.add('d_none');
    
    if (dishes[dishIndex].amount == 0) {
        dishes[dishIndex].amount++;
        basketContainerRef.innerHTML += renderSingleBasketDish(dishIndex);
        responsiveBasketContainerRef.innerHTML += renderSingleBasketDishResponsive(dishIndex);
    } else {
        dishes[dishIndex].amount++;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
        currentPriceOfTheOrderedDishesRef.innerHTML = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2) + ' €';

        currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount;
        currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2) + ' €';
    }
    calculateTotalPriceInTheBasket();
}

function renderSingleBasketDish(dishIndex){
    return `
            <div id="single_dish_inside_the_basket${dishIndex}" class="single_dish_inside_the_basket">
                <h4>${dishes[dishIndex].name}</h4>
                <div class="calculation_bar">
                    <div class="add_subtract_dish_bar">
                        <img onclick="subtractDish(${dishIndex})" class="basket_icons_plus_minus" src="/assets/icons/logo/orange_minus_basket.png" alt="">
                        <p id="amountOfDish${dishIndex}">${dishes[dishIndex].amount}</p>
                        <img onclick="addDish(${dishIndex})" class="basket_icons_plus_minus" src="/assets/icons/logo/orange_plus_basket.png" alt="">
                    </div>
                    <div class="result_and_remove_dish_bar">
                        <p id="priceOfDish${dishIndex}">${(dishes[dishIndex].price).toFixed(2)} €</p>
                        <img onclick="removeSingleDishFromBasket(${dishIndex})" class="delete_dish_icon" src="/assets/icons/logo/remove_dishes_basket.png" alt="">
                    </div>
                </div>
            </div>
    `
}

function renderSingleBasketDishResponsive(dishIndex){
    return `
            <div id="single_dish_inside_the_basket_responsive${dishIndex}" class="single_dish_inside_the_basket">
                <h4>${dishes[dishIndex].name}</h4>
                <div class="calculation_bar">
                    <div class="add_subtract_dish_bar">
                        <img onclick="subtractDish(${dishIndex})" class="basket_icons_plus_minus" src="/assets/icons/logo/orange_minus_basket.png" alt="">
                        <p id="amountOfDishResponsive${dishIndex}">${dishes[dishIndex].amount}</p>
                        <img onclick="addDish(${dishIndex})" class="basket_icons_plus_minus" src="/assets/icons/logo/orange_plus_basket.png" alt="">
                    </div>
                    <div class="result_and_remove_dish_bar">
                        <p id="priceOfDishResponsive${dishIndex}">${(dishes[dishIndex].price).toFixed(2)} €</p>
                        <img onclick="removeSingleDishFromBasket(${dishIndex})" class="delete_dish_icon" src="/assets/icons/logo/remove_dishes_basket.png" alt="">
                    </div>
                </div>
            </div>
    `
}

function addDish(dishIndex){
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);

    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);

    dishes[dishIndex].amount++;
    currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
    currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount;

    let newPriceAddition = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2);
    currentPriceOfTheOrderedDishesRef.innerHTML = newPriceAddition + ' €';
    currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = newPriceAddition + ' €';
    calculateTotalPriceInTheBasket();
}

function subtractDish(dishIndex){
    let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${dishIndex}`);
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);

    let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${dishIndex}`);
    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);

    if (dishes[dishIndex].amount  == 1) {
        dishes[dishIndex].amount--;
        singleDishInsideTheBasketRef.remove();
        singleDishInsideTheBasketResponsiveRef.remove();
        displayEmptyBasket();

    } else {
        let newPriceSubtraction = ((((dishes[dishIndex].amount * dishes[dishIndex].price) / dishes[dishIndex].amount)) * (dishes[dishIndex].amount - 1)).toFixed(2);
        currentPriceOfTheOrderedDishesRef.innerHTML = newPriceSubtraction + ' €';
        currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = newPriceSubtraction + ' €';

        dishes[dishIndex].amount--;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
        currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount;
    }
    calculateTotalPriceInTheBasket();
}

function removeSingleDishFromBasket(dishIndex) {
    dishes[dishIndex].amount = 0;
    let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${dishIndex}`);
    singleDishInsideTheBasketRef.remove();

    let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${dishIndex}`);
    singleDishInsideTheBasketResponsiveRef.remove();

    calculateTotalPriceInTheBasket()
    displayEmptyBasket();
}

function displayEmptyBasket(){
    let totalAmountOfOrderedDishes = 0;

    for (let countTotalDishesIndex = 0; countTotalDishesIndex < dishes.length; countTotalDishesIndex++) {
        totalAmountOfOrderedDishes += dishes[countTotalDishesIndex].amount;
    }

    if(totalAmountOfOrderedDishes == 0){
        document.getElementById('empty_basket_information').classList.remove('d_none');
        document.getElementById('basket_bottom_separator').classList.add('d_none');
        document.getElementById('total_price_area').classList.add('d_none');
    }
}

function calculateTotalPriceInTheBasket(){
    let totalPriceRef = document.getElementById('total_price');
    let totalPriceResponsiveRef = document.getElementById('total_price_responsive');
    let totalPriceSum = 0;

    for (let totalPriceIndex = 0; totalPriceIndex < dishes.length; totalPriceIndex++) {
        totalPriceSum += (dishes[totalPriceIndex].amount * dishes[totalPriceIndex].price);
    }
    totalPriceRef.innerHTML = (totalPriceSum).toFixed(2) + ' €';
    totalPriceResponsiveRef.innerHTML = (totalPriceSum).toFixed(2) + ' €';
}

function orderDishes(){
    document.getElementById('basket_bottom_separator').classList.add('d_none');
    document.getElementById('total_price_area').classList.add('d_none'); // ist die Nutzung von d_none in Ordnung?
    document.getElementById('after_order_message_container').classList.remove('d_none');

    document.getElementById('basket_bottom_separator_responsive').classList.add('d_none');
    document.getElementById('total_price_area_responsive').classList.add('d_none');
    document.getElementById('after_order_message_container_responsive').classList.remove('d_none');

    for (let orderIndex = 0; orderIndex < dishes.length; orderIndex++) {
        dishes[orderIndex].amount = 0;
        let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${orderIndex}`);
        let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${orderIndex}`);

        if(singleDishInsideTheBasketRef != null){
            singleDishInsideTheBasketRef.remove();
            singleDishInsideTheBasketResponsiveRef.remove();
        }
    }
}

// function orderDishesResponsive(){
//     document.getElementById('basket_bottom_separator_responsive').classList.add('d_none');
//     document.getElementById('total_price_area_responsive').classList.add('d_none');

//     for (let orderIndex = 0; orderIndex < dishes.length; orderIndex++) {
//         dishes[orderIndex].amount = 0;
//         let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${orderIndex}`);

//         if(singleDishInsideTheBasketResponsiveRef != null){
//             singleDishInsideTheBasketResponsiveRef.remove();
//         }
//     }
// }

function toggleResponsiveBasket(){
    document.getElementById('responsive_basket').classList.toggle('responsive_basket_closed');
    document.getElementById("responsive_basket").scrollIntoView({ behavior: "smooth" }); // scrollt zum Anfang des Baskets
}