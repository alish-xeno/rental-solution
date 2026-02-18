// StudentRooms KTM - JavaScript Functions

// Mobile menu toggle (if needed in future)
document.addEventListener('DOMContentLoaded', function() {
    console.log('StudentRooms KTM Platform Loaded');
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Search and Filter Rooms (for rooms.html)
function searchRooms() {
    const location = document.getElementById('location').value.toLowerCase();
    const priceRange = document.getElementById('priceRange').value;
    const roomType = document.getElementById('roomType').value.toLowerCase();
    const gender = document.getElementById('gender').value.toLowerCase();
    
    const roomCards = document.querySelectorAll('.room-card');
    let visibleCount = 0;
    
    roomCards.forEach(card => {
        let showCard = true;
        
        // Filter by location
        if (location && card.dataset.location !== location) {
            showCard = false;
        }
        
        // Filter by room type
        if (roomType && card.dataset.type !== roomType) {
            showCard = false;
        }
        
        // Filter by price range
        if (priceRange) {
            const cardPrice = parseInt(card.dataset.price);
            if (priceRange === '0-3000' && (cardPrice < 0 || cardPrice > 3000)) {
                showCard = false;
            } else if (priceRange === '3000-5000' && (cardPrice < 3000 || cardPrice > 5000)) {
                showCard = false;
            } else if (priceRange === '5000-8000' && (cardPrice < 5000 || cardPrice > 8000)) {
                showCard = false;
            } else if (priceRange === '8000+' && cardPrice < 8000) {
                showCard = false;
            }
        }
        
        // Show or hide card
        if (showCard) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    let existingMessage = document.getElementById('noResultsMessage');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (visibleCount === 0) {
        const resultsContainer = document.getElementById('roomResults');
        const message = document.createElement('div');
        message.id = 'noResultsMessage';
        message.style.gridColumn = '1 / -1';
        message.style.textAlign = 'center';
        message.style.padding = '40px';
        message.style.color = '#64748b';
        message.innerHTML = '<h3>No rooms found matching your criteria</h3><p>Try adjusting your filters to see more results.</p>';
        resultsContainer.appendChild(message);
    }
    
    // Scroll to results
    const resultsSection = document.querySelector('.room-listings');
    if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            alert(`Thank you ${name}! Your message has been received. We will get back to you at ${email} shortly.`);
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Registration Form Submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const ownerName = document.getElementById('ownerName').value;
        const ownerEmail = document.getElementById('ownerEmail').value;
        const ownerPhone = document.getElementById('ownerPhone').value;
        const propertyType = document.getElementById('propertyType').value;
        const area = document.getElementById('area').value;
        const rentAmount = document.getElementById('rentAmount').value;
        const terms = document.getElementById('terms').checked;
        
        if (!terms) {
            alert('Please agree to the terms and conditions.');
            return;
        }
        
        if (ownerName && ownerEmail && ownerPhone && propertyType && area && rentAmount) {
            alert(`Thank you ${ownerName}! Your property registration has been submitted for verification. We will contact you at ${ownerEmail} within 2-3 business days.`);
            registerForm.reset();
        } else {
            alert('Please fill in all required fields marked with *');
        }
    });
}

// Review Form - Star Rating System
document.addEventListener('DOMContentLoaded', function() {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingInput = document.getElementById(container.dataset.rating);
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.dataset.value;
                if (ratingInput) {
                    ratingInput.value = value;
                }
                
                // Update visual state
                stars.forEach(s => {
                    if (parseInt(s.dataset.value) <= parseInt(value)) {
                        s.classList.add('active');
                        s.textContent = '★';
                    } else {
                        s.classList.remove('active');
                        s.textContent = '☆';
                    }
                });
            });
            
            // Hover effect
            star.addEventListener('mouseenter', function() {
                const value = this.dataset.value;
                stars.forEach(s => {
                    if (parseInt(s.dataset.value) <= parseInt(value)) {
                        s.textContent = '★';
                    } else {
                        s.textContent = '☆';
                    }
                });
            });
        });
        
        // Reset on mouse leave
        container.addEventListener('mouseleave', function() {
            const currentValue = ratingInput ? ratingInput.value : 0;
            stars.forEach(s => {
                if (parseInt(s.dataset.value) <= parseInt(currentValue)) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
    });
});

// Review Form Submission
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const reviewerName = document.getElementById('reviewerName').value;
        const propertyName = document.getElementById('propertyName').value;
        const overallRating = document.getElementById('overallRating').value;
        const reviewText = document.getElementById('reviewText').value;
        const reviewTerms = document.getElementById('reviewTerms').checked;
        
        if (!reviewTerms) {
            alert('Please confirm that your review is based on genuine experience.');
            return;
        }
        
        if (!overallRating) {
            alert('Please provide a rating by clicking on the stars.');
            return;
        }
        
        if (reviewerName && propertyName && overallRating && reviewText) {
            const recommend = document.querySelector('input[name="recommend"]:checked');
            const recommendText = recommend ? (recommend.value === 'yes' ? 'Yes' : 'No') : 'not specified';
            
            alert(`Thank you ${reviewerName}!\n\nYour review for "${propertyName}" has been submitted successfully.\n\nRating: ${overallRating} stars\nRecommendation: ${recommendText}\n\nYour review will be verified and published within 24-48 hours to help other students make informed decisions.`);
            reviewForm.reset();
            
            // Reset star ratings visually
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
                star.textContent = '☆';
            });
        } else {
            alert('Please fill in all required fields marked with *');
        }
    });
}

// View Details Button Handler
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-small')) {
        const roomCard = e.target.closest('.room-card');
        if (roomCard) {
            const roomTitle = roomCard.querySelector('h3').textContent;
            const roomPrice = roomCard.querySelector('.room-price').textContent;
            const roomLocation = roomCard.querySelector('.room-location').textContent;
            
            alert(`Room Details:\n\n${roomTitle}\n${roomLocation}\nPrice: ${roomPrice}\n\nContact: +977-9841234567\nEmail: info@studentroomsktm.com\n\nThis is a demo. In the full version, you would see complete details, photos, and direct contact options.`);
        }
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .room-card, .stat-card, .step-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// Price Range Display Update
const rentAmountInput = document.getElementById('rentAmount');
if (rentAmountInput) {
    rentAmountInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
}

const depositAmountInput = document.getElementById('depositAmount');
if (depositAmountInput) {
    depositAmountInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/[-\s]/g, ''));
}

// Real-time email validation
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#f59e0b';
            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('small');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#f59e0b';
                errorMsg.textContent = 'Please enter a valid email address';
                this.parentNode.insertBefore(errorMsg, this.nextSibling);
            }
        } else {
            this.style.borderColor = '';
            const errorMsg = this.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
});

// Console welcome message
console.log('%cStudentRooms KTM', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cHelping students find affordable accommodation in Kathmandu', 'color: #10b981; font-size: 14px;');
console.log('Version 1.0 - BSc IT Project 2026');
