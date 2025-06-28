
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKhP-daIeMWQow75eQugLoAz91yz5Bvyw",
  authDomain: "footballpredictzone.firebaseapp.com",
  databaseURL: "https://footballpredictzone-default-rtdb.firebaseio.com",
  projectId: "footballpredictzone",
  storageBucket: "footballpredictzone.appspot.com",
  messagingSenderId: "762705283046",
  appId: "1:762705283046:web:c9e5a9c0d71fca39f03827",
  measurementId: "G-47HBZKY6W3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Login function
function firebaseLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
      loadForm();
    })
    .catch(error => {
      document.getElementById("loginError").textContent = error.message;
    });
}

function logoutFirebase() {
  firebase.auth().signOut().then(() => {
    location.reload();
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadForm();
  } else {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
  }
});

function loadForm() {
  const inputs = document.getElementById("tipInputs");
  inputs.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    inputs.innerHTML += `
      <div style="margin-bottom: 10px;">
        <input type="text" placeholder="Match (e.g. Chelsea vs Arsenal)" id="match${i}">
        <input type="text" placeholder="Prediction (e.g. 2:1)" id="pred${i}">
      </div>
    `;
  }
  document.getElementById("tipDate").valueAsDate = new Date();
}

function addTip() {
  const inputs = document.getElementById("tipInputs");
  const index = inputs.children.length;
  const div = document.createElement("div");
  div.style.marginBottom = "10px";
  div.innerHTML = `
    <input type="text" placeholder="Match" id="match${index}">
    <input type="text" placeholder="Prediction" id="pred${index}">
  `;
  inputs.appendChild(div);
}

function saveTips() {
  const date = document.getElementById("tipDate").value;
  const inputs = document.getElementById("tipInputs").children;
  const predictions = [];

  for (let i = 0; i < inputs.length; i++) {
    const match = document.getElementById("match" + i).value;
    const prediction = document.getElementById("pred" + i).value;
    if (match && prediction) {
      predictions.push({ match, prediction });
    }
  }

  if (predictions.length === 0) {
    document.getElementById("debugError").textContent = "❌ Add at least one prediction.";
    return;
  }

  db.ref("predictions/" + date).set(predictions)
    .then(() => {
      alert("✅ Predictions saved!");
      location.reload();
    })
    .catch(error => {
      document.getElementById("debugError").textContent = error.message;
    });
}
