class Product {
    constructor(productId, name, stockLevel) {
      this.productId = productId;
      this.name = name;
      this.stockLevel = stockLevel;
    }
  }
  
  class Order {
    constructor(orderId, items) {
      this.orderId = orderId;
      this.items = items; // Map of productId to quantity
    }
  }
  
  function processOrders(products, orders, restockThreshold = 10) {
    const alerts = new Set();
  
    for (const order of orders) {
      for (const [productId, quantity] of order.items) {
        const product = products.find(p => p.productId === productId);
        
        if (!product) {
          throw new Error(`Product with id ${productId} not found`);
        }
  
        if (product.stockLevel < quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
  
        product.stockLevel -= quantity;
  
        if (product.stockLevel < restockThreshold) {
          alerts.add(product.productId);
        }
      }
    }
  
    return Array.from(alerts);
  }
  
  function restockItems(products, restockList) {
    for (const [productId, quantity] of restockList) {
      const product = products.find(p => p.productId === productId);
      
      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }
  
      product.stockLevel += quantity;
    }
  }
  
  // Example usage:
  const products = [
    new Product(1, "Book", 50),
    new Product(2, "Pen", 100),
    new Product(3, "Notebook", 30)
  ];
  
  const orders = [
    new Order(1, new Map([[1, 10], [2, 5]])),
    new Order(2, new Map([[2, 50], [3, 25]]))
  ];
  
  try {
    const alerts = processOrders(products, orders);
    console.log(`Alerts for restocking: ${alerts}`);
  
    const restockList = new Map([[2, 100], [3, 50]]);
    restockItems(products, restockList);
  
    console.log("Updated stock levels:");
    for (const product of products) {
      console.log(`${product.name}: ${product.stockLevel}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }