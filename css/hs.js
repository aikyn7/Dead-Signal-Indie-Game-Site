console.log('hi');
const UserName = prompt("enter ur name");

if (UserName){
    console.log(`Good morning , ${UserName}!`);
}

// 2

const ageinput = prompt("how old are u");
const age = Number(ageinput);

if (age >= 18) {
    console.log("you are eligible to vote");
} else {
    console.log("ur not eligible to vote");
}

// 3

const temperature = prompt("Enter values in Fahrenheit");
const fahrenheit = Number(temperature);
const celsius = (fahrenheit - 32) * 5 / 9;

console.log(`The temperature in Celsius is ${celsius.toFixed(1)}°C.`);

// 4

const inches = Number(prompt("Enter a value in inches:"));
const centi = inches * 2.54;

console.log(`The length in centimeters is ${centi} cm.`);

// 5

const item1 = Number(prompt("enter the value of first item:"));
const item2 = Number(prompt("enter the value of second item:"));
const item3 = Number(prompt("enter the value of third item:"));

const subtotal = item1 + item2 + item3;
const total = subtotal * 1.12;

console.log(`Your total order price with tax is $${total.toFixed(2)}.`);

// 6

const min = 1000;
const max = 9999;
const couponCode = Math.floor(Math.random() * (max - min + 1)) + min;

alert(`Your coupon code is: ${couponCode}.`);

// 7

const username = prompt("Enter your username:");
const password = prompt("Enter your password:");

const correctUsername = "admin";
const correctPassword = "12345";

if (username === correctUsername && password === correctPassword) {
    console.log("Login successful!");
} else {
    console.log("Invalid username or password.");
}

// 8
const randomNumber = Math.floor(Math.random() * 100) + 1;
const guess = Number(prompt("Guess a number between 1 and 100:"));

if (guess === randomNumber) {
    console.log("Correct! You guessed the number!");
} else if (guess > randomNumber) {
    console.log("Too high!");
} else if (guess < randomNumber) {
    console.log("Too low!");
}

// 9

const passwd = prompt("Enter your password:");

const isValidLength = passwd.length >= 8 && passwd.length <= 32;
const hasUpperCase = /[A-Z]/.test(passwd); 
const hasNumber = /\d/.test(passwd);    
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwd);

if (isValidLength && hasUpperCase && hasNumber && hasSpecial) {
    alert("Strong password.");
} else {
    alert("Weak password.");
}