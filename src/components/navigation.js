import React from 'react'

import Script from 'dangerous-html/react'

import './navigation.css'

const Navigation = (props) => {
  return (
    <div className="navigation-container1">
      <div className="navigation-container2">
        <div className="navigation-container3">
          <Script
            html={`<style>
@media (prefers-reduced-motion: reduce) {
.navigation-mobile-overlay.is-active {
  animation: none;
}
}
</style>`}
          ></Script>
        </div>
      </div>
      <nav className="navigation-wrapper">
        <div className="navigation-container">
          <div className="navigation-brand">
            <a href="/">
              <div className="navigation-logo-link">
                <span className="section-title">VRCDynaTags</span>
              </div>
            </a>
          </div>
          <div className="navigation-desktop-center">
            <span className="navigation-page-title">
              VRCDynamicPlayerTags Presets
            </span>
          </div>
          <div className="navigation-actions">
            <button className="navigation-submit-btn btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7v14"></path>
              </svg>
              <span>Add New Submission</span>
            </button>
            <button
              id="mobile-toggle"
              aria-label="Toggle Menu"
              aria-expanded="false"
              className="navigation-mobile-toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon-menu"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div id="mobile-overlay" className="navigation-mobile-overlay">
        <div className="navigation-mobile-header">
          <span className="section-title">VRCDynaTags</span>
          <button
            id="mobile-close"
            aria-label="Close Menu"
            className="navigation-mobile-close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="navigation-mobile-content">
          <div className="navigation-mobile-meta">
            <span className="navigation-mobile-label">Active View</span>
            <h2 className="section-title">VRCDynamicPlayerTags Presets</h2>
          </div>
          <div className="navigation-mobile-actions">
            <button className="navigation-submit-btn-mobile btn btn-primary btn-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7v14"></path>
              </svg>
              <span>Add New Submission</span>
            </button>
          </div>
          <ul className="navigation-mobile-links">
            <li className="navigation-mobile-item">
              <a href="/">
                <div className="navigation-mobile-link">
                  <span>Browse Presets</span>
                </div>
              </a>
            </li>
            <li className="navigation-mobile-item">
              <a href="#">
                <div className="navigation-mobile-link">
                  <span>Documentation</span>
                </div>
              </a>
            </li>
            <li className="navigation-mobile-item">
              <a href="#">
                <div className="navigation-mobile-link">
                  <span>Community Tags</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navigation-container4">
        <div className="navigation-container5">
          <Script
            html={`<style>
        @keyframes mobileFadeIn {from {opacity: 0;
transform: translateY(-10px);}
to {opacity: 1;
transform: translateY(0);}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="navigation-container6">
        <div className="navigation-container7">
          <Script
            html={`<script defer data-name="navigation-logic">
(function(){
  const mobileToggle = document.getElementById("mobile-toggle")
  const mobileClose = document.getElementById("mobile-close")
  const mobileOverlay = document.getElementById("mobile-overlay")

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener("click", () => {
      mobileOverlay.classList.add("is-active")
      mobileToggle.setAttribute("aria-expanded", "true")
      document.body.style.overflow = "hidden"
    })
  }

  if (mobileClose && mobileOverlay) {
    mobileClose.addEventListener("click", () => {
      mobileOverlay.classList.remove("is-active")
      mobileToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    })
  }

  // Close overlay on link click
  const mobileLinks = document.querySelectorAll(".navigation-mobile-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileOverlay.classList.remove("is-active")
      mobileToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    })
  })

  // Close overlay on backdrop click if needed (though it's a full screen surface)
  mobileOverlay.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) {
      mobileOverlay.classList.remove("is-active")
      mobileToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
  })
})()
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default Navigation
