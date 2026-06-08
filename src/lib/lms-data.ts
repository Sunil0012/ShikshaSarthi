export type Subject = {
  slug: string;
  name: string;
  icon: string; // lucide name
  tone: "brand" | "ember" | "azure" | "violet" | "rose" | "amber";
};

export const SUBJECTS: Subject[] = [
  { slug: "mathematics", name: "Mathematics", icon: "Sigma", tone: "brand" },
  { slug: "science", name: "Science", icon: "Atom", tone: "azure" },
  { slug: "english", name: "English", icon: "BookOpen", tone: "violet" },
  { slug: "social-studies", name: "Social Studies", icon: "Globe2", tone: "ember" },
  { slug: "hindi", name: "Hindi", icon: "Languages", tone: "rose" },
  { slug: "computer-science", name: "Computer Science", icon: "Cpu", tone: "brand" },
  { slug: "physics", name: "Physics", icon: "Magnet", tone: "azure" },
  { slug: "chemistry", name: "Chemistry", icon: "FlaskConical", tone: "ember" },
  { slug: "biology", name: "Biology", icon: "Leaf", tone: "brand" },
  { slug: "accountancy", name: "Accountancy", icon: "Calculator", tone: "amber" },
  { slug: "economics", name: "Economics", icon: "TrendingUp", tone: "violet" },
  { slug: "business-studies", name: "Business Studies", icon: "Briefcase", tone: "rose" },
];

export const GRADES = [6, 7, 8, 9, 10, 11, 12] as const;
export type Grade = (typeof GRADES)[number];

export type Course = {
  slug: string;
  title: string;
  subject: string;
  grade: Grade;
  level: "Foundation" | "Core" | "Advanced" | "Board Prep";
  modules: number;
  hours: number;
  lessons: number;
  rating: number;
  enrolled: string;
  description: string;
  tone: "from-emerald-50 to-white" | "from-blue-50 to-white" | "from-orange-50 to-white" | "from-violet-50 to-white" | "from-rose-50 to-white" | "from-amber-50 to-white";
  topics: string[];
};

const tones = [
  "from-emerald-50 to-white",
  "from-blue-50 to-white",
  "from-orange-50 to-white",
  "from-violet-50 to-white",
  "from-rose-50 to-white",
  "from-amber-50 to-white",
] as const;

function mkCourse(
  slug: string,
  title: string,
  subject: string,
  grade: Grade,
  level: Course["level"],
  description: string,
  topics: string[],
  i: number,
): Course {
  return {
    slug,
    title,
    subject,
    grade,
    level,
    description,
    topics,
    modules: 8 + ((i * 3) % 12),
    hours: 18 + ((i * 5) % 40),
    lessons: 40 + ((i * 7) % 60),
    rating: 4.5 + ((i % 5) / 10),
    enrolled: `${(2 + (i % 9)).toFixed(1)}k`,
    tone: tones[i % tones.length],
  };
}

