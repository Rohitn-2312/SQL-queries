class User {
    constructor(userId, name, email) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.orders = [];
    }
  
    createOrder() {
      const order = new Order(this.orders.length + 1, this);
      this.orders.push(order);
      return order;
    }
  
    viewOrders() {
      return this.orders;
    }
  }
  
  class Product {
    constructor(productId, name, price, stockQuantity) {
      this.productId = productId;
      this.name = name;
      this.price = price;
      this.stockQuantity = stockQuantity;
    }
  }
  
  class Order {
    constructor(orderId, user) {
      this.orderId = orderId;
      this.user = user;
      this.products = [];
      this.orderDate = new Date();
      this.status = "pending";
      this.payment = null;
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    removeProduct(product) {
      const index = this.products.findIndex(p => p.productId === product.productId);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    }
  
    updateStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
  class Payment {
    constructor(paymentId, order, amount, paymentMethod) {
      this.paymentId = paymentId;
      this.order = order;
      this.amount = amount;
      this.paymentDate = new Date();
      this.paymentMethod = paymentMethod;
    }
  
  }
  
  const user = new User(1, "John Doe", "john@example.com");
  const product1 = new Product(1, "Book", 19.99, 100);
  const product2 = new Product(2, "Pen", 2.99, 500);
  
  const order = user.createOrder();
  order.addProduct(product1);
  order.addProduct(product2);
  
  const payment = new Payment(1, order, 22.98, "Credit Card");
  if (payment.processPayment()) {
    order.updateStatus("completed");
  }
  
  console.log(user.viewOrders());