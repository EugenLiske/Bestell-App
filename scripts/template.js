function renderSingleDish(dishIndex){
    return `
            <div class="single_dish_container">
                <div class="dish_name_and_add_dish_container">
                    <h3>${dishes[dishIndex].name}</h3>
                    <img onclick="addDishToBasket(${dishIndex})" class="plus_sign" src="./assets/icons/logo/plus_sign.png" alt="plus_sign">
                </div>
                <p>${dishes[dishIndex].description}</p>
                <p class="dish_price_text">${(dishes[dishIndex].price).toFixed(2)} €</p>
            </div>
    `
}

function renderSingleBasketDish(dishIndex){
    return `
            <div id="single_dish_inside_the_basket${dishIndex}" class="single_dish_inside_the_basket">
                <h4>${dishes[dishIndex].name}</h4>
                <div class="calculation_bar">
                    <div class="add_subtract_dish_bar">
                        <img onclick="subtractDish(${dishIndex})" class="basket_icons_plus_minus" src="./assets/icons/logo/orange_minus_basket.png" alt="">
                        <p id="amountOfDish${dishIndex}">${dishes[dishIndex].amount}</p>
                        <img onclick="addDish(${dishIndex})" class="basket_icons_plus_minus" src="./assets/icons/logo/orange_plus_basket.png" alt="">
                    </div>
                    <div class="result_and_remove_dish_bar">
                        <p id="priceOfDish${dishIndex}">${(dishes[dishIndex].price).toFixed(2)} €</p>
                        <img onclick="removeSingleDishFromBasket(${dishIndex})" class="delete_dish_icon" src="./assets/icons/logo/remove_dishes_basket.png" alt="">
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
                        <img onclick="subtractDish(${dishIndex})" class="basket_icons_plus_minus" src="./assets/icons/logo/orange_minus_basket.png" alt="">
                        <p id="amountOfDishResponsive${dishIndex}">${dishes[dishIndex].amount}</p>
                        <img onclick="addDish(${dishIndex})" class="basket_icons_plus_minus" src="./assets/icons/logo/orange_plus_basket.png" alt="">
                    </div>
                    <div class="result_and_remove_dish_bar">
                        <p id="priceOfDishResponsive${dishIndex}">${(dishes[dishIndex].price).toFixed(2)} €</p>
                        <img onclick="removeSingleDishFromBasket(${dishIndex})" class="delete_dish_icon" src="./assets/icons/logo/remove_dishes_basket.png" alt="">
                    </div>
                </div>
            </div>
    `
}