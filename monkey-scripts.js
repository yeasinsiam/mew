// ==UserScript==
// @name         Jubayer Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Jubayer
// @match        https://payment.ivacbd.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  ("use strict");

  function initPanelScripts() {
    function initTogglePanel() {
      const showPanelBtnEl = document.querySelector("#aaf-show-panel");
      const closePanelBtnEl = document.querySelector("#aaf-close-panel");
      const panelWrapperEl = document.querySelector("#aaf-panel-wrapper");

      function showPanel() {
        panelWrapperEl.classList.remove("aaf-hidden");
        panelWrapperEl.classList.add("aaf-fixed");
      }
      function hidePanel() {
        panelWrapperEl.classList.add("aaf-hidden");
        panelWrapperEl.classList.remove("aaf-fixed");
      }

      showPanelBtnEl.addEventListener("click", showPanel);
      closePanelBtnEl.addEventListener("click", hidePanel);
    }

    function initTabs() {
      const tabsEls = document.querySelectorAll("#aaf-tabs > button");
      const formsEls = document.querySelectorAll("#aaf-sections > section");

      tabsEls[0].classList.add(
        "active",
        "aaf-border-b-2",
        "aaf-border-red-700",
        "aaf-text-red-700"
      );

      tabsEls.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs
          tabsEls.forEach((t) =>
            t.classList.remove(
              "active",
              "aaf-border-b-2",
              "aaf-border-red-700",
              "aaf-text-red-700"
            )
          );
          // Add active class to clicked tab
          tab.classList.add(
            "active",
            "aaf-border-b-2",
            "aaf-border-red-700",
            "aaf-text-red-700"
          );

          // Hide all formsEls
          formsEls.forEach((form) => form.classList.add("aaf-hidden"));
          // Show the form matching the clicked tab
          formsEls[index].classList.remove("aaf-hidden");
        });
      });
    }

    function initLoginSection() {
      const mobileNumberInputEl = document.querySelector(
        "#aaf-login-section-mobile-number-input"
      );
      const passwordInputEl = document.querySelector(
        "#aaf-login-section-password-input"
      );
      const otpInputEl = document.querySelector("#aaf-login-section-otp-input");

      const sendOTPBtnEl = document.querySelector(
        "#aaf-login-section-send-otp-btn"
      );

      const verifyMobileBtnEl = document.querySelector(
        "#aaf-login-section-verify-mobile-btn"
      );
      const loginBtnEl = document.querySelector("#aaf-login-section-login-btn");

      // 1) Send OTP
      function sendOtp() {
        const mobile = mobileNumberInputEl.value.trim();

        if (!mobile) {
          alert("Please enter mobile number.");
          return;
        }

        // Example request (replace with real API call)
        console.log("Sending OTP to:", mobile);

        // fetch("/api/send-otp", { method: "POST", body: JSON.stringify({ mobile }) })
        //   .then(res => res.json())
        //   .then(data => console.log("OTP Sent:", data));
      }

      // 2) Verify OTP
      function verifyOTP() {
        const mobile = mobileNumberInputEl.value.trim();
        const otp = otpInputEl.value.trim();

        if (!mobile || !otp) {
          alert("Please enter both mobile number and OTP code.");
          return;
        }

        console.log("Verifying OTP:", { mobile, otp });

        // fetch("/api/verify-otp", { method: "POST", body: JSON.stringify({ mobile, otp }) })
        //   .then(res => res.json())
        //   .then(data => console.log("OTP Verified:", data));
      }

      // 3) Login
      function login() {
        const mobile = mobileNumberInputEl.value.trim();
        const password = passwordInputEl.value.trim();
        const otp = otpInputEl.value.trim();

        if (!mobile || !password || !otp) {
          alert("Please enter mobile, password, and OTP.");
          return;
        }

        console.log("Logging in:", { mobile, password, otp });

        // fetch("/api/login", { method: "POST", body: JSON.stringify({ mobile, password, otp }) })
        //   .then(res => res.json())
        //   .then(data => console.log("Login successful:", data));
      }

      // Attach to buttons
      sendOTPBtnEl.addEventListener("click", sendOtp);
      verifyMobileBtnEl.addEventListener("click", verifyOTP);
      loginBtnEl.addEventListener("click", login);
    }
    initTogglePanel();
    initTabs();
    initLoginSection();
  }

  function renderPanelDOM() {
    // Prevent duplicate creation
    if (document.getElementById("aaf")) return;

    const html = `


 <div id="aaf">
      <!-- Toggle Button -->
      <button
        id="aaf-show-panel"
        class="aaf-fixed aaf-bottom-5 aaf-right-5 aaf-w-[50px] aaf-h-[50px] aaf-rounded-full aaf-bg-gradient-to-br aaf-from-red-900 aaf-to-red-700 aaf-text-white aaf-border-none aaf-text-[20px] aaf-flex aaf-items-center aaf-justify-center aaf-shadow-lg aaf-transition-all aaf-duration-300"
      >
        ⚙️
      </button>

      <!-- Panel Wrapper -->
      <div
        id="aaf-panel-wrapper"
        class="aaf-hidden aaf-inset-0 aaf-w-full aaf-h-full aaf-bg-black/50 aaf-z-[100001]"
      >
        <div
          class="aaf-w-full aaf-h-full aaf-flex aaf-items-center aaf-justify-center"
        >
          <!-- Panel -->
          <div
            id="aaf-panel"
            class="aaf-bg-white aaf-rounded-lg aaf-w-[90%] aaf-relative aaf-max-w-sm aaf-box-border"
          >
            <button
              id="aaf-close-panel"
              type="button"
              class="aaf-text-white aaf-absolute -aaf-top-3 -aaf-right-3 aaf-bg-red-600 aaf-size-7 aaf-rounded-full hover:aaf-bg-red-700"
            >
              <span class="aaf-absolute aaf-top-0 aaf-right-2.5 aaf-font-bold"
                >x</span
              >
            </button>
            <!-- Tabs -->
            <div
              id="aaf-tabs"
              class="aaf-flex aaf-border-b-2 aaf-border-gray-200"
            >
              <button
                type="button"
                class="active aaf-flex-1 aaf-text-center aaf-py-2 aaf-font-semibold aaf-text-gray-600 aaf-cursor-pointer aaf-border-b [&.active]aaf-border-b-2 [&.active]:aaf-border-red-700 [&.active]:aaf-text-red-700"
              >
                Login
              </button>
              <!-- <button
              type="button"
              class="aaf-flex-1 aaf-text-center aaf-py-2 aaf-font-semibold aaf-text-gray-600 aaf-cursor-pointer aaf-border-b [&.active]:aaf-border-b-2 [&.active]:aaf-border-red-700 [&.active]:aaf-text-red-700"
            >
              Application
            </button> -->
              <button
                type="button"
                class="aaf-flex-1 aaf-text-center aaf-py-2 aaf-font-semibold aaf-text-gray-600 aaf-cursor-pointer aaf-border-b [&.active]:aaf-border-b-2 [&.active]:aaf-border-red-700 [&.active]:aaf-text-red-700"
              >
                Settings
              </button>
            </div>

            <div id="aaf-sections">
              <!-- Login Form -->
              <section class="aaf-p-3">
                <p
                  class="aaf-text-center aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-my-3 aaf-text-gray-700 aaf-text-sm"
                >
                  Solving Cloudflare...
                </p>

                <label
                  class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                >
                  Delay Between Steps (sec)
                </label>
                <input
                  type="number"
                  value="5"
                  class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                />

                <label
                  class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="aaf-login-section-mobile-number-input"
                  class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                />

                <label
                  class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="aaf-login-section-password-input"
                  class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                />

                <label
                  class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                >
                  OTP Code
                </label>
                <input
                  type="text"
                  id="aaf-login-section-otp-input"
                  placeholder="Enter 6-digit OTP"
                  class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-3 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                />

                <!-- Buttons -->
                <div class="aaf-flex aaf-flex-wrap aaf-gap-2">
                  <button
                    id="aaf-login-section-send-otp-btn"
                    class="aaf-flex-1 aaf-bg-gray-600 hover:aaf-bg-gray-800 aaf-text-white aaf-font-semibold aaf-text-sm aaf-p-2 aaf-rounded"
                  >
                    Send OTP
                  </button>
                  <button
                    id="aaf-login-section-verify-mobile-btn"
                    class="aaf-flex-1 aaf-bg-gray-600 hover:aaf-bg-gray-800 aaf-text-white aaf-font-semibold aaf-text-sm aaf-p-2 aaf-rounded"
                  >
                    Verify Mobile
                  </button>
                  <button
                    id="aaf-login-section-login-btn"
                    class="aaf-w-full aaf-bg-red-700 hover:aaf-bg-red-900 aaf-text-white aaf-font-semibold aaf-text-sm aaf-p-2 aaf-rounded"
                  >
                    Login
                  </button>
                </div>
              </section>

              <!-- settings form -->
              <section class="aaf-hidden">
                <div
                  class="aaf-max-h-[calc(100vh-250px)] aaf-overflow-y-scroll aaf-p-4 aaf-space-y-4"
                >
                  <!-- High Commission -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Select High Commission:
                    </label>
                    <select
                      class="aaf-w-full aaf-border aaf-border-gray-300 aaf-rounded aaf-p-2 aaf-text-sm focus:aaf-border-indigo-500 focus:aaf-ring-1 focus:aaf-ring-indigo-500"
                    >
                      <option>Sylhet</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                    </select>
                  </div>

                  <!-- IVAC Center -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Select an IVAC Center:
                    </label>
                    <select
                      class="aaf-w-full aaf-border aaf-border-gray-300 aaf-rounded aaf-p-2 aaf-text-sm focus:aaf-border-indigo-500 focus:aaf-ring-1 focus:aaf-ring-indigo-500"
                    >
                      <option>IVAC, SYLHET</option>
                      <option>IVAC, MYMENSINGH</option>
                    </select>
                  </div>

                  <!-- Web File Number -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Web File Number
                    </label>
                    <input
                      type="text"
                      value=""
                      class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                    />
                  </div>

                  <!-- Visa Type -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Select a Visa Type:
                    </label>
                    <select
                      class="aaf-w-full aaf-border aaf-border-gray-300 aaf-rounded aaf-p-2 aaf-text-sm focus:aaf-border-indigo-500 focus:aaf-ring-1 focus:aaf-ring-indigo-500"
                    >
                      <option>MEDICAL/MEDICAL ATTENDANT VISA</option>
                      <option>STUDENT VISA</option>
                      <option>BUSINESS VISA</option>
                      <option>TOURIST VISA</option>
                    </select>
                  </div>

                  <!-- Family Members -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Number of Family Members:
                    </label>
                    <select
                      class="aaf-w-full aaf-border aaf-border-gray-300 aaf-rounded aaf-p-2 aaf-text-sm focus:aaf-border-indigo-500 focus:aaf-ring-1 focus:aaf-ring-indigo-500"
                    >
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4+</option>
                    </select>
                  </div>

                  <!-- Visit Purpose -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Visit Purpose Details:
                    </label>
                    <textarea
                      placeholder="Enter Visit Purpose Details"
                      class="aaf-w-full aaf-border aaf-border-gray-300 aaf-rounded aaf-p-2 aaf-text-sm focus:aaf-border-indigo-500 focus:aaf-ring-1 focus:aaf-ring-indigo-500"
                    ></textarea>
                  </div>

                  <hr
                    class="aaf-border aaf-border-gray-400 aaf-border-dotted"
                  />
                  <div>
                    👤
                    <span class="aaf-text-[#51337f]">Personal Information</span>
                  </div>

                  <!-- Full Name -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value=""
                      class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                    />
                  </div>
                  <!-- Email -->
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value=""
                      class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                    />
                  </div>
                  <div>
                    <label
                      class="aaf-block aaf-mb-1 aaf-text-sm aaf-font-semibold aaf-text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value="01880428263"
                      class="aaf-w-full aaf-p-2 aaf-border aaf-border-gray-300 aaf-rounded aaf-text-sm aaf-mb-2 focus:aaf-border-[#005d96] focus:aaf-outline-none"
                    />
                  </div>
                </div>

                <!-- Buttons -->
                <div class="aaf-p-4 aaf-flex aaf-gap-2">
                  <button
                    class="aaf-flex-1 aaf-bg-red-600 hover:aaf-bg-red-800 aaf-text-white aaf-font-semibold aaf-py-2 aaf-rounded"
                  >
                    Cancel
                  </button>
                  <button
                    class="aaf-flex-1 aaf-bg-yellow-500 hover:aaf-bg-yellow-600 aaf-text-white aaf-font-semibold aaf-py-2 aaf-rounded"
                  >
                    Clear
                  </button>
                  <button
                    class="aaf-flex-1 aaf-bg-green-600 hover:aaf-bg-green-800 aaf-text-white aaf-font-semibold aaf-py-2 aaf-rounded"
                  >
                    Save
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

  `;

    document.body.insertAdjacentHTML("beforeend", html);
  }

  function onReady() {
    GM_addStyle(`

/* ===== Base ===== */
.aaf-hidden { display: none !important; }
.aaf-block { display: block !important; }
.aaf-flex { display: flex !important; }
.aaf-inline-flex { display: inline-flex !important; }
.aaf-items-center { align-items: center !important; }
.aaf-justify-center { justify-content: center !important; }
.aaf-flex-wrap { flex-wrap: wrap !important; }
.aaf-gap-2 { gap: 0.5rem !important; }
.aaf-space-y-4 > * + * { margin-top: 1rem !important; }
.aaf-overflow-y-scroll { overflow-y: scroll !important; }
.aaf-relative { position: relative !important; }
.aaf-absolute { position: absolute !important; }
.aaf-fixed { position: fixed !important; }
.aaf-inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.aaf-top-0 { top: 0 !important; }
.aaf-right-0 { right: 0 !important; }
.aaf-right-2\\.5 { right: 0.625rem !important; }
.aaf-bottom-5 { bottom: 1.25rem !important; }
.aaf-right-5 { right: 1.25rem !important; }
.-aaf-top-3 { top: -0.75rem !important; }
.-aaf-right-3 { right: -0.75rem !important; }
.aaf-cursor-pointer { cursor: pointer !important; }

/* ===== Sizing ===== */
.aaf-w-full { width: 100% !important; }
.aaf-h-full { height: 100% !important; }
.aaf-max-w-sm { max-width: 24rem !important; }
.aaf-w-\\[90\\%\\] { width: 90% !important; }
.aaf-w-\\[50px\\] { width: 50px !important; }
.aaf-h-\\[50px\\] { height: 50px !important; }
.aaf-size-7 { width: 1.75rem !important; height: 1.75rem !important; }
.aaf-max-h-\\[calc\\(100vh-250px\\)\\] { max-height: calc(100vh - 250px) !important; }

/* ===== Flex ===== */
.aaf-flex-1 { flex: 1 1 0% !important; }

/* ===== Spacing ===== */
.aaf-p-2 { padding: 0.5rem !important; }
.aaf-p-3 { padding: 0.75rem !important; }
.aaf-p-4 { padding: 1rem !important; }
.aaf-py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
.aaf-my-3 { margin-top: 0.75rem !important; margin-bottom: 0.75rem !important; }
.aaf-mb-1 { margin-bottom: 0.25rem !important; }
.aaf-mb-2 { margin-bottom: 0.5rem !important; }
.aaf-mb-3 { margin-bottom: 0.75rem !important; }

/* ===== Text ===== */
.aaf-text-center { text-align: center !important; }
.aaf-text-sm { font-size: 0.875rem !important; }
.aaf-text-\\[20px\\] { font-size: 20px !important; }
.aaf-font-semibold { font-weight: 600 !important; }
.aaf-font-bold { font-weight: 700 !important; }

/* ===== Rounded & Borders ===== */
.aaf-rounded { border-radius: 0.25rem !important; }
.aaf-rounded-full { border-radius: 9999px !important; }
.aaf-rounded-lg { border-radius: 0.5rem !important; }
.aaf-border { border-width: 1px !important; border-style: solid !important; }
.aaf-border-2 { border-width: 2px !important; border-style: solid !important; }
.aaf-border-b { border-bottom-width: 1px !important; border-bottom-style: solid !important; }
.aaf-border-b-2 { border-bottom-width: 2px !important; border-bottom-style: solid !important; }
.aaf-border-none { border: none !important; }
.aaf-border-gray-200 { border-color: #e5e7eb !important; }
.aaf-border-gray-300 { border-color: #d1d5db !important; }
.aaf-border-gray-400 { border-color: #9ca3af !important; }
.aaf-border-red-700 { border-color: #b91c1c !important; }
.aaf-border-dotted { border-style: dotted !important; }
.aaf-box-border { box-sizing: border-box !important; }

/* ===== Backgrounds ===== */
.aaf-bg-white { background-color: #ffffff !important; }
.aaf-bg-black\\/50 { background-color: rgba(0,0,0,0.5) !important; }
.aaf-bg-red-600 { background-color: #dc2626 !important; }
.aaf-bg-red-700 { background-color: #b91c1c !important; }
.aaf-bg-red-800 { background-color: #991b1b !important; }
.aaf-bg-red-900 { background-color: #7f1d1d !important; }
.aaf-bg-gray-600 { background-color: #4b5563 !important; }
.aaf-bg-gray-800 { background-color: #1f2937 !important; }
.aaf-bg-yellow-500 { background-color: #f59e0b !important; }
.aaf-bg-yellow-600 { background-color: #d97706 !important; }
.aaf-bg-green-600 { background-color: #16a34a !important; }
.aaf-bg-green-800 { background-color: #166534 !important; }

/* ===== Gradient ===== */
.aaf-bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--aaf-from, #000), var(--aaf-to, #fff)) !important; }
.aaf-from-red-900 { --aaf-from: #7f1d1d; }
.aaf-to-red-700 { --aaf-to: #b91c1c; }

/* ===== Text Colors ===== */
.aaf-text-white { color: #ffffff !important; }
.aaf-text-gray-600 { color: #4b5563 !important; }
.aaf-text-gray-700 { color: #374151 !important; }
.aaf-text-red-700 { color: #b91c1c !important; }
.aaf-text-\\[\\#51337f\\] { color: #51337f !important; }

/* ===== Effects ===== */
.aaf-shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05) !important; }
.aaf-transition-all { transition: all 0.3s ease !important; }
.aaf-duration-300 { transition-duration: 300ms !important; }

/* ===== Focus States ===== */
.aaf-outline-none { outline: none !important; }
.focus\\:aaf-border-\\[\\#005d96\\]:focus { border-color: #005d96 !important; }
.focus\\:aaf-ring-1:focus { box-shadow: 0 0 0 1px currentColor !important; }
.focus\\:aaf-ring-indigo-500:focus { box-shadow: 0 0 0 1px #6366f1 !important; }
.focus\\:aaf-border-indigo-500:focus { border-color: #6366f1 !important; }

/* ===== Hover States ===== */
.hover\\:aaf-bg-red-700:hover { background-color: #b91c1c !important; }
.hover\\:aaf-bg-red-800:hover { background-color: #991b1b !important; }
.hover\\:aaf-bg-red-900:hover { background-color: #7f1d1d !important; }
.hover\\:aaf-bg-gray-800:hover { background-color: #1f2937 !important; }
.hover\\:aaf-bg-yellow-600:hover { background-color: #d97706 !important; }
.hover\\:aaf-bg-green-800:hover { background-color: #166534 !important; }

/* ===== Z-index ===== */
.aaf-z-\\[100001\\] { z-index: 100001 !important; }


    `);
    renderPanelDOM();
    initPanelScripts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    // DOM already ready (happens when the userscript runs too late)
    onReady();
  }
})();
