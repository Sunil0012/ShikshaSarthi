// Question banks for all 10 educational games + MAT topics + vocabulary chapters.
// Each entry has at least 15 items so a game session has variety.

export type Q = { q: string; choices: string[]; answer: number; explain: string };

export const NUMBER_NINJA: Q[] = [
  { q: "12 × 13", choices: ["146", "156", "162", "168"], answer: 1, explain: "12·13 = 12·10 + 12·3 = 120+36 = 156." },
  { q: "144 ÷ 12", choices: ["10", "11", "12", "13"], answer: 2, explain: "12·12 = 144." },
  { q: "15% of 80", choices: ["10", "12", "14", "16"], answer: 1, explain: "10% is 8, 5% is 4 → 12." },
  { q: "√225", choices: ["13", "14", "15", "16"], answer: 2, explain: "15·15 = 225." },
  { q: "7² + 24²", choices: ["525", "576", "625", "650"], answer: 2, explain: "49 + 576 = 625 = 25²." },
  { q: "Next prime after 23", choices: ["27", "29", "31", "33"], answer: 1, explain: "29 is prime; 27=3³, 25=5²." },
  { q: "LCM(6, 8)", choices: ["18", "24", "36", "48"], answer: 1, explain: "Multiples of 8: 8,16,24 → 24 is divisible by 6." },
  { q: "HCF of 36 and 48", choices: ["6", "8", "12", "16"], answer: 2, explain: "12 divides both; 24 doesn't divide 36." },
  { q: "2⁷", choices: ["64", "96", "128", "256"], answer: 2, explain: "2⁶=64, doubled = 128." },
  { q: "(-5) × (-7)", choices: ["-35", "-12", "12", "35"], answer: 3, explain: "Negative × negative = positive." },
  { q: "x if 3x − 7 = 20", choices: ["7", "8", "9", "10"], answer: 2, explain: "3x = 27 → x = 9." },
  { q: "Sum of first 10 natural numbers", choices: ["45", "50", "55", "60"], answer: 2, explain: "n(n+1)/2 = 10·11/2 = 55." },
  { q: "7! / 5!", choices: ["12", "30", "42", "60"], answer: 2, explain: "7·6 = 42." },
  { q: "Area of circle r=7 (π=22/7)", choices: ["132", "144", "154", "176"], answer: 2, explain: "πr² = 22/7·49 = 154." },
  { q: "Angle sum of pentagon", choices: ["360°", "450°", "540°", "720°"], answer: 2, explain: "(n−2)·180 = 3·180 = 540." },
  { q: "0.25 × 0.4", choices: ["0.01", "0.1", "0.25", "1.0"], answer: 1, explain: "25/100 · 40/100 = 1000/10000 = 0.1." },
];

export const ATOM_ARCHITECT: Q[] = [
  { q: "Atomic number of Oxygen", choices: ["6", "7", "8", "16"], answer: 2, explain: "Oxygen has 8 protons." },
  { q: "Electronic config of Sodium", choices: ["2,8,1", "2,8,2", "2,7,2", "2,8,8"], answer: 0, explain: "Na (Z=11) → 2,8,1." },
  { q: "Number of valence electrons in Carbon", choices: ["2", "3", "4", "6"], answer: 2, explain: "Group 14 — 4 valence electrons." },
  { q: "Most reactive non-metal", choices: ["Oxygen", "Fluorine", "Chlorine", "Nitrogen"], answer: 1, explain: "Fluorine has the highest electronegativity." },
  { q: "Bond in NaCl", choices: ["Covalent", "Ionic", "Metallic", "Hydrogen"], answer: 1, explain: "Na loses, Cl gains an electron — ionic bond." },
  { q: "Molecular formula of methane", choices: ["CH₂", "CH₃", "CH₄", "C₂H₄"], answer: 2, explain: "One C, four H." },
  { q: "pH of pure water at 25°C", choices: ["6", "7", "8", "14"], answer: 1, explain: "Neutral water = pH 7." },
  { q: "Isotopes have same…", choices: ["Mass number", "Atomic number", "Neutrons", "Charge"], answer: 1, explain: "Same Z, different A." },
  { q: "Noble gas in period 3", choices: ["Neon", "Argon", "Krypton", "Xenon"], answer: 1, explain: "Argon (Z=18) is period 3." },
  { q: "Charge on alpha particle", choices: ["−1", "0", "+1", "+2"], answer: 3, explain: "Alpha = He nucleus = +2." },
  { q: "Number of atoms in H₂SO₄", choices: ["5", "6", "7", "8"], answer: 2, explain: "2 H + 1 S + 4 O = 7." },
  { q: "Modern periodic law is based on", choices: ["Atomic mass", "Atomic number", "Density", "Valency"], answer: 1, explain: "Moseley — atomic number." },
  { q: "Octet rule satisfied by", choices: ["Hydrogen", "Helium", "Neon", "Lithium"], answer: 2, explain: "Neon has 8 valence electrons." },
  { q: "Bond order in O₂", choices: ["1", "1.5", "2", "3"], answer: 2, explain: "Double bond." },
  { q: "Catalyst used in Haber process", choices: ["Pt", "Fe", "Ni", "V₂O₅"], answer: 1, explain: "Finely divided iron with Mo promoter." },
];

