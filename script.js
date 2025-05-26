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
                <p class="dish_price_text">${dishes[dishIndex].price} €</p>
            </div>
    `
}
