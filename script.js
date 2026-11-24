const DEPARTMENTS = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "&#10084;",
    desc: "Interventional cardiology, angioplasty, heart failure clinic, and 24/7 cardiac Cath Lab."
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "&#129504;",
    desc: "Comprehensive stroke unit, epilepsy monitoring, spine care, and neuro-rehabilitation."
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    icon: "&#129460;",
    desc: "Robotic knee & hip replacement, arthroscopy, sports injuries, and fracture management."
  },
  {
    id: "paediatrics",
    name: "Paediatrics",
    icon: "&#128118;",
    desc: "Level-III NICU, child immunisation, growth monitoring, and adolescent healthcare."
  },
  {
    id: "oncology",
    name: "Oncology",
    icon: "&#127895;",
    desc: "Precision medical oncology, daycare chemotherapy, and multidisciplinary tumour board."
  },
  {
    id: "general",
    name: "Internal Medicine",
    icon: "&#129658;",
    desc: "Diabetes, hypertension, thyroid management, preventive checkups, and infectious diseases."
  }
];

const DOCTORS = [
  {
    id: "dr-arjun",
    name: "Dr. Arjun Reddy",
    dept: "cardiology",
    deptLabel: "Cardiology",
    qual: "MD, DM (Cardiology) — AIIMS",
    exp: "18 Years Experience",
    schedule: "Mon – Sat • 9:30 AM – 4:00 PM",
    fee: "₹800",
    avatar: "assets/doc-1.svg"
  },
  {
    id: "dr-priya",
    name: "Dr. Priya Menon",
    dept: "neurology",
    deptLabel: "Neurology",
    qual: "MD, DM (Neurology)",
    exp: "14 Years Experience",
    schedule: "Mon – Fri • 10:00 AM – 5:00 PM",
    fee: "₹850",
    avatar: "assets/doc-2.svg"
  },
  {
    id: "dr-suresh",
    name: "Dr. Suresh Kulkarni",
    dept: "orthopaedics",
    deptLabel: "Orthopaedics",
    qual: "MS (Ortho), Fellowship Joint Replacement",
    exp: "16 Years Experience",
    schedule: "Mon – Sat • 10:30 AM – 6:00 PM",
    fee: "₹700",
    avatar: "assets/doc-3.svg"
  },
  {
    id: "dr-vasudha",
    name: "Dr. Vasudha Nair",
    dept: "paediatrics",
    deptLabel: "Paediatrics",
    qual: "MD (Paediatrics), Fellowship Neonatology",
    exp: "12 Years Experience",
    schedule: "Mon – Sat • 9:00 AM – 3:00 PM",
    fee: "₹600",
    avatar: "assets/doc-4.svg"
  },
  {
    id: "dr-rajesh",
    name: "Dr. Rajesh Deshmukh",
    dept: "oncology",
    deptLabel: "Oncology",
    qual: "MD, DM (Medical Oncology)",
    exp: "15 Years Experience",
    schedule: "Tue – Sat • 11:00 AM – 5:30 PM",
    fee: "₹900",
    avatar: "assets/doc-5.svg"
  },
  {
    id: "dr-kavitha",
    name: "Dr. Kavitha Sharma",
    dept: "general",
    deptLabel: "Internal Medicine",
    qual: "MD (General Medicine)",
    exp: "11 Years Experience",
    schedule: "Mon – Sat • 8:30 AM – 6:30 PM",
    fee: "₹500",
    avatar: "assets/doc-6.svg"
  }
];

const HEALTH_ARTICLES = [
  {
    id: "heart-health",
    tag: "Cardiology",
    title: "5 Early Warning Signs of Heart Disease You Shouldn't Ignore",
    readTime: "4 min read",
    summary: "Learn how subtle symptoms like jaw discomfort, unusual fatigue, and shortness of breath can signal early cardiac risk.",
    content: [
      "Heart disease often develops silently over years before a major event occurs. Recognising early symptoms enables timely intervention and saves lives.",
      "Watch for persistent chest tightness during brisk walking, unexplained shortness of breath, dizziness, swelling in the ankles, or pain radiating to the left arm, back, or jaw.",
      "Preventive steps include checking your blood pressure, fasting lipid profile, and HbA1c once a year after age 30, aiming for 150 minutes of brisk activity weekly, and limiting excess sodium and trans fats."
    ]
  },
  {
    id: "diabetes-guide",
    tag: "Internal Medicine",
    title: "Managing Blood Sugar Naturally Alongside Medical Care",
    readTime: "5 min read",
    summary: "Practical Indian meal-plate tips, post-meal walking habits, and routine screening schedules for steady glucose levels.",
    content: [
      "Balanced nutrition and consistent daily movement work hand-in-hand with prescribed diabetes medication to prevent long-term complications.",
      "Follow the balanced plate method: fill half your plate with non-starchy vegetables, one-quarter with protein (dal, paneer, eggs, fish, or lean chicken), and one-quarter with high-fibre whole grains.",
      "A 15-minute walk after lunch and dinner significantly flattens post-meal blood sugar spikes. Never alter prescribed doses without consulting your physician."
    ]
  },
  {
    id: "child-vaccines",
    tag: "Paediatrics",
    title: "Essential Childhood Immunisation & Seasonal Flu Checklist",
    readTime: "3 min read",
    summary: "A parent-friendly overview of timely vaccines and when to consult your paediatrician during monsoon and winter.",
    content: [
      "Timely vaccinations protect infants and children against preventable illnesses including measles, polio, hepatitis, and pneumococcal infections.",
      "Keep a digital and physical copy of your child's immunisation card, and schedule an annual influenza vaccine ahead of peak monsoon and winter months.",
      "Seek prompt medical evaluation if a child develops a high fever lasting over 48 hours, rapid breathing, persistent vomiting, or signs of dehydration."
    ]
  }
];