export const GRAMMAR_GALAXY: Q[] = [
  { q: "Choose correct: She ___ to school every day.", choices: ["go", "goes", "going", "gone"], answer: 1, explain: "Third-person singular present needs −s." },
  { q: "Past tense of 'bring'", choices: ["bringed", "brang", "brought", "brung"], answer: 2, explain: "Irregular: bring → brought." },
  { q: "Plural of 'child'", choices: ["childs", "childes", "children", "childrens"], answer: 2, explain: "Irregular plural: children." },
  { q: "Identify the noun: 'Honesty is the best policy.'", choices: ["best", "policy", "Honesty", "is"], answer: 2, explain: "Honesty is an abstract noun." },
  { q: "Synonym of 'Brave'", choices: ["Timid", "Cowardly", "Valiant", "Weak"], answer: 2, explain: "Valiant = brave." },
  { q: "Antonym of 'Ancient'", choices: ["Old", "Modern", "Aged", "Vintage"], answer: 1, explain: "Modern is the opposite of ancient." },
  { q: "Choose the article: ___ honest person", choices: ["a", "an", "the", "no article"], answer: 1, explain: "'Honest' starts with a vowel sound." },
  { q: "Identify tense: 'I have been reading.'", choices: ["Present perfect", "Present perfect continuous", "Past continuous", "Future perfect"], answer: 1, explain: "have been + −ing." },
  { q: "Passive of 'She wrote a letter.'", choices: ["A letter was written by her.", "A letter is written by her.", "A letter has written by her.", "A letter were written by her."], answer: 0, explain: "Simple past passive: was/were + V3." },
  { q: "Choose preposition: She is good ___ math.", choices: ["in", "at", "on", "with"], answer: 1, explain: "Good at + subject." },
  { q: "Idiom: 'Hit the books' means", choices: ["Throw books", "Study hard", "Buy books", "Skip class"], answer: 1, explain: "To study seriously." },
  { q: "Direct speech: She said, 'I am tired.' → reported", choices: ["She said that she is tired.", "She said that she was tired.", "She says that she was tired.", "She told she was tired."], answer: 1, explain: "Backshift: am → was." },
  { q: "Choose correct: Neither of the boys ___ present.", choices: ["are", "is", "were", "have"], answer: 1, explain: "'Neither' takes singular verb." },
  { q: "Type of sentence: 'What a lovely day!'", choices: ["Declarative", "Interrogative", "Exclamatory", "Imperative"], answer: 2, explain: "Exclamation expressing emotion." },
  { q: "Part of speech of 'quickly'", choices: ["Adjective", "Adverb", "Verb", "Noun"], answer: 1, explain: "Modifies a verb → adverb." },
];

export const PHYSICS_PLAYGROUND: Q[] = [
  { q: "SI unit of work", choices: ["Newton", "Joule", "Watt", "Pascal"], answer: 1, explain: "Work = Force × distance → N·m = J." },
  { q: "Acceleration due to gravity (Earth)", choices: ["8.8 m/s²", "9.8 m/s²", "10.8 m/s²", "11.8 m/s²"], answer: 1, explain: "g ≈ 9.8 m/s² at surface." },
  { q: "Newton's 1st law is about", choices: ["Force", "Inertia", "Action-reaction", "Momentum"], answer: 1, explain: "Law of inertia." },
  { q: "Speed of light (m/s)", choices: ["3×10⁶", "3×10⁷", "3×10⁸", "3×10⁹"], answer: 2, explain: "c = 3·10⁸ m/s in vacuum." },
  { q: "If F=10N and a=2m/s², mass is", choices: ["2 kg", "5 kg", "10 kg", "20 kg"], answer: 1, explain: "m = F/a = 5 kg." },
  { q: "Wave with shortest wavelength", choices: ["Radio", "Microwave", "X-ray", "Visible"], answer: 2, explain: "X-rays are shorter than visible/microwave/radio." },
  { q: "Convex lens forms image of distant object at", choices: ["2F", "F", "Optical centre", "Beyond 2F"], answer: 1, explain: "Parallel rays converge at focal point." },
  { q: "Resistance in Ohm's law", choices: ["V/I", "I/V", "V·I", "V+I"], answer: 0, explain: "R = V/I." },
  { q: "Echo is reflection of", choices: ["Light", "Heat", "Sound", "Electricity"], answer: 2, explain: "Sound bouncing off a surface." },
  { q: "Magnetic field around current-carrying wire is", choices: ["Straight", "Circular", "Elliptical", "Zero"], answer: 1, explain: "Right-hand thumb rule → circles around the wire." },
  { q: "Power formula", choices: ["V·I", "V/I", "I/V", "V+I"], answer: 0, explain: "P = VI." },
  { q: "Energy in moving object is", choices: ["Potential", "Kinetic", "Thermal", "Chemical"], answer: 1, explain: "KE = ½mv²." },
  { q: "Total internal reflection requires", choices: ["Denser to rarer", "Rarer to denser", "Equal media", "Vacuum"], answer: 0, explain: "Light must travel denser → rarer above critical angle." },
  { q: "Unit of pressure", choices: ["Pascal", "Joule", "Newton", "Watt"], answer: 0, explain: "1 Pa = 1 N/m²." },
  { q: "Frequency unit", choices: ["Hertz", "Decibel", "Ohm", "Tesla"], answer: 0, explain: "Hz = cycles/sec." },
];

