(function () {
  ("use strict");

  function renderPanelHtml() {
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
        class="aaf-hidden aaf-fixed aaf-inset-0 aaf-w-full aaf-h-full aaf-bg-black/50 aaf-flex aaf-items-center aaf-justify-center aaf-z-[100001]"
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
                  class="aaf-flex-2 aaf-w-full aaf-bg-red-700 hover:aaf-bg-red-900 aaf-text-white aaf-font-semibold aaf-text-sm aaf-p-2 aaf-rounded"
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

                <hr class="aaf-border aaf-border-gray-400 aaf-border-dotted" />
                <div>
                  👤
                  <span class="aaf-text-[#51337f]">Personal Information</span>
                </div>

                <!-- Full Name -->
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
                <!-- Email -->
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
  `;

    document.body.insertAdjacentHTML("beforeend", html);
  }

  function initPanelScripts() {
    function initTogglePanel() {
      const showPanelBtnEl = document.querySelector("#aaf-show-panel");
      const closePanelBtnEl = document.querySelector("#aaf-close-panel");
      const panelWrapperEl = document.querySelector("#aaf-panel-wrapper");

      function showPanel() {
        panelWrapperEl.classList.remove("aaf-hidden");
      }
      function hidePanel() {
        panelWrapperEl.classList.add("aaf-hidden");
      }

      showPanelBtnEl.addEventListener("click", showPanel);
      closePanelBtnEl.addEventListener("click", hidePanel);
    }

    function initTabs() {
      const tabsEls = document.querySelectorAll("#aaf-tabs > button");
      const formsEls = document.querySelectorAll("#aaf-sections > section");

      tabsEls.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs
          tabsEls.forEach((t) => t.classList.remove("active"));
          // Add active class to clicked tab
          tab.classList.add("active");

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

  document.addEventListener("DOMContentLoaded", function () {
    renderPanelHtml();
    initPanelScripts();
  });
})();
