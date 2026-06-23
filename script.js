var myUsername = "";
var myPassword = "";
var myCrystals = 0;
var myXP = 0;
var myPacks = 0;
var myItems = {};
var lastClaim = 0;
var pendingItem = null;

var snowArea = document.getElementById("snow-wrap");
var snowSymbols = ["*", "✦", "•", "❄"];

for (var i = 0; i < 45; i++) {
  var flake = document.createElement("div");
  flake.className = "flake";
  flake.textContent = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
  flake.style.left = Math.random() * 100 + "%";
  flake.style.fontSize = Math.random() * 6 + 13 + "px";
  flake.style.animationDuration = Math.random() * 3 + 4 + "s";
  flake.style.animationDelay = Math.random() * -5 + "s";
  snowArea.appendChild(flake);
}

function hideAll() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("register-screen").style.display = "none";
  document.getElementById("account-screen").style.display = "none";
  document.getElementById("tos-screen").style.display = "none";
}

function showHome() {
  hideAll();
  document.getElementById("home-page").style.display = "flex";
}

function openLogin() {
  hideAll();
  document.getElementById("login-screen").style.display = "flex";
}

function openRegister() {
  hideAll();
  document.getElementById("register-screen").style.display = "flex";
}

function openTOS() {
  hideAll();
  document.getElementById("tos-screen").style.display = "flex";
}

function showDash() {
  hideAll();
  document.getElementById("account-screen").style.display = "flex";
}

function doRegister() {
  var user = document.getElementById("reg-user").value.trim();
  var pass = document.getElementById("reg-pass").value.trim();
  var agreed = document.getElementById("reg-agree").checked;

  if (user == "" || pass == "" || !agreed) {
    alert("Please fill out all fields and agree to the Terms of Service.");
    return;
  }

  myUsername = user;
  myPassword = pass;
  document.getElementById("show-name").textContent = myUsername;
  updateStats();
  showDash();
  goTab("profile");
}

function doLogin() {
  var user = document.getElementById("login-user").value.trim();
  var pass = document.getElementById("login-pass").value.trim();

  if (user == "" || pass == "") {
    alert("Please enter your username and password.");
    return;
  }

  if (myUsername == "") {
    myUsername = user;
    myPassword = pass;
  }

  if (user == myUsername && pass == myPassword) {
    document.getElementById("show-name").textContent = myUsername;
    updateStats();
    showDash();
    goTab("profile");
  } else {
    alert("Wrong username or password!");
  }
}

function doLogout() {
  showHome();
}

function updateStats() {
  document.getElementById("bal-display").textContent = myCrystals;
  document.getElementById("s-crystals").textContent = myCrystals;
  document.getElementById("s-xp").textContent = myXP;
  document.getElementById("s-packs").textContent = myPacks;

  var count = 0;
  for (var k in myItems) {
    if (myItems.hasOwnProperty(k)) count++;
  }
  document.getElementById("s-crystables").textContent = count;
}

function goTab(name) {
  var allTabs = document.getElementsByClassName("tab");
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].style.display = "none";
    allTabs[i].classList.remove("active-tab");
  }

  var allNavs = document.getElementsByClassName("nav-btn");
  for (var i = 0; i < allNavs.length; i++) {
    allNavs[i].classList.remove("active-nav");
  }

  var target = document.getElementById("tab-" + name);
  if (target) {
    target.style.display = "flex";
    target.classList.add("active-tab");
  }

  var navTarget = document.getElementById("nav-" + name);
  if (navTarget) {
    navTarget.classList.add("active-nav");
  }

  if (name == "inventory") {
    refreshInventory();
  }

  if (name == "trading") {
    document.getElementById("trade-you-name").textContent = myUsername || "You";
  }
}

function claimDaily() {
  var now = new Date().getTime();
  var oneDay = 24 * 60 * 60 * 1000;

  if (now - lastClaim < oneDay) {
    var left = oneDay - (now - lastClaim);
    var hrs = Math.floor(left / (1000 * 60 * 60));
    var mins = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    alert("Already claimed! Come back in " + hrs + "h " + mins + "m.");
    return;
  }

  lastClaim = now;
  var got = Math.floor(Math.random() * 500) + 200;
  myCrystals += got;
  myXP += 25;

  pendingItem = {
    name: got + " Crystals",
    rarity: "Daily Reward",
    color: "#00e5ff"
  };

  playReveal();
}

