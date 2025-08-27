// ==UserScript==
// @name         IVAC All-in-One With Stop Buttom
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  Combines all IVAC helper functions into one script with a beautiful smart panel
// @author       You
// @match        https://payment.ivacbd.com/*
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  // Add CSS styles for the panel
  GM_addStyle(`
        /* Smart Panel Styles */
        #ivac-smart-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 15px;
            z-index: 9999;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
            width: 150px;
            pointer-events: none;
        }

        #ivac-smart-panel.visible {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        #ivac-smart-panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        #ivac-smart-panel-title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            cursor: pointer;
        }

        #ivac-smart-panel-title-input {
            position: absolute;
            top: 15px;
            right: 40px;
            width: 180px;
            padding: 5px 10px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            z-index: 10001;
            display: none;
        }

        #ivac-smart-panel-title-input-container {
            position: relative;
        }

        #ivac-smart-panel-title-save {
            position: absolute;
            right: 5px;
            top: 5px;
            background: #2ecc71;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 2px 5px;
            font-size: 10px;
            cursor: pointer;
        }

        #ivac-smart-panel-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #7f8c8d;
            padding: 0;
            line-height: 1;
            transition: all 0.2s ease;
        }

        #ivac-smart-panel-close:hover {
            color: #e74c3c;
            transform: scale(1.2);
        }

        #ivac-smart-panel-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .ivac-panel-btn {
            padding: 10px 15px;
            border-radius: 8px;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .ivac-panel-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1));
            opacity: 0;
            transition: all 0.3s ease;
        }

        .ivac-panel-btn:hover::after {
            opacity: 1;
        }

        .ivac-panel-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .ivac-panel-btn i {
            font-size: 14px;
        }

        #ivac-settings-btn {
            background: linear-gradient(145deg, #5a0080, #9932cc);
        }

        #ivac-app-submit-btn {
            background: linear-gradient(145deg, #11998e, #38ef7d);
        }

        #ivac-personal-submit-btn {
          background: linear-gradient(145deg, #f46b45, #eea849);
        }

        #ivac-overview-btn {
            background: linear-gradient(145deg, #8e2de2, #4a00e0);;
        }

        #ivac-payment-btn {
            background: linear-gradient(145deg, #228B22, #006400);
        }
        #ivac-stop-all-btn {
            background: linear-gradient(145deg, #ff416c, #ff4b2b);
        }
        #ivac-toggle-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(145deg, #6a11cb, #2575fc);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        #ivac-toggle-panel:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* Modal Styles */
        #ivac-helper-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 20px;
            z-index: 1001;
            display: none;
            width: 350px;
            max-height: 80vh;
            overflow-y: auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        #ivac-helper-modal::-webkit-scrollbar {
            width: 6px;
        }
        #ivac-helper-modal::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        #ivac-helper-modal::-webkit-scrollbar-thumb {
            background: linear-gradient(#6a11cb, #2575fc);
            border-radius: 3px;
        }
        #ivac-helper-modal::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(#2575fc, #6a11cb);
        }

        #ivac-helper-modal label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 14px;
            color: #2c3e50;
        }

        #ivac-helper-modal input,
        #ivac-helper-modal select,
        #ivac-helper-modal textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 15px;
            background: rgba(255,255,255,0.8);
            transition: all 0.3s ease;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }

        #ivac-helper-modal input:focus,
        #ivac-helper-modal select:focus,
        #ivac-helper-modal textarea:focus {
            border-color: #6a11cb;
            outline: none;
            box-shadow: 0 0 0 2px rgba(106,17,203,0.2);
        }

        #ivac-helper-modal textarea {
            height: 80px;
            resize: vertical;
        }

        #ivac-modal-footer {
            position: sticky;
            bottom: 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
            padding: 15px 0 5px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            border-top: 1px solid rgba(0,0,0,0.1);
            margin-top: 10px;
        }

        .ivac-modal-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .ivac-modal-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        #ivac-modal-cancel {
            background: linear-gradient(145deg, #e74c3c, #c0392b);
        }

        #ivac-modal-clear {
            background: linear-gradient(145deg, #f39c12, #e67e22);
        }

        #ivac-modal-save {
            background: linear-gradient(145deg, #2ecc71, #27ae60);
        }

        /* Family Member Styles */
        .family-member {
            margin-bottom: 15px;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 8px;
            background: rgba(255,255,255,0.7);
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .family-member h5 {
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
            color: #6a11cb;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 5px;
        }

        /* Personal Info Section */
        .personal-info-section {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px dashed #ccc;
        }

        .personal-info-section h4 {
            color: #6a11cb;
            margin-bottom: 15px;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .personal-info-section h4::before {
            content: "👤";
        }
    `);

  // Shared variables to hold data from the modal
  let dynamicHighcom = null;
  let dynamicWebfileId = null;
  let dynamicIvacId = null;
  let dynamicVisaType = null;
  let dynamicFamilyCount = null;
  let dynamicVisitPurpose = null;
  let dynamicFullName = null;
  let dynamicEmail = null;
  let dynamicPhone = null;
  let dynamicFamilyName = null;
  let dynamicFamilyWebfileNo = null;
  let familyMembers = [];
  let panelTitleText = "IVAC Helper"; // Default panel title
  let activeControllers = []; // To track AbortControllers for pending requests

  // Load saved data from storage
  function loadSavedData() {
    dynamicHighcom = GM_getValue("dynamicHighcom", 4);
    dynamicWebfileId = GM_getValue("dynamicWebfileId", null);
    dynamicIvacId = GM_getValue("dynamicIvacId", 4);
    dynamicVisaType = GM_getValue("dynamicVisaType", null);
    dynamicFamilyCount = GM_getValue("dynamicFamilyCount", 0);
    dynamicVisitPurpose = GM_getValue("dynamicVisitPurpose", null);
    dynamicFullName = GM_getValue("dynamicFullName", null);
    dynamicEmail = GM_getValue("dynamicEmail", null);
    dynamicPhone = GM_getValue("dynamicPhone", null);
    dynamicFamilyName = GM_getValue("dynamicFamilyName", null);
    dynamicFamilyWebfileNo = GM_getValue("dynamicFamilyWebfileNo", null);
    familyMembers = GM_getValue("familyMembers", []);
    panelTitleText = GM_getValue("panelTitleText", "IVAC Helper");
  }

  // Save data to storage
  function saveData() {
    GM_setValue("dynamicHighcom", dynamicHighcom);
    GM_setValue("dynamicWebfileId", dynamicWebfileId);
    GM_setValue("dynamicIvacId", dynamicIvacId);
    GM_setValue("dynamicVisaType", dynamicVisaType);
    GM_setValue("dynamicFamilyCount", dynamicFamilyCount);
    GM_setValue("dynamicVisitPurpose", dynamicVisitPurpose);
    GM_setValue("dynamicFullName", dynamicFullName);
    GM_setValue("dynamicEmail", dynamicEmail);
    GM_setValue("dynamicPhone", dynamicPhone);
    GM_setValue("dynamicFamilyName", dynamicFamilyName);
    GM_setValue("dynamicFamilyWebfileNo", dynamicFamilyWebfileNo);
    GM_setValue("familyMembers", familyMembers);
    GM_setValue("panelTitleText", panelTitleText);
  }

  // Shared CSRF token function
  function getCSRFToken() {
    let token = document.querySelector("input[name='_token']");
    if (token) return token.value;

    let scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
      if (script.innerText.includes("var csrf_token")) {
        let match = script.innerText.match(/var csrf_token = "(.*?)";/);
        if (match) return match[1];
      }
    }

    let metaToken = document.querySelector('meta[name="csrf-token"]');
    if (metaToken) return metaToken.getAttribute("content");

    return window.csrf_token || null;
  }

  // ========== Application Submit Function ==========
  async function sendDataToServer() {
    if (!dynamicWebfileId || !dynamicIvacId || !dynamicVisaType) {
      alert("Please set all required fields in the IVAC Helper settings first");
      return;
    }

    let token = getCSRFToken();
    if (!token) return;

    let payload = {
      _token: token,
      highcom: dynamicHighcom || 4,
      webfile_id: dynamicWebfileId,
      webfile_id_repeat: dynamicWebfileId,
      ivac_id: dynamicIvacId,
      visa_type: dynamicVisaType,
      family_count: dynamicFamilyCount || 0,
      visit_purpose: dynamicVisitPurpose || "",
    };

    const controller = new AbortController();
    activeControllers.push(controller);

    try {
      await fetch("https://payment.ivacbd.com/application-info-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Application submit error:", error);
      }
    } finally {
      // Remove the controller from active list
      const index = activeControllers.indexOf(controller);
      if (index > -1) {
        activeControllers.splice(index, 1);
      }
    }
  }

  // ========== Personal Info Submit Function ==========
  async function submitPersonalInfo() {
    if (
      !dynamicFullName ||
      !dynamicEmail ||
      !dynamicPhone ||
      !dynamicWebfileId
    ) {
      alert(
        "Please set all required personal info fields in the IVAC Helper settings first"
      );
      return;
    }

    const controller = new AbortController();
    activeControllers.push(controller);

    try {
      const token = getCSRFToken();
      if (!token) {
        console.log("CSRF token not found!");
        return;
      }

      const formData = new FormData();
      formData.append("_token", token);
      formData.append("full__name", dynamicFullName);
      formData.append("email_name", dynamicEmail);
      formData.append("pho_ne", dynamicPhone);
      formData.append("web_file_id", dynamicWebfileId);

      // Add family members based on count
      for (let i = 0; i < (dynamicFamilyCount || 0); i++) {
        const member = familyMembers[i] || {};
        formData.append(
          `family[${i + 1}][name]`,
          member.name || dynamicFamilyName || ""
        );
        formData.append(
          `family[${i + 1}][webfile_no]`,
          member.webfile || dynamicFamilyWebfileNo || ""
        );
        formData.append(
          `family[${i + 1}][again_webfile_no]`,
          member.webfile || dynamicFamilyWebfileNo || ""
        );
      }

      const response = await fetch(
        "https://payment.ivacbd.com/personal-info-submit",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
        }
      );

      console.log(
        response.ok
          ? "Personal info submitted successfully!"
          : "Error submitting personal info!"
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log("An error occurred: " + error.message);
      }
    } finally {
      // Remove the controller from active list
      const index = activeControllers.indexOf(controller);
      if (index > -1) {
        activeControllers.splice(index, 1);
      }
    }
  }

  // ========== Overview Submit Function ==========
  function sendOverviewRequest() {
    const csrf_token = getCSRFToken();
    if (!csrf_token) {
      console.error("CSRF token not found");
      return;
    }

    const controller = new AbortController();
    activeControllers.push(controller);

    fetch("https://payment.ivacbd.com/overview-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrf_token,
      },
      body: JSON.stringify({}),
      signal: controller.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed: " + response.status);
        }
      })
      .then((data) => {
        console.log("Overview request succeeded:", data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Overview request failed:", error);
        }
      })
      .finally(() => {
        // Remove the controller from active list
        const index = activeControllers.indexOf(controller);
        if (index > -1) {
          activeControllers.splice(index, 1);
        }
      });
  }

  // ========== Payment Button Function ==========
  function handlePayment() {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      console.log("Using CSRF Token: ", csrfToken);
      GM_openInTab("https://payment.ivacbd.com/payment");
    } else {
      alert("CSRF Token not found!");
    }
  }

  // ========== Stop All Requests Function ==========
  function stopAllRequests() {
    // Abort all active requests
    activeControllers.forEach((controller) => {
      controller.abort();
    });

    // Clear the array
    activeControllers = [];

    console.log("All pending requests have been stopped");
  }

  // ==================== Modal and Input Functions ====================

  // Create the modal for input
  const modal = document.createElement("div");
  modal.id = "ivac-helper-modal";
  document.body.appendChild(modal);

  // Modal content
  modal.innerHTML = `
        <style>
            #ivac-helper-modal::-webkit-scrollbar {
                width: 6px;
            }
            #ivac-helper-modal::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }
            #ivac-helper-modal::-webkit-scrollbar-thumb {
                background: linear-gradient(#6a11cb, #2575fc);
                border-radius: 3px;
            }
            #ivac-helper-modal::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(#2575fc, #6a11cb);
            }
        </style>
    `;

  // High Commission dropdown - Sylhet (4) is now default
  const highcomSelect = document.createElement("select");
  highcomSelect.innerHTML = `
        <option value="4">Sylhet</option>
        <option value="1">Dhaka</option>
        <option value="2">Chittagong</option>
        <option value="3">Rajshahi</option>
        <option value="5">Khulna</option>
    `;
  modal.appendChild(createLabel("Select High Commission:"));
  modal.appendChild(highcomSelect);

  // IVAC Center dropdown - IVAC Sylhet (4) is now default
  const ivacSelect = document.createElement("select");
  modal.appendChild(createLabel("Select an IVAC Center:"));
  modal.appendChild(ivacSelect);

  // Web File Number input - Fixed this section
  const webFileLabel = createLabel("Web File Number");
  modal.appendChild(webFileLabel);
  const webFileInput = document.createElement("input");
  webFileInput.type = "text";
  webFileInput.placeholder = "Enter Web File Number";
  webFileInput.style.width = "100%";
  webFileInput.style.padding = "10px";
  webFileInput.style.border = "1px solid #ddd";
  webFileInput.style.borderRadius = "8px";
  webFileInput.style.marginBottom = "15px";
  webFileInput.style.background = "rgba(255,255,255,0.8)";
  webFileInput.style.transition = "all 0.3s ease";
  webFileInput.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.1)";
  modal.appendChild(webFileInput);

  // Visa Type dropdown
  const visaTypeSelect = document.createElement("select");
  visaTypeSelect.innerHTML = `
        <option value="3">TOURIST VISA</option>
        <option value="13" selected>MEDICAL/MEDICAL ATTENDANT VISA</option>
        <option value="1">BUSINESS VISA</option>
        <option value="6">ENTRY VISA</option>
        <option value="2">STUDENT VISA</option>
    `;
  modal.appendChild(createLabel("Select a Visa Type:"));
  modal.appendChild(visaTypeSelect);

  // Family Count dropdown
  const inputFamilyCount = document.createElement("select");
  inputFamilyCount.innerHTML = `
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    `;
  modal.appendChild(createLabel("Number of Family Members:"));
  modal.appendChild(inputFamilyCount);

  // Container for family member inputs
  const familyInputsContainer = document.createElement("div");
  familyInputsContainer.id = "familyInputsContainer";
  familyInputsContainer.style.marginTop = "10px";
  modal.appendChild(familyInputsContainer);

  // Visit Purpose textarea
  const visitPurposeTextarea = document.createElement("textarea");
  visitPurposeTextarea.placeholder = "Enter Visit Purpose Details";
  modal.appendChild(createLabel("Visit Purpose Details:"));
  modal.appendChild(visitPurposeTextarea);

  // Personal Info Section
  const personalInfoSection = document.createElement("div");
  personalInfoSection.className = "personal-info-section";
  personalInfoSection.innerHTML = "<h4>Personal Information</h4>";
  modal.appendChild(personalInfoSection);

  // Personal Info Inputs
  const inputFullName = createInput("Full Name", "Enter Full Name");
  personalInfoSection.appendChild(inputFullName);

  const inputEmail = createInput("Email", "Enter Email", "email");
  personalInfoSection.appendChild(inputEmail);

  const inputPhone = createInput("Phone Number", "Enter Phone Number", "tel");
  personalInfoSection.appendChild(inputPhone);

  // Modal footer with buttons (sticky at bottom)
  const modalFooter = document.createElement("div");
  modalFooter.id = "ivac-modal-footer";
  modalFooter.innerHTML = `
        <button id="ivac-modal-cancel" class="ivac-modal-btn">Cancel</button>
        <button id="ivac-modal-clear" class="ivac-modal-btn">Clear</button>
        <button id="ivac-modal-save" class="ivac-modal-btn">Save</button>
    `;
  modal.appendChild(modalFooter);

  // Helper function to create input fields
  function createInput(labelText, placeholder, type = "text") {
    const container = document.createElement("div");
    container.style.marginBottom = "15px";

    const label = document.createElement("label");
    label.innerText = labelText;
    container.appendChild(label);

    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.style.width = "100%";
    input.style.padding = "10px";
    input.style.border = "1px solid #ddd";
    input.style.borderRadius = "8px";
    input.style.marginBottom = "15px";
    input.style.background = "rgba(255,255,255,0.8)";
    input.style.transition = "all 0.3s ease";
    input.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.1)";
    container.appendChild(input);

    return container;
  }

  // Helper function to create labels
  function createLabel(text) {
    const label = document.createElement("label");
    label.innerText = text;
    label.style.display = "block";
    label.style.marginBottom = "5px";
    label.style.fontWeight = "bold";
    label.style.fontSize = "14px";
    label.style.color = "#2c3e50";
    return label;
  }

  // Function to update family member inputs based on count
  function updateFamilyInputs() {
    const count = parseInt(inputFamilyCount.value);
    familyInputsContainer.innerHTML = "";
    familyMembers = familyMembers || [];

    for (let i = 0; i < count; i++) {
      const memberContainer = document.createElement("div");
      memberContainer.className = "family-member";

      const heading = document.createElement("h5");
      heading.innerText = `Family Member ${i + 1}`;
      memberContainer.appendChild(heading);

      // Name input
      const nameInput = document.createElement("input");
      nameInput.placeholder = "Name";
      nameInput.dataset.index = i;
      nameInput.dataset.type = "name";
      nameInput.style.width = "100%";
      nameInput.style.padding = "10px";
      nameInput.style.border = "1px solid #ddd";
      nameInput.style.borderRadius = "8px";
      nameInput.style.marginBottom = "10px";
      nameInput.style.background = "rgba(255,255,255,0.8)";
      memberContainer.appendChild(nameInput);

      // Webfile input
      const webfileInput = document.createElement("input");
      webfileInput.placeholder = "Web File Number";
      webfileInput.dataset.index = i;
      webfileInput.dataset.type = "webfile";
      webfileInput.style.width = "100%";
      webfileInput.style.padding = "10px";
      webfileInput.style.border = "1px solid #ddd";
      webfileInput.style.borderRadius = "8px";
      webfileInput.style.marginBottom = "10px";
      webfileInput.style.background = "rgba(255,255,255,0.8)";
      memberContainer.appendChild(webfileInput);

      // Set saved values if they exist
      if (familyMembers[i]) {
        nameInput.value = familyMembers[i].name || "";
        webfileInput.value = familyMembers[i].webfile || "";
      }

      familyInputsContainer.appendChild(memberContainer);
    }
  }

  // Function to update IVAC centers based on selected High Commission
  function updateIvacCenters() {
    const selectedHighCom = highcomSelect.value;
    const ivacCenters = {
      1: [
        [9, "IVAC, BARISAL"],
        [12, "IVAC, JESSORE"],
        [17, "IVAC, Dhaka (JFP)"],
        [20, "IVAC, SATKHIRA"],
      ],
      2: [
        [5, "IVAC, CHITTAGONG"],
        [21, "IVAC, CUMILLA"],
        [22, "IVAC, NOAKHALI"],
        [23, "IVAC, BRAHMANBARIA"],
      ],
      3: [
        [2, "IVAC , RAJSHAHI"],
        [7, "IVAC, RANGPUR"],
        [18, "IVAC, THAKURGAON"],
        [19, "IVAC, BOGURA"],
        [24, "IVAC, KUSHTIA"],
      ],
      4: [
        [4, "IVAC, SYLHET"],
        [8, "IVAC, MYMENSINGH"],
      ],
      5: [[3, "IVAC, KHULNA"]],
    };

    ivacSelect.innerHTML = "";
    ivacCenters[selectedHighCom]?.forEach(([value, name]) => {
      const option = document.createElement("option");
      option.value = value;
      option.text = name;
      ivacSelect.appendChild(option);
    });
  }

  // Initialize IVAC centers
  updateIvacCenters();

  // Event listeners
  highcomSelect.addEventListener("change", updateIvacCenters);
  inputFamilyCount.addEventListener("change", updateFamilyInputs);

  // Modal button events
  document
    .getElementById("ivac-modal-cancel")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  document
    .getElementById("ivac-modal-clear")
    .addEventListener("click", function () {
      webFileInput.value = "";
      inputFamilyCount.value = "0";
      highcomSelect.value = "4";
      updateIvacCenters();
      ivacSelect.value = "4";
      visaTypeSelect.value = "13";
      visitPurposeTextarea.value = "";
      inputFullName.querySelector("input").value = "";
      inputEmail.querySelector("input").value = "";
      inputPhone.querySelector("input").value = "";
      updateFamilyInputs();

      // Clear saved data
      dynamicHighcom = 4;
      dynamicIvacId = 4;
      dynamicWebfileId = null;
      dynamicVisaType = null;
      dynamicFamilyCount = 0;
      dynamicVisitPurpose = null;
      dynamicFullName = null;
      dynamicEmail = null;
      dynamicPhone = null;
      dynamicFamilyName = null;
      dynamicFamilyWebfileNo = null;
      familyMembers = [];
      saveData();
    });

  document
    .getElementById("ivac-modal-save")
    .addEventListener("click", function () {
      dynamicWebfileId = webFileInput.value || null;
      dynamicFamilyCount = parseInt(inputFamilyCount.value) || 0;
      dynamicHighcom = parseInt(highcomSelect.value) || 4;
      dynamicIvacId = parseInt(ivacSelect.value) || 4;
      dynamicVisaType = parseInt(visaTypeSelect.value) || null;
      dynamicVisitPurpose = visitPurposeTextarea.value || null;
      dynamicFullName = inputFullName.querySelector("input").value || null;
      dynamicEmail = inputEmail.querySelector("input").value || null;
      dynamicPhone = inputPhone.querySelector("input").value || null;
      dynamicFamilyName = inputFullName.querySelector("input").value || null;
      dynamicFamilyWebfileNo = webFileInput.value
        ? webFileInput.value.replace(/(.{6})$/, "A7C25")
        : null;

      // Save family members data
      familyMembers = [];
      const inputs = familyInputsContainer.querySelectorAll("input");
      inputs.forEach((input) => {
        const index = parseInt(input.dataset.index);
        const type = input.dataset.type;
        const value = input.value || null;

        if (!familyMembers[index]) {
          familyMembers[index] = {};
        }
        familyMembers[index][type] = value;
      });

      saveData();
      modal.style.display = "none";
    });

  // ==================== Smart Panel Creation ====================

  // Create the smart panel container
  const smartPanel = document.createElement("div");
  smartPanel.id = "ivac-smart-panel";

  // Panel header
  const panelHeader = document.createElement("div");
  panelHeader.id = "ivac-smart-panel-header";

  // Title container with edit functionality
  const titleContainer = document.createElement("div");
  titleContainer.id = "ivac-smart-panel-title-input-container";

  // Panel title (editable)
  const panelTitle = document.createElement("div");
  panelTitle.id = "ivac-smart-panel-title";
  panelTitle.innerHTML = `<i>⚙️</i> ${panelTitleText}`;
  panelTitle.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    titleInput.value = panelTitleText;
    titleInput.style.display = "block";
    titleInput.focus();
  });

  // Title input field
  const titleInput = document.createElement("input");
  titleInput.id = "ivac-smart-panel-title-input";
  titleInput.type = "text";
  titleInput.placeholder = "Enter panel name";

  // Save button for title
  const titleSaveBtn = document.createElement("button");
  titleSaveBtn.id = "ivac-smart-panel-title-save";
  titleSaveBtn.innerHTML = "Save";
  titleSaveBtn.addEventListener("click", function () {
    panelTitleText = titleInput.value || "IVAC Helper";
    panelTitle.innerHTML = `<i>⚙️</i> ${panelTitleText}`;
    titleInput.style.display = "none";
    GM_setValue("panelTitleText", panelTitleText);
  });

  // Hide input when clicking outside
  document.addEventListener("click", function (e) {
    if (
      e.target !== titleInput &&
      e.target !== titleSaveBtn &&
      e.target !== panelTitle
    ) {
      titleInput.style.display = "none";
    }
  });

  // Press Enter to save
  titleInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      panelTitleText = titleInput.value || "IVAC Helper";
      panelTitle.innerHTML = `<i>⚙️</i> ${panelTitleText}`;
      titleInput.style.display = "none";
      GM_setValue("panelTitleText", panelTitleText);
    }
  });

  titleInput.appendChild(titleSaveBtn);
  titleContainer.appendChild(panelTitle);
  titleContainer.appendChild(titleInput);

  const panelClose = document.createElement("button");
  panelClose.id = "ivac-smart-panel-close";
  panelClose.innerHTML = "&times;";
  panelClose.addEventListener("click", function (e) {
    e.stopPropagation();
    smartPanel.classList.remove("visible");
  });

  panelHeader.appendChild(titleContainer);
  panelHeader.appendChild(panelClose);
  smartPanel.appendChild(panelHeader);

  // Panel buttons container
  const panelButtons = document.createElement("div");
  panelButtons.id = "ivac-smart-panel-buttons";

  // Settings button
  const settingsBtn = document.createElement("button");
  settingsBtn.className = "ivac-panel-btn";
  settingsBtn.id = "ivac-settings-btn";
  settingsBtn.innerHTML = "Settings <i>⚙️</i>";
  settingsBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    // Load saved data first
    loadSavedData();

    // Set current values in the modal
    webFileInput.value = dynamicWebfileId || "";
    inputFamilyCount.value = dynamicFamilyCount || 0;
    highcomSelect.value = dynamicHighcom || 4;
    updateIvacCenters();
    setTimeout(() => {
      ivacSelect.value = dynamicIvacId || 4;
    }, 100);
    visaTypeSelect.value = dynamicVisaType || 13;
    visitPurposeTextarea.value = dynamicVisitPurpose || "";
    inputFullName.querySelector("input").value = dynamicFullName || "";
    inputEmail.querySelector("input").value = dynamicEmail || "";
    inputPhone.querySelector("input").value = dynamicPhone || "";

    // Update family inputs with saved data
    updateFamilyInputs();
    setTimeout(() => {
      familyMembers.forEach((member, index) => {
        const nameInput = familyInputsContainer.querySelector(
          `input[data-index="${index}"][data-type="name"]`
        );
        const webfileInput = familyInputsContainer.querySelector(
          `input[data-index="${index}"][data-type="webfile"]`
        );
        if (nameInput) nameInput.value = member.name || "";
        if (webfileInput) webfileInput.value = member.webfile || "";
      });
    }, 100);

    modal.style.display = "block";
    smartPanel.classList.remove("visible");
  });

  // Application Submit button
  const appSubmitBtn = document.createElement("button");
  appSubmitBtn.className = "ivac-panel-btn";
  appSubmitBtn.id = "ivac-app-submit-btn";
  appSubmitBtn.innerHTML = "Submit Application <i>📝</i>";
  appSubmitBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    sendDataToServer();
  });

  // Personal Info button
  const personalSubmitBtn = document.createElement("button");
  personalSubmitBtn.className = "ivac-panel-btn";
  personalSubmitBtn.id = "ivac-personal-submit-btn";
  personalSubmitBtn.innerHTML = "Personal Info <i>👤</i>";
  personalSubmitBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    submitPersonalInfo();
  });

  // Overview button
  const overviewBtn = document.createElement("button");
  overviewBtn.className = "ivac-panel-btn";
  overviewBtn.id = "ivac-overview-btn";
  overviewBtn.innerHTML = "Overview <i>📊</i>";
  overviewBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    sendOverviewRequest();
  });

  // Payment button
  const paymentBtn = document.createElement("button");
  paymentBtn.className = "ivac-panel-btn";
  paymentBtn.id = "ivac-payment-btn";
  paymentBtn.innerHTML = "Make Payment <i>💳</i>";
  paymentBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    handlePayment();
  });

  // Stop All button
  const stopAllBtn = document.createElement("button");
  stopAllBtn.className = "ivac-panel-btn";
  stopAllBtn.id = "ivac-stop-all-btn";
  stopAllBtn.innerHTML = "Stop All <i>✋</i>";
  stopAllBtn.addEventListener("click", function (e) {
    if (!smartPanel.classList.contains("visible")) {
      e.stopPropagation();
      return;
    }
    stopAllRequests();
  });

  // Add buttons to panel
  panelButtons.appendChild(settingsBtn);
  panelButtons.appendChild(appSubmitBtn);
  panelButtons.appendChild(personalSubmitBtn);
  panelButtons.appendChild(overviewBtn);
  panelButtons.appendChild(paymentBtn);
  panelButtons.appendChild(stopAllBtn);

  smartPanel.appendChild(panelButtons);
  document.body.appendChild(smartPanel);

  // Create toggle button for the panel
  const togglePanelBtn = document.createElement("button");
  togglePanelBtn.id = "ivac-toggle-panel";
  togglePanelBtn.innerHTML = "⚙️";
  togglePanelBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    smartPanel.classList.toggle("visible");
  });
  document.body.appendChild(togglePanelBtn);

  // Handle clicks outside the panel to close it
  document.addEventListener("click", function (e) {
    if (
      !smartPanel.contains(e.target) &&
      e.target !== togglePanelBtn &&
      e.target !== titleInput &&
      e.target !== titleSaveBtn
    ) {
      smartPanel.classList.remove("visible");
    }
  });

  // Prevent panel clicks from bubbling up when panel is visible
  smartPanel.addEventListener("click", function (e) {
    if (smartPanel.classList.contains("visible")) {
      e.stopPropagation();
    }
  });

  // Initialize all data when script starts
  function init() {
    loadSavedData();
    // Update panel title with saved value
    document.getElementById(
      "ivac-smart-panel-title"
    ).innerHTML = `<i>⚙️</i> ${panelTitleText}`;
  }

  // Run initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Optional: Hide and show emergency notice close button
  const emergencyBtn = document.getElementById("emergencyNoticeCloseBtn");
  if (emergencyBtn) {
    emergencyBtn.style.display = "none";
    setTimeout(function () {
      emergencyBtn.style.display = "block";
    }, 9000);
  }
})();