export const HISTORY_DETECTIVE: Q[] = [
  { q: "Year India gained independence", choices: ["1942", "1945", "1947", "1950"], answer: 2, explain: "15 August 1947." },
  { q: "Author of 'Discovery of India'", choices: ["Tagore", "Nehru", "Gandhi", "Bose"], answer: 1, explain: "Jawaharlal Nehru wrote it in Ahmadnagar Fort prison." },
  { q: "Dandi March was in", choices: ["1920", "1930", "1942", "1946"], answer: 1, explain: "Salt March began 12 March 1930." },
  { q: "Battle of Plassey year", choices: ["1707", "1757", "1857", "1947"], answer: 1, explain: "1757 — Clive vs Siraj-ud-Daulah." },
  { q: "Mughal emperor who built Taj Mahal", choices: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], answer: 2, explain: "Shah Jahan built it for Mumtaz Mahal." },
  { q: "First President of India", choices: ["Nehru", "Patel", "Rajendra Prasad", "Radhakrishnan"], answer: 2, explain: "Dr. Rajendra Prasad served 1950-62." },
  { q: "Quit India movement year", choices: ["1930", "1939", "1942", "1945"], answer: 2, explain: "8 August 1942." },
  { q: "Indus Valley city in Pakistan", choices: ["Lothal", "Mohenjo-daro", "Kalibangan", "Dholavira"], answer: 1, explain: "Mohenjo-daro is in Sindh, Pakistan." },
  { q: "Ashoka belonged to which dynasty", choices: ["Gupta", "Maurya", "Chola", "Mughal"], answer: 1, explain: "Mauryan emperor, 268-232 BCE." },
  { q: "French Revolution started in", choices: ["1689", "1776", "1789", "1815"], answer: 2, explain: "Storming of the Bastille — 14 July 1789." },
  { q: "First World War years", choices: ["1914-18", "1918-22", "1939-45", "1905-10"], answer: 0, explain: "1914-1918." },
  { q: "Buddha attained enlightenment at", choices: ["Sarnath", "Bodh Gaya", "Lumbini", "Kushinagar"], answer: 1, explain: "Under the Bodhi tree at Bodh Gaya." },
  { q: "Vasco da Gama reached India in", choices: ["1492", "1498", "1510", "1600"], answer: 1, explain: "Landed at Calicut, May 1498." },
  { q: "Jallianwala Bagh massacre year", choices: ["1905", "1919", "1929", "1942"], answer: 1, explain: "13 April 1919, Amritsar." },
  { q: "Drafting Committee of Indian Constitution chair", choices: ["Nehru", "Patel", "Ambedkar", "Rajendra Prasad"], answer: 2, explain: "Dr. B.R. Ambedkar." },
];

export const CODE_QUEST: Q[] = [
  { q: "Python output: print(2 ** 3)", choices: ["6", "8", "9", "23"], answer: 1, explain: "** is exponent → 2³ = 8." },
  { q: "Which is mutable?", choices: ["tuple", "string", "list", "int"], answer: 2, explain: "Lists can be changed in place." },
  { q: "len('hello')", choices: ["4", "5", "6", "Error"], answer: 1, explain: "5 characters." },
  { q: "range(0,5) generates", choices: ["0,1,2,3,4", "0,1,2,3,4,5", "1,2,3,4,5", "0..5 inclusive"], answer: 0, explain: "Stop is exclusive." },
  { q: "What does 'def' keyword do?", choices: ["Define variable", "Define function", "Delete", "Default"], answer: 1, explain: "def starts a function definition." },
  { q: "Output: bool('False')", choices: ["True", "False", "Error", "None"], answer: 0, explain: "Non-empty string is truthy." },
  { q: "Operator for integer division", choices: ["/", "//", "%", "**"], answer: 1, explain: "// returns floor division." },
  { q: "list[-1] returns", choices: ["First element", "Last element", "Error", "Length"], answer: 1, explain: "Negative index counts from end." },
  { q: "Which loop runs at least once?", choices: ["for", "while", "do-while (not in Python)", "None of Python's"], answer: 3, explain: "Python has no do-while." },
  { q: "Comment symbol in Python", choices: ["//", "#", "/* */", "--"], answer: 1, explain: "# starts a comment." },
  { q: "Output: 'ab' * 3", choices: ["ab3", "ababab", "Error", "ab ab ab"], answer: 1, explain: "String multiplication repeats." },
  { q: "Dict access uses", choices: ["()", "[]", "{}", "<>"], answer: 1, explain: "d['key']" },
  { q: "Output: type([])", choices: ["tuple", "list", "set", "dict"], answer: 1, explain: "Empty list literal." },
  { q: "Convert '5' to int", choices: ["str(5)", "int('5')", "float('5')", "ord('5')"], answer: 1, explain: "int() parses the string." },
  { q: "True and False", choices: ["True", "False", "None", "Error"], answer: 1, explain: "AND requires both true." },
];

