import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>Tall Gracious Gerbil</title>
        <meta property="og:title" content="Tall Gracious Gerbil" />
        <link
          rel="canonical"
          href="https://tall-gracious-gerbil-p1492b.teleporthq.app/"
        />
      </Helmet>
      <Navigation></Navigation>
      <section className="hero-section">
        <div className="hero-media-wrapper">
          <img
            src="https://images.pexels.com/photos/8721329/pexels-photo-8721329.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            alt="Futuristic VR Environment"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content-outer">
          <div className="hero-header-row">
            <div className="hero-logo-space">
              <span className="hero-brand">VRCDynaTags</span>
            </div>
            <div className="hero-action-space">
              <button className="hero-submit-btn btn btn-primary btn-lg">
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
                    d="M5 12h14m-7-7v14"
                  ></path>
                </svg>
                <span>Add New Submission</span>
              </button>
            </div>
          </div>
          <div className="hero-main-content">
            <h1 className="home-hero-title hero-title">
              VRCDynamicPlayerTags Presets
            </h1>
            <p className="home-hero-subtitle hero-subtitle">
              The ultimate community-driven database for dynamic player
              identification and aesthetic tag configurations.
            </p>
          </div>
        </div>
      </section>
      <section className="dashboard-section">
        <div className="dashboard-container">
          <div className="dashboard-controls">
            <h2 className="section-title">Database Overview</h2>
            <div className="dashboard-filters">
              <div className="filter-group">
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
                    d="M4 4h16v2.172a2 2 0 0 1-.586 1.414L15 12v7l-6 2v-8.5L4.52 7.572A2 2 0 0 1 4 6.227z"
                  ></path>
                </svg>
                <span>Filter Presets</span>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>
                    <span>Code Snippet</span>
                  </th>
                  <th>
                    <span>Target System</span>
                  </th>
                  <th>
                    <span>Description</span>
                  </th>
                  <th className="text-right">
                    <span>Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="skeleton-row">
                  <td>
                    <code className="code-preview">
                      &#123;tag: &quot;VETERAN&quot;, color:
                      &quot;#9d00ff&quot;&#125;
                    </code>
                  </td>
                  <td>
                    <span className="badge">OSC-VRC</span>
                  </td>
                  <td>
                    <span>
                      Premium veteran tag with neon purple glow and pulse
                      effect.
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-outline">View</button>
                  </td>
                </tr>
                <tr className="skeleton-row">
                  <td>
                    <code className="code-preview">
                      &#123;tag: &quot;STAFF&quot;, anim:
                      &quot;slide&quot;&#125;
                    </code>
                  </td>
                  <td>
                    <span className="badge">DynaCore v2</span>
                  </td>
                  <td>
                    <span>
                      Official staff identification with sliding animation.
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-outline">View</button>
                  </td>
                </tr>
                <tr className="skeleton-row">
                  <td>
                    <code className="code-preview">
                      &#123;tag: &quot;VIP&quot;, icon: &quot;star&quot;&#125;
                    </code>
                  </td>
                  <td>
                    <span className="badge">Universal</span>
                  </td>
                  <td>
                    <span>
                      Gold VIP status indicator for high-tier supporters.
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-outline">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-grid">
            <div className="cta-card">
              <div className="cta-icon-box">
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
                    <path d="M15 12v6m-3-3h6"></path>
                    <rect
                      width="14"
                      height="14"
                      x="8"
                      y="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </g>
                </svg>
              </div>
              <h3 className="section-subtitle">Submit Preset</h3>
              <p className="section-content">
                Share your custom creations with the dynamic player community.
              </p>
              <button className="btn-md btn btn-accent">Get Started</button>
            </div>
            <div className="cta-card">
              <div className="cta-icon-box">
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
                    d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  ></path>
                </svg>
              </div>
              <h3 className="section-subtitle">Import Configuration</h3>
              <p className="section-content">
                Bulk upload your existing preset libraries in JSON format.
              </p>
              <button className="btn-md btn btn-secondary">Upload File</button>
            </div>
            <div className="cta-card">
              <div className="cta-icon-box">
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
                    <path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <path d="m7 10l5 5l5-5"></path>
                  </g>
                </svg>
              </div>
              <h3 className="section-subtitle">Export Presets</h3>
              <p className="section-content">
                Download the latest database to use in your local environment.
              </p>
              <button className="btn-md btn btn-outline">Download All</button>
            </div>
          </div>
        </div>
      </section>
      <section className="showcase-section">
        <div className="showcase-container">
          <div className="showcase-header">
            <h2 className="section-title">Trending Presets</h2>
            <p className="section-content">
              Hand-picked configurations currently popular in the Metaverse.
            </p>
          </div>
          <div className="showcase-table-wrapper">
            <table className="showcase-table">
              <thead>
                <tr>
                  <th>
                    <span>Signature</span>
                  </th>
                  <th>
                    <span>Compatibility</span>
                  </th>
                  <th>
                    <span>Community Note</span>
                  </th>
                  <th className="text-right">
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code className="code-preview highlight">#NeonPulse</code>
                  </td>
                  <td>
                    <span className="badge-accent">OSC Extreme</span>
                  </td>
                  <td>
                    <span>Optimized for low-latency VR headsets.</span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-link">Copy Code</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code className="code-preview highlight">#GlitchArt</code>
                  </td>
                  <td>
                    <span className="badge-secondary">Core-X</span>
                  </td>
                  <td>
                    <span>Features randomized RGB shifting patterns.</span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-link">Copy Code</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code className="code-preview highlight">#Minimalist</code>
                  </td>
                  <td>
                    <span className="badge">Universal</span>
                  </td>
                  <td>
                    <span>Clean, non-intrusive text-only identification.</span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-link">Copy Code</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="process-section">
        <div className="process-container">
          <div className="process-intro">
            <h2 className="section-title">How It Works</h2>
            <p className="section-content">
              Getting your custom tags into the world is a simple three-step
              process.
            </p>
          </div>
          <div className="process-steps">
            <div className="step-item">
              <div className="step-number">
                <span>01</span>
              </div>
              <div className="step-content">
                <h4 className="section-subtitle">Craft Your Code</h4>
                <p className="section-content">
                  Use our online editor or local tools to build your dynamic tag
                  logic.
                </p>
              </div>
            </div>
            <div className="step-divider"></div>
            <div className="step-item">
              <div className="step-number">
                <span>02</span>
              </div>
              <div className="step-content">
                <h4 className="section-subtitle">Submit &amp; Review</h4>
                <p className="section-content">
                  Upload your snippet. Our community moderators verify
                  compatibility.
                </p>
              </div>
            </div>
            <div className="step-divider"></div>
            <div className="step-item">
              <div className="step-number">
                <span>03</span>
              </div>
              <div className="step-content">
                <h4 className="section-subtitle">Global Deployment</h4>
                <p className="section-content">
                  Once approved, your preset is available for everyone to import
                  and use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="home-container2">
        <div className="home-container3">
          <Script
            html={`<script defer data-name="vrcdynatags-interactions">
(function(){
  const submitButtons = document.querySelectorAll(".hero-submit-btn, .cta-card button")
  submitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Submission flow initiated")
      btn.style.transform = "scale(0.95)"
      setTimeout(() => {
        btn.style.transform = ""
      }, 150)
    })
  })

  const filterGroups = document.querySelectorAll(".filter-group")
  filterGroups.forEach((group) => {
    group.addEventListener("click", () => {
      group.classList.toggle("active")
      if (group.classList.contains("active")) {
        group.style.borderColor = "var(--color-primary)"
        group.style.background = "color-mix(in oklab, var(--color-primary) 10%, var(--color-surface-elevated))"
      } else {
        group.style.borderColor = ""
        group.style.background = ""
      }
    })
  })

  const copyButtons = document.querySelectorAll(".btn-link")
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const originalText = btn.textContent
      btn.textContent = "Copied!"
      btn.style.color = "var(--color-success)"
      setTimeout(() => {
        btn.textContent = originalText
        btn.style.color = ""
      }, 2000)
    })
  })
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
      <a href="https://play.teleporthq.io/signup">
        <div aria-label="Sign up to TeleportHQ" className="home-container4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home-icon25"
          >
            <path
              d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
              fill="#B23ADE"
            ></path>
            <path
              d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
              fill="#FF5C5C"
            ></path>
            <path
              d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
              fill="#2874DE"
            ></path>
          </svg>
          <span className="home-text29">Built in TeleportHQ</span>
        </div>
      </a>
    </div>
  )
}

export default Home
