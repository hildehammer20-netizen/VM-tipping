const teams = [
  "Mexico", "Sør-Afrika", "Sør-Korea", "Tsjekkia", "Canada", "Bosnia-Hercegovina",
  "USA", "Paraguay", "Qatar", "Sveits", "Brasil", "Marokko", "Haiti", "Skottland",
  "Australia", "Tyrkia", "Tyskland", "Curaçao", "Nederland", "Japan",
  "Elfenbenskysten", "Ecuador", "Sverige", "Tunisia", "Spania", "Kapp Verde",
  "Belgia", "Egypt", "Saudi-Arabia", "Uruguay", "Iran", "New Zealand",
  "Frankrike", "Senegal", "Irak", "Norge", "Argentina", "Algerie", "Østerrike",
  "Jordan", "Portugal", "DR Kongo", "England", "Kroatia", "Ghana", "Panama",
  "Usbekistan", "Colombia"
];

const groups = [
  { name: "Gruppe A", teams: ["Mexico", "Sør-Afrika", "Sør-Korea", "Tsjekkia"] },
  { name: "Gruppe B", teams: ["Canada", "Bosnia-Hercegovina", "Qatar", "Sveits"] },
  { name: "Gruppe C", teams: ["Brasil", "Marokko", "Haiti", "Skottland"] },
  { name: "Gruppe D", teams: ["USA", "Paraguay", "Australia", "Tyrkia"] },
  { name: "Gruppe E", teams: ["Tyskland", "Curaçao", "Elfenbenskysten", "Ecuador"] },
  { name: "Gruppe F", teams: ["Nederland", "Japan", "Sverige", "Tunisia"] },
  { name: "Gruppe G", teams: ["Belgia", "Egypt", "Iran", "New Zealand"] },
  { name: "Gruppe H", teams: ["Spania", "Kapp Verde", "Saudi-Arabia", "Uruguay"] },
  { name: "Gruppe I", teams: ["Frankrike", "Senegal", "Irak", "Norge"] },
  { name: "Gruppe J", teams: ["Argentina", "Algerie", "Østerrike", "Jordan"] },
  { name: "Gruppe K", teams: ["Portugal", "DR Kongo", "Usbekistan", "Colombia"] },
  { name: "Gruppe L", teams: ["England", "Kroatia", "Ghana", "Panama"] }
];

