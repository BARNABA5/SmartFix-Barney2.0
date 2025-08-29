// =========================
// INITIALIZATION
// =========================
document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    document.getElementById("issue").value = "";
});

// =========================
// TAB SWITCHING
// =========================
function openTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");

    // If user goes to tips, show bolts falling
    if (tabId === "tips") {
        showBolts3D();
    }
}

// =========================
// DIAGNOSIS FUNCTION
// =========================
function diagnoseIssue() {
    let issue = document.getElementById("issue").value;
    let customIssue = document.getElementById("customIssue").value.trim();
    let diagnosis = "";

    if (issue) {
        diagnosis = getDiagnosis(issue);

    } else if (customIssue) {
        diagnosis = `Looking into: ${customIssue}...`;
        speakText(`You said: ${customIssue}. Let's search for a solution.`);
        setTimeout(() => {
            searchOnGoogle(customIssue, true);
        }, 1500);

    } else {
        diagnosis = "Please select or enter an issue first.";
    }

    // Show result in UI
    document.getElementById("output").innerHTML = diagnosis;

    // Speak the diagnosis
    speakText(diagnosis);

    // Save if it's a valid diagnosis
    if (diagnosis && !diagnosis.startsWith("Please")) {
        saveDiagnosis(diagnosis);
    }
}

// =========================
// DIAGNOSIS MESSAGES
// =========================
function getDiagnosis(issue) {
    const diagnoses = {
        batteryDrain: "Battery drains fast. Try reducing screen brightness, disabling background apps, and checking battery health.",
        notCharging: "Not charging. Check charger, cable, and clean charging port.",
        screenUnresponsive: "Screen not responding. Try restarting or booting into safe mode.",
        slowPerformance: "Slow performance. Clear cache, close apps, and restart the device.",
        overheating: "Overheating. Avoid heavy usage, close apps, and remove case.",
        storageFull: "Storage full. Delete unused apps and files, clear cache memory in every app.",
        lagging: "Lagging or freezing. Restart device and update software.",
        appCrashes: "Apps crashing. Update or reinstall the problematic app.",
        cameraIssue: "Camera blurry. Clean the lens, restart camera app.",
        chargingPortFault: "Charging port faulty. Clean gently or repair.",
        connectivity: "Connectivity issues. Reset network settings.",
        softwareGlitch: "Software glitch. Restart and update software.",
        unresponsiveTouch: "Unresponsive touch. Clean screen and restart device.",
        callIssues: "Call issues. Check SIM and network coverage in your area.",
        networkSim: "SIM or network problems. Restart or reseat SIM.",
        phantomVibrations: "Phantom vibrations. Might be notification anxiety. Replace one scrolling session with Bible scripture reading.",
        batterySafety: "Overheating battery. Stop using your phone and seek service.",
        hardwareFailure: "Hardware failure. Requires technician repair.",
        slowCharging: "Slow charging. Use original charger and cable.",
        fingerprintNotWorking: "Fingerprint sensor not working. Clean sensor and re-register fingerprints.",
        faceIDIssue: "Face unlock not working. Ensure good lighting and re-scan face.",
        wifiNotConnecting: "Wi-Fi not connecting. Restart router and phone, forget and reconnect network.",
        bluetoothNotPairing: "Bluetooth pairing issues. Remove and re-pair the device.",
        speakerNotWorking: "Speaker not producing sound. Check volume settings and test with headphones.",
        microphoneNotWorking: "Microphone not picking up sound. Check app permissions and clean mic opening.",
        gpsNotAccurate: "GPS location inaccurate. Enable high accuracy mode and restart GPS.",
        notificationsNotShowing: "Notifications not showing. Check app settings and battery optimization.",
        ghostTouch: "Phone registers touches without you touching it. Remove screen protector or check for moisture.",
        phoneNotTurningOn: "Phone won’t power on. Charge for at least 30 minutes and try again.",
        randomRestart: "Phone restarts randomly. Check for software updates or factory reset.",
        headphoneJackIssue: "Headphones not detected. Clean jack and check settings.",
        overheatingWhileCharging: "Phone gets hot while charging. Use original charger and avoid using phone while charging.",
        waterDamage: "Water damage suspected. Power off immediately, dry with silica gel or rice, then seek repair."
    };
    return diagnoses[issue] || "No diagnosis available for this issue.";
}

// =========================
// TEXT TO SPEECH
// =========================
function speakText(text) {
    if ('speechSynthesis' in window && text) {
        speechSynthesis.cancel(); // stop previous speech
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

// =========================
// SEARCH FUNCTIONS
// =========================
function searchOnGoogle(query, openYouTube = false) {
    speakText(`Searching Google for ${query}`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}+phone+fix`, '_blank');
    if (openYouTube) {
        setTimeout(() => {
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+phone+repair`, '_blank');
        }, 1000);
    }
}

// =========================
// SAVE & LOAD HISTORY
// =========================
function saveDiagnosis(text) {
    let history = JSON.parse(localStorage.getItem("diagnosisHistory")) || [];
    history.push({ text, date: new Date().toLocaleString() });
    localStorage.setItem("diagnosisHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("diagnosisHistory")) || [];
    let list = document.getElementById("historyList");
    if (!list) return;
    list.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.date} - ${item.text}`;
        list.appendChild(li);
    });
}