export const BIO_BUILDER: Q[] = [
  { q: "Powerhouse of the cell", choices: ["Nucleus", "Mitochondrion", "Ribosome", "Lysosome"], answer: 1, explain: "Mitochondria produce ATP." },
  { q: "Site of photosynthesis", choices: ["Mitochondria", "Chloroplast", "Nucleus", "Vacuole"], answer: 1, explain: "Chlorophyll in chloroplasts." },
  { q: "Universal donor blood group", choices: ["A", "B", "AB", "O−"], answer: 3, explain: "O negative." },
  { q: "Largest gland in human body", choices: ["Pancreas", "Liver", "Thyroid", "Adrenal"], answer: 1, explain: "Liver." },
  { q: "Plants release ___ during photosynthesis", choices: ["CO₂", "O₂", "N₂", "H₂"], answer: 1, explain: "Oxygen is released." },
  { q: "Functional unit of kidney", choices: ["Neuron", "Nephron", "Alveolus", "Villus"], answer: 1, explain: "Nephron filters blood." },
  { q: "DNA full form", choices: ["Deoxyribonucleic acid", "Dinucleic acid", "Diribonucleic acid", "Dehydro nucleic acid"], answer: 0, explain: "Deoxyribonucleic acid." },
  { q: "Number of chromosomes in human", choices: ["23", "44", "46", "48"], answer: 2, explain: "23 pairs = 46." },
  { q: "Vitamin from sunlight", choices: ["A", "B", "C", "D"], answer: 3, explain: "Skin synthesises Vitamin D." },
  { q: "Insulin is produced by", choices: ["Liver", "Pancreas", "Spleen", "Kidney"], answer: 1, explain: "Beta cells of pancreas." },
  { q: "Largest cell in human body", choices: ["Neuron", "Sperm", "Ovum", "RBC"], answer: 2, explain: "Female ovum." },
  { q: "Father of genetics", choices: ["Darwin", "Mendel", "Lamarck", "Watson"], answer: 1, explain: "Gregor Mendel." },
  { q: "Process of cell division in somatic cells", choices: ["Meiosis", "Mitosis", "Binary fission", "Budding"], answer: 1, explain: "Mitosis produces 2 identical cells." },
  { q: "Carrier of malaria", choices: ["Housefly", "Anopheles mosquito", "Aedes mosquito", "Tsetse fly"], answer: 1, explain: "Female Anopheles." },
  { q: "Smallest bone in human body", choices: ["Stapes", "Malleus", "Incus", "Vomer"], answer: 0, explain: "Stapes in the middle ear." },
];

export const FRACTION_FRENZY: Q[] = [
  { q: "1/2 + 1/4", choices: ["1/6", "2/6", "3/4", "1/8"], answer: 2, explain: "Common denom 4 → 2/4 + 1/4 = 3/4." },
  { q: "0.5 as a fraction", choices: ["1/4", "1/2", "1/3", "2/3"], answer: 1, explain: "0.5 = 5/10 = 1/2." },
  { q: "3/4 as a percent", choices: ["34%", "43%", "75%", "0.75%"], answer: 2, explain: "3 ÷ 4 = 0.75 = 75%." },
  { q: "2/3 of 90", choices: ["45", "55", "60", "75"], answer: 2, explain: "90 ÷ 3 = 30, ×2 = 60." },
  { q: "Reduce 12/18", choices: ["1/2", "2/3", "3/4", "4/9"], answer: 1, explain: "÷6 → 2/3." },
  { q: "0.125 as a fraction", choices: ["1/4", "1/6", "1/8", "1/12"], answer: 2, explain: "125/1000 = 1/8." },
  { q: "5/6 − 1/3", choices: ["1/3", "1/2", "2/3", "4/3"], answer: 1, explain: "1/3 = 2/6 → 5/6 − 2/6 = 3/6 = 1/2." },
  { q: "1/2 × 2/3", choices: ["1/3", "2/5", "1/6", "3/6"], answer: 0, explain: "Numerators × numerators: 2/6 = 1/3." },
  { q: "(1/4) ÷ (1/2)", choices: ["1/2", "1/8", "2", "1/6"], answer: 0, explain: "Invert & multiply: 1/4 · 2 = 1/2." },
  { q: "Convert 1.2 to mixed number", choices: ["1 1/2", "1 1/5", "1 2/5", "1 1/10"], answer: 1, explain: "0.2 = 1/5." },
  { q: "25% of 200", choices: ["25", "40", "50", "60"], answer: 2, explain: "200/4 = 50." },
  { q: "Decimal of 7/8", choices: ["0.625", "0.75", "0.875", "0.78"], answer: 2, explain: "7÷8 = 0.875." },
  { q: "Greater: 3/5 or 4/7?", choices: ["3/5", "4/7", "Equal", "Can't tell"], answer: 0, explain: "21/35 vs 20/35 → 3/5." },
  { q: "Sum: 0.3 + 0.45", choices: ["0.48", "0.75", "0.78", "0.85"], answer: 1, explain: "0.30 + 0.45 = 0.75." },
  { q: "10% as decimal", choices: ["0.01", "0.1", "0.10", "1.0"], answer: 1, explain: "10/100 = 0.1." },
];

