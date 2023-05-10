import fs from "fs";

export class ProductManager {
  constructor() {
    this.path = "../products.json";
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async addProduct(product) {
    try {
      const data = await this.getProducts();
      const toLookForCode = data.find((p) => p.code === product.code);
      if(toLookForCode){
        return "existing code"
      }if (
        !product.title||
        !product.description||
        !product.code||
        !product.price||
        !product.status||
        !product.stock||
        !product.category||
        !product.thumbnail
    ){
        return "missing fields to load";
      }
      const lastDataId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newProduct = { ...product, id: lastDataId };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return lastDataId;
    } catch (error) {
      throw new Error("Error adding product");
    }
  }

  async getProductById(id) {
    try {
      const data = await this.getProducts();
      const productFound = data.find((p) => p.id === id);
      if (!productFound) {
        throw new Error("The product with the requested id was not found");
      }
      return productFound;
    } catch (error) {
      throw new Error("Error getting product by id");
    }
  }

  async updateProduct(id, newData) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data[index] = { ...newData, id };
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        return data[index];
      } else {
        return "product not found";
      }
    } catch (error) {
      throw new Error("Error updating the product");
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error deleting the product");
    }
  }
}

const productManager = new ProductManager();

const product1 = {
  title: "Ultraboost 5.0 Dna W",
  description: "zapatillas running de mujer",
  code: "3554",
  price: 57000,
  status:true,
  stock: 15,
  category: "Zapatillas de mujer",
  thumbnail: "https://assets.adidas.com/images/w_600,f_auto,q_auto/4c0a24c14af8499bb112adfb001b7083_9366/Zapatillas_Ultraboost_5.0_DNA_Blanco_GX3028.jpg"
};
const product2 ={
  title: "Ultraboost 5.0 Dna W",
  description : "zapatillas de mujer",
  code : "3557",
  price : 57000,
  status:true,
  stock: 15,
  category: "Zapatillas de mujer",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/4c0a24c14af8499bb112adfb001b7083_9366/Zapatillas_Ultraboost_5.0_DNA_Blanco_GX3028.jpg"
}

const product3 ={
  title: "zapatillas ultraboost 1.0",
  description : "zapatillas hombre",
  code : "9542",
  price : 60000,
  status:true,
  stock: 9,
  category: "Zapatillas de hombre",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/fbeecf98adaa4edb9cc3af2d0155a85a_9366/Zapatillas_Ultraboost_1.0_Naranja_IG7310.jpg"
}

const product4 ={
  title: "zapatillas terrex Ax4",
  description : "zapatillas de mujer",
  code : "3435",
  price : 47000,
  status:true,
  stock: 5,
  category: "Zapatillas de mujer",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/484eea27f4564036be7fad660078802d_9366/Zapatillas_de_Senderismo_Terrex_AX4_Primegreen_Gris_GV7506.jpg"
}

const product5 ={
  title: " zapatillas trail running terrex",
  description : "zapatillas outdoor de hombre",
  code : "1123",
  price : 45000,
  status:true,
  stock: 7,
  category: "Zapatillas de hombre",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/4857c1fc0699484f8e51af0800ea1bc1_9366/Zapatillas_de_Trail_Running_Terrex_Soulstride_Azul_GZ9035.jpg"
}

const product6 ={
  title: "remera fram print ",
  description : "remera de mujer",
  code : "3840",
  price : 13000,
  status:true,
  stock: 25,
  category: "Remera de mujer",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/d24e9bfdbfd44324852aadbf0017187d_9366/Remera_FARM_Print_Estampada_Azul_HE4924.jpg"
}

const product7 ={
  title: "remera aeroready",
  description : "remera de hombre",
  code : "4648",
  price : 12000,
  status:true,
  stock: 11,
  category: "Remera de hombre",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/888caa3570c3447bb8d0adb20135373a_9366/Remera_AEROREADY_Feelstrong_Camo_Sport_Gris_HD4319.jpg"
}

const product8 ={
  title: "campera premium slim ",
  description : "Campera para mujer",
  code : "3456",
  price : 58000,
  status:true,
  stock: 3,
  category: "Campera de mujer",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/b3802c9cc8594ecf9bd4ae9400f2a0d4_9366/Campera_Con_Capucha_Premium_Slim_Rosa_HM2611.jpg",
}

const product9 ={
  title: "campera térmica",
  description : "campera para hombre",
  code : "9920",
  price : 69000,
  status:true,
  stock: 4,
  category: "campera para hombre ",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/385ece0cea53490e8344a7f90123281c_9366/Campera_Termica_con_Capucha_VARILITE_Negro_BQ7782.jpg"
}

const product10 ={
  title: "camiseta alternativa selección",
  description : "camiseta para mujer",
  code : "2223",
  price : 21000,
  status:true,
  stock: 9,
  category: "Remera para hombre ",
  thumbnail : "https://assets.adidas.com/images/w_600,f_auto,q_auto/a3e5c68026ca49288f15afa201048d57_9366/Camiseta_Alternativa_Seleccion_Argentina_Femenina_23_Negro_HT4228.jpg"
}

const product11 ={
  title: "chomba de entremamiento Boca",
  description : "chomba para hombres",
  code : "1974",
  price : 22000,
  status:true,
  stock: 10,
  category: "Remera de hombre ",
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/0c4ee951be8b47139fceaf860105d94c_9366/Chomba_de_Entrenamiento_Boca_Juniors_Azul_HC0996_01_laydown.jpg"
}

const product12 ={
  title: "zapatillas adidas grand court",
  description : "zapatillas para niñas",
  code : "1435",
  price : 23000,
  status:true,
  stock: 8,
  category: "zapatillas para niñas ",
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/53668cf51f1840e9ab3faf8c00d1e1f4_9366/Zapatillas_adidas_Grand_Court_Blanco_HP8910_04_standard.jpg"
}

const product13 ={
  title: "conjunto buzo con capucha",
  description : "conjunto para niños",
  code : "7890",
  price : 24000,
  status:true,
  stock:5, 
  category: "conjunto para niños ",
  thumbnail : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f342e66e2e1a4ff39601ae8301227f4b_9366/Conjunto_Buzo_con_Capucha_Camo_Azul_HK0319_01_laydown.jpg",
}

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);
productManager.addProduct(product7);
productManager.addProduct(product8);
productManager.addProduct(product9);
productManager.addProduct(product10);
productManager.addProduct(product11);
productManager.addProduct(product12);
productManager.addProduct(product13);

console.log(productManager.getProducts());

// Add a new product

  /* const productId = await productManager.addProduct(product2);
  console.log(productId);
  // Get a product by ID
  const product = await productManager.getProductById(productId);
  console.log(product);
  // Update a product
  const updatedProduct = await productManager.updateProduct(productId, { price: 59000 });
  console.log(updatedProduct);
  // Delete a product
  const result = await productManager.deleteProduct(productId);
  console.log(result); */
  
  
  
  
  
  
  