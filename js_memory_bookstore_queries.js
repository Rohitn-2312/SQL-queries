// Sample data
const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99 },
    { id: 3, title: '1984', author: 'George Orwell', price: 11.99 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 9.99 }
  ];
  
  const orders = [
    { id: 1, customerId: 1, orderDate: '2023-01-15' },
    { id: 2, customerId: 2, orderDate: '2023-02-20' },
    { id: 3, customerId: 3, orderDate: '2023-03-25' },
    { id: 4, customerId: 1, orderDate: '2023-04-10' }
  ];
  
  const orderDetails = [
    { orderId: 1, bookId: 1, quantity: 2 },
    { orderId: 1, bookId: 3, quantity: 1 },
    { orderId: 2, bookId: 2, quantity: 1 },
    { orderId: 2, bookId: 4, quantity: 3 },
    { orderId: 3, bookId: 1, quantity: 1 },
    { orderId: 3, bookId: 2, quantity: 1 },
    { orderId: 3, bookId: 3, quantity: 1 },
    { orderId: 4, bookId: 4, quantity: 2 }
  ];
  
  // Query 1: Top 5 customers who purchased the most books
  const topCustomers = customers.map(customer => {
    const totalBooks = orderDetails
      .filter(od => orders.find(o => o.id === od.orderId).customerId === customer.id)
      .reduce((sum, od) => sum + od.quantity, 0);
    return { ...customer, totalBooksPurchased: totalBooks };
  }).sort((a, b) => b.totalBooksPurchased - a.totalBooksPurchased).slice(0, 5);
  
  console.log("Top 5 customers:");
  console.table(topCustomers);
  
  // Query 2: Total revenue generated from book sales by each author
  const authorRevenue = books.reduce((acc, book) => {
    const revenue = orderDetails
      .filter(od => od.bookId === book.id)
      .reduce((sum, od) => sum + (book.price * od.quantity), 0);
    acc[book.author] = (acc[book.author] || 0) + revenue;
    return acc;
  }, {});
  
  console.log("\nAuthor revenue:");
  console.table(Object.entries(authorRevenue).map(([author, revenue]) => ({ author, revenue })));
  
  // Query 3: Books ordered more than 0 times (changed from 10 for demo purposes), with total quantity ordered
  const popularBooks = books.map(book => {
    const totalOrdered = orderDetails
      .filter(od => od.bookId === book.id)
      .reduce((sum, od) => sum + od.quantity, 0);
    return { ...book, totalQuantityOrdered: totalOrdered };
  }).filter(book => book.totalQuantityOrdered > 0)
    .sort((a, b) => b.totalQuantityOrdered - a.totalQuantityOrdered);
  
  console.log("\nPopular books:");
  console.table(popularBooks);