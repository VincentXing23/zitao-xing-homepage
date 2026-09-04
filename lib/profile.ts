export type Locale = 'en' | 'zh'

export type EducationItem = {
  institution: string
  location: string
  role: string
  period: string
  detail: string
}

export type ExperienceItem = {
  id: string
  kind: 'internship' | 'project'
  title: string
  organization: string
  location: string
  role: string
  period: string
  bullets: string[]
  href?: string
}

export type SkillGroup = {
  name: string
  items: string[]
}

export type ProfileContent = {
  education: EducationItem[]
  experiences: ExperienceItem[]
  honors: string[]
  skillGroups: SkillGroup[]
  profileSummary: string
}

export const contact = {
  email: 'vincentxingzitao@gmail.com',
  phone: '(+86) 18121271166',
  phoneHref: 'tel:+8618121271166',
  location: {
    en: 'Xiamen University, Xiamen, Fujian, China, 361005',
    zh: '厦门大学，福建省厦门市，361005',
  },
  resumeHref: {
    en: '/static/files/zitao-xing-resume.pdf',
    zh: '/static/files/zitao-xing-resume-zh.pdf',
  },
} as const

export const featuredExperienceId = 'functional-analysis-graphrag'

const profiles: Record<Locale, ProfileContent> = {
  en: {
    education: [
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
        detail: '',
      },
      {
        institution: 'University of California San Diego',
        location: 'San Diego, California, USA',
        role: 'University and Professional Studies (UPS) Program',
        period: 'Sep. 2024 - Dec. 2024',
        detail: 'Completed a full-time university-credit study program at UC San Diego.',
      },
    ],
    experiences: [
      {
        id: 'shanghai-ai-research-institute',
        kind: 'internship',
        title: 'AI for Science Research Reproduction',
        organization: 'Shanghai Artificial Intelligence Research Institute',
        location: 'Shanghai, China',
        role: 'Algorithm Intern',
        period: 'Aug. 2026 - Present',
        bullets: [
          'Conduct research reproduction in AI for Science by reviewing problem formulations, methods, experimental settings, and evaluation protocols.',
          'Compare reproduced results with reported findings or baselines and document implementation choices, experimental observations, and remaining discrepancies.',
        ],
      },
      {
        id: 'shangtu-notebook',
        kind: 'project',
        title: 'Shanghai Library Open Data Competition — Spatiotemporal Exploration Notebook',
        organization: 'Shanghai Library Open Data Competition',
        location: 'Shanghai, China',
        role: 'Project Member',
        period: 'Aug. 2026',
        href: 'https://github.com/Romanrose/shangtu-notebook',
        bullets: [
          'Co-developed a touch-first PWA that lets users handwrite people, places, experiences, and works directly on a digital paper interface.',
          'Contributed to a workflow spanning handwriting transcription, constrained knowledge-graph retrieval, source-backed evidence verification, and traceable annotations.',
        ],
      },
      {
        id: 'shanghai-big-data',
        kind: 'internship',
        title: 'Evo Wiki Development and Legal Knowledge Retrieval Exploration',
        organization: 'Shanghai Big Data Co., Ltd.',
        location: 'Shanghai, China',
        role: 'Artificial Intelligence Development Intern',
        period: 'Jul. 2026 - Aug. 2026',
        href: 'https://github.com/easyhang/evo_wiki',
        bullets: [
          'Contributed to the development and improvement of Evo Wiki, an AI-native platform for maintainable Wiki and LightRAG workflows.',
          'Explored knowledge-graph extraction from legal materials and retrieval-augmented generation, with attention to entity-relation modeling, retrieval quality, and traceable evidence.',
        ],
      },
      {
        id: 'aise-summer-camp',
        kind: 'project',
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
        id: 'functional-analysis-graphrag',
        kind: 'project',
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
        id: 'pde-numerical-methods',
        kind: 'project',
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
        id: 'harvest-fund',
        kind: 'internship',
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
    ],
    honors: [
      '2023 “FLTRP ETIC Cup” Understanding Contemporary China National Foreign Language Contest, Provincial Second Prize',
      '2023 Contemporary Undergraduate Mathematical Contest in Modeling, Provincial Third Prize',
      'AiXIA Innovation: Xiamen Hackathon, AI for Science / Agent Track, Third Prize',
    ],
    skillGroups: [
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
          'AI for Science',
          'Agent Development',
        ],
      },
      {
        name: 'Personal Interests',
        items: ['Tea culture', 'coffee', 'badminton', 'long-distance running'],
      },
    ],
    profileSummary:
      'Incoming M.S. student in Applied Mathematics (Operations Research) at Xiamen University, working across AI for Science, agent development, numerical methods, machine learning, GraphRAG, and graph algorithms.',
  },
  zh: {
    education: [
      {
        institution: '厦门大学',
        location: '中国厦门',
        role: '应用数学（运筹学）硕士研究生',
        period: '2026年9月入学',
        detail: '已获推荐免试研究生录取资格。',
      },
      {
        institution: '厦门大学',
        location: '中国厦门',
        role: '数学专业本科',
        period: '2022年9月—2026年6月',
        detail: '',
      },
      {
        institution: '加州大学圣地亚哥分校',
        location: '美国加利福尼亚州圣地亚哥',
        role: 'University and Professional Studies（UPS）项目',
        period: '2024年9月—2024年12月',
        detail: '完成全日制大学学分课程学习。',
      },
    ],
    experiences: [
      {
        id: 'shanghai-ai-research-institute',
        kind: 'internship',
        title: 'AI for Science 科研复现',
        organization: '上海人工智能研究院',
        location: '上海',
        role: '算法实习生',
        period: '2026年8月—至今',
        bullets: [
          '围绕 AI for Science 方向开展科研复现，梳理研究问题、方法流程、实验配置与评价方式。',
          '将复现结果与论文报告或基线结果进行对照，记录实现选择、实验现象与尚待分析的差异。',
        ],
      },
      {
        id: 'shangtu-notebook',
        kind: 'project',
        title: '上海图书馆开放数据竞赛——时空探索手札',
        organization: '上海图书馆开放数据竞赛',
        location: '上海',
        role: '项目成员',
        period: '2026年8月',
        href: 'https://github.com/Romanrose/shangtu-notebook',
        bullets: [
          '参与研发面向平板触控场景的 PWA，支持用户在数字纸页上手写人物、地点、经历与作品等内容。',
          '参与打通手写转写、受控知识图谱检索、来源证据核验与可追溯旁批等流程。',
        ],
      },
      {
        id: 'shanghai-big-data',
        kind: 'internship',
        title: 'Evo Wiki 开发与法律知识检索探索',
        organization: '上海市大数据股份有限公司',
        location: '上海',
        role: '人工智能开发实习生',
        period: '2026年7月—2026年8月',
        href: 'https://github.com/easyhang/evo_wiki',
        bullets: [
          '参与 Evo Wiki 的开发与迭代，围绕 AI 原生 Wiki 与 LightRAG 工作流改进知识组织、检索和交付能力。',
          '探索法律语料的知识图谱抽取与检索增强生成流程，关注实体关系建模、检索质量和证据可追溯性。',
        ],
      },
      {
        id: 'aise-summer-camp',
        kind: 'project',
        title: 'AISE 人工智能+理工科夏令营',
        organization: '香港中文大学（深圳）',
        location: '广东深圳',
        role: '营员',
        period: '2025年7月—2025年8月',
        bullets: [
          '系统学习深度学习与 AI for Science，涵盖神经网络结构、反向传播、优化、损失函数设计、模型训练与评估。',
          '参与神经网络训练项目，完成数据预处理、模型搭建、训练调参与实验结果分析。',
          '学习 GPU 并行计算与 CUDA 编程基础，理解线程组织、内存管理及科学计算并行加速。',
          '使用 Python 与深度学习框架分析超参数对模型收敛和泛化表现的影响。',
        ],
      },
      {
        id: 'functional-analysis-graphrag',
        kind: 'project',
        title: '泛函分析课程 GraphRAG：建设与可行性验证',
        organization: '国家级大学生科研训练项目',
        location: '福建厦门',
        role: '项目负责人',
        period: '2025年5月—2026年5月',
        bullets: [
          '主持国家级科研训练项目，面向泛函分析课程构建知识图谱增强检索系统，负责项目统筹、技术整合、系统验证与成果展示。',
          '将章节、知识点、定理、例题和问题抽象为课程对象，并设计相应的图谱关系。',
          '构建包含 95 个课程对象与 216 条关系的课程知识图谱。',
          '基于 Neo4j、Qdrant、BAAI/bge-m3、BAAI/bge-reranker-v2-m3 与 Flask 搭建本地 GraphRAG demo。',
          '验证自然语言检索、向量召回、重排、图谱上下文扩展与证据链展示的端到端流程。',
        ],
      },
      {
        id: 'pde-numerical-methods',
        kind: 'project',
        title: '偏微分方程的新型数值方法研究',
        organization: '省级大学生创新创业训练项目',
        location: '福建厦门',
        role: '项目成员',
        period: '2025年4月—2026年4月',
        bullets: [
          '研究扇形域上 Poisson 方程的数值求解，重点关注角点奇性与非光滑结构。',
          '参与设计适配角点奇异结构的 Müntz 型基函数方法，并与代数幂基和神经网络辅助基线进行比较。',
          '完成一维逼近、单模态与双模态 Poisson 基准及奇异指数消融实验。',
        ],
      },
      {
        id: 'harvest-fund',
        kind: 'internship',
        title: '上海区域实习',
        organization: '嘉实基金管理有限公司',
        location: '上海',
        role: '实习生',
        period: '2025年1月—2025年3月',
        bullets: [
          '协助整理基金产品、市场动态、客户服务与机构业务流程相关材料。',
          '使用 Excel、PPT 完成市场信息、产品资料与同业数据的汇总、清洗、排版和展示。',
          '协助准备会议、客户资料归档、路演及培训材料。',
        ],
      },
    ],
    honors: [
      '2023年“外研社·国才杯”理解当代中国全国大学生外语能力大赛，省级二等奖',
      '2023年全国大学生数学建模竞赛，省级三等奖',
      '爱XIA创：厦门黑客松 AI for Science / Agent 赛道，三等奖',
    ],
    skillGroups: [
      {
        name: '编程与工具',
        items: ['Python', 'C/C++', 'MATLAB', 'CUDA', 'Git', 'VS Code', '阿里云'],
      },
      {
        name: '语言能力',
        items: ['中文（母语）', '英文（熟练，雅思 7.0）'],
      },
      {
        name: '研究兴趣',
        items: ['应用数学', '机器学习', 'RAG', '运筹学', '图算法', 'AI for Science', 'Agent 开发'],
      },
      {
        name: '个人兴趣',
        items: ['茶文化', '咖啡', '羽毛球', '长跑'],
      },
    ],
    profileSummary:
      '厦门大学应用数学（运筹学）硕士研究生，关注 AI for Science、Agent 开发、数值方法、机器学习、GraphRAG 与图算法。',
  },
}

export function normalizeLocale(value?: string | string[]): Locale {
  const candidate = Array.isArray(value) ? value[0] : value
  return candidate === 'zh' ? 'zh' : 'en'
}

export function getProfile(locale: Locale): ProfileContent {
  return profiles[locale]
}
