const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwscX8j7Wpk7jGCdew4bvfL3QM3s_JGOKXaVwkk0kEkecGJ5xgyV6VjvtYlNZzYcBc/exec";

const form = document.getElementById("tippeForm");
const stepContent = document.getElementById("stepContent");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const sortedTeams = [...teams].sort((a, b) =>
  a.localeCompare(b, "no")
);

let currentStep = 0;

const steps = [
  "Deltaker",
  "Kamper 11.–18. juni",
  "Kamper 19.–23. juni",
  "Kamper 24.–28. juni",
  "Gruppespillet",
  "Spillere",
  "Disse går ikke videre",
  "Dueller",
  "Diverse",
  "Kontroll"
];

const state = {
  name: "",
  favoriteTeam: "",
  matchTips: {},
  groupStageAnswers: {},
  playerAnswers: {},
  notAdvancingTeams: [],
  duelAnswers: {},
  miscAnswers: {}
};

function renderStep() {
  progressText.textContent = `Steg ${currentStep + 1} av ${steps.length}: ${steps[currentStep]}`;
  progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;

  backBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
  nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "inline-block";
  submitBtn.style.display = currentStep === steps.length - 1 ? "inline-block" : "none";

  if (currentStep === 0) renderParticipantStep();
  if (currentStep === 1) renderMatchStep("11. juni", "18. juni");
  if (currentStep === 2) renderMatchStep("19. juni", "23. juni");
  if (currentStep === 3) renderMatchStep("24. juni", "28. juni");
  if (currentStep === 4) renderGroupStageStep();
  if (currentStep === 5) renderPlayerStep();
  if (currentStep === 6) renderNotAdvancingStep();
  if (currentStep === 7) renderDuelStep();
  if (currentStep === 8) renderMiscStep();
  if (currentStep === 9) renderSummaryStep();
  }

function renderParticipantStep() {
  const options = sortedTeams
    .map(team => `<option value="${team}" ${state.favoriteTeam === team ? "selected" : ""}>${team}</option>`)
    .join("");

  stepContent.innerHTML = `
    <section class="section">
      <h2>Deltaker</h2>

      <label>
        Navn
        <input type="text" id="name" required placeholder="Skriv navnet ditt" value="${escapeHtml(state.name)}" />
      </label>

      <label>
        Hvis du måtte valgt én VM-drakt å gå med (ikke Norge), hvilken hadde du valgt?
        <select id="favoriteTeam" required>
          <option value="">Velg lag</option>
          ${options}
        </select>
      </label>

      <p class="help">10:15 04.06.202610:15 04.06.2026</p>
    </section>
  `;
}

function renderMatchStep(startDate, endDate) {
  const filteredMatches = matches.filter(match => {
    const day = Number(match.date.split(".")[0]);
    const startDay = Number(startDate.split(".")[0]);
    const endDay = Number(endDate.split(".")[0]);
    return day >= startDay && day <= endDay;
  });

  let html = `
    <section class="section">
      <h2>Kampresultater</h2>
      <p class="help">3 poeng for riktig resultat – 1 poeng for riktig vinner eller uavgjort.</p>
  `;

  let currentDate = "";

  filteredMatches.forEach(match => {
    const matchId = getMatchId(match);

    if (match.date !== currentDate) {
      currentDate = match.date;
      html += `<h3 class="date-title">${currentDate}</h3>`;
    }

    const saved = state.matchTips[matchId] || { scoreA: "", scoreB: "" };

    html += `
      <div class="match">
        <div class="match-name">${match.teamA} – ${match.teamB}</div>
        <input class="score" type="number" inputmode="numeric" min="0" max="20"
          data-match-id="${matchId}" data-side="A" value="${saved.scoreA}" required>
        <div class="dash">–</div>
        <input class="score" type="number" inputmode="numeric" min="0" max="20"
          data-match-id="${matchId}" data-side="B" value="${saved.scoreB}" required>
      </div>
    `;
  });

  html += `</section>`;
stepContent.innerHTML = html;

const scoreInputs = stepContent.querySelectorAll(".score");

scoreInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < scoreInputs.length - 1) {
      scoreInputs[index + 1].focus();
      scoreInputs[index + 1].select();
    }
  });
});
}

function renderGroupStageStep() {
  renderQuestionStep({
    title: "Gruppespillet",
    help: "Tre poeng per riktige svar.",
    questions: groupStageQuestions,
    stateKey: "groupStageAnswers",
    sectionName: "groupStage"
  });
}

function renderPlayerStep() {
  renderQuestionStep({
    title: "Spillere",
    help: "Tre poeng per riktige svar.",
    questions: playerQuestions,
    stateKey: "playerAnswers",
    sectionName: "players"
  });
}

