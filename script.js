const monthTitle = document.getElementById("monthTitle");
const calendarDates = document.getElementById("calendarDates");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const slotsBox = document.getElementById("slotsBox");
const addINfo = document.getElementById("nextBtn");

let currentDate = new Date();
let selectedDate = null;
let selectedSlot = null;

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// ================= Calendar =================
function renderCalendar() {
  calendarDates.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    calendarDates.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateEl = document.createElement("div");
    dateEl.textContent = day;

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateEl.classList.add("today");
    }

    if (
      selectedDate &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    ) {
      dateEl.classList.add("selected");
    }

    dateEl.addEventListener("click", async () => {
      selectedDate = new Date(year, month, day);
      renderCalendar();

      const slots = await fetchAvailableSlots(selectedDate);
      renderSlots(slots);
    });

    calendarDates.appendChild(dateEl);
  }
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

// ================= Slots =================
function fetchAvailableSlots(date) {
  console.log("API Call Date:", date);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        "9:00 am",
        "9:35 am",
        "10:10 am",
        "10:45 am",
        "11:20 am",
        "11:55 am",
        "12:30 pm",
        "1:05 pm",
        "1:40 pm",
        "2:15 pm",
        "2:50 pm",
        "3:25 pm"
      ]);
    }, 500);
  });
}

function renderSlots(slots) {
  slotsBox.innerHTML = "";
  selectedSlot = null;

  slots.forEach(time => {
    const slotEl = document.createElement("div");
    slotEl.className = "time-slot";
    slotEl.innerHTML = `${time} <span>Slots:1</span>`;

    slotEl.addEventListener("click", () => {
      document
        .querySelectorAll(".time-slot")
        .forEach(s => s.classList.remove("active"));

      slotEl.classList.add("active");
      selectedSlot = time;

      console.log("Selected Slot:", selectedSlot);
    });

    slotsBox.appendChild(slotEl);
  });
}


renderCalendar();

addINfo.addEventListener("click", function () {
  if (selectedDate && selectedSlot) {
    window.location.href = "appointment.html";
  } else {
    alert("Please select a date and a time slot.");
  }
});