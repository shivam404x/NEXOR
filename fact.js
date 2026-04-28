/* ==============================
   AUTO TIMETABLE DATA
   ============================== */

let timetable=[
  {period:"1st Period",time:"9:00‑10:00",course:"B‑Tech CSE",section:"C",subject:"DBMS"},
  {period:"2nd Period",time:"10:00‑11:00",course:"B‑Tech CSE",section:"E",subject:"Operating System"},
  {period:"3rd Period",time:"11:00‑12:00",course:"BCA",section:"E",subject:"Computer Networks"},
  {period:"3rd Period",time:"11:00‑12:00",course:"BCA",section:"E",subject:"Computer Networks"}
];

let activeClassIndex=null;
let grid=document.getElementById("classGrid");

/* ==============================
   CREATE CLASS CARDS
   ============================== */

timetable.forEach((cls,index)=>{

  let card=document.createElement("div");
  card.className="class-card";

  card.innerHTML=`
    <span class="badge" id="status${index}">Scheduled</span>

    <h4>${cls.course}</h4>
    <p><b>${cls.section}</b></p>

    <p>Subject: ${cls.subject}</p>
    <p>${cls.period} (${cls.time})</p>

    <button class="btn" onclick="startClass(${index})">Start</button>
    <button class="btn" onclick="endClass(${index})">End</button>
  `;

  grid.appendChild(card);

  /* AUTO MONITOR START */
  autoAbsentMonitor(index);
});

/* ==============================
   START CLASS (ONLY ONE ACTIVE)
   ============================== */

function startClass(i){

  if(activeClassIndex!==null){
    alert("Another class already active ❌\nEnd it first.");
    return;
  }

  activeClassIndex=i;

  let status=document.getElementById("status"+i);
  status.innerText="Active";
  status.style.color="green";

  // Mark faculty present → stop mail
  localStorage.setItem("facultyStarted_"+i,"true");

  alert("Class Started ✅\nNo absence mail will be sent.");
}

/* ==============================
   END CLASS
   ============================== */

function endClass(i){

  if(activeClassIndex!==i){
    alert("This class is not active.");
    return;
  }

  activeClassIndex=null;

  let status=document.getElementById("status"+i);
  status.innerText="Ended";
  status.style.color="red";

  alert("Class Ended ⏹️\nAttendance allowed for 5 min.");
}

/* ==============================
   ABSENT MONITOR LOGIC
   ============================== */

function autoAbsentMonitor(index){

  /* DEMO:
     15 sec = 15 minutes grace time
     Real system → period start + 15 min
  */

  setTimeout(()=>{

    let started=localStorage.getItem("facultyStarted_"+index);
    let status=document.getElementById("status"+index);

    if(started==="true"){
      console.log("Faculty present → No mail sent");
      return;
    }

    // Faculty absent → Trigger mail
    status.innerText="Absent";
    status.style.color="black";

    sendAbsentMail(index);

  },15000);
}

/* ==============================
   AUTO MAIL SYSTEM (DEMO)
   ============================== */

function sendAbsentMail(i){

  alert(
    "Auto Mail Sent 📧\n"+
    "Faculty not present in "+
    timetable[i].period
  );

  console.log(
    "MAIL SENT → Faculty absent in",
    timetable[i]
  );
}

function logout(){
  // alert("Logged out successfully");
  window.location.href="index.html";
}

