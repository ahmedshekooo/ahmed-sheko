import emailjs from '@emailjs/browser';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS with your public key
  // You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
  emailjs.init('YOUR_PUBLIC_KEY');
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation link highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Add data visualization animation effects
  const bars = document.querySelectorAll('.chart-container .bar');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        void entry.target.offsetWidth; // Trigger reflow
        entry.target.style.animation = `barGrow ${2 + Math.random()}s ease forwards ${Math.random() * 0.5}s`;
      }
    });
  }, observerOptions);
  
  bars.forEach(bar => {
    barObserver.observe(bar);
  });
  
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Handle contact form submission via EmailJS
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        // Show sending state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Clear any existing status messages
        let statusElement = document.querySelector('.form-status');
        if (statusElement) {
          statusElement.remove();
        }
        
        const templateParams = {
          from_name: name,
          reply_to: email,
          message: message
        };
        
        // Using the provided service_id "service_ahmed" but you need to provide a valid template_id and public key
        emailjs.send('service_ahmed', 'template_id', templateParams)
          .then(function() {
            // Create success message
            statusElement = document.createElement('div');
            statusElement.classList.add('form-status', 'success');
            statusElement.textContent = 'Message sent successfully! I will get back to you soon.';
            contactForm.insertBefore(statusElement, submitButton);
            
            // Reset form
            contactForm.reset();
          }, function(error) {
            console.error('Error sending message:', error);
            
            // Create error message
            statusElement = document.createElement('div');
            statusElement.classList.add('form-status', 'error');
            statusElement.textContent = 'Failed to send message. Please try again later.';
            contactForm.insertBefore(statusElement, submitButton);
          })
          .finally(function() {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
      } else {
        // Create validation error message
        const statusElement = document.createElement('div');
        statusElement.classList.add('form-status', 'error');
        statusElement.textContent = 'Please fill in all fields';
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        contactForm.insertBefore(statusElement, submitButton);
      }
    });
  }
});
