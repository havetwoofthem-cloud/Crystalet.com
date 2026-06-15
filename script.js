var cacheKey_u = "";
var cacheKey_p = "";
var containerElement = document.getElementById("weather-matrix");
var particlePool = ["*", "✦", "•"];
var maxCount = 52;

for (var k = 0; k < maxCount; k++) {
var node = document.createElement("div");
node.className = "precipitation-node";
node.textContent = particlePool[Math.floor(Math.random() * particlePool.length)];
node.style.left = (Math.random() * 100) + "%";
node.style.fontSize = (Math.random() * 6 + 13) + "px";
node.style.animationDuration = (Math.random() * 4 + 3.5) + "s";
node.style.animationDelay = (Math.random() * -5) + "s";
containerElement.appendChild(node);
}

function wipeActiveScreens() {
var screens = ["home-view", "main-footer", "reg-modal", "auth-modal", "dashboard-modal"];
for(var i=0; i<screens.length; i++) {
var target = document.getElementById(screens[i]);
if(target) {
if(screens[i] === "main-footer") { target.style.display = "none"; } 
else { target.style.display = "none"; }
}
}
}

function returnToLanding() {
wipeActiveScreens();
document.getElementById("home-view").style.display = "flex";
document.getElementById("main-footer").style.display = "block";
}

function openRegister() {
wipeActiveScreens();
document.getElementById("reg-modal").style.display = "flex";
}

function openLogin() {
wipeActiveScreens();
document.getElementById("auth-modal").style.display = "flex";
}

function executeRegisterProcess() {
var u = document.getElementById("new-account-name").value.trim();
var p = document.getElementById("new-account-secret").value.trim();
var check = document.getElementById("legal-consent-box").checked;
if (u && p && check) {
cacheKey_u = u;
cacheKey_p = p;
document.getElementById("profile-name-target").textContent = cacheKey_u;
wipeActiveScreens();
document.getElementById("dashboard-modal").style.display = "flex";
} else {
alert("Please fill out all fields and check the agreement box.");
}
}

function executeLoginProcess() {
var u = document.getElementById("existing-account-name").value.trim();
var p = document.getElementById("existing-account-secret").value.trim();
if (u === cacheKey_u && p === cacheKey_p && cacheKey_u !== "") {
document.getElementById("profile-name-target").textContent = cacheKey_u;
wipeActiveScreens();
document.getElementById("dashboard-modal").style.display = "flex";
} else {
alert("Invalid username or password configuration.");
}
}

function processSessionLogOut() {
wipeActiveScreens();
document.getElementById("reg-modal").style.display = "flex";
}

function switchToLoginWindow() {
wipeActiveScreens();
document.getElementById("auth-modal").style.display = "flex";
}

function switchToRegisterWindow() {
wipeActiveScreens();
document.getElementById("reg-modal").style.display = "flex";
}
