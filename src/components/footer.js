import React from 'react'

import Script from 'dangerous-html/react'

import './footer.css'

const Footer = (props) => {
  return (
    <div className="footer-container1">
      <footer className="footer-root">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand-column">
              <div className="footer-logo-wrapper">
                <div className="footer-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="m10 9l-3 3l3 3m4 0l3-3l-3-3"></path>
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    </g>
                  </svg>
                </div>
                <span className="footer-brand-name">VRCDynaTags</span>
              </div>
              <p className="footer-tagline section-content">
                Elevate your presence in VRChat with dynamic, real-time player
                tags. Customizable presets for every system.
              </p>
              <div className="footer-social-links">
                <a href="#">
                  <div aria-label="GitHub" className="footer-social-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </g>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Discord" className="footer-social-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0m6 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0"></path>
                        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833-1.667 3.5-3c.667-1.667.5-5.833-1.5-11.5c-1.457-1.015-3-1.34-4.5-1.5l-.972 1.923a11.9 11.9 0 0 0-4.053 0L9 4c-1.5.16-3.043.485-4.5 1.5c-2 5.667-2.167 9.833-1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2-2 2-3"></path>
                        <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                      </g>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Twitter" className="footer-social-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-links-column">
              <h3 className="footer-column-title section-subtitle">
                Resources
              </h3>
              <nav className="footer-nav">
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Documentation</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Target Systems</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Code Examples</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Preset Library</span>
                  </div>
                </a>
              </nav>
            </div>
            <div className="footer-links-column">
              <h3 className="footer-column-title section-subtitle">
                Community
              </h3>
              <nav className="footer-nav">
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Submissions</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>VRChat Integration</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Support Server</span>
                  </div>
                </a>
                <a href="Homepage">
                  <div className="footer-link">
                    <span>Developer API</span>
                  </div>
                </a>
              </nav>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <span className="footer-copyright">
                &amp;copy; 2025 VRCDynaTags. All rights reserved.
              </span>
              <div className="footer-legal-links">
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Privacy Policy</span>
                  </div>
                </a>
                <a href="#">
                  <div className="footer-legal-link">
                    <span>Terms of Service</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-status-indicator">
              <span className="footer-status-dot"></span>
              <span className="footer-status-text">Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-container2">
        <div className="footer-container3">
          <Script
            html={`<style>
        @keyframes pulse-status {0% {transform: scale(1);
opacity: 1;}
50% {transform: scale(1.2);
opacity: 0.7;}
100% {transform: scale(1);
opacity: 1;}}
        </style> `}
          ></Script>
        </div>
      </div>
      <div className="footer-container4">
        <div className="footer-container5">
          <Script
            html={`<script defer data-name="footer-interactions">
(function(){
  const footerLinks = document.querySelectorAll(".footer-link")

  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    })
  })

  const statusIndicator = document.querySelector(".footer-status-indicator")
  if (statusIndicator) {
    statusIndicator.addEventListener("click", () => {
      const text = statusIndicator.querySelector(".footer-status-text")
      const originalText = text.textContent
      text.textContent = "Checking..."

      setTimeout(() => {
        text.textContent = originalText
      }, 1500)
    })
  }
})()
</script>`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

export default Footer