function openPack(cost) {
  if (myCrystals < cost) {
    alert("Not enough Crystals!");
    return;
  }

  myCrystals -= cost;
  myPacks++;

  var roll = Math.random() * 100;
  var tier = "Common";
  var color = "#9e9e9e";

  if (roll < 50) {
    tier = "Common";
    color = "#9e9e9e";
  } else if (roll < 80) {
    tier = "Uncommon";
    color = "#4caf50";
  } else if (roll < 95) {
    tier = "Rare";
    color = "#00bcd4";
  } else if (roll < 99) {
    tier = "Epic";
    color = "#9c27b0";
  } else {
    tier = "Legendary";
    color = "#ff9800";
  }

  var itemName = tier + " Shard";
  myItems[itemName] = (myItems[itemName] || 0) + 1;

  pendingItem = {
    name: itemName,
    rarity: tier,
    color: color
  };

  playReveal();
}

function playReveal() {
  var screen = document.getElementById("reveal-screen");
  var box = document.getElementById("mystery-box");
  var card = document.getElementById("reward-card");
  var okBtn = document.getElementById("ok-btn");

  card.style.display = "none";
  okBtn.style.display = "none";
  box.style.display = "flex";
  box.classList.remove("do-shake");

  screen.style.display = "flex";

  setTimeout(function() {
    box.classList.add("do-shake");
  }, 50);

  setTimeout(function() {
    box.style.display = "none";

    document.getElementById("reward-name-text").textContent = pendingItem.name;
    document.getElementById("reward-rarity-text").textContent = pendingItem.rarity;
    document.getElementById("reward-rarity-text").style.color = pendingItem.color;

    card.style.display = "flex";
    okBtn.style.display = "inline-block";
    updateStats();
  }, 1100);
}

function closeReveal() {
  document.getElementById("reveal-screen").style.display = "none";
  pendingItem = null;
}

function refreshInventory() {
  var list = document.getElementById("inv-list");
  list.innerHTML = "";

  var keys = Object.keys(myItems);
  if (keys.length == 0) {
    list.innerHTML = '<div class="empty-msg">No items yet! Go open some packs.</div>';
    return;
  }

  for (var i = 0; i < keys.length; i++) {
    var name = keys[i];
    var qty = myItems[name];
    var card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = '<div class="item-name">' + name + '</div><div class="item-count">Owned: ' + qty + '</div>';
    list.appendChild(card);
  }
}

function viewUserShortcut() {
  goTab("trading");
  document.getElementById("trade-search-input").value = myUsername;
  searchTradeUser();
}

function searchTradeUser() {
  var val = document.getElementById("trade-search-input").value.trim();
  if (val == "") {
    alert("Enter a username to search.");
    return;
  }
  document.getElementById("trade-them-name").textContent = val;
}

function addToTrade() {
  var keys = Object.keys(myItems);
  if (keys.length == 0) {
    alert("You have no items to trade!");
    return;
  }

  var slots = document.getElementById("your-slots");
  var freeSlot = slots.querySelector(".add-slot");
  if (freeSlot) {
    freeSlot.classList.remove("add-slot");
    freeSlot.style.borderStyle = "solid";
    freeSlot.style.background = "rgba(255,255,255,0.2)";
    freeSlot.textContent = keys[0];
  }
}

function capTradeInput(input) {
  var val = parseInt(input.value) || 0;
  if (val > myCrystals) {
    input.value = myCrystals;
  }
}

function sendTrade() {
  var target = document.getElementById("trade-them-name").textContent;
  if (target == "Target Player") {
    alert("Search for a player first!");
    return;
  }
  alert("Trade request sent to " + target + "! Waiting for response...");
}

function changeUsername() {
  var newName = document.getElementById("new-username-input").value.trim();
  if (newName == "") {
    alert("Username can't be blank!");
    return;
  }
  if (myCrystals < 5000) {
    alert("You need 5,000 Crystals to change your username!");
    return;
  }
  myCrystals -= 5000;
  myUsername = newName;
  document.getElementById("show-name").textContent = myUsername;
  document.getElementById("new-username-input").value = "";
  updateStats();
  alert("Username changed to " + myUsername + "! 5,000 Crystals spent.");
}

function changePassword() {
  var newPass = document.getElementById("new-password-input").value.trim();
  if (newPass == "") {
    alert("Password can't be blank!");
    return;
  }
  myPassword = newPass;
  document.getElementById("new-password-input").value = "";
  alert("Password updated!");
}

function linkDiscord() {
  alert("Discord linking token generated! Provide this to the Crystalet bot with /link.");
}

function replyTo(name) {
  var input = document.getElementById("chat-input");
  input.value = "@" + name + " " + input.value;
  input.focus();
}

function sendMsg() {
  var input = document.getElementById("chat-input");
  var msg = input.value.trim();
  if (msg == "") return;

  var log = document.getElementById("chat-log");
  var div = document.createElement("div");
  div.className = "chat-msg";

  var sender = myUsername || "Guest";
  div.setAttribute("onclick", "replyTo('" + sender + "')");
  div.innerHTML = "<strong>" + sender + ":</strong> " + msg;

  log.appendChild(div);
  input.value = "";
  log.scrollTop = log.scrollHeight;
}
