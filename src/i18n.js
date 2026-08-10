// Language configuration and content
const CONTENT = {
  en: {
    name: 'Ryan Khoo',
    headline: 'Full Stack Developer | Web3 & Blockchain | Freelance Community Manager',
    location: 'Bayan Lepas, Penang 🇲🇾',
    status: '🟢 Available for work',
    offDutyHeadline: 'Explorer · Foodie · Lifelong Learner',
    offDutyStatus: '🌴 Currently exploring',
    aboutTitle: '👤 About',
    about: 'A computer science graduate who is exposed to various tools and skills, also blockchain or web3 knowledge. Two years of remote corporate experience and freelance community manager. Previously involved in blockchain and e-commerce projects.',
    stats: { years: '3+ Years Exp', projects: '10+ Projects', countries: '8 Countries' },
    sections: {
      experience: '💼 Experience',
      education: '🎓 Education',
      techStack: '⚡ Tech Stack',
      certifications: '📜 Certifications',
      linkedin: '🔗 LinkedIn',
      contact: '📬 Contact',
      projects: '🚀 Projects',
      travelMap: '🌍 Travel Map',
      travel: '✈️ Travel',
      food: '🍜 Food',
      lifestyle: '🎮 Lifestyle',
      music: '🎵 Music',
      sports: '🏸 Sports',
      gaming: '🎮 Gaming',
      instagram: '📷 Instagram',
      tiktok: '🎵 TikTok',
      social: '📱 Social',
    },
    experience: [
      { title: 'Full Stack Developer', company: 'SISTIC Singapore · Remote', period: 'Aug 2024 - Present · 2 yrs 1 mo', desc: 'Full-stack development with modern web technologies.' },
      { title: 'Frontend Software Engineer', company: 'StixCloud & StixLite', period: 'May 2023 - Aug 2024 · 1 yr 4 mos', desc: 'Graylog, Burp Suite, Scrum, Gitlab. Frontend development and security testing.' },
      { title: 'Backend Software Engineer (Intern)', company: 'StixLite', period: 'Dec 2022 - Apr 2023 · 5 mos', desc: 'Agile Environment, Microservices architecture.' },
      { title: 'Community Manager (Freelance)', company: 'Lysto · Remote', period: 'Mar 2022 - Aug 2022 · 6 mos', desc: 'Liaised with overseas community members on Blockchain P2E gaming experience.' },
      { title: 'Customer Specialist (Intern)', company: 'Zebra Technologies · Bayan Lepas, Penang', period: 'Apr 2021 - Dec 2021 · 9 mos', desc: 'Oracle Siebel CRM, Salesforce.com, Report Writing, Data Validation.' },
      { title: 'Office Support (Intern)', company: 'Zebra Technologies · Bayan Lepas, Penang', period: 'Jan 2021 - Apr 2021 · 4 mos', desc: 'Report Writing and Data Validation.' },
    ],
    education: [
      { title: "Bachelor's Degree, Computer Science", company: 'Coventry University', period: 'Apr 2021 - Apr 2023', desc: 'JavaScript, Blockchain, Web Development.' },
      { title: 'Diploma, Information Technology', company: 'INTI', period: 'Apr 2019 - Mar 2021', desc: 'Front-End Development, IT Fundamentals.' },
    ],
    certifications: [
      { title: 'DevOps on AWS', company: 'Amazon Web Services (AWS)', period: 'Issued Dec 2022', desc: 'Cloud DevOps certification.' },
      { title: 'Introduction to Blockchain', company: 'Amazon Web Services (AWS)', period: 'Issued Dec 2022', desc: 'Blockchain fundamentals.' },
      { title: 'Employer Project Completion', company: 'IDEAL VISION INTEGRATION SDN BHD', period: 'Issued Dec 2021', desc: 'Project completion certification.' },
      { title: 'Game Development Training Programme', company: 'Penang Youth Development Corporation (PYDC)', period: 'Issued Nov 2022', desc: 'Unity, C#.' },
      { title: 'Agile Practitioner', company: 'Tomorrow First - Institute for Agility & Innovation', period: 'Issued Sep 2022', desc: 'Agile Environment.' },
      { title: 'Google Analytics for Beginners', company: 'Google', period: 'Issued Aug 2022 · Expired Aug 2025', desc: 'Google Analytics.' },
      { title: 'iCAT Foundations', company: 'IBM', period: 'Issued Apr 2021', desc: 'IBM iCAT certification.' },
      { title: 'Introduction to Business Intelligence', company: 'Corporate Finance Institute® (CFI)', period: 'Issued Aug 2022', desc: 'Credential ID 55964244.' },
      { title: 'Introduction to Business Analytics', company: 'IBM Innovation Centre for Education', period: 'Issued Dec 2020', desc: 'Credential ID IBM_INTI_DITN_BA_12/20_054.' },
      { title: 'Introduction to Mobile Apps Development', company: 'IBM Innovation Centre for Education', period: 'Issued Dec 2020', desc: 'Credential ID IBM_INTI_DITN_MAD_12/20_064.' },
      { title: 'Introduction to Web Programming with PHP', company: 'IBM Innovation Centre for Education', period: 'Issued Aug 2020', desc: 'Credential ID IBM_INTI_DICTN_PHP_08/20_060.' },
      { title: 'Introduction to Cloud Computing', company: 'IBM Innovation Centre for Education', period: 'Issued Aug 2020', desc: 'Credential ID IBM_INTI_DICTN_CCV_08/20_058.' },
      { title: 'Introduction to IT Infrastructure Landscape', company: 'IBM Innovation Centre for Education', period: 'Issued Mar 2020', desc: 'Credential ID IBM_INTI_DICTN_ITL_04/20_058.' },
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'Python', 'Blockchain', 'Web3', 'Solidity', 'GitLab', 'Scrum', 'Agile', 'Graylog', 'Burp Suite', 'AWS', 'Salesforce', 'Oracle Siebel', 'Microservices'],
    travel: [
      { emoji: '🇪🇬', place: 'Egypt', desc: 'Pyramids, Nile, ancient history' },
      { emoji: '🇯🇵', place: 'Japan', desc: 'Cherry blossoms, ramen, neon streets' },
      { emoji: '🇹🇼', place: 'Taiwan', desc: 'Night markets, bubble tea, mountains' },
      { emoji: '🇹🇭', place: 'Thailand', desc: 'Beaches, temples, street food' },
      { emoji: '🇸🇬', place: 'Singapore', desc: 'Hawker centers, gardens, islands' },
      { emoji: '🇬🇧', place: 'United Kingdom', desc: 'History, pubs, rainy weather' },
      { emoji: '🇫🇷', place: 'France', desc: 'Eiffel Tower, baguettes, wine' },
      { emoji: '🇲🇾', place: 'Malaysia', desc: 'Home sweet home — Pulau Pinang' },
    ],
    food: 'Your food story goes here...',
    music: 'Favourite Artists',
    musicArtists: ['Jeremy Zucker', 'Joji', 'NewJeans', 'Man With A Mission', 'Jon Bellion', 'Adele'],
    sports: ['Badminton', 'Pickleball'],
    gaming: ['WuWa', 'Minecraft', 'Hytale'],
    linkedinButton: 'Connect on LinkedIn',
    offDutyStats: { countries: '8 Countries', projects: '0 Projects', years: '0 Years' },
    hobby: 'Hobby',
    post: 'Post',
    video: 'Video',
    footer: 'Ryan © 2026 · Built with React + Tailwind',
    onDuty: '👔 On Duty',
    offDuty: '🏖️ Off Duty',
    connectLinkedIn: 'Connect on LinkedIn',
    contactLinkedIn: '💼 LinkedIn',
    contactGitHub: '🐙 GitHub',
    contactEmail: '✉️ Email',
  },
  zh: {
    name: '邱鼎砷',
    headline: '全栈工程师 | Web3 和区块链',
    location: 'Bayan Lepas, Penang, Malaysia 🇲🇾',
    status: '🟢 可接受工作',
    offDutyHeadline: '探索者 · 美食家 · 终身学习者',
    offDutyStatus: '🌴 正在探索中',
    aboutTitle: '👤 关于我',
    about: '一位计算机科学专业的毕业生，具有接触多种工具和技能的经验，同时具备区块链和Web3知识。拥有两年的远程工作经验，同时从事自由职业社区管理工作。此前曾参与过区块链和电商项目。',
    stats: { years: '3+ 年经验', projects: '10+ 项目', countries: '8 个国家' },
    sections: {
      experience: '💼 工作经验',
      education: '🎓 教育背景',
      techStack: '⚡ 技术栈',
      certifications: '📜 认证证书',
      linkedin: '🔗 LinkedIn',
      contact: '📬 联系方式',
      projects: '🚀 项目',
      travelMap: '🌍 旅行地图',
      travel: '✈️ 旅行足迹',
      food: '🍜 美食',
      lifestyle: '🎮 生活方式',
      music: '🎵 音乐',
      sports: '🏸 运动',
      gaming: '🎮 游戏',
      instagram: '📷 Instagram',
      tiktok: '🎵 TikTok',
      social: '📱 社交媒体',
    },
    experience: [
      { title: '全栈工程师', company: 'SISTIC Singapore · 远程', period: '2024年8月 - 至今 · 2年1个月', desc: '使用现代Web技术进行全栈开发。' },
      { title: '前端软件工程师', company: 'StixCloud & StixLite', period: '2023年5月 - 2024年8月 · 1年4个月', desc: 'Graylog、Burp Suite、Scrum、Gitlab。前端开发和安全测试。' },
      { title: '后端软件工程师（实习）', company: 'StixLite', period: '2022年12月 - 2023年4月 · 5个月', desc: '敏捷环境、微服务架构。' },
      { title: '社区经理（自由职业）', company: 'Lysto · 远程', period: '2022年3月 - 2022年8月 · 6个月', desc: '与海外社区成员就区块链P2E游戏体验进行联络。' },
      { title: '客户专员（实习）', company: 'Zebra Technologies · Bayan Lepas, Penang', period: '2021年4月 - 2021年12月 · 9个月', desc: 'Oracle Siebel CRM、Salesforce.com、报告撰写、数据验证。' },
      { title: '办公室助理（实习）', company: 'Zebra Technologies · Bayan Lepas, Penang', period: '2021年1月 - 2021年4月 · 4个月', desc: '报告撰写和数据验证。' },
    ],
    education: [
      { title: '计算机科学学士学位', company: 'Coventry University', period: '2021年4月 - 2023年4月', desc: 'JavaScript、区块链、Web开发。' },
      { title: '信息技术文凭', company: 'INTI', period: '2019年4月 - 2021年3月', desc: '前端开发、IT基础。' },
    ],
    certifications: [
      { title: 'AWS DevOps', company: 'Amazon Web Services (AWS)', period: '2022年12月颁发', desc: '云DevOps认证。' },
      { title: '区块链导论', company: 'Amazon Web Services (AWS)', period: '2022年12月颁发', desc: '区块链基础知识。' },
      { title: '雇主项目完成证书', company: 'IDEAL VISION INTEGRATION SDN BHD', period: '2021年12月颁发', desc: '项目完成认证。' },
      { title: '游戏开发培训计划', company: 'Penang Youth Development Corporation (PYDC)', period: '2022年11月颁发', desc: 'Unity、C#。' },
      { title: '敏捷实践者', company: 'Tomorrow First - Institute for Agility & Innovation', period: '2022年9月颁发', desc: '敏捷环境。' },
      { title: 'Google Analytics 入门', company: 'Google', period: '2022年8月颁发 · 2025年8月过期', desc: 'Google Analytics。' },
      { title: 'iCAT 基础', company: 'IBM', period: '2021年4月颁发', desc: 'IBM iCAT认证。' },
      { title: '商业智能导论', company: 'Corporate Finance Institute® (CFI)', period: '2022年8月颁发', desc: '凭证ID 55964244。' },
      { title: '商业分析导论', company: 'IBM Innovation Centre for Education', period: '2020年12月颁发', desc: '凭证ID IBM_INTI_DITN_BA_12/20_054。' },
      { title: '移动应用开发导论', company: 'IBM Innovation Centre for Education', period: '2020年12月颁发', desc: '凭证ID IBM_INTI_DITN_MAD_12/20_064。' },
      { title: 'PHP Web编程导论', company: 'IBM Innovation Centre for Education', period: '2020年8月颁发', desc: '凭证ID IBM_INTI_DICTN_PHP_08/20_060。' },
      { title: '云计算导论', company: 'IBM Innovation Centre for Education', period: '2020年8月颁发', desc: '凭证ID IBM_INTI_DICTN_CCV_08/20_058。' },
      { title: 'IT基础设施导论', company: 'IBM Innovation Centre for Education', period: '2020年3月颁发', desc: '凭证ID IBM_INTI_DICTN_ITL_04/20_058。' },
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'Python', '区块链', 'Web3', 'Solidity', 'GitLab', 'Scrum', '敏捷', 'Graylog', 'Burp Suite', 'AWS', 'Salesforce', 'Oracle Siebel', '微服务'],
    travel: [
      { emoji: '🇪🇬', place: '埃及', desc: '金字塔、尼罗河、古代历史' },
      { emoji: '🇯🇵', place: '日本', desc: '樱花、拉面、霓虹街道' },
      { emoji: '🇹🇼', place: '台湾', desc: '夜市、珍珠奶茶、山脉' },
      { emoji: '🇹🇭', place: '泰国', desc: '海滩、寺庙、街头美食' },
      { emoji: '🇸🇬', place: '新加坡', desc: '小贩中心、花园、岛屿' },
      { emoji: '🇬🇧', place: '英国', desc: '历史、酒吧、雨天' },
      { emoji: '🇫🇷', place: '法国', desc: '埃菲尔铁塔、法棍面包、葡萄酒' },
      { emoji: '🇲🇾', place: '马来西亚', desc: '家——Pulau Pinang' },
    ],
    food: '您的美食故事在这里...',
    music: '最喜欢的艺术家',
    musicArtists: ['Jeremy Zucker', 'Joji', 'NewJeans', 'Man With A Mission', 'Jon Bellion', 'Adele'],
    sports: ['匹克球', '羽毛球'],
    gaming: ['WuWa', 'Minecraft', 'Hytale'],
    linkedinButton: '在 LinkedIn 上联系',
    offDutyStats: { countries: '8 个国家', projects: '0 项目', years: '0 年' },
    hobby: '爱好',
    post: '帖子',
    video: '视频',
    footer: '邱鼎砷 © 2026 · 使用 React + Tailwind 构建',
    onDuty: '👔 工作模式',
    offDuty: '🏖️ 下班模式',
    connectLinkedIn: '在 LinkedIn 上联系',
    contactLinkedIn: '💼 LinkedIn',
    contactGitHub: '🐙 GitHub',
    contactEmail: '✉️ 电子邮件',
  },
}

// Detect if user is in a Chinese-speaking region (HK, Macau, China, Taiwan)
function detectChineseRegion() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const cnTimezones = [
      'Asia/Shanghai', 'Asia/Chongqing', 'Asia/Chungqing',
      'Asia/Harbin', 'Asia/Kashgar', 'Asia/Urumqi',
      'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Taipei',
    ]
    if (cnTimezones.some(t => tz.includes(t))) return true

    const lang = (navigator.language || '').toLowerCase()
    if (lang.startsWith('zh')) return true

    // Check browser languages
    if (navigator.languages) {
      for (const l of navigator.languages) {
        if (l.toLowerCase().startsWith('zh')) return true
      }
    }
  } catch {
    // fallback
  }
  return false
}

export { CONTENT, detectChineseRegion }
