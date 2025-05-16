// DOM Elements
const clickBtn = document.getElementById('click-btn');
const clickOutput = document.getElementById('click-output');
const hoverBox = document.querySelector('.hover-box');
const hoverEffect = document.getElementById('hover-effect');
const keypressInput = document.getElementById('keypress-input');
const keypressOutput = document.getElementById('keypress-output');
const secretBox = document.querySelector('.secret-box');
const secretOutput = document.getElementById('secret-output');
const colorChanger = document.getElementById('color-changer');
const galleryImages = document.querySelectorAll('.gallery-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const validationForm = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const strengthMeter = document.querySelector('.strength-meter');
const strengthText = document.getElementById('strength-text');

// Variables
let clickCount = 0;
let keypressCount = 0;
let currentImageIndex = 0;
let longPressTimer;
const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c'];
const secretMessages = [
    "You found the secret!",
    "Wow, you're persistent!",
    "JavaScript is awesome!",
    "Keep exploring!",
    "You're a pro at this!"
];

// Event Listeners

// 1. Event Handling Section

// Button click event
clickBtn.addEventListener('click', () => {
    clickCount++;
    clickOutput.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
    clickOutput.style.color = colors[clickCount % colors.length];
    
    // Add animation
    clickBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickBtn.style.transform = 'scale(1)';
    }, 100);
});

// Hover effects
hoverBox.addEventListener('mouseenter', () => {
    hoverEffect.style.transform = 'rotate(45deg) scale(1.2)';
    hoverEffect.style.backgroundColor = '#2ecc71';
});

hoverBox.addEventListener('mouseleave', () => {
    hoverEffect.style.transform = 'rotate(0) scale(1)';
    hoverEffect.style.backgroundColor = '#e74c3c';
});

// Keypress detection
keypressInput.addEventListener('keydown', () => {
    keypressCount++;
    keypressOutput.textContent = `Key presses: ${keypressCount}`;
});

// Secret actions (double click and long press)
secretBox.addEventListener('dblclick', showSecretMessage);

secretBox.addEventListener('mousedown', () => {
    longPressTimer = setTimeout(() => {
        showSecretMessage();
    }, 1000);
});

secretBox.addEventListener('mouseup', () => {
    clearTimeout(longPressTimer);
});

secretBox.addEventListener('mouseleave', () => {
    clearTimeout(longPressTimer);
});

// 2. Interactive Elements Section

// Color changing button
colorChanger.addEventListener('click', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorChanger.style.backgroundColor = randomColor;
    colorChanger.textContent = `Color: ${randomColor}`;
});

// Image gallery
function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    currentImageIndex = index;
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

// Auto-advance gallery
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}, 5000);

// Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding tab content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    });
});

// 3. Form Validation Section

// Real-time validation
nameInput.addEventListener('input', () => validateName());
emailInput.addEventListener('input', () => validateEmail());
passwordInput.addEventListener('input', () => {
    validatePassword();
    checkPasswordStrength();
});

// Form submission
validationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        validationForm.reset();
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        strengthMeter.style.width = '0%';
        strengthText.textContent = 'Password strength';
    } else {
        alert('Please fix the errors before submitting.');
    }
});

// Validation functions
function validateName() {
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        emailError.textContent = '';
        return true; // Email is optional in this example
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    if (passwordInput.value.length === 0) {
        passwordError.textContent = '';
        return false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;
    
    if (password.length === 0) {
        strengthMeter.style.width = '0%';
        strengthMeter.style.backgroundColor = '';
        strengthText.textContent = 'Password strength';
        return;
    }
    
    // Length contributes to strength
    strength += Math.min(password.length / 16, 0.3);
    
    // Character variety
    if (/[A-Z]/.test(password)) strength += 0.1;
    if (/[a-z]/.test(password)) strength += 0.1;
    if (/[0-9]/.test(password)) strength += 0.1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 0.1;
    
    // Normalize to 100%
    strength = Math.min(strength, 1);
    const percentage = Math.round(strength * 100);
    
    strengthMeter.style.width = `${percentage}%`;
    
    // Set color based on strength
    if (percentage < 40) {
        strengthMeter.style.backgroundColor = '#e74c3c';
        strengthText.textContent = 'Weak';
    } else if (percentage < 70) {
        strengthMeter.style.backgroundColor = '#f39c12';
        strengthText.textContent = 'Moderate';
    } else {
        strengthMeter.style.backgroundColor = '#2ecc71';
        strengthText.textContent = 'Strong';
    }
}

// Helper functions
function showSecretMessage() {
    const randomIndex = Math.floor(Math.random() * secretMessages.length);
    secretOutput.textContent = secretMessages[randomIndex];
    secretOutput.style.color = colors[randomIndex];
    
    // Add animation
    secretOutput.style.animation = 'none';
    setTimeout(() => {
        secretOutput.style.animation = 'fadeIn 0.5s';
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        secretOutput.textContent = '';
    }, 3000);
}