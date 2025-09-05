// App.js for Accord Bizpark Landing Page with Official Images - FIXED VERSION

// Gallery functionality with official accordbizpark.com images
const galleryImages = [
    {
        src: 'https://accordbizpark.com/wp-content/uploads/2025/08/cluster-gate-1.jpg',
        alt: 'Cluster Gate Accord Bizpark',
        title: 'Cluster Gate - Pintu masuk kawasan dengan sistem keamanan terpadu'
    },
    {
        src: 'https://accordbizpark.com/home/gudang/',
        alt: 'Gudang Unit Accord Bizpark',
        title: 'Unit Gudang - Fasilitas penyimpanan dengan standar industri modern'
    },
    {
        src: 'https://accordbizpark.com/home/gudang2/',
        alt: 'Gudang 2 Accord Bizpark',
        title: 'Unit Gudang 2 - Desain warehouse yang efisien dan fungsional'
    },
    {
        src: 'https://accordbizpark.com/home/gudang3/',
        alt: 'Gudang 3 Accord Bizpark',
        title: 'Unit Gudang 3 - Layout optimal untuk berbagai kebutuhan bisnis'
    },
    {
        src: 'https://accordbizpark.com/home/row-jalan-lebar/',
        alt: 'Row Jalan Lebar Accord Bizpark',
        title: 'Row Jalan Lebar - Akses jalan 12 meter untuk kemudahan distribusi'
    }
];

let currentImageIndex = 0;

// FIXED: Smooth scroll function for navigation
function smoothScrollTo(event, targetId) {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 80;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log(`Navigating to section: ${targetId}`);
    } else {
        console.warn(`Target element not found: ${targetId}`);
    }
}

// FIXED: Open gallery modal with specific image
function openGalleryModal(imageIndex) {
    currentImageIndex = imageIndex;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage && galleryImages[currentImageIndex]) {
        // Show loading state
        modalImage.style.opacity = '0.5';
        modalImage.src = galleryImages[currentImageIndex].src;
        modalImage.alt = galleryImages[currentImageIndex].alt;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        console.log(`Opening gallery modal for image: ${galleryImages[currentImageIndex].alt}`);
        
        modalImage.onload = function() {
            this.style.opacity = '1';
            console.log('Modal image loaded successfully');
        };
        
        modalImage.onerror = function() {
            this.style.opacity = '0.3';
            console.warn('Failed to load modal image:', this.src);
            // Show fallback text
            this.alt = 'Gambar tidak dapat dimuat - ' + galleryImages[currentImageIndex].alt;
        };
    } else {
        console.error('Modal elements not found or invalid image index');
    }
}

// Close gallery modal
function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        console.log('Gallery modal closed');
    }
}

// Navigate to next image in gallery
function nextGalleryImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateModalImage();
}

// Navigate to previous image in gallery
function prevGalleryImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateModalImage();
}

// Helper function to update modal image
function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage && galleryImages[currentImageIndex]) {
        modalImage.style.opacity = '0.5';
        modalImage.src = galleryImages[currentImageIndex].src;
        modalImage.alt = galleryImages[currentImageIndex].alt;
        
        modalImage.onload = function() {
            this.style.opacity = '1';
        };
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 253, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
    } else {
        header.style.background = 'var(--color-surface)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
}

// Animate elements on scroll
function animateOnScroll() {
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

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.advantage-card, .facility-card, .spec-item, .promo-card, .choose-card, .gallery-item, .plan-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// FIXED: Enhanced WhatsApp functionality
function initWhatsAppLinks() {
    console.log('Initializing WhatsApp links...');
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    
    console.log(`Found ${whatsappLinks.length} WhatsApp links`);
    
    whatsappLinks.forEach((link, index) => {
        console.log(`Processing WhatsApp link ${index + 1}:`, link.href);
        
        // Remove any existing event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add click handler
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            console.log('WhatsApp link clicked:', href);
            
            // Force open WhatsApp
            try {
                // Try multiple methods to ensure WhatsApp opens
                if (window.open(href, '_blank')) {
                    console.log('WhatsApp opened successfully via window.open');
                } else {
                    // Fallback: direct navigation
                    console.log('Fallback: Direct navigation to WhatsApp');
                    window.location.href = href;
                }
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                // Final fallback
                window.location.href = href;
            }
            
            return false;
        });
        
        // Add visual feedback
        newLink.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        newLink.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Counter animation for numbers
function animateCounters() {
    const counters = document.querySelectorAll('.price-value');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = `Rp ${current.toFixed(1)} Miliar`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target, 1.0, 1.4, 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// FIXED: Enhanced image loading with better error handling
function initImageLoading() {
    const images = document.querySelectorAll('img');
    console.log(`Initializing ${images.length} images...`);
    
    images.forEach((img, index) => {
        // Set initial loading state
        if (!img.complete || img.naturalWidth === 0) {
            img.style.opacity = '0.3';
        }
        
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
            console.log(`Image ${index + 1} already loaded:`, img.src);
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                console.log(`Image ${index + 1} loaded successfully:`, this.src);
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.3';
                console.warn(`Failed to load image ${index + 1}:`, this.src);
                
                // Handle logo fallback
                if (this.classList.contains('logo-image')) {
                    this.style.display = 'none';
                    const fallback = this.nextElementSibling;
                    if (fallback && fallback.classList.contains('logo-fallback')) {
                        fallback.style.display = 'block';
                        console.log('Logo fallback activated');
                    }
                }
                
                // Set fallback alt text
                this.setAttribute('alt', 'Gambar Accord Bizpark - gagal dimuat dari accordbizpark.com');
            });
            
            // Force reload if src is already set but not loaded
            if (img.src && !img.complete) {
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 100);
            }
        }
    });
}

