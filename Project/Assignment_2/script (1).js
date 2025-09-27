// Florence Travel Website JavaScript

// Import necessary libraries
const bootstrap = window.bootstrap // Declare bootstrap variable
const AOS = window.AOS // Declare AOS variable
const google = window.google // Declare google variable

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initPreloader()
  initNavbar()
  initSmoothScroll()
  initBackToTop()
  initCardFlips()
  initContactForm()
  initAOS()
  initGoogleMap()
  initActivityCardEffects()
  initParallax()
  initLazyLoading()
  optimizePerformance()
  initAccessibility()
  initMiniImageCarousel()
})

// Preloader functionality
function initPreloader() {
  const preloader = document.getElementById("preloader")

  // Hide preloader after page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1500) // Show preloader for at least 1.5 seconds
  })
}

// Navigation functionality
function initNavbar() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active link highlighting
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Mobile menu close on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })
}

// Smooth scroll functionality
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  // Scroll to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Card flip functionality
function initCardFlips() {
  const attractionCards = document.querySelectorAll(".attraction-card")
  const restaurantCards = document.querySelectorAll(".restaurant-card")

  // Add click event to attraction cards
  attractionCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardInner = this.querySelector(".card-inner")
      cardInner.style.transform = cardInner.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)"
    })

    // Reset on mouse leave
    card.addEventListener("mouseleave", function () {
      setTimeout(() => {
        const cardInner = this.querySelector(".card-inner")
        cardInner.style.transform = "rotateY(0deg)"
      }, 2000)
    })
  })

  // Add click event to restaurant cards
  restaurantCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardInner = this.querySelector(".card-inner")
      cardInner.style.transform = cardInner.style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)"
    })

    // Reset on mouse leave
    card.addEventListener("mouseleave", function () {
      setTimeout(() => {
        const cardInner = this.querySelector(".card-inner")
        cardInner.style.transform = "rotateY(0deg)"
      }, 2000)
    })
  })

  // Mini carousel functionality for attraction cards
  initMiniCarousels()
}

// Mini carousel functionality
function initMiniCarousels() {
  const carousels = document.querySelectorAll(".mini-carousel")

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img")
    let currentIndex = 0

    // Auto-rotate images
    setInterval(() => {
      images[currentIndex].style.opacity = "0.5"
      currentIndex = (currentIndex + 1) % images.length
      images[currentIndex].style.opacity = "1"
    }, 2000)

    // Click to change image
    images.forEach((img, index) => {
      img.addEventListener("click", (e) => {
        e.stopPropagation()
        images[currentIndex].style.opacity = "0.5"
        currentIndex = index
        images[currentIndex].style.opacity = "1"
      })
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = this.querySelector('input[type="text"]').value
      const email = this.querySelector('input[type="email"]').value
      const message = this.querySelector("textarea").value

      // Basic validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields.", "error")
        return
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".btn-primary")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification("Thank you for your message! We'll get back to you soon.", "success")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `

  // Add to page
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => notification.remove(), 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
  if (AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  }
}

// Google Maps initialization
function initGoogleMap() {
  // This function will be called by the Google Maps API
  window.initMap = () => {
    // Florence coordinates
    const florence = { lat: 43.7696, lng: 11.2558 }

    // Create map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: florence,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#faf3e3" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#c06014" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#e6b325" }],
        },
      ],
    })

    // Attraction locations
    const attractions = [
      {
        name: "Ponte Vecchio",
        position: { lat: 43.7679, lng: 11.253 },
        description: "The iconic medieval bridge spanning the Arno River",
      },
      {
        name: "Piazzale Michelangelo",
        position: { lat: 43.7629, lng: 11.265 },
        description: "Famous viewpoint with panoramic views of Florence",
      },
      {
        name: "Boboli Gardens",
        position: { lat: 43.7649, lng: 11.2499 },
        description: "Historic park behind Pitti Palace",
      },
      {
        name: "Piazza della Signoria",
        position: { lat: 43.7696, lng: 11.2558 },
        description: "The political heart of Florence",
      },
      {
        name: "San Miniato al Monte",
        position: { lat: 43.759, lng: 11.265 },
        description: "Beautiful Romanesque basilica on a hilltop",
      },
    ]

    // Add markers
    attractions.forEach((attraction) => {
      const marker = new google.maps.Marker({
        position: attraction.position,
        map: map,
        title: attraction.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
                        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0C6.7 0 0 6.7 0 15c0 8.3 15 25 15 25s15-16.7 15-25C30 6.7 23.3 0 15 0z" fill="#c06014"/>
                            <circle cx="15" cy="15" r="8" fill="#faf3e3"/>
                        </svg>
                    `),
          scaledSize: new google.maps.Size(30, 40),
          anchor: new google.maps.Point(15, 40),
        },
      })

      // Info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
                    <div style="padding: 10px; font-family: 'Poppins', sans-serif;">
                        <h4 style="color: #c06014; margin: 0 0 5px 0; font-family: 'Playfair Display', serif;">${attraction.name}</h4>
                        <p style="margin: 0; color: #3a2d2d;">${attraction.description}</p>
                    </div>
                `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })
    })
  }

  // Fallback if Google Maps fails to load
  setTimeout(() => {
    const mapElement = document.getElementById("map")
    if (mapElement && !google) {
      mapElement.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; border-radius: 10px; color: #6c757d;">
                    <div style="text-align: center;">
                        <h4>Map Unavailable</h4>
                        <p>Please add your Google Maps API key to view the interactive map.</p>
                    </div>
                </div>
            `
    }
  }, 3000)
}

