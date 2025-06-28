function submitPredictions() {
  const pred1 = document.getElementById('pred1').value;
  const pred2 = document.getElementById('pred2').value;

  if (!pred1 || !pred2) {
    document.getElementById('result').innerText = "❗ Please select predictions for all matches.";
    return;
  }

  document.getElementById('result').innerText = `✅ Your Predictions:\n1. Chelsea vs Liverpool: ${pred1}\n2. PSG vs Bayern: ${pred2}`;
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