// Handle keyboard navigation for modal
function handleKeyboardNavigation(e) {
    const modal = document.getElementById('galleryModal');
    
    if (modal && !modal.classList.contains('hidden')) {
        switch(e.key) {
            case 'Escape':
                closeGalleryModal();
                break;
            case 'ArrowLeft':
                prevGalleryImage();
                break;
            case 'ArrowRight':
                nextGalleryImage();
                break;
        }
    }
}

// Mobile menu toggle and header behavior
function initMobileMenu() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide header on scroll down, show on scroll up (mobile behavior)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// FIXED: Initialize gallery with proper image loading
function initGallery() {
    console.log('Initializing gallery with', galleryImages.length, 'images');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img && galleryImages[index]) {
            // Ensure image source is set
            img.src = galleryImages[index].src;
            img.alt = galleryImages[index].alt;
            
            console.log(`Setting up gallery item ${index + 1}:`, galleryImages[index].src);
            
            // Add click handler
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Gallery item ${index + 1} clicked`);
                openGalleryModal(index);
            });
            
            // Add loading states
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                console.log(`Gallery image ${index + 1} loaded successfully`);
            });
            
            img.addEventListener('error', function() {
                console.warn(`Failed to load gallery image ${index + 1}:`, this.src);
                this.style.opacity = '0.5';
                
                // Update overlay text to indicate error
                const overlay = item.querySelector('.gallery-overlay span');
                if (overlay) {
                    overlay.textContent += ' (Tidak dapat dimuat)';
                }
            });
            
            // Force image reload if needed
            if (img.src && !img.complete) {
                const originalSrc = img.src;
                img.src = '';
                setTimeout(() => {
                    img.src = originalSrc;
                }, 50);
            }
        }
    });
}

// Enhanced title animation trigger
function initTitleAnimation() {
    const title = document.querySelector('.hero__title');
    const subtitle = document.querySelector('.hero__subtitle');
    const description = document.querySelector('.hero__description');
    const cta = document.querySelector('.hero__cta');
    
    if (!title) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        [title, subtitle, description, cta].forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        });
        return;
    }
    
    // Trigger animations on page load
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0) scale(1)';
    }, 300);
}

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏗️ Initializing Accord Bizpark landing page - FIXED VERSION');
    
    // Initialize scroll effects with throttling for better performance
    window.addEventListener('scroll', throttle(handleHeaderScroll, 16));
    
    // Initialize scroll animations
    animateOnScroll();
    
    // FIXED: Initialize WhatsApp links with better handling
    setTimeout(initWhatsAppLinks, 100);
    
    // Initialize counter animations
    animateCounters();
    
    // FIXED: Initialize image loading with enhanced error handling
    initImageLoading();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // FIXED: Initialize gallery with proper image setup
    setTimeout(initGallery, 200);
    
    // Initialize title animation
    initTitleAnimation();
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Handle modal clicks outside content
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
    }
    
    // FIXED: Ensure all navigation links work properly
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log(`Setting up ${navLinks.length} navigation links`);
    
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        const targetId = href.substring(1); // Remove the #
        
        console.log(`Navigation link ${index + 1}: ${href} -> ${targetId}`);
        
        link.addEventListener('click', function(e) {
            console.log(`Navigation clicked: ${targetId}`);
            smoothScrollTo(e, targetId);
        });
    });
    
    // Preload gallery images for better performance
    console.log('🖼️ Preloading gallery images from accordbizpark.com...');
    galleryImages.forEach((imageData, index) => {
        const img = new Image();
        img.onload = function() {
            console.log(`✅ Gallery image ${index + 1} preloaded successfully`);
        };
        img.onerror = function() {
            console.warn(`❌ Failed to preload gallery image ${index + 1}:`, imageData.src);
        };
        img.src = imageData.src;
    });
    
    console.log('✅ Accord Bizpark landing page initialization completed!');
    
    // Final check after everything loads
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ Page fully loaded in ${loadTime.toFixed(2)}ms`);
        
        // Final verification
        const allImages = document.querySelectorAll('img');
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        console.log(`📊 Final Status:`);
        console.log(`- Total images: ${allImages.length}`);
        console.log(`- Gallery images: ${galleryItems.length}`);
        console.log(`- WhatsApp links: ${whatsappLinks.length}`);
        
        // Verify gallery images are properly set
        galleryItems.forEach((img, index) => {
            if (img.src && img.src.includes('accordbizpark.com')) {
                console.log(`✅ Gallery image ${index + 1}: ${img.src}`);
            } else {
                console.warn(`⚠️ Gallery image ${index + 1} not properly set`);
            }
        });
    });
});

// Utility functions
const utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },
    
    formatPhone: (phone) => {
        return phone.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    isMobile: () => {
        return window.innerWidth <= 768;
    },
    
    scrollToTop: () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    isOfficialImage: (url) => {
        return url.includes('accordbizpark.com');
    }
};

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.warn('JavaScript error occurred:', e.message);
});

// Export functions for global access
window.accordBizpark = {
    openGalleryModal,
    closeGalleryModal,
    nextGalleryImage,
    prevGalleryImage,
    smoothScrollTo,
    utils,
    galleryImages
};

// Make functions globally available
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.nextGalleryImage = nextGalleryImage;
window.prevGalleryImage = prevGalleryImage;
window.smoothScrollTo = smoothScrollTo;