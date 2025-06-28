function submitPredictions() {
  const preds = [];
  for (let i = 1; i <= 5; i++) {
    const val = document.getElementById('pred' + i).value;
    if (!val) {
      document.getElementById('result').innerText = "❗ Please select predictions for all matches.";
      return;
    }
    preds.push(val);
  }
  document.getElementById('result').innerText =
    `✅ Your Predictions:\n1. ${preds[0]}\n2. ${preds[1]}\n3. ${preds[2]}\n4. ${preds[3]}\n5. ${preds[4]}`;
}

function adminLogin() {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;

  if (user === 'admin' && pass === '1234') {
    localStorage.setItem('admin', 'true');
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
  } else {
    alert('Invalid credentials');
  }
}

function logoutAdmin() {
  localStorage.removeItem('admin');
  location.reload();
}

window.onload = function () {
  if (location.pathname.includes('admin.html')) {
    if (localStorage.getItem('admin') === 'true') {
      document.getElementById('loginBox').style.display = 'none';
      document.getElementById('adminPanel').style.display = 'block';
    }
  }
};
