//Get form elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");

//Track attendance
let count = 0;
const maxCount = 50;

//handle Form Submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;
  console.log("Total check-ins: ", count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.group(`Progress: ${percentage}`);

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const message = `Welcome! ${name} from ${teamName}`;
  console.log(message);
  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  form.reset();
});