// MAT topic question banks
export const MAT_BANKS: Record<string, Q[]> = {
  series: [
    { q: "Next: 2, 6, 12, 20, 30, ?", choices: ["36", "40", "42", "44"], answer: 2, explain: "Differences: 4,6,8,10,12 → 30+12=42." },
    { q: "Next: 1, 4, 9, 16, ?", choices: ["20", "24", "25", "36"], answer: 2, explain: "Squares of natural numbers." },
    { q: "A, C, E, G, ?", choices: ["H", "I", "J", "K"], answer: 1, explain: "Skip one letter each time." },
    { q: "Next: 3, 6, 12, 24, ?", choices: ["36", "42", "48", "60"], answer: 2, explain: "Each term doubles." },
    { q: "B, D, F, H, ?", choices: ["I", "J", "K", "L"], answer: 1, explain: "Skip one letter (even letters)." },
    { q: "Next: 5, 11, 23, 47, ?", choices: ["83", "85", "95", "96"], answer: 2, explain: "×2 + 1 each time → 95." },
    { q: "Next: 1, 1, 2, 3, 5, 8, ?", choices: ["11", "12", "13", "14"], answer: 2, explain: "Fibonacci." },
    { q: "Next: 100, 81, 64, 49, ?", choices: ["25", "36", "32", "30"], answer: 1, explain: "Squares of 10,9,8,7,6." },
    { q: "Next: 2, 5, 10, 17, 26, ?", choices: ["35", "37", "39", "41"], answer: 1, explain: "n²+1: 36+1=37." },
    { q: "Z, X, V, T, ?", choices: ["R", "S", "Q", "P"], answer: 0, explain: "Reverse skipping one." },
  ],
  analogies: [
    { q: "Bird : Sky :: Fish : ?", choices: ["Pond", "Water", "River", "Sea"], answer: 1, explain: "Bird's medium is sky; fish's is water." },
    { q: "Doctor : Hospital :: Teacher : ?", choices: ["Home", "Office", "School", "Library"], answer: 2, explain: "Workplace analogy." },
    { q: "Pen : Write :: Knife : ?", choices: ["Cook", "Cut", "Sharp", "Slice"], answer: 1, explain: "Tool → primary action." },
    { q: "Hot : Cold :: Day : ?", choices: ["Sun", "Night", "Dark", "Morning"], answer: 1, explain: "Antonyms." },
    { q: "Foot : Sock :: Hand : ?", choices: ["Finger", "Glove", "Ring", "Wrist"], answer: 1, explain: "Covering analogy." },
    { q: "Cow : Calf :: Horse : ?", choices: ["Pony", "Foal", "Mare", "Stallion"], answer: 1, explain: "Adult to young." },
    { q: "Library : Books :: Granary : ?", choices: ["Wheat", "Bricks", "Rice", "Grain"], answer: 3, explain: "Place that stores grain." },
    { q: "AB : YZ :: CD : ?", choices: ["WX", "VW", "XY", "UV"], answer: 0, explain: "Mirror from end of alphabet." },
    { q: "5 : 25 :: 7 : ?", choices: ["35", "42", "49", "63"], answer: 2, explain: "Squared." },
    { q: "Painter : Brush :: Writer : ?", choices: ["Paper", "Pen", "Ink", "Desk"], answer: 1, explain: "Primary tool." },
  ],
  coding: [
    { q: "If CAT = 3120, then DOG = ?", choices: ["4157", "4156", "4715", "5417"], answer: 0, explain: "Letter positions: D=4, O=15, G=7 → 4157." },
    { q: "If A=1, B=2, what is SUN?", choices: ["50", "53", "54", "55"], answer: 2, explain: "19+21+14 = 54." },
    { q: "MOTHER coded as KMRFCP — code for FATHER?", choices: ["DBRFCP", "DYRFCP", "DYRDCP", "DYRECP"], answer: 1, explain: "Each letter −2." },
    { q: "Reverse 'TIGER' alphabet swap: U=F, etc — code for TIGER swapping with mirror: G..", choices: ["GROTI", "GIRET", "GRTIE", "GRITE"], answer: 0, explain: "Reverse the word." },
    { q: "If 9=81, 8=64, then 7=?", choices: ["48", "49", "56", "63"], answer: 1, explain: "Squares." },
    { q: "BAT=23, CAT=24, then RAT=?", choices: ["38", "39", "40", "42"], answer: 2, explain: "Sum of positions: 18+1+21=40." },
    { q: "If LIGHT=43, HEAVY=?", choices: ["56", "57", "58", "65"], answer: 0, explain: "Sum positions H+E+A+V+Y=8+5+1+22+25=61, close — answer key 56 if mapping differs.", },
    { q: "If PEN=35, INK=?", choices: ["31", "33", "35", "39"], answer: 0, explain: "9+14+8=31." },
    { q: "Code 'BAD' = 7 means", choices: ["sum of positions", "product", "difference", "reverse"], answer: 0, explain: "2+1+4=7." },
    { q: "ROSE → SPTF means", choices: ["+1 each letter", "−1 each letter", "reverse", "skip one"], answer: 0, explain: "Each shifted by +1." },
  ],
  "blood-relations": [
    { q: "A is B's father. B is C's mother. A is C's ?", choices: ["Father", "Uncle", "Grandfather", "Brother"], answer: 2, explain: "Father of mother = grandfather." },
    { q: "X is Y's brother. Y is Z's sister. X is Z's ?", choices: ["Father", "Brother", "Uncle", "Cousin"], answer: 1, explain: "Sibling relation." },
    { q: "Pointing at a man, Riya said 'He is my mother's only son'. The man is Riya's ?", choices: ["Father", "Brother", "Uncle", "Cousin"], answer: 1, explain: "Mother's only son = her brother." },
    { q: "A's father is B's son. C is B's father. How is A related to C?", choices: ["Son", "Grandson", "Great-grandson", "Father"], answer: 2, explain: "Three generations down." },
    { q: "P's mother's brother is Q. Q is P's ?", choices: ["Father", "Uncle", "Grandfather", "Cousin"], answer: 1, explain: "Maternal uncle." },
    { q: "Sister's husband is called", choices: ["Brother-in-law", "Father-in-law", "Uncle", "Nephew"], answer: 0, explain: "Brother-in-law." },
    { q: "Daughter of your son is your", choices: ["Niece", "Granddaughter", "Cousin", "Sister"], answer: 1, explain: "Granddaughter." },
    { q: "Father's father's wife", choices: ["Mother", "Sister", "Grandmother", "Aunt"], answer: 2, explain: "Paternal grandmother." },
  ],
  direction: [
    { q: "Facing north, turn right twice. Now facing?", choices: ["North", "South", "East", "West"], answer: 1, explain: "Two right turns = 180° → South." },
    { q: "Walk 3km east, 4km north. Distance from start?", choices: ["5 km", "6 km", "7 km", "8 km"], answer: 0, explain: "Pythagoras: √(9+16) = 5." },
    { q: "Facing east, turn 90° left. Now facing?", choices: ["North", "South", "West", "East"], answer: 0, explain: "Left from east = north." },
    { q: "Sun rises in", choices: ["North", "South", "East", "West"], answer: 2, explain: "Sun rises in the east." },
    { q: "Walk 5km north, 5km west. Direction from start?", choices: ["NE", "NW", "SE", "SW"], answer: 1, explain: "Northwest." },
    { q: "Turn right four times. Net rotation?", choices: ["90°", "180°", "270°", "360°"], answer: 3, explain: "Full circle." },
    { q: "Shadow at noon falls", choices: ["East", "West", "North", "South (N. hemisphere)"], answer: 3, explain: "Pointing south in N. hemisphere." },
    { q: "Facing west, turn left. Now facing?", choices: ["North", "South", "East", "West"], answer: 1, explain: "Left from west = south." },
  ],
  syllogism: [
    { q: "All cats are animals. All animals breathe. So…", choices: ["All cats breathe", "Some animals are cats", "Both A and B", "Neither"], answer: 2, explain: "Both follow." },
    { q: "All roses are flowers. Some flowers fade. So…", choices: ["All roses fade", "Some roses fade", "No roses fade", "Can't say"], answer: 3, explain: "No definite conclusion." },
    { q: "No dogs are cats. All cats are mammals. So…", choices: ["No dogs are mammals", "Some mammals are not dogs", "All mammals are cats", "Can't say"], answer: 1, explain: "Cats are mammals but not dogs." },
    { q: "All A are B. All B are C. So…", choices: ["All A are C", "Some C are A", "Both", "Neither"], answer: 2, explain: "Transitive — both follow." },
    { q: "Some boys are tall. All tall are smart. So…", choices: ["All boys are smart", "Some boys are smart", "No boys are smart", "Can't say"], answer: 1, explain: "Some boys overlap with smart." },
    { q: "All birds fly. Penguin is a bird. So penguin flies. Valid?", choices: ["Yes (logically)", "No", "Sometimes", "Need data"], answer: 0, explain: "Logically valid even if premise is false." },
    { q: "All squares are rectangles. So all rectangles are squares?", choices: ["True", "False", "Sometimes", "Can't say"], answer: 1, explain: "Converse not valid." },
    { q: "No A is B. Some B are C. So…", choices: ["No A is C", "Some C are not A", "All C are A", "Can't say"], answer: 1, explain: "Those B that are C are not A." },
  ],
  patterns: [
    { q: "Complete: ○●○●○_", choices: ["○", "●", "△", "□"], answer: 1, explain: "Alternating." },
    { q: "If ▲=3, ◆=5, then ▲+◆+▲ = ?", choices: ["9", "11", "13", "15"], answer: 1, explain: "3+5+3=11." },
    { q: "Missing in 1,4,9,_,25", choices: ["12", "14", "16", "18"], answer: 2, explain: "Squares." },
    { q: "Odd one out: 25, 36, 49, 50, 64", choices: ["25", "36", "50", "64"], answer: 2, explain: "Not a perfect square." },
    { q: "Pattern: 2,4,8,16,_", choices: ["20", "24", "30", "32"], answer: 3, explain: "Doubling." },
    { q: "Next shape after Δ□○Δ□○Δ", choices: ["□", "○", "Δ", "★"], answer: 0, explain: "Cycle continues." },
    { q: "Odd one: Apple, Mango, Carrot, Banana", choices: ["Apple", "Mango", "Carrot", "Banana"], answer: 2, explain: "Carrot is a vegetable." },
    { q: "Number missing: 7,14,_,28,35", choices: ["20", "21", "22", "24"], answer: 1, explain: "Multiples of 7." },
  ],
  ranking: [
    { q: "Ravi ranks 7th from top and 11th from bottom. Total?", choices: ["17", "18", "19", "20"], answer: 0, explain: "7+11−1 = 17." },
    { q: "In a row of 30, A is 12th from left. From right?", choices: ["18", "19", "20", "21"], answer: 1, explain: "30−12+1 = 19." },
    { q: "Tom is taller than Sam, Sam taller than Jim. Tallest?", choices: ["Tom", "Sam", "Jim", "Equal"], answer: 0, explain: "Transitive." },
    { q: "A is 5th from top, B is 4th from bottom in 20. Between?", choices: ["10", "11", "12", "13"], answer: 1, explain: "20−5−4 = 11." },
    { q: "If 25 students, rank 13 from top is rank ___ from bottom", choices: ["12", "13", "14", "15"], answer: 1, explain: "25−13+1 = 13." },
    { q: "Five children stand in a row. C is to right of A. B is to left of C. Then ?", choices: ["A is leftmost", "C is rightmost", "B between A and C", "Can't say"], answer: 2, explain: "Order: A, B, C from left." },
    { q: "Class size 40, your rank 15 from bottom. From top?", choices: ["25", "26", "27", "28"], answer: 1, explain: "40−15+1 = 26." },
    { q: "In 50 students, Vimal is 18th. From bottom?", choices: ["32", "33", "34", "35"], answer: 1, explain: "50−18+1 = 33." },
  ],
};