export const COURSES: Course[] = [
  // Class 6
  mkCourse("math-6", "Mathematics — Class 6", "mathematics", 6, "Foundation",
    "Build a rock-solid number sense with playful drills, geometry puzzles, and real-world problem solving aligned to the NCERT syllabus.",
    ["Knowing Our Numbers", "Whole Numbers", "Integers", "Fractions & Decimals", "Geometry Basics", "Mensuration", "Ratio & Proportion", "Symmetry"], 0),
  mkCourse("science-6", "Science — Class 6", "science", 6, "Foundation",
    "Hands-on science with virtual labs covering food, materials, motion, light, and the natural world around us.",
    ["Food & Components", "Sorting Materials", "Body Movements", "Living Organisms", "Motion & Measurement", "Light & Shadows", "Electricity", "Water Cycle"], 1),
  mkCourse("english-6", "English — Class 6", "english", 6, "Foundation",
    "Honeysuckle and A Pact with the Sun, brought alive through audio, grammar drills, and creative writing prompts.",
    ["Comprehension", "Grammar Foundations", "Vocabulary", "Creative Writing", "Poetry", "Letter Writing"], 2),
  mkCourse("sst-6", "Social Studies — Class 6", "social-studies", 6, "Foundation",
    "History, Geography & Civics in one journey — from the earliest people to how our planet and democracy work.",
    ["Earliest People", "First Cities", "Maps & Earth", "Our Government", "Rural Livelihoods"], 3),

  // Class 7
  mkCourse("math-7", "Mathematics — Class 7", "mathematics", 7, "Core",
    "Algebra steps in. Master integers, rational numbers, equations, and triangles with adaptive practice that grows with you.",
    ["Integers", "Fractions & Decimals", "Data Handling", "Simple Equations", "Lines & Angles", "Triangles", "Algebraic Expressions", "Exponents"], 4),
  mkCourse("science-7", "Science — Class 7", "science", 7, "Core",
    "Explore acids and bases, heat, wind, soil and reproduction with experiments you can run at home.",
    ["Nutrition in Plants", "Heat", "Acids & Bases", "Weather & Climate", "Soil", "Respiration", "Reproduction in Plants"], 5),
  mkCourse("english-7", "English — Class 7", "english", 7, "Core",
    "Honeycomb and An Alien Hand with deep reading, grammar mastery, and writing studios.",
    ["Reading Strategies", "Tenses Mastery", "Articles & Prepositions", "Composition", "Speech & Debate"], 6),

  // Class 8
  mkCourse("math-8", "Mathematics — Class 8", "mathematics", 8, "Core",
    "Rational numbers, linear equations, quadrilaterals, and the start of mensuration — the bridge to high school maths.",
    ["Rational Numbers", "Linear Equations", "Quadrilaterals", "Squares & Roots", "Cubes", "Comparing Quantities", "Algebraic Identities", "Mensuration"], 7),
  mkCourse("science-8", "Science — Class 8", "science", 8, "Core",
    "Cells, microorganisms, force, friction, sound, and chemical effects — the foundations of physics, chem, and bio.",
    ["Crop Production", "Microorganisms", "Synthetic Fibres", "Materials: Metals", "Cell Structure", "Force & Pressure", "Friction", "Sound", "Chemical Effects"], 8),
  mkCourse("cs-8", "Computer Science — Class 8", "computer-science", 8, "Core",
    "Code your first apps in Scratch and Python. Learn loops, conditions, and build 5 mini-projects.",
    ["Python Basics", "Variables", "Loops", "Conditions", "Functions", "Mini Project: Quiz App"], 9),

  // Class 9
  mkCourse("math-9", "Mathematics — Class 9", "mathematics", 9, "Advanced",
    "Number systems, polynomials, coordinate geometry, and Euclid — high-school maths begins here with rigor and intuition.",
    ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables", "Triangles", "Circles", "Heron's Formula", "Surface Areas", "Statistics", "Probability"], 10),
  mkCourse("science-9", "Science — Class 9", "science", 9, "Advanced",
    "Matter, atoms, motion, gravitation, and life processes — three subjects in one cohesive course.",
    ["Matter in Surroundings", "Atoms & Molecules", "Structure of Atom", "Cell Unit of Life", "Tissues", "Motion", "Force & Laws", "Gravitation", "Work & Energy", "Sound"], 11),
  mkCourse("english-9", "English — Class 9", "english", 9, "Advanced",
    "Beehive and Moments — literature analysis, advanced grammar, and exam-ready writing skills.",
    ["Literary Analysis", "Advanced Grammar", "Essay Writing", "Diary Entry", "Speech Writing"], 12),
  mkCourse("sst-9", "Social Studies — Class 9", "social-studies", 9, "Advanced",
    "France, Russia, Nazism, climate, democracy, and rural livelihoods — history shaped by ideas.",
    ["French Revolution", "Socialism in Europe", "Nazism", "India: Physical Features", "Drainage", "Climate", "Democracy", "Constitutional Design"], 13),

  // Class 10
  mkCourse("math-10", "Mathematics — Class 10", "mathematics", 10, "Board Prep",
    "Board-exam-ready maths with PYQs, full-length mocks, and chapter-wise analysis to maximize your score.",
    ["Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Circles", "Trigonometry", "Statistics", "Probability", "PYQ Practice", "Mock Tests"], 14),
  mkCourse("science-10", "Science — Class 10", "science", 10, "Board Prep",
    "Complete board prep: chemical reactions, electricity, life processes — with 200+ solved PYQs.",
    ["Chemical Reactions", "Acids Bases Salts", "Metals & Non-metals", "Carbon Compounds", "Life Processes", "Control & Coordination", "Electricity", "Magnetic Effects", "Light Reflection", "Human Eye"], 15),
  mkCourse("english-10", "English — Class 10", "english", 10, "Board Prep",
    "First Flight and Footprints Without Feet — full board syllabus with marking-scheme aligned answer writing.",
    ["Literature Mastery", "Grammar Tests", "Letter Writing", "Analytical Paragraphs", "Mock Board Papers"], 16),
  mkCourse("sst-10", "Social Studies — Class 10", "social-studies", 10, "Board Prep",
    "Nationalism, globalization, resources, democracy — every chapter mapped to the latest CBSE blueprint.",
    ["Nationalism in India", "Indo-China & Vietnam", "Resources", "Forest & Wildlife", "Power Sharing", "Federalism", "Money & Credit", "Globalization"], 17),

  // Class 11
  mkCourse("physics-11", "Physics — Class 11", "physics", 11, "Advanced",
    "Mechanics, thermodynamics, oscillations, and waves — engineered to build true conceptual depth for JEE & NEET.",
    ["Units & Measurement", "Kinematics", "Laws of Motion", "Work Energy Power", "Rotational Motion", "Gravitation", "Mechanical Properties", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves"], 18),
  mkCourse("chemistry-11", "Chemistry — Class 11", "chemistry", 11, "Advanced",
    "Atomic structure, periodic table, organic basics, and equilibrium — the chemistry that unlocks everything.",
    ["Basic Concepts", "Atomic Structure", "Periodicity", "Chemical Bonding", "Thermodynamics", "Equilibrium", "Redox", "Organic Basics", "Hydrocarbons"], 19),
  mkCourse("math-11", "Mathematics — Class 11", "mathematics", 11, "Advanced",
    "Sets, trigonometry, sequences, conic sections, and an early taste of calculus — JEE foundation laid right.",
    ["Sets & Relations", "Trigonometric Functions", "Complex Numbers", "Linear Inequalities", "Permutations & Combinations", "Sequences", "Straight Lines", "Conic Sections", "Limits & Derivatives", "Statistics"], 20),
  mkCourse("bio-11", "Biology — Class 11", "biology", 11, "Advanced",
    "Diversity, plant & animal structure, cell biology, and human physiology for NEET aspirants.",
    ["Living World", "Plant Kingdom", "Animal Kingdom", "Cell Structure", "Biomolecules", "Photosynthesis", "Respiration", "Human Physiology"], 21),
  mkCourse("accounts-11", "Accountancy — Class 11", "accountancy", 11, "Advanced",
    "Journal, ledger, trial balance, depreciation, and final accounts — the language of business explained.",
    ["Accounting Basics", "Theory Base", "Recording Transactions", "Trial Balance", "Depreciation", "Bills of Exchange", "Financial Statements"], 22),

  // Class 12
  mkCourse("physics-12", "Physics — Class 12", "physics", 12, "Board Prep",
    "Electrostatics to dual nature of matter — complete board + JEE/NEET prep with 500+ derivations and PYQs.",
    ["Electric Charges", "Electric Potential", "Current Electricity", "Magnetism", "EM Induction", "AC", "EM Waves", "Ray Optics", "Wave Optics", "Dual Nature", "Atoms & Nuclei", "Semiconductors"], 23),
  mkCourse("chemistry-12", "Chemistry — Class 12", "chemistry", 12, "Board Prep",
    "Solid state, solutions, electrochemistry, coordination compounds, and biomolecules — boards & entrance ready.",
    ["Solutions", "Electrochemistry", "Chemical Kinetics", "d & f Block", "Coordination Compounds", "Haloalkanes", "Alcohols", "Aldehydes & Ketones", "Amines", "Biomolecules"], 24),
  mkCourse("math-12", "Mathematics — Class 12", "mathematics", 12, "Board Prep",
    "Calculus, vectors, 3D geometry, probability — built for board toppers and JEE Mains aspirants.",
    ["Relations & Functions", "Inverse Trigonometry", "Matrices", "Determinants", "Continuity & Differentiability", "Application of Derivatives", "Integrals", "Differential Equations", "Vectors", "3D Geometry", "Probability"], 25),
  mkCourse("bio-12", "Biology — Class 12", "biology", 12, "Board Prep",
    "Reproduction, genetics, evolution, biotechnology, and ecology — every NEET-relevant topic mapped to NCERT.",
    ["Reproduction in Organisms", "Sexual Reproduction in Plants", "Human Reproduction", "Genetics & Evolution", "Biology & Human Welfare", "Biotechnology", "Ecology"], 26),
  mkCourse("eco-12", "Economics — Class 12", "economics", 12, "Board Prep",
    "Macroeconomics + Indian Economic Development, with case studies and 10-year PYQ archive.",
    ["National Income", "Money & Banking", "Government Budget", "Foreign Exchange", "Development Experience", "Indian Economy 1950-90", "Liberalisation"], 27),
  mkCourse("cs-12", "Computer Science — Class 12", "computer-science", 12, "Board Prep",
    "Python deep-dive, data structures, SQL, and computer networks — board syllabus with real coding projects.",
    ["Python Revision", "Functions", "File Handling", "Data Structures", "Stack", "Queue", "MySQL", "Networking", "Project Work"], 28),
];

export type Lesson = {
  number: string;
  title: string;
  duration: string;
  type: "Video" | "Reading" | "Drill" | "Lab" | "Quiz";
  done?: boolean;
};

export function lessonsFor(course: Course): { module: string; lessons: Lesson[] }[] {
  return course.topics.slice(0, 5).map((t, mi) => ({
    module: `Module ${mi + 1}: ${t}`,
    lessons: Array.from({ length: 4 }).map((_, li) => ({
      number: `${mi + 1}.${li + 1}`,
      title: [
        `${t} — Core concept`,
        `Worked examples on ${t.toLowerCase()}`,
        `Practice drill: ${t.toLowerCase()}`,
        `${t} — Quick quiz`,
      ][li],
      duration: ["12 min", "18 min", "10 min", "6 min"][li],
      type: (["Video", "Reading", "Drill", "Quiz"] as const)[li],
      done: mi === 0 && li < 2,
    })),
  }));
}

export const LEADERBOARD: Array<{
  n: string;
  name: string;
  grade: number;
  spec: string;
  xp: number;
  today: number;
  you?: boolean;
}> = [
  { n: "01", name: "Aanya Sharma", grade: 12, spec: "Science Stream · PCM", xp: 18420, today: 520 },
  { n: "02", name: "Vihaan Mehta", grade: 11, spec: "Science · PCB", xp: 17890, today: 410 },
  { n: "03", name: "You", grade: 10, spec: "Class 10 — Board Prep", xp: 16240, today: 380, you: true },
  { n: "04", name: "Diya Reddy", grade: 12, spec: "Commerce Stream", xp: 15760, today: 220 },
  { n: "05", name: "Arjun Iyer", grade: 9, spec: "Class 9 — All Subjects", xp: 14980, today: 340 },
  { n: "06", name: "Saanvi Gupta", grade: 10, spec: "Board Prep + Olympiad", xp: 14210, today: 295 },
  { n: "07", name: "Kabir Singh", grade: 8, spec: "Class 8 — Math Track", xp: 13880, today: 150 },
  { n: "08", name: "Myra Pillai", grade: 11, spec: "Science · PCM", xp: 13420, today: 480 },
  { n: "09", name: "Reyansh Joshi", grade: 7, spec: "Class 7 — All Subjects", xp: 12790, today: 90 },
  { n: "10", name: "Anika Kapoor", grade: 12, spec: "Science · PCB", xp: 12540, today: 360 },
  { n: "11", name: "Ayaan Verma", grade: 6, spec: "Class 6 — Foundations", xp: 11900, today: 220 },
  { n: "12", name: "Ira Nair", grade: 9, spec: "Class 9 — Olympiad", xp: 11420, today: 175 },
];

export const GAMES = [
  { slug: "number-ninja", title: "Number Ninja", subject: "Mathematics", desc: "Slice equations before the timer ends. Trains mental math speed.", players: "12.4k", grade: "6-8", tone: "brand" as const, icon: "Sword" },
  { slug: "atom-architect", title: "Atom Architect", subject: "Chemistry", desc: "Build molecules atom-by-atom under chemistry rules.", players: "8.1k", grade: "9-12", tone: "ember" as const, icon: "Atom" },
  { slug: "grammar-galaxy", title: "Grammar Galaxy", subject: "English", desc: "Pilot a spaceship by spotting grammar errors in mission logs.", players: "6.8k", grade: "6-10", tone: "violet" as const, icon: "Rocket" },
  { slug: "physics-playground", title: "Physics Playground", subject: "Physics", desc: "Solve real-world puzzles using motion, force, and energy.", players: "5.3k", grade: "9-12", tone: "azure" as const, icon: "Magnet" },
  { slug: "history-detective", title: "History Detective", subject: "Social Studies", desc: "Travel back in time and crack history's biggest mysteries.", players: "4.7k", grade: "6-10", tone: "rose" as const, icon: "Compass" },
  { slug: "code-quest", title: "Code Quest", subject: "Computer Science", desc: "Defeat bosses by writing Python loops and conditions.", players: "9.2k", grade: "8-12", tone: "brand" as const, icon: "Code2" },
  { slug: "bio-builder", title: "Bio Builder", subject: "Biology", desc: "Construct cells, organs, and ecosystems brick-by-brick.", players: "3.9k", grade: "9-12", tone: "amber" as const, icon: "Leaf" },
  { slug: "fraction-frenzy", title: "Fraction Frenzy", subject: "Mathematics", desc: "Match fractions, decimals, and percentages at lightning speed.", players: "7.1k", grade: "6-8", tone: "violet" as const, icon: "PieChart" },
];

export function getCourse(slug: string) {
  return COURSES.find((c) => c.slug === slug);
}
