// DevKraft Core Data Store: 3 Flagship Events, Projects, Team, Stats

export const EVENTS_DATA = {
  devclash: {
    id: 'devclash',
    code: 'EV-01',
    name: 'DEVCLASH',
    tagline: '24-HOUR FLAGSHIP HACKATHON',
    edition: '2026.1',
    status: 'REGISTRATIONS OPEN',
    date: 'OCTOBER 24-25, 2026',
    venue: 'DR. DYPIT AUDITORIUM COMPLEX & LABS',
    prizePool: '₹1,50,000+',
    duration: '24 HOURS CONTINUOUS',
    participants: '500+ HACKERS',
    teams: '120+ TEAMS',
    badge: 'FLAGSHIP HACKATHON',
    accent: '#FF5500',
    description: 'DevKraft’s premier 24-hour sprint where builders engineer autonomous agents, decentralized protocols, and high-performance software.',
    tracks: [
      {
        tag: 'TRACK_01',
        title: 'Autonomous Agents & Edge AI',
        desc: 'Multi-agent swarms, local LLM quantization, and automated dev tooling.',
        bounty: '₹40,000'
      },
      {
        tag: 'TRACK_02',
        title: 'Zero-Knowledge & Decentralized Infra',
        desc: 'ZK-proofs, verifiable compute, and rollup protocols.',
        bounty: '₹40,000'
      },
      {
        tag: 'TRACK_03',
        title: 'High-Performance Systems & Security',
        desc: 'Rust/C++ core engines, distributed stores, and kernel hacking.',
        bounty: '₹40,000'
      },
      {
        tag: 'TRACK_04',
        title: 'Creative Coding & Open Innovation',
        desc: 'Experimental web platforms, brutalist UI, and generative tools.',
        bounty: '₹30,000'
      }
    ],
    timeline: [
      { time: '09:00 AM', event: 'Keynote & Problem Statements Released' },
      { time: '11:00 AM', event: 'Hacking Commences (24H Clock Starts)' },
      { time: '04:00 PM', event: 'Mentorship Sprint #1' },
      { time: '11:30 PM', event: 'Midnight Code Blitz' },
      { time: '04:00 AM', event: 'Dawn Checkpoint' },
      { time: '11:00 AM', event: 'Code Freeze & Grand Pitch Battle' },
      { time: '02:30 PM', event: 'Awards & Results' }
    ]
  },
  devtalks: {
    id: 'devtalks',
    code: 'EV-02',
    name: 'DEVTALKS',
    tagline: 'INDUSTRY KEYNOTES & TECH CONCLAVES',
    edition: 'BI-MONTHLY SESSIONS',
    status: 'NEXT SESSION LIVE',
    date: 'NOVEMBER 07, 2026 • 16:30 IST',
    venue: 'DR. DYPIT MAIN CONVENTION CENTER',
    prizePool: 'GRANTS & MENTORSHIP',
    duration: 'HALF-DAY IMMERSION',
    participants: '600+ ATTENDEES',
    teams: 'OPEN KEYNOTE',
    badge: 'SPEAKER CONCLAVE',
    accent: '#FFAA00',
    description: 'Technical keynotes, architectural teardowns, and direct AMAs with Silicon Valley engineers, founders, and systems architects.',
    tracks: [
      {
        tag: 'SESSION_01',
        title: 'Distributed Systems Under Fire',
        desc: 'Real-world post-mortems of multi-region cloud outages and Raft consensus.',
        bounty: 'Masterclass'
      },
      {
        tag: 'SESSION_02',
        title: 'Compilers, Rust & WASM in Prod',
        desc: 'Building sub-millisecond execution sandboxes directly in browser runtimes.',
        bounty: 'Live Teardown'
      },
      {
        tag: 'SESSION_03',
        title: 'What Product Companies Actually Hire For',
        desc: 'Panel on system design interviews, resumes, and high-signal portfolios.',
        bounty: 'Interactive AMA'
      }
    ],
    timeline: [
      { time: '04:30 PM', event: 'Keynote: Architectural Post-Mortems at Scale' },
      { time: '05:30 PM', event: 'Deep-Dive: Next-Gen Systems & Kernel Telemetry' },
      { time: '06:30 PM', event: 'Founder & Tech Lead Panel Q&A' },
      { time: '07:30 PM', event: 'Networking & Open Mic Lightning Talks' }
    ]
  },
  devchef: {
    id: 'devchef',
    code: 'EV-03',
    name: 'DEVCHEF',
    tagline: 'COMPETITIVE CODING COOK-OFF',
    edition: 'WEEKLY CYCLES',
    status: 'ACTIVE EVERY WEDNESDAY',
    date: 'WEEKLY WEDNESDAYS • 18:00 IST',
    venue: 'CAMPUS LAB 04 / VIRTUAL ARENA',
    prizePool: 'BADGES & BOUNTIES',
    duration: '90 MIN INTENSE ROUNDS',
    participants: '250+ ACTIVE CODERS',
    teams: 'SOLO / DUO BATTLES',
    badge: 'COMPETITIVE DSA',
    accent: '#FF3344',
    description: 'Timed algorithmic duels, code recipes, dynamic programming showdowns, and segment tree challenges cooked under intense pressure.',
    tracks: [
      {
        tag: 'RECIPE_01',
        title: 'Appetizer Sprint (Div 2/3)',
        desc: 'Fast-paced array manipulations, binary search, and sliding window rounds.',
        bounty: 'Speed XP'
      },
      {
        tag: 'RECIPE_02',
        title: 'Main Course: DP & Graphs (Div 1)',
        desc: 'Network flows, Fenwick trees, and Bitmask Dynamic Programming.',
        bounty: 'Bounty XP'
      },
      {
        tag: 'RECIPE_03',
        title: 'Dessert: Speed Syntax & Bug Cooking',
        desc: 'Refactor dirty legacy code and minimize time complexity in under 5 minutes.',
        bounty: 'Chef Master Badge'
      }
    ],
    timeline: [
      { time: '06:00 PM', event: 'Arena Opens & Problem Buffet Unlocked' },
      { time: '06:15 PM', event: 'Cooking Commences (4 Timed Challenges)' },
      { time: '07:45 PM', event: 'Kitchen Freeze (Submissions Locked)' },
      { time: '08:00 PM', event: 'Live Solution Teardown by Top Solvers' }
    ]
  }
};