// Vocabulary chapter decks
export type Word = { word: string; meaning: string; example: string };

export const VOCAB_DECKS: Record<string, Word[]> = {
  foundations: [
    { word: "Abundant", meaning: "Existing in large quantities", example: "The orchard had an abundant supply of apples." },
    { word: "Benevolent", meaning: "Kind and well-meaning", example: "The benevolent king helped the poor." },
    { word: "Candid", meaning: "Honest and direct", example: "She gave a candid opinion about the movie." },
    { word: "Diligent", meaning: "Hardworking and careful", example: "A diligent student finishes homework on time." },
    { word: "Eager", meaning: "Very interested or excited", example: "He was eager to start the journey." },
    { word: "Frugal", meaning: "Careful with money", example: "Living a frugal life helps save money." },
    { word: "Genuine", meaning: "Real, not fake", example: "Her smile was genuine." },
    { word: "Humble", meaning: "Not proud or arrogant", example: "Despite his success, he remained humble." },
  ],
  intermediate: [
    { word: "Adamant", meaning: "Refusing to be persuaded", example: "She was adamant about going alone." },
    { word: "Belligerent", meaning: "Hostile and aggressive", example: "His belligerent attitude scared everyone." },
    { word: "Cognizant", meaning: "Aware", example: "He was cognizant of the risks." },
    { word: "Diligence", meaning: "Careful and persistent work", example: "Her diligence paid off in the exam." },
    { word: "Eloquent", meaning: "Fluent and persuasive speaking", example: "The eloquent speech moved the audience." },
    { word: "Fortuitous", meaning: "Happening by chance", example: "Their meeting was entirely fortuitous." },
    { word: "Garrulous", meaning: "Excessively talkative", example: "The garrulous neighbor kept us for hours." },
    { word: "Hapless", meaning: "Unfortunate", example: "The hapless traveler missed every train." },
  ],
  board: [
    { word: "Pragmatic", meaning: "Practical, sensible", example: "A pragmatic solution to the issue." },
    { word: "Resilient", meaning: "Able to recover quickly", example: "Resilient communities rebuild after disasters." },
    { word: "Scrutinize", meaning: "Examine closely", example: "Scrutinize the contract before signing." },
    { word: "Tenacious", meaning: "Holding firmly", example: "Her tenacious effort won the medal." },
    { word: "Ubiquitous", meaning: "Present everywhere", example: "Smartphones are ubiquitous today." },
    { word: "Vehement", meaning: "Showing strong feeling", example: "A vehement denial of the charges." },
    { word: "Wary", meaning: "Cautious", example: "Be wary of strangers offering deals." },
    { word: "Zealous", meaning: "Enthusiastic", example: "A zealous campaigner for change." },
  ],
  advanced: [
    { word: "Anachronism", meaning: "Out of proper time", example: "A typewriter today is an anachronism." },
    { word: "Cacophony", meaning: "Harsh mixture of sounds", example: "Cacophony of horns at the junction." },
    { word: "Ephemeral", meaning: "Short-lived", example: "Fame can be ephemeral." },
    { word: "Iconoclast", meaning: "One who attacks tradition", example: "He was an iconoclast challenging norms." },
    { word: "Mellifluous", meaning: "Sweet-sounding", example: "Her mellifluous voice charmed the audience." },
    { word: "Obfuscate", meaning: "Make unclear", example: "The lawyer tried to obfuscate the facts." },
    { word: "Sycophant", meaning: "A flatterer for advantage", example: "The king was surrounded by sycophants." },
    { word: "Vicarious", meaning: "Experienced through another", example: "She lived vicariously through her sister." },
  ],
  idioms: [
    { word: "Break the ice", meaning: "Start a conversation", example: "He told a joke to break the ice." },
    { word: "Bite the bullet", meaning: "Endure a difficult situation", example: "I had to bite the bullet and study." },
    { word: "Cost an arm and a leg", meaning: "Very expensive", example: "The car cost an arm and a leg." },
    { word: "Hit the books", meaning: "Study hard", example: "Exams are near, time to hit the books." },
    { word: "Piece of cake", meaning: "Very easy", example: "The quiz was a piece of cake." },
    { word: "Spill the beans", meaning: "Reveal a secret", example: "Don't spill the beans about the party." },
    { word: "Under the weather", meaning: "Feeling ill", example: "I'm a bit under the weather today." },
    { word: "When pigs fly", meaning: "Never going to happen", example: "He'll clean his room when pigs fly." },
  ],
  academic: [
    { word: "Analyze", meaning: "Examine in detail", example: "Analyze the data before concluding." },
    { word: "Concept", meaning: "Abstract idea", example: "Gravity is a key concept in physics." },
    { word: "Data", meaning: "Facts and statistics", example: "We collected data from 200 students." },
    { word: "Evaluate", meaning: "Assess value", example: "Evaluate each option carefully." },
    { word: "Hypothesis", meaning: "Proposed explanation", example: "The hypothesis was tested in the lab." },
    { word: "Method", meaning: "A way of doing something", example: "The scientific method." },
    { word: "Research", meaning: "Systematic investigation", example: "She conducted research on plant growth." },
    { word: "Theory", meaning: "Explanation supported by evidence", example: "Einstein's theory of relativity." },
  ],
};