// State
let bookings = JSON.parse(localStorage.getItem("pranacare_bookings") || "[]");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Render Departments
function renderDepartments() {
  const grid = document.getElementById("departmentsGrid");
  grid.innerHTML = DEPARTMENTS.map(
    (d) => `
      <article class="dept-card" data-dept="${d.id}">
        <div class="dept-icon">${d.icon}</div>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <span class="dept-link">View Specialists &rarr;</span>
      </article>`
  ).join("");

  // Populate dropdowns
  const filterSelect = document.getElementById("departmentFilter");
  const bookDeptSelect = document.getElementById("bookDepartment");

  DEPARTMENTS.forEach((d) => {
    filterSelect.insertAdjacentHTML("beforeend", `<option value="${d.id}">${d.name}</option>`);
    bookDeptSelect.insertAdjacentHTML("beforeend", `<option value="${d.id}">${d.name}</option>`);
  });
}

// Render Doctors
function renderDoctors() {
  const query = document.getElementById("doctorSearch").value.trim().toLowerCase();
  const dept = document.getElementById("departmentFilter").value;

  const filtered = DOCTORS.filter((doc) => {
    const matchesDept = dept === "all" || doc.dept === dept;
    const matchesQuery =
      doc.name.toLowerCase().includes(query) ||
      doc.deptLabel.toLowerCase().includes(query) ||
      doc.qual.toLowerCase().includes(query);
    return matchesDept && matchesQuery;
  });

  const grid = document.getElementById("doctorsGrid");
  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted);">No doctors match your search. Try another speciality or name.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (doc) => `
      <article class="doctor-card">
        <div class="doctor-top">
          <img src="${doc.avatar}" alt="${doc.name}" />
          <div>
            <span class="doc-dept">${doc.deptLabel}</span>
            <h3 class="doc-name">${doc.name}</h3>
            <p class="doc-qual">${doc.qual}</p>
          </div>
        </div>
        <div class="doc-meta">
          <div><strong>Experience:</strong> ${doc.exp}</div>
          <div><strong>OPD Timing:</strong> ${doc.schedule}</div>
          <div><strong>Consultation Fee:</strong> ${doc.fee}</div>
        </div>
        <button type="button" class="btn btn-primary full-width book-doc-btn" data-dept="${doc.dept}" data-doc="${doc.id}">
          Book Appointment
        </button>
      </article>`
    )
    .join("");
}

// Sync Booking Doctor Dropdown with Selected Department
function populateBookingDoctors(deptId, preferredDocId = null) {
  const select = document.getElementById("bookDoctor");
  const docs = DOCTORS.filter((d) => d.dept === deptId);
  select.innerHTML = docs
    .map((d) => `<option value="${d.id}">${d.name} (${d.fee})</option>`)
    .join("");
  if (preferredDocId) {
    select.value = preferredDocId;
  }
}

// Render Health Articles
function renderArticles() {
  const grid = document.getElementById("articlesGrid");
  grid.innerHTML = HEALTH_ARTICLES.map(
    (a) => `
      <article class="article-card">
        <span class="article-tag">${a.tag} • ${a.readTime}</span>
        <h3>${a.title}</h3>
        <p>${a.summary}</p>
        <button type="button" class="read-more-btn" data-article="${a.id}">Read Full Guide &rarr;</button>
      </article>`
  ).join("");
}

// Bookings Modal & Persistence
function updateBookingCount() {
  document.getElementById("bookingCount").textContent = bookings.length;
}

function renderBookingsList() {
  const list = document.getElementById("bookingsList");
  if (bookings.length === 0) {
    list.innerHTML = `<p style="color: var(--muted);">You have no upcoming appointments booked yet.</p>`;
    return;
  }

  list.innerHTML = bookings
    .map(
      (b) => `
      <div class="booking-item">
        <div>
          <strong>${escapeHtml(b.doctorName)}</strong>
          <small>${escapeHtml(b.deptLabel)} • ${escapeHtml(b.visitType)}</small>
          <small><strong>Patient:</strong> ${escapeHtml(b.patientName)} (${escapeHtml(b.patientPhone)})</small>
          <small><strong>Slot:</strong> ${escapeHtml(b.date)} at ${escapeHtml(b.slot)}</small>
        </div>
        <button type="button" class="cancel-btn" data-cancel="${b.id}">Cancel</button>
      </div>`
    )
    .join("");
}

// Event Listeners
document.getElementById("departmentsGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".dept-card");
  if (!card) return;
  const deptId = card.dataset.dept;
  document.getElementById("departmentFilter").value = deptId;
  renderDoctors();
  document.getElementById("doctors").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("doctorSearch").addEventListener("input", renderDoctors);
document.getElementById("departmentFilter").addEventListener("change", renderDoctors);

document.getElementById("doctorsGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".book-doc-btn");
  if (!btn) return;
  document.getElementById("bookDepartment").value = btn.dataset.dept;
  populateBookingDoctors(btn.dataset.dept, btn.dataset.doc);
  document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("bookDepartment").addEventListener("change", (e) => {
  populateBookingDoctors(e.target.value);
});

// Submit Appointment Form
document.getElementById("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const patientName = document.getElementById("patientName").value.trim();
  const patientPhone = document.getElementById("patientPhone").value.trim();
  const deptId = document.getElementById("bookDepartment").value;
  const docId = document.getElementById("bookDoctor").value;
  const date = document.getElementById("bookDate").value;
  const slot = document.getElementById("bookSlot").value;
  const visitType = document.getElementById("visitType").value;

  const doc = DOCTORS.find((d) => d.id === docId) || DOCTORS[0];

  const newBooking = {
    id: Date.now(),
    patientName,
    patientPhone,
    doctorName: doc.name,
    deptLabel: doc.deptLabel,
    date,
    slot,
    visitType
  };

  bookings.unshift(newBooking);
  localStorage.setItem("pranacare_bookings", JSON.stringify(bookings));
  updateBookingCount();

  const feedback = document.getElementById("bookingFeedback");
  feedback.innerHTML = `&#10003; Appointment confirmed for <strong>${escapeHtml(patientName)}</strong> with <strong>${doc.name}</strong> on ${date} at ${slot}.`;
  feedback.classList.remove("hidden");
  e.target.reset();
  setMinBookingDate();
  populateBookingDoctors(document.getElementById("bookDepartment").value);
});