// Activity card hover effects
function initActivityCardEffects() {
  const activityCards = document.querySelectorAll(".activity-card")

  activityCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const image = this.querySelector(".card-image")
      if (image) {
        image.style.transform = "scale(1.1)"
      }
    })

    card.addEventListener("mouseleave", function () {
      const image = this.querySelector(".card-image")
      if (image) {
        image.style.transform = "scale(1)"
      }
    })
  })
}

// Parallax effect for hero section
function initParallax() {
  const heroSection = document.querySelector(".hero-section")

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      heroSection.style.transform = `translateY(${rate}px)`
    })
  }
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Performance optimization
function optimizePerformance() {
  // Debounce scroll events
  let scrollTimeout
  const originalScrollHandler = window.onscroll

  window.onscroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler()
      }
    }, 16) // ~60fps
  }
}

// Error handling for external resources
window.addEventListener("error", (e) => {
  console.warn("Resource failed to load:", e.target.src || e.target.href)

  // Handle image loading errors
  if (e.target.tagName === "IMG") {
    e.target.src = "/placeholder.svg?height=300&width=400&text=Image+Unavailable"
  }
})

// Accessibility improvements
function initAccessibility() {
  // Add keyboard navigation for cards
  const cards = document.querySelectorAll(".attraction-card, .restaurant-card, .activity-card")

  cards.forEach((card) => {
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "button")

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })

  // Add skip link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #c06014;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px"
  })

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
}

