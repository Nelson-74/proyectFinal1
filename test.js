import {CartManager} from "./src/cartsManager.js";
const cartManager = new CartManager("./db/carts.json");

 const newCart = await cartManager.addCart({ userId: 1 });
console.log(newCart); 
 async function test() {
  console.log(await cartManager.addCart([]));
  console.log(await cartManager.getCartById(1));
  console.log(await cartManager.updateCart(1, 1));
  console.log(await cartManager.deleteCart(1));
  console.log(await cartManager.deleteAll());
}

test(); 