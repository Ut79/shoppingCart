let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart'); 
let basket = JSON.parse(localStorage.getItem("Data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=> x+y, 0);
    }
calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
             let{id,item} = x;              //destructuring
             let search = shopItemData.find((y)=>y.id === id) || [];                    
            return `
            <div class="cart-item">
              <img width="100" src=${search.img} alt="" />
                <div class="details">
               
                    <div class="tittle-price-x">
                        <h5 class="tittle-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h5>
                        <i onclick="removeItem(${item})" class="bi bi-x-square"></i>
                    </div>
                
                    <div class="button">
                        <i onclick="decrement(${id})" class="bi bi-bag-dash"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick= "increment(${id})" class="bi bi-bag-plus-fill"></i>
                    </div>
            <h4> $ ${item*search.price}</h4>
            </div>
            </div>
            `;
        })
        .join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = 
        `<h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="Homebtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

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
    
    generateCartItems();
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
    generateCartItems();
    localStorage.setItem("Data", JSON.stringify(basket));
};
let update    = (id) => {
    let search = basket.find((x)=>x.id ===id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let removeItem = (id) => {
    let selectedItem = id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
  };

 