const matches = [
  { date: "11. juni", teamA: "Mexico", teamB: "Sør-Afrika" },

  { date: "12. juni", teamA: "Sør-Korea", teamB: "Tsjekkia" },
  { date: "12. juni", teamA: "Canada", teamB: "Bosnia-Hercegovina" },

  { date: "13. juni", teamA: "USA", teamB: "Paraguay" },
  { date: "13. juni", teamA: "Qatar", teamB: "Sveits" },

  { date: "14. juni", teamA: "Brasil", teamB: "Marokko" },
  { date: "14. juni", teamA: "Haiti", teamB: "Skottland" },
  { date: "14. juni", teamA: "Australia", teamB: "Tyrkia" },
  { date: "14. juni", teamA: "Tyskland", teamB: "Curaçao" },
  { date: "14. juni", teamA: "Nederland", teamB: "Japan" },

  { date: "15. juni", teamA: "Elfenbenskysten", teamB: "Ecuador" },
  { date: "15. juni", teamA: "Sverige", teamB: "Tunisia" },
  { date: "15. juni", teamA: "Spania", teamB: "Kapp Verde" },
  { date: "15. juni", teamA: "Belgia", teamB: "Egypt" },

  { date: "16. juni", teamA: "Saudi-Arabia", teamB: "Uruguay" },
  { date: "16. juni", teamA: "Iran", teamB: "New Zealand" },
  { date: "16. juni", teamA: "Frankrike", teamB: "Senegal" },

  { date: "17. juni", teamA: "Irak", teamB: "Norge" },
  { date: "17. juni", teamA: "Argentina", teamB: "Algerie" },
  { date: "17. juni", teamA: "Østerrike", teamB: "Jordan" },
  { date: "17. juni", teamA: "Portugal", teamB: "DR Kongo" },
  { date: "17. juni", teamA: "England", teamB: "Kroatia" },

  { date: "18. juni", teamA: "Ghana", teamB: "Panama" },
  { date: "18. juni", teamA: "Usbekistan", teamB: "Colombia" },
  { date: "18. juni", teamA: "Tsjekkia", teamB: "Sør-Afrika" },
  { date: "18. juni", teamA: "Sveits", teamB: "Bosnia-Hercegovina" },

  { date: "19. juni", teamA: "Canada", teamB: "Qatar" },
  { date: "19. juni", teamA: "Mexico", teamB: "Sør-Korea" },
  { date: "19. juni", teamA: "USA", teamB: "Australia" },

  { date: "20. juni", teamA: "Skottland", teamB: "Marokko" },
  { date: "20. juni", teamA: "Brasil", teamB: "Haiti" },
  { date: "20. juni", teamA: "Tyrkia", teamB: "Paraguay" },
  { date: "20. juni", teamA: "Nederland", teamB: "Sverige" },
  { date: "20. juni", teamA: "Tyskland", teamB: "Elfenbenskysten" },

  { date: "21. juni", teamA: "Ecuador", teamB: "Curaçao" },
  { date: "21. juni", teamA: "Tunisia", teamB: "Japan" },
  { date: "21. juni", teamA: "Spania", teamB: "Saudi-Arabia" },
  { date: "21. juni", teamA: "Belgia", teamB: "Iran" },

  { date: "22. juni", teamA: "Uruguay", teamB: "Kapp Verde" },
  { date: "22. juni", teamA: "New Zealand", teamB: "Egypt" },
  { date: "22. juni", teamA: "Argentina", teamB: "Østerrike" },
  { date: "22. juni", teamA: "Frankrike", teamB: "Irak" },

  { date: "23. juni", teamA: "Norge", teamB: "Senegal" },
  { date: "23. juni", teamA: "Jordan", teamB: "Algerie" },
  { date: "23. juni", teamA: "Portugal", teamB: "Usbekistan" },
  { date: "23. juni", teamA: "England", teamB: "Ghana" },

  { date: "24. juni", teamA: "Panama", teamB: "Kroatia" },
  { date: "24. juni", teamA: "Colombia", teamB: "DR Kongo" },
  { date: "24. juni", teamA: "Sveits", teamB: "Canada" },
  { date: "24. juni", teamA: "Bosnia-Hercegovina", teamB: "Qatar" },

  { date: "25. juni", teamA: "Skottland", teamB: "Brasil" },
  { date: "25. juni", teamA: "Marokko", teamB: "Haiti" },
  { date: "25. juni", teamA: "Mexico", teamB: "Tsjekkia" },
  { date: "25. juni", teamA: "Sør-Afrika", teamB: "Sør-Korea" },
  { date: "25. juni", teamA: "Curaçao", teamB: "Elfenbenskysten" },
  { date: "25. juni", teamA: "Ecuador", teamB: "Tyskland" },

  { date: "26. juni", teamA: "Tunisia", teamB: "Nederland" },
  { date: "26. juni", teamA: "Japan", teamB: "Sverige" },
  { date: "26. juni", teamA: "Tyrkia", teamB: "USA" },
  { date: "26. juni", teamA: "Paraguay", teamB: "Australia" },
  { date: "26. juni", teamA: "Norge", teamB: "Frankrike" },
  { date: "26. juni", teamA: "Senegal", teamB: "Irak" },

  { date: "27. juni", teamA: "Kapp Verde", teamB: "Saudi-Arabia" },
  { date: "27. juni", teamA: "Uruguay", teamB: "Spania" },
  { date: "27. juni", teamA: "Egypt", teamB: "Iran" },
  { date: "27. juni", teamA: "New Zealand", teamB: "Belgia" },
  { date: "27. juni", teamA: "Panama", teamB: "England" },
  { date: "27. juni", teamA: "Kroatia", teamB: "Ghana" },

  { date: "28. juni", teamA: "Colombia", teamB: "Portugal" },
  { date: "28. juni", teamA: "DR Kongo", teamB: "Usbekistan" },
  { date: "28. juni", teamA: "Algerie", teamB: "Østerrike" },
  { date: "28. juni", teamA: "Jordan", teamB: "Argentina" }
];

const groupStageQuestions = [
  {
    id: "fifth_goal_team",
    label: "Hvilket lag scorer VMs femte mål?",
    type: "team"
  },
  {
    id: "most_goals_group",
    label: "Hvilket lag scorer flest mål i gruppespillet?",
    type: "team"
  },
  {
    id: "most_goals_conceded_group",
    label: "Hvilket lag slipper inn flest mål i gruppespillet?",
    type: "team"
  },
  {
    id: "norway_goals_scored",
    label: "Hvor mange mål scorer Norge i gruppespillet?",
    type: "number"
  },
  {
    id: "norway_goals_conceded",
    label: "Hvor mange mål slipper Norge inn i gruppespillet?",
    type: "number"
  },
  {
    id: "norway_penalty",
    label: "Får Norge straffe i løpet av gruppespillet?",
    type: "yesno"
  },
  {
    id: "norway_set_piece_goal",
    label: "Scorer Norge på dødball i gruppespillet?",
    type: "yesno"
  },
  {
    id: "norway_var_disallowed",
    label: "Får Norge et mål annullert etter VAR i gruppespillet?",
    type: "yesno"
  },
  {
    id: "norway_yellow_cards",
    label: "Hvor mange gule kort får Norge i gruppespillet?",
    type: "number"
  },
  {
    id: "worst_team",
    label: "Hvem blir VMs dårligste lag? Poeng/målforskjell avgjør.",
    type: "team"
  }
  ];