// Mini Image Carousel functionality
function initMiniImageCarousel() {
  const carouselWrapper = document.querySelector(".mini-carousel-wrapper")
  const carouselTrack = document.querySelector(".mini-carousel-track")
  const carouselDots = document.querySelectorAll(".mini-carousel-dot")
  const slides = document.querySelectorAll(".mini-carousel-slide")

  if (!carouselWrapper || !carouselTrack || !carouselDots.length) {
    return // Exit if carousel elements don't exist
  }

  let currentSlide = 0
  let isHovered = false
  let autoScrollInterval
  const totalSlides = 8 // Original slides (excluding duplicates)
  const slideWidth = 300 // Base slide width
  const slideGap = 20 // Gap between slides

  // Calculate responsive slide width based on screen size
  function getSlideWidth() {
    const screenWidth = window.innerWidth
    if (screenWidth <= 576) return 180
    if (screenWidth <= 768) return 220
    if (screenWidth <= 992) return 250
    if (screenWidth <= 1200) return 280
    return 300
  }

  // Update dot indicators
  function updateDots() {
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }

  // Get current slide based on scroll position
  function getCurrentSlideFromPosition() {
    const currentWidth = getSlideWidth()
    const transform = carouselTrack.style.transform
    const translateX = transform ? Number.parseFloat(transform.match(/-?\d+\.?\d*/)) : 0
    const slidePosition = Math.abs(translateX) / (currentWidth + slideGap)
    return Math.round(slidePosition) % totalSlides
  }

  // Smooth scroll to specific slide (for dot navigation)
  function scrollToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) return

    const currentWidth = getSlideWidth()
    const targetPosition = -(slideIndex * (currentWidth + slideGap))

    // Temporarily pause auto-scroll
    const wasHovered = isHovered
    isHovered = true

    // Apply smooth transition
    carouselTrack.style.transition = "transform 0.5s ease"
    carouselTrack.style.transform = `translateX(${targetPosition}px)`

    currentSlide = slideIndex
    updateDots()

    // Resume auto-scroll after transition
    setTimeout(() => {
      carouselTrack.style.transition = ""
      isHovered = wasHovered
    }, 500)
  }

  // Handle dot click navigation
  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault()
      scrollToSlide(index)
    })

    // Keyboard accessibility for dots
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        scrollToSlide(index)
      }
    })
  })

  // Hover pause functionality
  carouselWrapper.addEventListener("mouseenter", () => {
    isHovered = true
    carouselTrack.style.animationPlayState = "paused"
  })

  carouselWrapper.addEventListener("mouseleave", () => {
    isHovered = false
    carouselTrack.style.animationPlayState = "running"
  })

  // Touch/swipe support for mobile
  let startX = 0
  let isDragging = false

  carouselWrapper.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    isDragging = true
    isHovered = true // Pause during touch
  })

  carouselWrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return
    e.preventDefault() // Prevent scrolling
  })

  carouselWrapper.addEventListener("touchend", (e) => {
    if (!isDragging) return

    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX
    const threshold = 50 // Minimum swipe distance

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left - next slide
        const nextSlide = (currentSlide + 1) % totalSlides
        scrollToSlide(nextSlide)
      } else {
        // Swipe right - previous slide
        const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides
        scrollToSlide(prevSlide)
      }
    }

    isDragging = false
    setTimeout(() => {
      isHovered = false // Resume auto-scroll after delay
    }, 1000)
  })

  // Update dots based on animation position (for continuous tracking)
  function trackAnimationProgress() {
    if (!isHovered && !isDragging) {
      currentSlide = getCurrentSlideFromPosition()
      updateDots()
    }
  }

  // Track animation progress every second
  setInterval(trackAnimationProgress, 1000)

  // Handle window resize
  function handleResize() {
    const newWidth = getSlideWidth()
    const newGap = window.innerWidth <= 768 ? 15 : 20

    // Update CSS custom properties for responsive behavior
    document.documentElement.style.setProperty("--carousel-slide-width", `${newWidth}px`)
    document.documentElement.style.setProperty("--carousel-slide-gap", `${newGap}px`)

    // Update track width calculation
    const totalWidth = (newWidth + newGap) * 12 // 8 original + 4 duplicates
    carouselTrack.style.width = `${totalWidth}px`

    // Update animation keyframes dynamically
    updateCarouselAnimation(newWidth, newGap)
  }

  // Update carousel animation for different screen sizes
  function updateCarouselAnimation(slideWidth, gap) {
    const styleSheet = document.styleSheets[0]
    const keyframeName = "carouselScroll"

    // Remove existing keyframe rule
    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      const rule = styleSheet.cssRules[i]
      if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === keyframeName) {
        styleSheet.deleteRule(i)
        break
      }
    }

    // Add new keyframe rule
    const moveDistance = (slideWidth + gap) * 8 // Move by 8 slides
    const keyframeRule = `
      @keyframes ${keyframeName} {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${moveDistance}px); }
      }
    `
    styleSheet.insertRule(keyframeRule, styleSheet.cssRules.length)
  }

  // Initialize responsive behavior
  handleResize()
  window.addEventListener("resize", debounce(handleResize, 250))

  // Initialize dots
  updateDots()

  // Accessibility improvements
  carouselWrapper.setAttribute("role", "region")
  carouselWrapper.setAttribute("aria-label", "Florence image carousel")

  slides.forEach((slide, index) => {
    const img = slide.querySelector("img")
    if (img && index < totalSlides) {
      img.setAttribute("role", "img")
      img.setAttribute("tabindex", "0")
    }
  })

  // Keyboard navigation for carousel
  carouselWrapper.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault()
        const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides
        scrollToSlide(prevSlide)
        break
      case "ArrowRight":
        e.preventDefault()
        const nextSlide = (currentSlide + 1) % totalSlides
        scrollToSlide(nextSlide)
        break
    }
  })

  // Pause animation when user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    carouselTrack.style.animation = "none"
  }
}

// Debounce utility function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
