let selectedRole="Student";
let generatedOTP="";

function selectRole(role,btn){
  selectedRole=role;
  document.getElementById("roleDisplay").innerText=
    "Logging in as: "+role;

  document.querySelectorAll(".role-btn")
    .forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

function loginUser(){
  alert("Demo Login Successful as "+selectedRole);
  return false;
}

function showForgot(){
  loginSection.classList.add("hidden");
  forgotSection.classList.remove("hidden");
}

function backToLogin(){
  forgotSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

function sendOTP(){
  generatedOTP=Math.floor(1000+Math.random()*9000);
  alert("Demo OTP: "+generatedOTP);

  forgotSection.classList.add("hidden");
  otpSection.classList.remove("hidden");
}

function verifyOTP(){
  let inputs=document.querySelectorAll(".otp-box input");
  let entered="";
  inputs.forEach(i=>entered+=i.value);

  if(entered==generatedOTP){
    alert("OTP Verified");
    otpSection.classList.add("hidden");
    resetSection.classList.remove("hidden");
  }else{
    alert("Invalid OTP");
  }
}

function resetPassword(){
  let p1=newPass.value;
  let p2=confirmPass.value;

  if(p1===p2 && p1!=""){
    alert("Password Reset Successful");
    location.reload();
  }else{
    alert("Passwords do not match");
  }
}