let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("Data")) || [];

let generateShop = () => {              //defining the function here.         
    return (shop.innerHTML= shopItemData
        .map((x) => {
            let{id,name,price,desc,img} = x;//destructuring..
            let search = basket.find((x)=>x.id === id) || [];
            return `
        <div id=product-id-${id} class="item">
        <img class= "image" width="220" src="${img}" alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="button">
                <i onclick="decrement(${id})" class="bi bi-bag-dash"></i>
                <div id=${id} class="quantity">
                ${search.item === undefined? 0:search.item}
                </div>
                <i onclick= "increment(${id})" class="bi bi-bag-plus-fill"></i>
            </div>
          </div>
        </div>
    </div> 
  `;
    })
    .join(""));  
};         //ES6 arrow function

generateShop(); //invoking the function here

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    //console.log("++++++");

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item : 1,
        });
    
    }
    else{
        search.item +=1;
    }
    
    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("Data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined) return;
     else if(search.item === 0) return;
    else{
        search.item -=1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item != 0); //this is bcoz the filer funtion will target the basket one by one , we need only item, selecting the item which is zero, and will return the other item 
    
    localStorage.setItem("Data", JSON.stringify(basket));
};
let update    = (id) => {
    let search = basket.find((x)=>x.id ===id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=> x+y, 0);
    }
calculation();

var k = function(){

}

