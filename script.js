

const firebaseConfig = {
  apiKey: "AIzaSyAKhP-daIeMWQow75eQugLoAz91yz5Bvyw",
  authDomain: "footballpredictzone.firebaseapp.com",
  projectId: "footballpredictzone",
  storageBucket: "footballpredictzone.appspot.com",
  messagingSenderId: "762705283046",
  appId: "1:762705283046:web:c9e5a9c0d71fca39f03827",
  measurementId: "G-47HBZKY6W3"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function adminLogin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;
  if (user === "admin" && pass === "1234") {
    localStorage.setItem("admin", "true");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadForm();
  } else {
    alert("Invalid credentials");
  }
}

function logoutAdmin() {
  localStorage.removeItem("admin");
  location.reload();
}

function loadForm() {
  const inputs = document.getElementById("tipInputs");
  inputs.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    inputs.innerHTML += `
      <div>
        <input type="text" placeholder="Match (e.g. Chelsea vs Arsenal)" id="match${i}">
        <input type="text" placeholder="Prediction (e.g. Over 2.5 goals)" id="pred${i}">
      </div>
    `;
  }
  document.getElementById("tipDate").valueAsDate = new Date();
}

function addTip() {
  const inputs = document.getElementById("tipInputs");
  const count = inputs.children.length / 2;
  inputs.innerHTML += `
    <div>
      <input type="text" placeholder="Match" id="match${count}">
      <input type="text" placeholder="Prediction" id="pred${count}">
    </div>
  `;
}

function saveTips() {
  const inputs = document.getElementById("tipInputs");
  const tips = [];
  for (let i = 0; i < inputs.children.length; i += 2) {
    const match = document.getElementById("match" + (i / 2)).value;
    const pred = document.getElementById("pred" + (i / 2)).value;
    if (match && pred) {
      tips.push({ match, prediction: pred });
    }
  }
  const date = document.getElementById("tipDate").value;
  if (!date || tips.length === 0) {
    alert("Please enter a date and at least one prediction.");
    return;
  }

  database.ref('predictions/current').set({ date, tips })
    .then(() => {
      alert("✅ Predictions saved to Firebase!");
    })
    .catch(error => {
      alert("❌ Failed to save: " + error.message);
    });
}

window.onload = function () {
  if (location.pathname.includes("admin.html")) {
    if (localStorage.getItem("admin") === "true") {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
      loadForm();
    }
  }
};
