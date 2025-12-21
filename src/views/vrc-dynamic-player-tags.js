import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './vrc-dynamic-player-tags.css'

const VRCDynamicPlayerTags = (props) => {
  return (
    <div className="vrc-dynamic-player-tags-container1">
      <Helmet>
        <title>VRCDynamicPlayerTags - Tall Gracious Gerbil</title>
        <meta
          property="og:title"
          content="VRCDynamicPlayerTags - Tall Gracious Gerbil"
        />
        <link
          rel="canonical"
          href="https://tall-gracious-gerbil-p1492b.teleporthq.app/vrc-dynamic-player-tags"
        />
      </Helmet>
      <Navigation></Navigation>
      <header className="header-section">
        <div className="header-container">
          <div className="header-content">
            <h1 className="header-title hero-title">VRCDynamicPlayerTags</h1>
            <div className="header-actions">
              <button id="newSubmissionBtn" className="btn btn-primary btn-lg">
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
                <span>New Submission</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="dashboard-section">
        <div className="vrcdynamicplayertags-dashboard-container">
          <div className="dashboard-table-wrapper">
            <table className="vrcdynamicplayertags-dashboard-table">
              <thead>
                <tr>
                  <th scope="col">
                    <div className="table-header-cell">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m16 18l6-6l-6-6M8 6l-6 6l6 6"></path>
                      </svg>
                      <span>Code</span>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="table-header-cell">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 6a8 3 0 1 0 16 0A8 3 0 1 0 4 6"></path>
                        <path d="M4 6v6a8 3 0 0 0 16 0V6"></path>
                        <path d="M4 12v6a8 3 0 0 0 16 0v-6"></path>
                      </svg>
                      <span>Target System</span>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="table-header-cell">
                      <span>Description</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody id="submissionTableBody">
                <tr>
                  <td className="code-cell">
                    <code>&lt;VRC_TAG_01&gt;</code>
                  </td>
                  <td className="system-cell">
                    <span className="vrcdynamicplayertags-badge">
                      VRChat Core
                    </span>
                  </td>
                  <td className="desc-cell">
                    <span>
                      Primary dynamic tag for player status synchronization
                      across instances.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="code-cell">
                    <code>#OSC_QUERY_A</code>
                  </td>
                  <td className="system-cell">
                    <span className="vrcdynamicplayertags-badge">
                      OSC Interface
                    </span>
                  </td>
                  <td className="desc-cell">
                    <span>
                      External query string for real-time parameter updates via
                      OSC protocol.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="code-cell">
                    <code>$USER_LVL_DYN</code>
                  </td>
                  <td className="system-cell">
                    <span className="vrcdynamicplayertags-badge">
                      Trust System
                    </span>
                  </td>
                  <td className="desc-cell">
                    <span>
                      Dynamic rank display based on current instance trust level
                      calculations.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="code-cell">
                    <code>@LOC_COORD_S</code>
                  </td>
                  <td className="system-cell">
                    <span className="vrcdynamicplayertags-badge">
                      Spatial Mapper
                    </span>
                  </td>
                  <td className="desc-cell">
                    <span>
                      Relative coordinate mapping for localized dynamic player
                      visibility.
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="cta-actions-section">
        <div className="cta-actions-container">
          <div className="scroller-wrapper">
            <div className="scroller-content">
              <button id="refreshData" className="action-card">
                <div className="vrc-dynamic-player-tags-thq-action-icon-elm1">
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
                    <path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M8 16H3v5"></path>
                  </svg>
                </div>
                <span className="vrc-dynamic-player-tags-thq-action-label-elm1">
                  Refresh Presets
                </span>
              </button>
              <button id="importConfig" className="action-card">
                <div className="vrc-dynamic-player-tags-thq-action-icon-elm2">
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
                    <path d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  </svg>
                </div>
                <span className="vrc-dynamic-player-tags-thq-action-label-elm2">
                  Import Config
                </span>
              </button>
              <button id="exportData" className="action-card">
                <div className="vrc-dynamic-player-tags-thq-action-icon-elm3">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5l5-5m-5 5V3"></path>
                  </svg>
                </div>
                <span className="vrc-dynamic-player-tags-thq-action-label-elm3">
                  Export Data
                </span>
              </button>
              <button id="validateCodes" className="action-card">
                <div className="vrc-dynamic-player-tags-thq-action-icon-elm4">
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
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <span className="vrc-dynamic-player-tags-thq-action-label-elm4">
                  Validate All
                </span>
              </button>
              <button id="systemSync" className="action-card">
                <div className="vrc-dynamic-player-tags-thq-action-icon-elm5">
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <span className="vrc-dynamic-player-tags-thq-action-label-elm5">
                  System Sync
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <dialog id="submissionModal" className="submission-dialog">
        <div className="modal-header">
          <h2 className="section-title">New Preset Submission</h2>
          <button id="closeModalBtn" className="modal-close-btn">
            &amp;times;
          </button>
        </div>
        <form
          action="/submit"
          method="POST"
          data-form-id="b562a0b3-7060-4be8-b4bc-87b900ba588a"
          className="modal-form"
        >
          <div className="form-group">
            <label htmlFor="code">Preset Code</label>
            <input
              type="text"
              id="code"
              name="code"
              required="true"
              placeholder="e.g. &lt;VRC_TAG_01&gt;"
              data-form-field-id="code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="system">Target System</label>
            <select
              id="system"
              name="system"
              required="true"
              data-form-field-id="system"
            >
              <option value="true">Select System...</option>
              <option value="VRChat Core">VRChat Core</option>
              <option value="OSC Interface">OSC Interface</option>
              <option value="Trust System">Trust System</option>
              <option value="Spatial Mapper">Spatial Mapper</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              required="true"
              placeholder="Describe the tag purpose..."
              data-form-field-id="description"
            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              id="thq_button_tgd_"
              name="button"
              data-form-field-id="thq_button_tgd_"
              className="btn btn-primary btn-lg"
            >
              Submit Preset
            </button>
          </div>
        </form>
      </dialog>
      <div className="vrc-dynamic-player-tags-container2">
        <div className="vrc-dynamic-player-tags-container3">
          <Script
            html={`<script defer data-name="vrc-tags-logic">
(function(){
  const modal = document.getElementById("submissionModal")
  const openBtn = document.getElementById("newSubmissionBtn")
  const closeBtn = document.getElementById("closeModalBtn")
  const submissionForm = modal.querySelector("form")
  const tableBody = document.getElementById("submissionTableBody")

  openBtn.addEventListener("click", () => {
    modal.showModal()
  })

  closeBtn.addEventListener("click", () => {
    modal.close()
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close()
    }
  })

  submissionForm.addEventListener("submit", (e) => {
    const formData = new FormData(submissionForm)

    const newRow = document.createElement("tr")
    newRow.style.animation = "fadeIn 0.5s ease-out forwards"

    newRow.innerHTML = \`
    <td class="code-cell"><code>\${formData.get("code")}</code></td>
    <td class="system-cell"><span class="badge">\${formData.get("system")}</span></td>
    <td class="desc-cell">\${formData.get("description")}</td>
  \`

    tableBody.prepend(newRow)

    submissionForm.reset()
    modal.close()
  })

  const actionButtons = document.querySelectorAll(".action-card")
  actionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const label = this.querySelector(".action-label").innerText
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
        console.log("Action triggered: " + label)
      }, 150)
    })
  })

  const styleSheet = document.createElement("style")
  styleSheet.innerText = \`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
\`
  document.head.appendChild(styleSheet)
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
      <a href="https://play.teleporthq.io/signup">
        <div
          aria-label="Sign up to TeleportHQ"
          className="vrc-dynamic-player-tags-container4"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="vrc-dynamic-player-tags-icon31"
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
          <span className="vrc-dynamic-player-tags-text25">
            Built in TeleportHQ
          </span>
        </div>
      </a>
    </div>
  )
}

export default VRCDynamicPlayerTags
