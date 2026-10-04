// All site content lives here. Edit this file only.
// Sahil and Yasin are filled from their resumes. Vedant's profile: add when his resume content is shared.

export const crew = [
  { id: "sahil", name: "Sahil", tone: "peach", toneName: "Peach", initial: "S",
    role: "IoT & Embedded Engineer",
    profile: {
      role: "IoT & Embedded Engineer",
      bio: [
        "Industry-trained IoT engineer with 20 weeks of hands-on experience at Grok Learning.",
        "I build real-time IoT and AI systems on Raspberry Pi, ESP32 and Arduino, from sensor integration to deploying AI models on edge devices.",
      ],
      facts: [["Based in", "Ghatkopar, Maharashtra"], ["Education", "Diploma in Computer Engineering"]],
      experience: { tag: "Internship", org: "Grok Learning Pvt. Ltd.", text: "IoT Intern, Dec 2025 to May 2026 (20 weeks). Developed and tested IoT and AI smart systems, integrated sensors and ran live project demonstrations." },
      growth: null,
      work: [
        ["Smart AI-Based Bird Detection & Deterrent System", "Raspberry Pi, MobileNetSSD, automated sprinkler"],
        ["Weather Forecast Station", "DHT11, MQ7, PM and rain sensors with a live dashboard"],
        ["Android Accident Detection & Alert System", "Accelerometer, gyroscope, GPS and Google Maps API"],
        ["Hydroponics & Smart Greenhouse Monitoring", "Automation and real-time monitoring"],
      ],
      ratings: null,
      skills: ["Python", "C", "C++", "Raspberry Pi", "ESP32", "Arduino", "MQTT", "LoRa", "Sensor integration", "Git & GitHub"],
      links: [{ label: "Email", url: "mailto:sahildhobale690@gmail.com" }, { label: "GitHub", url: null }, { label: "LinkedIn", url: null }],
    } },
  { id: "vedant", name: "Vedant", tone: "lilac", toneName: "Periwinkle", initial: "V",
    role: "Full-Stack Developer (backend-leaning)",
    profile: {
      role: "Full-Stack Developer (backend-leaning)",
      bio: [
        "Hi, I'm Vedant, a recent computer engineering diploma graduate from Mumbai.",
        "I build backends and applied-AI tools: Flask APIs, semantic search and natural-language-to-SQL.",
        "I'm looking for a paid full-stack internship to keep learning by shipping.",
      ],
      facts: [["Based in", "Mumbai, Maharashtra"], ["Education", "Diploma in Computer Engineering"], ["Looking for", "Paid full-stack internship"]],
      experience: { tag: "Internship", org: "Clover Infotech", text: "Worked on key assignments, including Document Finder, which lets users search and locate documents on their system using natural-language queries.", project: "docfinder", projectLabel: "Document Finder" },
      growth: "Practising clear, calm demos: explaining a project in two minutes without notes.",
      work: [["Codebound", "Our major project"], ["QueryGPT", "NLP-to-SQL system"], ["Document Finder", "Local semantic search engine"]],
      ratings: [
        { name: "Python", score: 8, evidence: ["Document Finder", "QueryGPT"] },
        { name: "Backend development", score: 8, evidence: ["QueryGPT", "Multi-Service Platform"] },
        { name: "Applied AI and RAG", score: 7, evidence: ["QueryGPT", "Document Finder"] },
        { name: "SQL and databases", score: 7, evidence: ["QueryGPT", "Document Finder"] },
        { name: "Frontend development", score: 7, evidence: ["Multi-Service Platform"] },
        { name: "Logic and problem solving", score: 8, evidence: ["Document Finder", "QueryGPT"] },
        { name: "Presentation", score: 6, evidence: [] },
      ],
      skills: [],
      links: [{ label: "GitHub", url: null }, { label: "LinkedIn", url: null }, { label: "Email", url: null }],
    } },
  { id: "yasin", name: "Yasin", tone: "mint", toneName: "Mint", initial: "Y",
    role: "MERN Stack Developer",
    profile: {
      role: "MERN Stack Developer",
      bio: [
        "Trust & Safety Associate at Accenture with a Diploma in Computer Engineering (2026), building full-stack MERN applications.",
        "I am moving into web development and have built and shipped React and Node.js projects covering authentication, real-time attendance and backend data persistence.",
      ],
      facts: [["Based in", "Mumbai, India"], ["Education", "Diploma in Computer Engineering"]],
      experience: { tag: "Work", org: "Accenture, Mumbai", text: "Trust & Safety Associate since May 2025. Applies analytical rigor and process discipline in a high-volume role, relevant to debugging and QA. Earlier internships at Atoconn System Labs and Cisco Metal & Alloys." },
      growth: null,
      work: [
        ["OTP Attend", "OTP-based attendance check-ins with React and Vite"],
        ["Attendify", "Time-limited class-code attendance app"],
        ["Inventory Management System", "Express.js backend replacing localStorage"],
        ["Gallery & Blog Site", "Publishing platform for @stoichonour"],
        ["MemoryWorld Gallery", "Unity 3D Android app, plus a Flutter game"],
      ],
      ratings: null,
      skills: ["React.js", "Vite", "JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git / GitHub", "Flutter", "Unity 3D"],
      links: [{ label: "Email", url: "mailto:siddiquiyaseen641@gmail.com" }, { label: "GitHub", url: null }, { label: "LinkedIn", url: null }],
    } },
];
// profile shape when ready:
// { role, story, skills: [], links: [{ label, url }] }

