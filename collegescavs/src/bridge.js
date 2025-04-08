/*
This file exists to connect the backend to the frontend, 
acting as a helper file. Primarily it will turn database items
to usable objects for the front end.
*/

//This is just test data until database is connected
const products = [
    { id: 1, title: 'Laptop', price: 999, description: 'A powerful laptop for gaming and work', image: '../assets/laptop.jpg', ratings: 4.5, category: 'Electronics' },
    { id: 2, title: 'Smartphone', price: 499, description: 'A sleek and modern smartphone', image: '../assets/phone.png', ratings: 4, category: 'Electronics' },
    { id: 3, title: 'Headphones', price: 199, description: 'Noise-cancelling over-ear headphones', image: '../assets/headphones.jpg', ratings: 4.2, category: 'Accessories' },
    { id: 4, title: 'Camera', price: 799, description: 'Good aklj skdfaj kj ksjf klajdfkljaslkdjfk jksjfkajdkf  kasjfksj  lkjf klasjdfl  lkadsjf sdkfj lajdf aksdjf asjdflkja ljsdkl asjfkljsd ksaljf lkasjdf dsjf askf sdj f', image:  '../assets/camera.jpg', ratings: 4.7, category: 'Electronics' },
    { id: 5, title: 'Gaming Console', price: 399, description: 'A next-gen console with amazing graphics and performance', image: '../assets/phone.png', ratings: 4.8, category: 'Electronics' },
    { id: 6, title: 'Smartwatch', price: 150, description: 'Track your fitness with this sleek smartwatch', image: '../assets/phone.png', ratings: 4.3, category: 'Accessories' },
    { id: 7, title: 'Bluetooth Speaker', price: 89, description: 'Portable speaker with great sound quality', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics' },
    { id: 8, title: 'Laptop Sleeve', price: 25, description: 'Protect your laptop with this stylish sleeve', image: '../assets/phone.png', ratings: 4.1, category: 'Accessories' },
    { id: 9, title: 'Portable Charger', price: 35, description: 'Keep your devices charged on the go', image: '../assets/phone.png', ratings: 4.4, category: 'Accessories' },
    { id: 10, title: 'Wireless Mouse', price: 45, description: 'Ergonomic wireless mouse for smooth navigation', image: '../assets/phone.png', ratings: 4.2, category: 'Accessories' },
    { id: 11, title: 'Electric Scooter', price: 499, description: 'Ride in style with this electric scooter', image: '../assets/phone.png', ratings: 4.7, category: 'Electronics' },
    { id: 12, title: 'Bluetooth Earbuds', price: 120, description: 'High-quality sound in a compact design', image: '../assets/phone.png', ratings: 4.3, category: 'Accessories' },
    { id: 13, title: 'E-Reader', price: 129, description: 'Carry thousands of books in a compact device', image: '../assets/phone.png', ratings: 4.5, category: 'Electronics' },
    { id: 14, title: 'Drone', price: 799, description: 'Capture stunning aerial shots with this drone', image: '../assets/phone.png', ratings: 4.9, category: 'Electronics' },
    { id: 15, title: 'Projector', price: 350, description: 'Project your media onto any surface for a cinematic experience', image: '../assets/phone.png', ratings: 4.6, category: 'Electronics' }
  ];

  //test user data until database connected
const users = [
    //sample list of users for loggin in and displaying profiles
    {
      email: 'john@example.com',
      rating: 4.5,
      profilePic: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Smiley.svg',
      listings: [
        { id: 1, title: 'Laptop', price: 999, description: 'A powerful laptop for gaming and work', image: '../assets/laptop.jpg', ratings: 4.5, category: 'Electronics' },
        { id: 2, title: 'Smartphone', price: 499, description: 'A sleek and modern smartphone', image: '../assets/phone.png', ratings: 4.5, category: 'Electronics' },
        { id: 3, title: 'Headphones', price: 199, description: 'Noise-cancelling over-ear headphones', image: '../assets/headphones.jpg', ratings: 4.5, category: 'Accessories' },
    ],
      password: 'password123',
      purchases: [

      ]
    },
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
    const user = users.find(u => u.email === email);
    return user ? user.listings : [];
}

function login(email, password){
    //TODO: Replace with login functionality
    const user = users.find(u => u.email === email && u.password === password);
    return user ? { ...user, password: undefined } : null;
}

function fetchUserInfo(email) {
    const user = users.find(u => u.email === email);
    if (!user) return null;
    const { rating, profilePic } = user;
    return { rating, profilePic };
}

function uploadListing(listing){
    //TODO: Replace with backend functionality for uploading
}

function newUser(email, password){
    //TODO: Replace with email validation and uploading new profile
}

export { fetchAllListings, fetchListing, fetchUserListings, login, fetchUserInfo, uploadListing, newUser };