export const PROJECTS_DATA = [
  {
    id: 'prj-1',
    name: 'VORTEX-DB',
    category: 'SYSTEMS',
    tagline: 'Embedded in-memory vector database built in Rust with SIMD acceleration.',
    stars: '420',
    tags: ['Rust', 'SIMD', 'AVX-512', 'gRPC'],
    metrics: '< 1.2ms P99 Latency / 500k QPS',
    github: 'https://github.com/devkraft-dypit/vortex-db',
    demo: '#',
    accent: '#FF5500',
    details: 'Ultra-low-latency vector indexer designed for resource-constrained edge nodes. Zero-copy deserialization and custom HNSW graphs.'
  },
  {
    id: 'prj-2',
    name: 'NEURO-SYNTHETIX',
    category: 'AI / AGENTS',
    tagline: 'Multi-agent framework for automated code synthesis and security fuzzing.',
    stars: '680',
    tags: ['TypeScript', 'Python', 'WASM', 'Ollama'],
    metrics: '94.2% Auto PR Acceptance',
    github: 'https://github.com/devkraft-dypit/neuro-synthetix',
    demo: '#',
    accent: '#FFAA00',
    details: 'Coordinates self-correcting neural agents that generate unit tests, execute fuzzers, and repair memory leaks.'
  },
  {
    id: 'prj-3',
    name: 'AETHER-OS WEB',
    category: 'CREATIVE',
    tagline: 'WebGL spatial cyberpunk desktop environment running micro-apps.',
    stars: '890',
    tags: ['WebGL', 'GLSL', 'Vanilla JS', 'WebAudio'],
    metrics: '60 FPS Steady On Mobile GPUs',
    github: 'https://github.com/devkraft-dypit/aether-os',
    demo: '#',
    accent: '#FF3344',
    details: 'Spatial desktop built with vanilla WebGL shaders, procedural synth audio trackers, and custom virtual file system.'
  },
  {
    id: 'prj-4',
    name: 'KRYPTON-SHIELD',
    category: 'SECURITY',
    tagline: 'Zero-knowledge credential authenticator & smart contract audit engine.',
    stars: '310',
    tags: ['Circom', 'Solidity', 'Rust', 'SnarkJS'],
    metrics: '100% Privacy-Preserving Proofs',
    github: 'https://github.com/devkraft-dypit/krypton-shield',
    demo: '#',
    accent: '#FF5500',
    details: 'Generates zero-knowledge membership proofs for campus access control without leaking student PII records.'
  },
  {
    id: 'prj-5',
    name: 'PULSE-IDE',
    category: 'DEV TOOLS',
    tagline: 'Real-time collaborative CRDT code editor with AST telemetry.',
    stars: '540',
    tags: ['Yjs', 'WebRTC', 'Tree-Sitter', 'Node.js'],
    metrics: '< 15ms Peer-to-Peer Sync',
    github: 'https://github.com/devkraft-dypit/pulse-ide',
    demo: '#',
    accent: '#FFAA00',
    details: 'Peer-to-peer editor leveraging conflict-free replicated data types and syntax tree updates for zero-lag pair programming.'
  },
  {
    id: 'prj-6',
    name: 'HYPERMESH P2P',
    category: 'NETWORKS',
    tagline: 'Offline campus-wide encrypted mesh communicator built on Bluetooth LE.',
    stars: '275',
    tags: ['Go', 'Libp2p', 'BLE', 'Protobuf'],
    metrics: 'Sub-second Multi-hop Routing',
    github: 'https://github.com/devkraft-dypit/hypermesh',
    demo: '#',
    accent: '#FF5500',
    details: 'Decentralized mesh protocol relaying encrypted messages and files completely independent of cellular networks.'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'ARYAN SHARMA',
    role: 'PRESIDENT & LEAD ARCHITECT',
    spec: 'Systems & Distributed Infra',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’27',
    avatarTag: '0x01_SYS'
  },
  {
    name: 'RIA DESHMUKH',
    role: 'VICE PRESIDENT & DEVCLASH LEAD',
    spec: 'Full Stack & Hackathon Ops',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’27',
    avatarTag: '0x02_OPS'
  },
  {
    name: 'SIDDHARTH JOSHI',
    role: 'HEAD OF ALGORITHMIC SYSTEMS',
    spec: 'Competitive DSA & DevChef Lead',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’27',
    avatarTag: '0x03_ALGO'
  },
  {
    name: 'ANANYA KULKARNI',
    role: 'CHIEF DESIGN OFFICER',
    spec: 'Creative Direction & DevTalks Lead',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’28',
    avatarTag: '0x04_DSGN'
  },
  {
    name: 'VARUN PATIL',
    role: 'LEAD AI RESEARCHER',
    spec: 'Neural Swarms & Quantized Models',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’27',
    avatarTag: '0x05_AI'
  },
  {
    name: 'TANVI MORE',
    role: 'SECURITY & OPEN-SOURCE LEAD',
    spec: 'Offensive Security & Kernel Tools',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    batch: 'DYPIT ’28',
    avatarTag: '0x06_SEC'
  }
];

export const STATS_DATA = [
  { label: 'LINES DEPLOYED', value: '480,000+' },
  { label: 'HACKATHONS WON', value: '38+' },
  { label: 'BUILDER CADRE', value: '350+' },
  { label: 'PROD APPS LIVE', value: '24' }
];
