const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

// CALCULATE AGE
function calculateAge(event) {
  event.preventDefault();

  const dayValue = dayInput.value;
  const monthValue = monthInput.value;
  const yearValue = yearInput.value;

  let validation = validateFields(dayValue, monthValue, yearValue);

  const inputDate = new Date(yearValue, monthValue, dayValue);
  const inputDay = inputDate.getDate();
  const inputMonth = inputDate.getMonth() - 1;
  const inputYear = inputDate.getFullYear();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();

  let year = currentYear - inputYear;
  let month = currentMonth - inputMonth;
  let day = currentDay - inputDay;

  if (day < 0) {
    month--;
    day += totalDays;
  }

  if (month < 0) {
    year--;
    month += 12;
  }

  if (validation === false) {
    return;
  } else {
    displayAge(day, month, year);
  }
}

// DISPLAY AGE
function displayAge(days, months, years) {
  const dayDisplay = document.getElementById("days-display");
  const monthDisplay = document.getElementById("months-display");
  const yearDisplay = document.getElementById("years-display");

  dayDisplay.textContent = days;
  monthDisplay.textContent = months;
  yearDisplay.textContent = years;
}

// VALIDATE INPUT FIELDS
function validateFields(dayValue, monthValue, yearValue) {
  const labels = document.querySelectorAll("label");
  const inputs = document.querySelectorAll("input");
  const errorMessages = document.querySelectorAll(".error-message");

  let isValid = true;

  labels.forEach(label => {
    label.style.color = 'hsl(0, 1%, 44%)';
  })

  inputs.forEach((input) => {
    input.classList.remove("error");
  });

  errorMessages.forEach((message) => {
    message.style.display = "none";
  });

  // VALIDATE DATE INPUT FIELD
  const dayError = document.getElementById("day-error");

  if (dayValue === null || dayValue === "" || dayValue < 1 || dayValue > 31) {
    labels.forEach(label => {
      label.style.color = 'hsl(0, 100%, 67%)';
    });

    inputs.forEach((input) => {
      input.classList.add("error");
    });
    
    dayError.style.display = "block";
    dayError.textContent =
      dayValue === null || dayValue === ""
        ? "This field is required"
        : "Must be a valid date";
    isValid = false;
  }

  // VALIDATE MONTH INPUT FIELD
  const monthError = document.getElementById("month-error");

  if (
    monthValue === null ||
    monthValue === "" ||
    monthValue < 1 ||
    monthValue > 12
  ) {
    labels.forEach(label => {
      label.style.color = 'hsl(0, 100%, 67%)';
    });

    inputs.forEach((input) => {
      input.classList.add("error");
    });
    
    monthError.style.display = "block";
    monthError.textContent =
      monthValue === null || monthValue === ""
        ? "This field is required"
        : "Must be a valid month";
    isValid = false;
  }

  // VALIDATE YEAR INPUT FIELD
  const yearError = document.getElementById("year-error");

  if (
    yearValue === null ||
    yearValue === "" ||
    yearValue < 1900 ||
    yearValue > new Date().getFullYear()
  ) {
    labels.forEach(label => {
      label.style.color = 'hsl(0, 100%, 67%)';
    });
    
    inputs.forEach((input) => {
      input.classList.add("error");
    });
    
    yearError.style.display = "block";
    yearError.textContent =
      yearValue === null || yearValue === ""
        ? "This field is required"
        : "Must be a valid year";
    isValid = false;
  }

  return isValid;
}
