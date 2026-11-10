
const $ = (id) => document.getElementById(id);

const fields = [
  ["name", "outName", "اسمك الكامل"],
  ["job", "outJob", "المهنة المطلوبة"],
  ["summary", "outSummary", "اكتب نبذة قصيرة لتظهر هنا..."],
  ["experience", "outExperience", "المنصب والشركة"],
  ["experienceDetails", "outExperienceDetails", "تفاصيل التجربة المهنية..."],
  ["education", "outEducation", "المستوى الدراسي"]
];

function updateCV() {
  fields.forEach(([input, output, fallback]) => {
    const value = $(input)?.value.trim();
    if ($(output)) $(output).textContent = value || fallback;
  });

  const contact = ["city", "email", "phone"]
    .map(id => $(id)?.value.trim())
    .filter(Boolean);

  $("outContact").textContent =
    contact.join(" • ") || "المدينة • البريد الإلكتروني • الهاتف";

  $("avatar").textContent =
    $("name").value.trim().charAt(0) || "N";

  const skills = $("skills").value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  $("outSkills").replaceChildren();

  (skills.length ? skills : ["مهارة 1", "مهارة 2"]).forEach(skill => {
    const span = document.createElement("span");
    span.textContent = skill;
    $("outSkills").appendChild(span);
  });
}

fields.forEach(([input]) => {
  $(input)?.addEventListener("input", updateCV);
});

["city", "email", "phone", "skills"].forEach(id => {
  $(id)?.addEventListener("input", updateCV);
});

function printCV() {
  updateCV();
  window.print();
}

$("printTop")?.addEventListener("click", printCV);
$("printBottom")?.addEventListener("click", printCV);

$("reset")?.addEventListener("click", () => {
  $("cvForm").reset();
  updateCV();
});

$("language")?.addEventListener("change", (event) => {
  const lang = event.target.value;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar][data-fr]").forEach(element => {
    element.textContent = element.dataset[lang];
  });
});

updateCV();
