/*
This file exists to connect the backend to the frontend, 
acting as a helper file. Primarily it will turn database items
to usable objects for the front end.
*/

// list of categories
const categories = [
    "Textbooks",
    "Furniture",
    "Kitchenware",
    "Electronics",
    "Clothing",
    "Bedding & Linens",
    "School Supplies",
    "Office Supplies",
    "Sports Equipment",
    "Technology Accessories",
    "Appliances",
    "Art Supplies",
    "Party Supplies",
    "Cleaning Supplies",
    "Toys & Games",
    "Health & Fitness",
    "Decor",
    "Laptops & Computers",
    "Cell Phones & Accessories",
    "Gaming",
    "Transportation (Bikes, Scooters)",
    "Room Essentials",
    "Stationery",
    "Food & Snacks",
    "Tickets & Events",
    "Musical Instruments",
    "Jewelry & Watches",
    "Outdoor Gear",
    "Storage Solutions",
    "Other"
  ];
  

//This is just test data until database is connected
let products = [
    { id: 1, title: 'Laptop', price: 999, description: 'A powerful laptop for gaming and work', condition: 'new', image: '../assets/laptop.jpg', ratings: 2.5, category: 'Electronics', sold: false },
    { id: 2, title: 'Smartphone', price: 499, description: 'A sleek and modern smartphone', condition: 'new', image: '../assets/phone.png', ratings: 1, category: 'Electronics', sold: true },
    { id: 3, title: 'Headphones', price: 199, description: 'Noise-cancelling over-ear headphones', condition: 'used', image: '../assets/headphones.jpg', ratings: 0, category: 'Accessories', sold: true },
    { id: 4, title: 'Camera', price: 799, description: 'Good aklj skdfaj kj ksjf klajdfkljaslkdjfk jksjfkajdkf  kasjfksj  lkjf klasjdfl  lkadsjf sdkfj lajdf aksdjf asjdflkja ljsdkl asjfkljsd ksaljf lkasjdf dsjf askf sdj f', condition: 'new', image:  '../assets/camera.jpg', ratings: 4.7, category: 'Electronics', sold: false },
    { id: 5, title: 'Gaming Console', price: 399, description: 'A next-gen console with amazing graphics and performance',  condition: 'used', image: '../assets/phone.png', ratings: 4.8, category: 'Electronics', sold: false },
    { id: 6, title: 'Smartwatch', price: 150, description: 'Track your fitness with this sleek smartwatch', condition: 'used', image: '../assets/phone.png', ratings: 5, category: 'Accessories', sold: false },
    { id: 7, title: 'Bluetooth Speaker', price: 89, description: 'Portable speaker with great sound quality', condition: 'new', image: '../assets/phone.png', ratings: 3.8, category: 'Electronics', sold: true },
    { id: 8, title: 'Laptop Sleeve', price: 25, description: 'Protect your laptop with this stylish sleeve', condition: 'new', image: '../assets/phone.png', ratings: 4.1, category: 'Accessories', sold: false },
    { id: 9, title: 'Portable Charger', price: 35, description: 'Keep your devices charged on the go', condition: 'new', image: '../assets/phone.png', ratings: 4.4, category: 'Accessories', sold: false },
    { id: 10, title: 'Wireless Mouse', price: 45, description: 'Ergonomic wireless mouse for smooth navigation', condition: 'new', image: '../assets/phone.png', ratings: 4.2, category: 'Accessories', sold: false },
    { id: 11, title: 'Electric Scooter', price: 499, description: 'Ride in style with this electric scooter', condition: 'new', image: '../assets/phone.png', ratings: 1.7, category: 'Electronics', sold: false },
    { id: 12, title: 'Bluetooth Earbuds', price: 120, description: 'High-quality sound in a compact design', condition: 'new', image: '../assets/phone.png', ratings: 5, category: 'Accessories', sold: false },
    { id: 13, title: 'E-Reader', price: 129, description: 'Carry thousands of books in a compact device', condition: 'new', image: '../assets/phone.png', ratings: 3.8, category: 'Electronics', sold: false },
    { id: 14, title: 'Drone', price: 799, description: 'Capture stunning aerial shots with this drone', condition: 'new', image: '../assets/phone.png', ratings: 1.6, category: 'Electronics', sold: false },
    { id: 15, title: 'Projector', price: 350, description: 'Project your media onto any surface for a cinematic experience', condition: 'new', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics', sold: false },
    { id: 16, title: 'Very long title to test the styles of Projector', price: 350, description: 'Project your media onto any surface for a cinematic experience', condition: 'new', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics', sold: false }

  ];

function fetchAllListings() {
    //TODO: Replace with database connection
    return products;

}

function fetchListing(listingID) {
    //TODO: Replace with database search
    return products.find(obj => obj.id === listingID);
}

function fetchUserListings(email){
    //TODO: Replace with all user listings from database
}

function login(email, password){
    //TODO: Replace with login functionality
}

function uploadListing(listing){
    //TODO: Replace with backend functionality for uploading
}

function newUser(email, password){
    //TODO: Replace with email validation and uploading new profile
}

export { fetchAllListings, fetchListing, fetchUserListings, login, uploadListing, newUser, categories };
