//Get form elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");

//Track attendance
let count = 0;
const maxCount = 50;
const storageKey = "intelEventProgress"; // Name for saved data in browser

// Save current progress to browser storage
function saveProgress() {
  const data = {
    totalCount: count, // Total people checked in
    waterTeam: parseInt(waterCount.textContent, 10), // Water team count
    zeroTeam: parseInt(zeroCount.textContent, 10), // Net Zero team count
    powerTeam: parseInt(powerCount.textContent, 10), // Renewables team count
    progressWidth: progressBar.style.width, // Blue bar width text (like "20%")
  };

  localStorage.setItem(storageKey, JSON.stringify(data));
}

// Load saved progress when page opens
function loadProgress() {
  const savedText = localStorage.getItem(storageKey);

  if (!savedText) {
    return; // Nothing saved yet
  }

  try {
    const savedData = JSON.parse(savedText);

    count = Number(savedData.totalCount) || 0;
    if (count > maxCount) {
      count = maxCount; // Keep value in allowed range
    }

    attendeeCount.textContent = count;
    waterCount.textContent = Number(savedData.waterTeam) || 0;
    zeroCount.textContent = Number(savedData.zeroTeam) || 0;
    powerCount.textContent = Number(savedData.powerTeam) || 0;

    if (savedData.progressWidth) {
      progressBar.style.width = savedData.progressWidth;
    } else {
      const savedPercentage = Math.round((count / maxCount) * 100) + "%";
      progressBar.style.width = savedPercentage;
    }
  } catch (error) {
    // If saved data is broken, start fresh
    count = 0;
  }
}

// Run once at start so UI shows saved progress
loadProgress();

//handle Form Submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (count >= maxCount) {
    greeting.textContent = "Check-in is full. Maximum attendees reached.";
    greeting.style.display = "block";
    greeting.classList.add("success-message");
    return;
  }

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;
  console.log("Total check-ins: ", count);
  attendeeCount.textContent = count;

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.group(`Progress: ${percentage}`);

  progressBar.style.width = percentage;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Save after every successful check-in
  saveProgress();

  if (count === maxCount) {
    const waterTotal = parseInt(
      document.getElementById("waterCount").textContent,
      10,
    );
    const zeroTotal = parseInt(
      document.getElementById("zeroCount").textContent,
      10,
    );
    const powerTotal = parseInt(
      document.getElementById("powerCount").textContent,
      10,
    );

    let winningTeam = "Team Water Wise";
    let highestTotal = waterTotal;

    if (zeroTotal > highestTotal) {
      highestTotal = zeroTotal;
      winningTeam = "Team Net Zero";
    }

    if (powerTotal > highestTotal) {
      winningTeam = "Team Renewables";
    }

    greeting.textContent = `🎉 Goal reached! ${winningTeam} wins the check-in challenge!`;
    greeting.style.display = "block";
    greeting.classList.add("success-message");
    form.reset();
    return;
  }

  // Show welcome message
  const message = `💃  Welcome, ${name}! From ${teamName} :3`;
  console.log(message);
  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  form.reset();
});
