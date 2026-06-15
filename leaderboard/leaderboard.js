
const MAX_POINTS = 40;
const LANES = [
  "Glenn",
  "Atle",
  "ThomasWB",
  "Øyvind Ludt",
  "Hilde",
  "Martin",
  "Kenneth",
  "Eskil",
  "Daniel",
  "Berger",
  "Finn",
  "David",
  "Bente",
  "Klaus",
  "Trine",
  "TT",
  "Ruud",
  "i"
];
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const CLUSTER_OFFSETS = [
  { x: 0, y: 0 },
  { x: 0, y: -70 },
  { x: 0, y: 70 },
  { x: 0, y: -140 },
  { x: 0, y: 140 },
  { x: 0, y: -210 },
  { x: 0, y: 210 },
  { x: 0, y: -280 },
  { x: 0, y: 280 },
  { x: 0, y: -350 },
  { x: 0, y: 350 },
  { x: 0, y: -420 },
  { x: 0, y: 420 }
];

function sortPlayers(players) {
  return [...players].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return String(a.name).localeCompare(String(b.name), "no");
  });
}

function groupByPoints(players) {
  const groups = new Map();
  players.forEach((player) => {
    const points = Number(player.points) || 0;
    if (!groups.has(points)) groups.set(points, []);
    groups.get(points).push(player);
  });
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

function renderPitch(players) {
  const holder = document.getElementById("players");
  holder.innerHTML = "";

  const groups = groupByPoints(sortPlayers(players));
  let z = 500;

  groups.forEach(([points, group], groupIndex) => {
    const progress = clamp(points / MAX_POINTS, 0, 1);
    const baseX = 5 + progress * 90;

    // Litt større avstand mellom poenggruppene.
    
    group.forEach((player, playerIndex) => {
  const lane = LANES.indexOf(player.name);
  const baseY = 5 + lane * (90 / (LANES.length - 1));

  const offset = CLUSTER_OFFSETS[playerIndex % CLUSTER_OFFSETS.length];

  const el = document.createElement("article");
      
      el.className = "player";
      el.style.left = `calc(${baseX}% + ${offset.x}px)`;
      el.style.top = `calc(${baseY}% + ${offset.y}px)`;
      el.style.zIndex = String(z--);
      el.title = `${player.fullName || player.name}: ${player.points} poeng`;

      el.innerHTML = `
        <div class="player-name">${player.name}</div>
        <img src="${player.avatar}" alt="${player.name}">
        <div class="player-points">${player.points} p</div>
      `;

      holder.appendChild(el);
    });
  });
}

function renderTable(players) {
  const tbody = document.getElementById("scoreTable");
  tbody.innerHTML = "";

  sortPlayers(players).forEach((player, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${player.place || index + 1}</td>
      <td>${player.name}</td>
      <td>${player.points}</td>
    `;
    tbody.appendChild(tr);
  });
}

function render() {
  const data = Array.isArray(window.LEADERBOARD_DATA) ? window.LEADERBOARD_DATA : [];
  renderPitch(data);
  renderTable(data);
}

document.getElementById("refreshBtn").addEventListener("click", () => location.reload());
render();