const playerQuestions = [
  {
    id: "isak_more_than_one_goal",
    label: "Scorer svenske Alexander Isak mer enn ett mål i VM?",
    type: "yesno"
  },
  {
    id: "haaland_or_kane_most_goals",
    label: "Hvem scorer flest: Haaland eller Kane?",
    type: "choice",
    options: ["Haaland", "Kane", "Like mange"]
  },
  {
    id: "nusa_or_schjelderup_minutes",
    label: "Hvem spiller flest minutter i gruppespillet av Nusa og Schjelderup?",
    type: "choice",
    options: ["Nusa", "Schjelderup", "Like mange"]
  },
  {
    id: "falchener_playtime",
    label: "Får Henrik Falchener spilletid i VM?",
    type: "yesno"
  },
  {
    id: "salah_scores",
    label: "Scorer Salah i VM?",
    type: "yesno"
  }
];
const duelQuestions = [
  { id: "south_africa_south_korea", label: "Sør mot Sør: Hvem gjør det best av Sør-Afrika og Sør-Korea i gruppespillet?", type: "choice", options: ["Sør-Afrika", "Sør-Korea", "Like bra"] },
  { id: "norway_sweden", label: "Naboer: Hvem blir best av Norge og Sverige i VM?", type: "choice", options: ["Norge", "Sverige", "Like bra"] },
  { id: "spain_portugal", label: "Hvem blir best av Spania og Portugal?", type: "choice", options: ["Spania", "Portugal", "Like bra"] },
  { id: "iran_iraq", label: "Hvem får flest poeng i gruppespillet av Iran og Irak?", type: "choice", options: ["Iran", "Irak", "Like mange"] },
  { id: "tunisia_algeria", label: "Hvem blir best av Tunisia og Algerie?", type: "choice", options: ["Tunisia", "Algerie", "Like bra"] }
];

const miscQuestions = [
  { id: "first_red_card_team", label: "Hvilket lag får VMs første røde kort?", type: "team" },
  { id: "first_own_goal_team", label: "Hvilket lag scorer VMs første selvmål?", type: "team" },
  { id: "ronaldo_starts_two", label: "Starter C. Ronaldo minimum to av tre kamper i gruppespillet?", type: "yesno" },
  { id: "neymar_starts_two", label: "Starter Neymar minimum to av tre kamper i gruppespillet?", type: "yesno" },
  { id: "van_dijk_scores", label: "Scorer Nederlands Virgil van Dijk i VM? Eventuell straffekonk teller ikke.", type: "yesno" },
  { id: "usa_exit", label: "Når i VM sier det stopp for hjemmenasjonen USA?", type: "choice", options: ["Gruppespillet", "16-delsfinale", "8-delsfinale", "Kvartfinale", "Semifinale", "Finale", "Vinner VM"] },
  { id: "norway_beats_brazil", label: "Kommer Norge til å slå Brasil i løpet av VM?", type: "yesno" },
  {
  id: "eskaas_progress",
  label: "Hvor langt kommer VM-dommer Espen Eskås?",
  type: "choice",
  options: [
    "Gruppespillet",
    "16-delsfinale",
    "8-delsfinale",
    "Kvartfinale",
    "Semifinale",
    "Finale/bronsefinale"
  ]
},
  { id: "four_penalty_shootouts", label: "Vil minst fire av åttendelsfinalene avgjøres med straffekonk?", type: "yesno" },
  { id: "over_ten_red_cards", label: "Deles det ut over 10 røde kort i VM?", type: "yesno" },
  { id: "semifinalists", label: "Tipp de fire semifinalistene", type: "multiTeam", count: 4 },
  { id: "winner", label: "Hvem vinner VM?", type: "team" },
  { id: "runner_up", label: "Hvem blir nummer to?", type: "team" },
  { id: "bronze_winner", label: "Hvem vinner bronsefinalen?", type: "team" },
  { id: "final_added_minutes", label: "Hvor mange minutter legges det til i 2. omgang av VM-finalen?", type: "number" },
  { id: "last_goal_scorer", label: "Hvem scorer VMs siste mål? Straffekonk teller ikke.", type: "text" },
  { id: "top_scorer", label: "Hvem blir toppscorer i VM?", type: "text" },
  { id: "total_goals", label: "Hvor mange mål scores det totalt i VM?", type: "number" }
];
