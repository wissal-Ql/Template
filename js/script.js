let carts = document.querySelectorAll('.card');
let products= [
    {
    name: 'Coffre Box',
    tag: 'coffreb' ,
    price: 300,
    inCart:0
    },

    {
    name: 'Glowberry',
    tag: 'glow',
    price: 130,
    inCart:0
    },

    {
    name: 'Scruberry',
    tag: 'scrub',
    price: 120,
    inCart:0
    },

    {
    name: 'Golden Touch',
    tag: 'serum',
    price: 100,
    inCart:0
    },
];
for (let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click' ,() => {
        cartNumber(products[i]);
        totalcost(products[i])
    })
}
function onLoadcartNumber(){
    let productNumber = localStorage.getItem('cartNumber');
    if(productNumber){
        document.querySelector('.icon').textContent = productNumber;

    }
}
function cartNumber(products){
    let productNumber = localStorage.getItem('cartNumber');
    productNumber= parseInt(productNumber);
     if(productNumber) {
        localStorage.setItem('cartNumber', productNumber + 1);
        document.querySelector('.icon').textContent = productNumber + 1;
     } else{
        localStorage.setItem('cartNumber', 1);  
        document.querySelector('.icon').textContent = 1;
     }
     setItem(products);  
}
 function setItem(products){
     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems );
     
     if(cartItems != null){
         if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
         }
        cartItems[products.tag].inCart += 1;
     } else{
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        } 
     }     
     localStorage.setItem("productsInCart" ,JSON.stringify (cartItems));
 }
 function totalcost(products) {
     //console.log("the product price is", products.price);
     let cartCost = localStorage.getItem('totalcost');
     
     console.log("My cartCost is", cartCost );
     console.log(typeof cartCost);
     if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalcost" , cartCost + products.price );
     }else{
        localStorage.setItem("totalcost" , products.price )
     }
 }
 function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalcost');

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=  `
            
                <div class="products">  
                    <img src="./Images/${item.tag}.png">
                    <br>
                    <p class="text-center">
                    <span>${item.name}</span>
                    </p>
                    <p>
                    
                    ${item.price},00dh
                    <i class="fas fa-arrow-circle-up"></i>
                    <span id="${item.tag}">${item.inCart}</span>
                    <i class="fas fa-arrow-circle-down" ></i>
                    </p>
                </div>
                <hr class="my-4">
                `;
        });

        productContainer.innerHTML +=`        
            <p class="text-right">
            <h4 class="basketTotalTitle"></h4>
            <h4 class="basketTotal">${cartCost},00dh</h4>
            </p>       
        `;
    }
 }
 onLoadcartNumber();
 displayCart();