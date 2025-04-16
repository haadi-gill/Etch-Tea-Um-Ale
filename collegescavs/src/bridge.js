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

async function fetchAllListings() {
    //TODO: Replace with database connection
    
    
    try{
        const res = await fetch('https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/posts.php');
        if(!res.ok){
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        //console.log(data);
        let tempProducts = [];
        data.forEach(element => {
            //product = {id: -1,title: "",price: -1,description: "",active: "",seller: "",images:"../assets/phone.png"};
            let temp = {
                id: Number(element.post_id),
                title: element.label,
                price: Number(element.price),
                description: element.description,
                active: element.active,
                seller: element.user_email,
                image: '../assets/phone.png' //REPLACE WITH BETTER WAY TO GET IMAGE
            }
            tempProducts.push(temp);
        });
        //console.log(tempProducts);
        return tempProducts;
    }
    catch(error){
        console.error('Error fetching listings: ',error);
        return [];
    }
    
}

async function fetchListing(listingID) {
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/posts.php";
    const query = new URLSearchParams({
        method: "post",
        id: listingID
    }).toString();
    const fullURL =`${baseURL}?${query}`;
    try{
        let res = await fetch(fullURL);
        const listings = await res.json();
        //Reconstruct listings
        return listings;
    }
    catch(error){
        console.log("Failed to gather listings: ", error);
        return [];
    }
}

async function updateListing(listingID, currentStatus) {
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/editpost.php";
  
    const newStatus = currentStatus === 'Y' ? 'N' : 'Y';
  
    const query = new URLSearchParams({
      method: "post",
      id: listingID,
      active: newStatus
    }).toString();
  
    const fullURL = `${baseURL}?${query}`;
  
    try {
      const res = await fetch(fullURL);
      const response = await res.text();
      console.log("Server response:", response);
  
      if (response.trim() === "true") {
        return newStatus;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Failed to update listing:", error);
      return null;
    }
  }

async function fetchUserListings(email){
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/posts.php";
    const query = new URLSearchParams({
        method: "post",
        email: email
    }).toString();
    const fullURL =`${baseURL}?${query}`;
    try{
        let res = await fetch(fullURL);
        const listings = await res.json();
        return listings;
    }
    catch(error){
        console.log("Failed to gather listings: ", error);
        return [];
    }
    
}

async function login(email, password){
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/login.php";
    const query = new URLSearchParams({
        method: "post",
        email: email,
        password: password
    }).toString();
    const fullURL =`${baseURL}?${query}`;
    try{
        let res = await fetch(fullURL);
        let correct = await res.json();
        if(correct === "True"){
            console.log("Login Successful");
            return correct;
        }
        else{
            console.log("Login Failed!");
            return correct;
        }
    }
    catch(error){
        console.log("Failed to login: ", error);
        return false;
    }
}

async function fetchUserByEmail(email) {
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/users.php?";
    const query = new URLSearchParams({
        method: "post",
        email
    }).toString();
    
    const fullURL = `${baseURL}?${query}`;
    
    try {
        const res = await fetch(fullURL);
        const data = await res.json();
    
        if (Array.isArray(data) && data.length > 0) {
        const user = {
            email: data[0].email,
            name: `${data[0].first_name} ${data[0].last_name}`,
            rating: data[0].rating,
        };
        return user;
        } else {
        return null;
        }
    } catch (error) {
        console.error("Could not retrieve user info: ", error);
        return null;
    }
}

async function uploadListing(email, title, description, price, image, condition, category){
    const baseURL= "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/addpost.php";
    const query = new URLSearchParams({
        method: "post",
        email: email,
        label: title,
        description: description,
        price: price,
        images: image,
        condition: condition,
        category: category
        //ADD IMAGE SUPPORT
    }).toString();
    const fullURL = `${baseURL}?${query}`;
    try{
        let res = await fetch(fullURL);
        let test = await res.json();
        console.log(test);
        if(test === true){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.error('Error uploading listing: ', error);
    }
}

async function newUser(email, password, first, last){
    const baseURL = "https://www.cise.ufl.edu/~h.gill/cis4930/in-class/Dev/signup.php";
    const query = new URLSearchParams({
        method: "post",
        email: email,
        password: password,
        first_name: first,
        last_name: last,
        rating: 5.0
    }).toString();
    const fullURL =`${baseURL}?${query}`;
    try{
        
        let res = await fetch(fullURL);
        let correct = await res.json();
        if(correct === true){
            console.log("Account Created");
            return correct;
        }
        else{
            console.log("Account Creation Failed");
            return correct;
        }
    }
    catch(error){
        console.log("Failed to create new account: ", error);
        return false;
    }
    
}

export { fetchAllListings, fetchListing, updateListing, fetchUserListings, login, fetchUserByEmail, uploadListing, newUser, categories };