// BMI Calculator
document.getElementById("calcBmiBtn").addEventListener("click", () => {
  const hCm = parseFloat(document.getElementById("bmiHeight").value);
  const wKg = parseFloat(document.getElementById("bmiWeight").value);
  const resultEl = document.getElementById("bmiResult");

  if (!hCm || !wKg || hCm <= 0 || wKg <= 0) {
    resultEl.innerHTML = "Please enter valid height (cm) and weight (kg).";
    resultEl.classList.remove("hidden");
    return;
  }

  const bmi = wKg / Math.pow(hCm / 100, 2);
  let category = "Normal weight";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Healthy weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  resultEl.innerHTML = `Your BMI is <strong>${bmi.toFixed(1)}</strong> — <strong>${category}</strong>`;
  resultEl.classList.remove("hidden");
});

// Article Modal
const articleModal = document.getElementById("articleModal");
document.getElementById("articlesGrid").addEventListener("click", (e) => {
  const btn = e.target.closest(".read-more-btn");
  if (!btn) return;
  const article = HEALTH_ARTICLES.find((a) => a.id === btn.dataset.article);
  if (!article) return;

  document.getElementById("articleModalTitle").textContent = article.title;
  document.getElementById("articleModalMeta").textContent = `${article.tag} • ${article.readTime}`;
  document.getElementById("articleModalBody").innerHTML = article.content
    .map((para) => `<p>${para}</p>`)
    .join("");
  articleModal.classList.remove("hidden");
});

function closeArticleModal() {
  articleModal.classList.add("hidden");
}
document.getElementById("closeArticleBtn").addEventListener("click", closeArticleModal);
document.getElementById("closeArticleBackdrop").addEventListener("click", closeArticleModal);

// Bookings Modal
const bookingsModal = document.getElementById("bookingsModal");
document.getElementById("myAppointmentsBtn").addEventListener("click", () => {
  renderBookingsList();
  bookingsModal.classList.remove("hidden");
});

function closeBookingsModal() {
  bookingsModal.classList.add("hidden");
}
document.getElementById("closeBookingsBtn").addEventListener("click", closeBookingsModal);
document.getElementById("closeBookingsBackdrop").addEventListener("click", closeBookingsModal);

document.getElementById("bookingsList").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cancel]");
  if (!btn) return;
  const id = Number(btn.dataset.cancel);
  bookings = bookings.filter((b) => b.id !== id);
  localStorage.setItem("pranacare_bookings", JSON.stringify(bookings));
  updateBookingCount();
  renderBookingsList();
});

function setMinBookingDate() {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("bookDate");
  dateInput.min = today;
  dateInput.value = today;
}

// Init
renderDepartments();
renderDoctors();
renderArticles();
populateBookingDoctors(DEPARTMENTS[0].id);
setMinBookingDate();
updateBookingCount();