export const about = {
  title: "What we make",
  intro:
    "We are three engineering students who build useful software together. Between us we cover backend systems, applied AI, interface design and the glue that makes them work as one product.",
  mission: "Our mission is to learn by shipping: take real problems, build working answers, and keep improving them.",
  vibe: "Hands-on, friendly, and honest about what we know and what we are still learning.",
  values: [
    ["Curiosity", "We explore new tools and ask why they work."],
    ["Collaboration", "We combine different strengths."],
    ["Execution", "We turn ideas into working software."],
  ],
};

export const projects = [
  { id: "codebound", code: "CO", tone: "lilac", status: "In development", title: "Codebound",
    sub: "Our major project", owners: ["sahil", "vedant", "yasin"],
    desc: "A gamified skill-building app for students. Pick a character, log your daily coding practice (DSA, Python, Java and more) and earn XP, streaks and badges so progress becomes visible.",
    tags: ["React", "JavaScript", "Tailwind CSS"], link: null },
  { id: "querygpt", code: "QU", tone: "mint", status: "Completed", title: "QueryGPT",
    sub: "NLP-to-SQL system", owners: ["vedant"],
    desc: "An intelligent backend that converts natural-language questions into SQL using an LLM (Mistral via Ollama) and RAG (FAISS with Sentence Transformers).",
    tags: ["Python", "Flask", "SQLite"], link: null },
  { id: "docfinder", code: "DO", tone: "peach", status: "Completed", title: "Document Finder",
    sub: "Local semantic search engine", owners: ["vedant"],
    desc: "A local desktop application that scans, indexes and retrieves documents using semantic search, so you can find files by describing them.",
    tags: ["Python", "FAISS", "SQLite FTS5"], link: null },
  { id: "multiservice", code: "MU", tone: "lilac", status: "Completed", title: "Multi-Service Platform",
    sub: "Healthcare, Car Service, Housekeeping, Finance", owners: ["vedant"],
    desc: "A full-stack platform with four service modules and role-based access for users, workers and admins.",
    tags: ["React", "Tailwind CSS", "Flask"], link: null },
];

// `by` = who lists the skill. Add "sahil" / "yasin" from their resumes.
export const skills = [
  { group: "Languages", items: [["Python", ["vedant", "sahil"]], ["JavaScript", ["vedant", "yasin"]], ["SQL", ["vedant", "sahil"]], ["C / C++", ["sahil"]]] },
  { group: "Frontend", items: [["HTML", ["vedant", "yasin"]], ["CSS", ["vedant", "yasin"]], ["React.js", ["vedant", "yasin"]], ["Vite", ["yasin"]], ["Tailwind CSS", ["vedant"]]] },
  { group: "Backend", items: [["Flask", ["vedant"]], ["Node.js", ["yasin"]], ["Express.js", ["yasin"]], ["REST APIs", ["vedant", "yasin"]], ["Authentication", ["vedant"]]] },
  { group: "Data", items: [["MongoDB", ["sahil", "yasin"]], ["SQLite (FTS5)", ["vedant"]], ["Star-schema design", ["vedant"]]] },
  { group: "AI", items: [["FAISS", ["vedant"]], ["RAG", ["vedant"]], ["Sentence Transformers", ["vedant"]], ["LLMs via Ollama (Mistral)", ["vedant"]], ["MobileNetSSD (edge AI)", ["sahil"]]] },
  { group: "IoT & Embedded", items: [["Raspberry Pi", ["sahil"]], ["ESP32", ["sahil"]], ["Arduino", ["sahil"]], ["Sensor integration", ["sahil"]], ["MQTT", ["sahil"]], ["LoRa", ["sahil"]]] },
  { group: "Mobile & Tools", items: [["Flutter", ["yasin"]], ["Unity 3D", ["yasin"]], ["Git / GitHub", ["sahil", "yasin"]], ["3D printing", ["sahil"]]] },
];

export const rubric = [
  ["1-3", "Learning"], ["4-5", "Basic"], ["6-7", "Comfortable"], ["8", "Strong"], ["9-10", "Expert"],
];

export const contact = {
  eyebrow: "Let's build something useful",
  title: "Say hello",
  lead: "Have a project or an internship in mind?",
  cardEyebrow: "Open to opportunities",
  cardTitle: "Tell us what you are building. We reply to every message.",
  note: "Team links are being prepared. In the meantime, use the form to draft your message.",
  links: ["Email", "GitHub", "LinkedIn"], // add {label,url} when ready
};

export const footer = "Designed and built by Vedant, Sahil & Yasin.";