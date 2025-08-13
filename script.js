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
            searchOnGoogle(customIssue);
            searchOnYouTube(customIssue);
        }, 1500);
   } else {
    diagnosis = "Please select or enter an issue first.";
    speak(diagnosis); // Uses your existing speech function
}

    document.getElementById("output").innerHTML = diagnosis;

    if (diagnosis && !diagnosis.startsWith("⚠")) {
        speakText(diagnosis);
        saveDiagnosis(diagnosis);
    }
}

// =========================
// DIAGNOSIS MESSAGES
// =========================
function getDiagnosis(issue) {
    const diagnoses = {batteryDrain: "Battery drains fast. Try reducing screen brightness, disabling background apps, and checking battery health.",
notCharging: "Not charging. Check charger, cable, and clean charging port.",
screenUnresponsive: "Screen not responding. Try restarting or booting into safe mode.",
slowPerformance: "Slow performance. Clear cache, close apps, and restart the device.",
overheating: "Overheating. Avoid heavy usage, close apps, and remove case.",
storageFull: "Storage full. Delete unused apps and files, clear cache.",
lagging: "Lagging or freezing. Restart device and update software.",
appCrashes: "Apps crashing. Update or reinstall the problematic app.",
cameraIssue: "Camera blurry. Clean the lens, restart camera app.",
chargingPortFault: "Charging port faulty. Clean gently or repair.",
connectivity: "Connectivity issues. Reset network settings.",
softwareGlitch: "Software glitch. Restart and update software.",
unresponsiveTouch: "Unresponsive touch. Clean screen, restart device.",
callIssues: "Call issues. Check SIM and network coverage.",
networkSim: "SIM/network problems. Restart or reseat SIM.",
phantomVibrations: "Phantom vibrations. Might be notification anxiety.",
batterySafety: "Overheating battery. Stop using, seek service.",
hardwareFailure: "Hardware failure. Requires technician repair.",
slowCharging: "Slow charging. Use original charger and cable.",

// Added new ones below
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
waterDamage: "Water damage suspected. Power off immediately and dry using silica gel or repair service."

    };
    return diagnoses[issue] || "No diagnosis available for this issue.";
}

// =========================
// TEXT TO SPEECH
// =========================
function speakText(text) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

// =========================
// SEARCH FUNCTIONS
// =========================
function searchOnGoogle(query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}+phone+fix`, '_blank');
}

function searchOnYouTube(query) {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+phone+repair`, '_blank');
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
    list.innerHTML = "";
    history.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.date} - ${item.text}`;
        list.appendChild(li);
    });
}

function clearDiagnosis() {
    localStorage.removeItem("diagnosisHistory");
    loadHistory();
    document.getElementById("output").innerHTML = "";
}

// =========================
// 3D BOLT ANIMATION
// =========================
function showBolts3D() {
    let boltContainer = document.createElement("div");
    boltContainer.style.position = "fixed";
    boltContainer.style.top = 0;
    boltContainer.style.left = 0;
    boltContainer.style.width = "100%";
    boltContainer.style.height = "100%";
    boltContainer.style.pointerEvents = "none";
    boltContainer.style.zIndex = 9999;
    boltContainer.style.perspective = "800px";

    document.body.appendChild(boltContainer);

    for (let i = 0; i < 20; i++) {
        let bolt = document.createElement("div");
        bolt.textContent = "🔩";
        bolt.style.position = "absolute";
        bolt.style.left = Math.random() * 100 + "vw";
        bolt.style.top = "-10px";
        bolt.style.fontSize = "24px";
        bolt.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`;
        bolt.style.animation = `fallBolt3D ${Math.random() * 2 + 3}s linear forwards`;
        boltContainer.appendChild(bolt);
    }

    setTimeout(() => {
        document.body.removeChild(boltContainer);
    }, 4000);
}

// =========================
// PHONE HEALTH SCAN (SIMULATED)
// =========================
function scanPhoneHealth() {
    document.getElementById("batteryPercent").textContent = Math.floor(Math.random() * 40) + 60 + "%";
    document.getElementById("storageUsed").textContent = (Math.random() * 64).toFixed(1) + " GB";
    document.getElementById("performanceScore").textContent = Math.floor(Math.random() * 50) + 50 + "/100";
}

// =========================
// SETTINGS FUNCTIONS
// =========================
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function setReminder() {
    alert("Reminder feature coming soon!");
}

function clearHistory() {
    clearDiagnosis();
    alert("History cleared!");
}
