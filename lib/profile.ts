export const contact = {
  email: 'vincentxingzitao@gmail.com',
  phone: '(+86) 18121271166',
  phoneHref: 'tel:+8618121271166',
  location: 'Xiamen University, Xiamen, Fujian, China, 361005',
  resumeHref: '/static/files/zitao-xing-resume.pdf',
}

export const education = [
  {
    institution: 'Xiamen University',
    location: 'Xiamen, China',
    role: 'Incoming M.S. in Applied Mathematics (Operations Research)',
    period: 'Starting Sep. 2026',
    detail: 'Admitted through recommendation-based selection.',
  },
  {
    institution: 'Xiamen University',
    location: 'Xiamen, China',
    role: 'B.S. in Mathematics',
    period: 'Sep. 2022 - Jun. 2026',
    detail: 'GPA 3.4/4.0, average score 85/100, class ranking 16/49.',
  },
  {
    institution: 'University of California San Diego',
    location: 'San Diego, California, USA',
    role: 'University and Professional Studies (UPS) Program',
    period: 'Sep. 2024 - Dec. 2024',
    detail: 'Completed a full-time university-credit study program at UC San Diego.',
  },
]

export const experiences = [
  {
    title: 'AISE Summer Camp on Artificial Intelligence + Science and Engineering',
    organization: 'The Chinese University of Hong Kong, Shenzhen',
    location: 'Shenzhen, China',
    role: 'Participant',
    period: 'Jul. 2025 - Aug. 2025',
    bullets: [
      'Completed intensive training in deep learning and AI for Science, including neural-network architectures, backpropagation, optimization, loss design, model training, and evaluation.',
      'Built and trained a neural-network model, contributing to data preprocessing, architecture design, hyperparameter tuning, and experimental analysis.',
      'Studied GPU parallel computing and CUDA fundamentals, including thread organization, memory management, and parallel acceleration for scientific computing.',
      'Used Python and deep-learning frameworks to analyze how hyperparameters affect model convergence and generalization.',
    ],
  },
  {
    title: 'Functional Analysis Course GraphRAG: Construction and Feasibility Verification',
    organization: 'National-Level Undergraduate Research Training Project',
    location: 'Xiamen, China',
    role: 'Project Leader',
    period: 'May 2025 - May 2026',
    bullets: [
      'Led a national-level project to build a knowledge-graph-enhanced retrieval system for a Functional Analysis course, coordinating planning, technical integration, validation, and presentation.',
      'Structured course resources into chapters, concepts, theorems, worked examples, and questions, with explicit relationships among object types.',
      'Built a course knowledge graph containing 95 objects and 216 relationships.',
      'Developed a local GraphRAG demo with Neo4j, Qdrant, BAAI/bge-m3, BAAI/bge-reranker-v2-m3, and Flask.',
      'Validated an end-to-end pipeline spanning semantic retrieval, vector recall, reranking, graph-context expansion, and evidence-chain display.',
    ],
  },
  {
    title: 'Novel Numerical Methods for Partial Differential Equations',
    organization: "Provincial College Students' Innovation and Entrepreneurship Training Program",
    location: 'Xiamen, China',
    role: 'Team Member',
    period: 'Apr. 2025 - Apr. 2026',
    bullets: [
      'Investigated numerical solutions of the Poisson equation on sector domains, focusing on corner singularities and nonsmooth structures.',
      'Helped design a Müntz-type basis method adapted to corner singularities and compared it with algebraic-power bases and a neural-network-assisted baseline.',
      'Conducted one-dimensional approximation, single- and double-mode Poisson benchmark, and singular-exponent ablation experiments.',
    ],
  },
  {
    title: 'Internship, Shanghai Regional Office',
    organization: 'Harvest Fund Management Co., Ltd.',
    location: 'Shanghai, China',
    role: 'Intern',
    period: 'Jan. 2025 - Mar. 2025',
    bullets: [
      'Supported regional operations by organizing fund-product, market, client-service, and institutional-workflow materials.',
      'Used Excel and PowerPoint to consolidate, clean, format, and present market information, product materials, and peer-company data.',
      'Assisted with meeting preparation, client-document archiving, roadshows, and training materials.',
    ],
  },
]

export const honors = [
  '2023 “FLTRP ETIC Cup” Understanding Contemporary China National Foreign Language Contest, Provincial Second Prize',
  '2023 Contemporary Undergraduate Mathematical Contest in Modeling, Provincial Third Prize',
  'AiXIA Innovation: Xiamen Hackathon, AI for Science / Agent Track, Third Prize',
]

export const skillGroups = [
  {
    name: 'Programming & Tools',
    items: ['Python', 'C/C++', 'MATLAB', 'CUDA', 'Git', 'VS Code', 'Alibaba Cloud'],
  },
  {
    name: 'Languages',
    items: ['Chinese, native', 'English, proficient, IELTS 7.0'],
  },
  {
    name: 'Research Interests',
    items: [
      'Applied Mathematics',
      'Machine Learning',
      'Retrieval-Augmented Generation',
      'Operations Research',
      'Graph Algorithms',
    ],
  },
  {
    name: 'Personal Interests',
    items: ['Tea culture', 'coffee', 'badminton', 'long-distance running'],
  },
]

export const profileSummary =
  'Incoming M.S. student in Applied Mathematics (Operations Research) at Xiamen University, working across numerical methods, machine learning, GraphRAG, and graph algorithms.'