function renderNotAdvancingStep() {
  const selectedCount = state.notAdvancingTeams.length;

  let html = `
    <section class="section">
      <h2>Disse går ikke videre</h2>
      <p class="help">Velg nøyaktig 16 lag som ikke går videre fra gruppespillet. To poeng per riktige lag.</p>
      <p class="help"><strong>Valgt:</strong> <span id="selectedCount">${selectedCount}</span> av 16</p>
  `;

  groups.forEach(group => {
    html += `
      <div class="group-section">
        <h3 class="group-title">${group.name}</h3>
        <div class="team-grid">
    `;

    group.teams.forEach(team => {
      const checked = state.notAdvancingTeams.includes(team) ? "checked" : "";

      html += `
        <label class="checkbox-card">
          <input type="checkbox" value="${team}" ${checked} data-not-advancing>
          ${team}
        </label>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `
    </section>
  `;

  stepContent.innerHTML = html;

  const checkboxes = stepContent.querySelectorAll("[data-not-advancing]");
  const counter = document.getElementById("selectedCount");

  checkboxes.forEach(box => {
    box.addEventListener("change", () => {
      const checkedBoxes = stepContent.querySelectorAll("[data-not-advancing]:checked");

      if (checkedBoxes.length > 16) {
        box.checked = false;
        alert("Du kan bare velge 16 lag.");
        return;
      }

      counter.textContent = checkedBoxes.length;
    });
  });
}

function renderDuelStep() {
  renderQuestionStep({
    title: "Dueller",
    help: "Tre poeng per riktige svar.",
    questions: duelQuestions,
    stateKey: "duelAnswers",
    sectionName: "duels"
  });
}

function renderMiscStep() {
  renderQuestionStep({
    title: "Diverse rør",
    help: "Tre poeng per riktige svar.",
    questions: miscQuestions,
    stateKey: "miscAnswers",
    sectionName: "misc"
  });
}

function renderQuestionStep({ title, help, questions, stateKey, sectionName }) {
  let html = `
    <section class="section">
      <h2>${title}</h2>
      <p class="help">${help}</p>
  `;

  questions.forEach(question => {
    const saved = state[stateKey][question.id] || "";

    html += `
      <label>
        ${question.label}
        ${renderQuestionInput(question, saved, sectionName)}
      </label>
    `;
  });

  html += `</section>`;
  stepContent.innerHTML = html;
}

function renderQuestionInput(question, saved, sectionName) {
  if (question.type === "team") {
    const options = sortedTeams
      .map(team => `<option value="${team}" ${saved === team ? "selected" : ""}>${team}</option>`)
      .join("");

    return `
      <select data-question-id="${question.id}" data-question-section="${sectionName}" required>
        <option value="">Velg lag</option>
        ${options}
      </select>
    `;
  }

  if (question.type === "number") {
    return `
      <input type="number" inputmode="numeric" min="0"
        data-question-id="${question.id}" data-question-section="${sectionName}"
        value="${saved}" required>
    `;
  }

  if (question.type === "yesno") {
    return `
      <select data-question-id="${question.id}" data-question-section="${sectionName}" required>
        <option value="">Velg svar</option>
        <option value="Ja" ${saved === "Ja" ? "selected" : ""}>Ja</option>
        <option value="Nei" ${saved === "Nei" ? "selected" : ""}>Nei</option>
      </select>
    `;
  }

  if (question.type === "choice") {
    const options = question.options
      .map(option => `<option value="${option}" ${saved === option ? "selected" : ""}>${option}</option>`)
      .join("");

    return `
      <select data-question-id="${question.id}" data-question-section="${sectionName}" required>
        <option value="">Velg svar</option>
        ${options}
      </select>
    `;
  }

  if (question.type === "multiTeam") {
    let html = "";
    const savedValues = Array.isArray(saved) ? saved : [];

    for (let i = 0; i < question.count; i++) {
      const options = sortedTeams
        .map(team => `<option value="${team}" ${savedValues[i] === team ? "selected" : ""}>${team}</option>`)
        .join("");

      html += `
        <select data-question-id="${question.id}" data-question-section="${sectionName}" data-multi-index="${i}" required>
          <option value="">Velg lag ${i + 1}</option>
          ${options}
        </select>
      `;
    }

    return html;
  }

  return `
    <input type="text"
      data-question-id="${question.id}" data-question-section="${sectionName}"
      value="${escapeHtml(saved)}" required>
  `;
}

function renderSummaryStep() {
  const matchCount = Object.values(state.matchTips).filter(tip => tip.scoreA !== "" && tip.scoreB !== "").length;
  const groupStageCount = Object.values(state.groupStageAnswers).filter(Boolean).length;
  const playerCount = Object.values(state.playerAnswers).filter(Boolean).length;
  const notAdvancingCount = state.notAdvancingTeams.length;
  const duelCount = Object.values(state.duelAnswers).filter(Boolean).length;
  const miscCount = Object.values(state.miscAnswers).filter(Boolean).length;

  stepContent.innerHTML = `
    <section class="section">
      <h2>Kontroll før innsending</h2>

      <div class="summary-box">
        <p><strong>Navn:</strong> ${escapeHtml(state.name || "Ikke fylt ut")}</p>
        <p><strong>Heier på:</strong> ${escapeHtml(state.favoriteTeam || "Ikke valgt")}</p>
        <p><strong>Kamper tippet:</strong> ${matchCount} av ${matches.length}</p>
        <p><strong>Gruppespill:</strong> ${groupStageCount} av ${groupStageQuestions.length} spørsmål besvart</p>
        <p><strong>Spillere:</strong> ${playerCount} av ${playerQuestions.length} spørsmål besvart</p>
        <p><strong>Ikke videre:</strong> ${notAdvancingCount} av 16 lag valgt</p>
        <p><strong>Dueller:</strong> ${duelCount} av ${duelQuestions.length} spørsmål besvart</p>
        <p><strong>Diverse:</strong> ${miscCount} av ${miscQuestions.length} spørsmål besvart</p>
      </div>

      <p class="help">Når du sender inn, lastes en PDF-kvittering ned automatisk. Ta vare på den. Innsendingen kan ta litt tid.</p>
    </section>
  `;
}

function saveCurrentStep() {
  if (currentStep === 0) {
    const nameInput = document.getElementById("name");
    const favoriteTeamSelect = document.getElementById("favoriteTeam");

    state.name = nameInput.value.trim();
    state.favoriteTeam = favoriteTeamSelect.value;
  }

  if (currentStep === 1 || currentStep === 3) {
    const scoreInputs = stepContent.querySelectorAll(".score");

    scoreInputs.forEach(input => {
      const matchId = input.dataset.matchId;
      const side = input.dataset.side;

      if (!state.matchTips[matchId]) {
        const match = matches.find(m => getMatchId(m) === matchId);
        state.matchTips[matchId] = {
          date: match.date,
          teamA: match.teamA,
          teamB: match.teamB,
          scoreA: "",
          scoreB: ""
        };
      }

      if (side === "A") state.matchTips[matchId].scoreA = input.value;
      if (side === "B") state.matchTips[matchId].scoreB = input.value;
    });
  }

    if (currentStep === 4) saveQuestionAnswers("groupStage", "groupStageAnswers");
  if (currentStep === 5) saveQuestionAnswers("players", "playerAnswers");

  if (currentStep === 6) {
    const checked = stepContent.querySelectorAll("[data-not-advancing]:checked");
    state.notAdvancingTeams = Array.from(checked).map(input => input.value);
  }

  if (currentStep === 7) saveQuestionAnswers("duels", "duelAnswers");
  if (currentStep === 8) saveQuestionAnswers("misc", "miscAnswers");
  }

function saveQuestionAnswers(sectionName, stateKey) {
  const inputs = stepContent.querySelectorAll(`[data-question-section='${sectionName}']`);

  inputs.forEach(input => {
    const questionId = input.dataset.questionId;

    if (input.dataset.multiIndex !== undefined) {
      if (!Array.isArray(state[stateKey][questionId])) {
        state[stateKey][questionId] = [];
      }

      state[stateKey][questionId][Number(input.dataset.multiIndex)] = input.value;
    } else {
      state[stateKey][questionId] = input.value;
    }
  });
}

function validateCurrentStep() {
  if (currentStep === 0) {
    const nameInput = document.getElementById("name");
    const favoriteTeamSelect = document.getElementById("favoriteTeam");

    if (!nameInput.value.trim()) {
      alert("Skriv inn navn før du går videre.");
      return false;
    }

    if (!favoriteTeamSelect.value) {
      alert("Velg laget du heier på før du går videre.");
      return false;
    }
  }

  if (currentStep >= 1 && currentStep <= 3) {
    const scoreInputs = stepContent.querySelectorAll(".score");

    for (const input of scoreInputs) {
      if (input.value === "") {
        alert("Fyll inn alle kampresultatene før du går videre.");
        return false;
      }
    }
  }

  if (currentStep === 4) {
    if (!validateQuestionStep("groupStage", "Svar på alle spørsmålene om gruppespillet før du går videre.")) return false;
  }

  if (currentStep === 5) {
    if (!validateQuestionStep("players", "Svar på alle spillerspørsmålene før du går videre.")) return false;
  }

  if (currentStep === 6) {
    const checked = stepContent.querySelectorAll("[data-not-advancing]:checked");

    if (checked.length !== 16) {
      alert("Du må velge nøyaktig 16 lag som ikke går videre.");
      return false;
    }
  }

  if (currentStep === 7) {
    if (!validateQuestionStep("duels", "Svar på alle duellene før du går videre.")) return false;
  }

  if (currentStep === 8) {
    if (!validateQuestionStep("misc", "Svar på alle spørsmålene i Diverse før du går videre.")) return false;
  }

  return true;
}

function validateQuestionStep(sectionName, message) {
  const inputs = stepContent.querySelectorAll(`[data-question-section='${sectionName}']`);

  for (const input of inputs) {
    if (input.value === "") {
      alert(message);
      return false;
    }
  }

  return true;
}

function buildSubmission() {
  return {
    name: state.name,
    favoriteTeam: state.favoriteTeam,
    submittedAt: new Date().toISOString(),
    matchTips: Object.values(state.matchTips),
    groupStageAnswers: state.groupStageAnswers,
    playerAnswers: state.playerAnswers,
    notAdvancingTeams: state.notAdvancingTeams,
    duelAnswers: state.duelAnswers,
    miscAnswers: state.miscAnswers
  };
}

function generatePdf(submission) {
  if (!window.jspdf) {
    alert("PDF-biblioteket er ikke lastet. Sjekk at jsPDF-scriptet ligger i index.html.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 15;
  const left = 15;
  const lineHeight = 7;
  const pageHeight = 285;
  const maxWidth = 180;

  function addLine(text, bold = false) {
    if (y > pageHeight) {
      doc.addPage();
      y = 15;
    }

    doc.setFont("helvetica", bold ? "bold" : "normal");

    const lines = doc.splitTextToSize(String(text), maxWidth);
    lines.forEach(line => {
      if (y > pageHeight) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, left, y);
      y += lineHeight;
    });
  }

  function addHeading(text) {
    y += 4;
    addLine(text, true);
  }

  function getAnswer(questionList, answers, questionId) {
    const question = questionList.find(q => q.id === questionId);
    const label = question ? question.label : questionId;
    const value = answers[questionId];

    if (Array.isArray(value)) {
      return `${label}: ${value.join(", ")}`;
    }

    return `${label}: ${value || ""}`;
  }

  doc.setFontSize(18);
  addLine("VM-tipping 2026", true);

  doc.setFontSize(11);
  addLine(`Navn: ${submission.name}`);
  addLine(`Heier på: ${submission.favoriteTeam}`);
  addLine(`Innsendt: ${new Date(submission.submittedAt).toLocaleString("no-NO")}`);

  addHeading("Kampresultater");
  submission.matchTips.forEach(tip => {
    addLine(`${tip.date}: ${tip.teamA} – ${tip.teamB}: ${tip.scoreA}–${tip.scoreB}`);
  });

  addHeading("Gruppespillet");
  groupStageQuestions.forEach(q => {
    addLine(getAnswer(groupStageQuestions, submission.groupStageAnswers, q.id));
  });

  addHeading("Spillere");
  playerQuestions.forEach(q => {
    addLine(getAnswer(playerQuestions, submission.playerAnswers, q.id));
  });

  addHeading("Disse går ikke videre");
  addLine(submission.notAdvancingTeams.join(", "));

  addHeading("Dueller");
  duelQuestions.forEach(q => {
    addLine(getAnswer(duelQuestions, submission.duelAnswers, q.id));
  });

  addHeading("Diverse");
  miscQuestions.forEach(q => {
    addLine(getAnswer(miscQuestions, submission.miscAnswers, q.id));
  });

  const safeName = submission.name
    .toLowerCase()
    .replaceAll("æ", "ae")
    .replaceAll("ø", "o")
    .replaceAll("å", "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  doc.save(`vm-tips-2026-${safeName || "deltaker"}.pdf`);
}

function getMatchId(match) {
  return `${match.date}_${match.teamA}_${match.teamB}`.replaceAll(" ", "_");
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

nextBtn.addEventListener("click", () => {
  if (!validateCurrentStep()) return;

  saveCurrentStep();
  currentStep++;
  renderStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backBtn.addEventListener("click", () => {
  saveCurrentStep();
  currentStep--;
  renderStep();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  saveCurrentStep();

  const submission = buildSubmission();

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sender inn ...";

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submission)
    });

    generatePdf(submission);

    alert("Tipset er sendt inn, og PDF-kvitteringen er lastet ned.");

  } catch (error) {
    console.error(error);
    alert("Noe gikk galt ved innsending. PDF-kvitteringen lastes ned, men sjekk med juryen.");

    generatePdf(submission);

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send inn tips";
  }
});

renderStep();