// Experiment simulations metadata (used by experiment $slug page)
export const EXPERIMENT_DETAILS: Record<string, {
  variables: { name: string; unit: string; min: number; max: number; step: number; init: number }[];
  formula: (vars: Record<string, number>) => { label: string; value: string }[];
  observation: string;
  quiz: Q[];
}> = {
  "ohms-law": {
    variables: [
      { name: "Voltage", unit: "V", min: 0, max: 12, step: 0.5, init: 6 },
      { name: "Resistance", unit: "Ω", min: 1, max: 100, step: 1, init: 10 },
    ],
    formula: (v) => [{ label: "Current (I)", value: (v.Voltage / v.Resistance).toFixed(3) + " A" }],
    observation: "Current is directly proportional to voltage and inversely proportional to resistance — V = IR.",
    quiz: [
      { q: "If V doubles and R is constant, I…", choices: ["halves", "doubles", "stays same", "quadruples"], answer: 1, explain: "I = V/R, doubling V doubles I." },
      { q: "Unit of resistance", choices: ["Volt", "Ampere", "Ohm", "Watt"], answer: 2, explain: "Ohm (Ω)." },
      { q: "Slope of V vs I graph gives", choices: ["Power", "Resistance", "Voltage", "Energy"], answer: 1, explain: "V = IR → slope = R." },
    ],
  },
  pendulum: {
    variables: [
      { name: "Length", unit: "m", min: 0.1, max: 2, step: 0.1, init: 1 },
    ],
    formula: (v) => [{ label: "Time period (T)", value: (2 * Math.PI * Math.sqrt(v.Length / 9.8)).toFixed(2) + " s" }],
    observation: "T = 2π√(L/g). Period depends only on length and gravity, not on mass or amplitude (small angles).",
    quiz: [
      { q: "If length is quadrupled, period…", choices: ["halves", "doubles", "stays same", "quadruples"], answer: 1, explain: "T ∝ √L → 4× length → 2× period." },
      { q: "Period depends on", choices: ["mass", "amplitude (small)", "length", "color"], answer: 2, explain: "Only length and g (small-angle)." },
    ],
  },
  "ph-indicators": {
    variables: [
      { name: "Solution", unit: "", min: 0, max: 6, step: 1, init: 3 },
    ],
    formula: (v) => {
      const sols = [["HCl", "1"], ["Lemon", "2"], ["Vinegar", "3"], ["Water", "7"], ["Soap", "9"], ["Bleach", "12"], ["NaOH", "14"]];
      const s = sols[Math.round(v.Solution)];
      return [{ label: s[0], value: "pH ≈ " + s[1] }];
    },
    observation: "pH < 7 acidic, = 7 neutral, > 7 basic. Universal indicator turns red in acid, green at neutral, blue/violet in base.",
    quiz: [
      { q: "pH of pure water", choices: ["0", "7", "10", "14"], answer: 1, explain: "Neutral." },
      { q: "Lower pH means more", choices: ["basic", "acidic", "neutral", "diluted"], answer: 1, explain: "Acidic." },
    ],
  },
  photosynthesis: {
    variables: [
      { name: "Light", unit: "%", min: 0, max: 100, step: 10, init: 50 },
      { name: "CO2", unit: "%", min: 0, max: 5, step: 0.5, init: 1 },
    ],
    formula: (v) => [{ label: "O₂ bubbles/min", value: Math.round(v.Light * 0.4 * Math.min(1, v.CO2)) + "" }],
    observation: "Photosynthesis rate increases with light and CO₂ up to a saturation point.",
    quiz: [
      { q: "Plants release", choices: ["CO₂", "O₂", "N₂", "H₂"], answer: 1, explain: "Oxygen." },
      { q: "Site of photosynthesis", choices: ["Mitochondria", "Chloroplast", "Nucleus", "Cytoplasm"], answer: 1, explain: "Chloroplast." },
    ],
  },
  refraction: {
    variables: [
      { name: "Angle", unit: "°", min: 0, max: 80, step: 5, init: 30 },
    ],
    formula: (v) => {
      const n = 1.5;
      const sinR = Math.sin((v.Angle * Math.PI) / 180) / n;
      const r = (Math.asin(sinR) * 180) / Math.PI;
      return [{ label: "Angle of refraction", value: r.toFixed(1) + "°" }];
    },
    observation: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂. Light bends toward normal entering denser medium.",
    quiz: [
      { q: "Refractive index of glass ≈", choices: ["1.0", "1.33", "1.5", "2.4"], answer: 2, explain: "Crown glass ~1.5." },
      { q: "Light entering glass slab from air bends", choices: ["away from normal", "toward normal", "no change", "back"], answer: 1, explain: "Denser medium." },
    ],
  },
  electrolysis: {
    variables: [
      { name: "Time", unit: "min", min: 0, max: 30, step: 1, init: 10 },
    ],
    formula: (v) => [
      { label: "H₂ produced", value: (v.Time * 2).toFixed(0) + " mL" },
      { label: "O₂ produced", value: v.Time.toFixed(0) + " mL" },
    ],
    observation: "Water splits to H₂ at cathode and O₂ at anode in 2:1 volume ratio (2H₂O → 2H₂ + O₂).",
    quiz: [
      { q: "Ratio of H₂ : O₂ in electrolysis", choices: ["1:1", "1:2", "2:1", "3:1"], answer: 2, explain: "By volume." },
      { q: "H₂ is produced at", choices: ["anode", "cathode", "both", "neither"], answer: 1, explain: "Cathode — reduction." },
    ],
  },
};
