(function () {
  ("use strict");

  document.addEventListener("DOMContentLoaded", function () {
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

    initTabs();
    initLoginSection();
  });
})();
