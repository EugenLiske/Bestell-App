function renderAllDishes(){
    let dishContainerRef = document.getElementById('order_dishes_container');
    dishContainerRef.innerHTML = '';

    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        dishContainerRef.innerHTML += renderSingleDish(dishIndex);
    }
}

function addDishToBasket(dishIndex){
    let basketContainerRef = document.getElementById('basket');
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);
    displayActiveBasket();
    if (dishes[dishIndex].amount == 0) {
        dishes[dishIndex].amount++;
        basketContainerRef.innerHTML += renderSingleBasketDish(dishIndex);
    } else {
        dishes[dishIndex].amount++;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
        currentPriceOfTheOrderedDishesRef.innerHTML = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2) + ' €';
    }
    addDishToBasketResponsive(dishIndex);
    calculateTotalPriceInTheBasket();
}

function addDishToBasketResponsive(dishIndex){
    let responsiveBasketContainerRef = document.getElementById('responsive_basket_dishes_container');
    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);
    displayActiveBasketResponsive();
    if (dishes[dishIndex].amount_responsive == 0) {
        dishes[dishIndex].amount_responsive++;
        responsiveBasketContainerRef.innerHTML += renderSingleBasketDishResponsive(dishIndex);
    } else {
        dishes[dishIndex].amount_responsive++;
        currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount_responsive;
        currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = (dishes[dishIndex].amount_responsive * dishes[dishIndex].price).toFixed(2) + ' €';
    }
}

function addDish(dishIndex){
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);
    dishes[dishIndex].amount++;
    currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
    let newPriceAddition = (dishes[dishIndex].amount * dishes[dishIndex].price).toFixed(2);
    currentPriceOfTheOrderedDishesRef.innerHTML = newPriceAddition + ' €';
    addDishResponsive(dishIndex);
    calculateTotalPriceInTheBasket();
}


function addDishResponsive(dishIndex){
    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);
    dishes[dishIndex].amount_responsive++;
    currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount_responsive;
    let newPriceAddition = (dishes[dishIndex].amount_responsive * dishes[dishIndex].price).toFixed(2);
    currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = newPriceAddition + ' €';
}

function subtractDish(dishIndex){
    let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${dishIndex}`);
    let currentAmountOfTheOrderedDishesRef = document.getElementById(`amountOfDish${dishIndex}`);
    let currentPriceOfTheOrderedDishesRef = document.getElementById(`priceOfDish${dishIndex}`);
    if (dishes[dishIndex].amount  == 1) {
        dishes[dishIndex].amount--;
        singleDishInsideTheBasketRef.remove();
        displayEmptyBasket();
    } else {
        let newPriceSubtraction = ((((dishes[dishIndex].amount * dishes[dishIndex].price) / dishes[dishIndex].amount)) * (dishes[dishIndex].amount - 1)).toFixed(2);
        currentPriceOfTheOrderedDishesRef.innerHTML = newPriceSubtraction + ' €';

        dishes[dishIndex].amount--;
        currentAmountOfTheOrderedDishesRef.innerHTML = dishes[dishIndex].amount;
    }
    subtractDishResponsive(dishIndex);
    calculateTotalPriceInTheBasket();
}

function subtractDishResponsive(dishIndex){
    let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${dishIndex}`);
    let currentAmountOfTheOrderedDishesResponsiveRef = document.getElementById(`amountOfDishResponsive${dishIndex}`);
    let currentPriceOfTheOrderedDishesResponsiveRef = document.getElementById(`priceOfDishResponsive${dishIndex}`);
    if (dishes[dishIndex].amount_responsive  == 1) {
        dishes[dishIndex].amount_responsive--;
        singleDishInsideTheBasketResponsiveRef.remove();
    } else {
        let newPriceSubtraction = ((((dishes[dishIndex].amount_responsive * dishes[dishIndex].price) / dishes[dishIndex].amount_responsive)) * (dishes[dishIndex].amount_responsive - 1)).toFixed(2);
        currentPriceOfTheOrderedDishesResponsiveRef.innerHTML = newPriceSubtraction + ' €';

        dishes[dishIndex].amount_responsive--;
        currentAmountOfTheOrderedDishesResponsiveRef.innerHTML = dishes[dishIndex].amount_responsive;
    }
}

function removeSingleDishFromBasket(dishIndex) {
    dishes[dishIndex].amount = 0;
    let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${dishIndex}`);
    singleDishInsideTheBasketRef.remove();
    dishes[dishIndex].amount_responsive = 0;
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
    displayPostOrderBasket();
    for (let orderIndex = 0; orderIndex < dishes.length; orderIndex++) {
        dishes[orderIndex].amount = 0;
        let singleDishInsideTheBasketRef = document.getElementById(`single_dish_inside_the_basket${orderIndex}`);

        if(singleDishInsideTheBasketRef != null){
            singleDishInsideTheBasketRef.remove();
        }
    }
    orderDishesResponsive();
}

function orderDishesResponsive(){
    displayPostOrderBasketResponsive();
    for (let orderIndex = 0; orderIndex < dishes.length; orderIndex++) {
        dishes[orderIndex].amount_responsive = 0;
        let singleDishInsideTheBasketResponsiveRef = document.getElementById(`single_dish_inside_the_basket_responsive${orderIndex}`);

        if(singleDishInsideTheBasketResponsiveRef != null){
            singleDishInsideTheBasketResponsiveRef.remove();
        }
    }
}

function toggleResponsiveBasket(){
    document.getElementById('responsive_basket').classList.toggle('responsive_basket_closed');
    document.getElementById("responsive_basket").scrollIntoView({ behavior: "smooth" }); // scrollt zum Anfang des Baskets
}

function displayActiveBasket(){
    document.getElementById('empty_basket_information').classList.add('d_none');
    document.getElementById('basket_bottom_separator').classList.remove('d_none');
    document.getElementById('total_price_area').classList.remove('d_none');
    document.getElementById('after_order_message_container').classList.add('d_none');
}

function displayActiveBasketResponsive(){
    document.getElementById('basket_bottom_separator_responsive').classList.remove('d_none');
    document.getElementById('total_price_area_responsive').classList.remove('d_none');
    document.getElementById('after_order_message_container_responsive').classList.add('d_none');
}

function displayPostOrderBasket(){
    document.getElementById('basket_bottom_separator').classList.add('d_none');
    document.getElementById('total_price_area').classList.add('d_none');
    document.getElementById('after_order_message_container').classList.remove('d_none');
}

function displayPostOrderBasketResponsive(){
    document.getElementById('basket_bottom_separator_responsive').classList.add('d_none');
    document.getElementById('total_price_area_responsive').classList.add('d_none');
    document.getElementById('after_order_message_container_responsive').classList.remove('d_none');
}