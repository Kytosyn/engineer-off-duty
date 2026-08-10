// Language configuration and content
const CONTENT = {
  en: {
    name: 'Ryan Khoo',
    headline: 'Full Stack Developer',
    location: 'Penang, Malaysia',
    offDutyHeadline: 'Explorer · Foodie · Learner',
    about: 'A computer science graduate who is exposed to various tools and skills, also blockchain or web3 knowledge. Two years of remote corporate experience and freelance community manager. Previously involved in blockchain and e-commerce projects.',
    stats: { years: '3+ Years', projects: '10+ Projects', countries: '15 Countries' },
    sections: {
      techStack: '⚡ Tech Stack',
      about: '👤 About',
      travelMap: '🌍 Travel Map',
      instagram: '📷 Instagram',
      tiktok: '🎵 TikTok',
      social: '📱 Social',
      linkedin: '🔗 LinkedIn',
    },
    techStack: ['JavaScript', 'React', 'Node.js', 'Python', 'Blockchain', 'Web3', 'Solidity', 'GitLab', 'Scrum', 'Agile', 'Graylog', 'Burp Suite', 'AWS', 'Salesforce', 'Oracle Siebel', 'Microservices'],
    linkedinButton: 'Connect on LinkedIn',
    contactEmail: 'engineeroffduty@icloud.com',
    footer: 'Ryan © 2026',
    onDuty: '👔 On Duty',
    offDuty: '🏖️ Off Duty',
    contactLinkedIn: '💼 LinkedIn',
    contactGitHub: '🐙 GitHub',
    contactEmailLabel: '✉️ Email',
  },
  zh: {
    name: '邱鼎砷',
    headline: '全栈工程师',
    location: '马来西亚，槟城',
    offDutyHeadline: '探索者 · 美食家 · 学习者',
    about: '一位计算机科学专业的毕业生，具有接触多种工具和技能的经验，同时具备区块链和Web3知识。拥有两年的远程工作经验，同时从事自由职业社区管理工作。此前曾参与过区块链和电商项目。',
    stats: { years: '3+ 年', projects: '10+ 项目', countries: '15 个国家' },
    sections: {
      techStack: '⚡ 技术栈',
      about: '👤 关于我',
      travelMap: '🌍 旅行地图',
      instagram: '📷 Instagram',
      tiktok: '🎵 TikTok',
      social: '📱 社交媒体',
      linkedin: '🔗 LinkedIn',
    },
    techStack: ['JavaScript', 'React', 'Node.js', 'Python', '区块链', 'Web3', 'Solidity', 'GitLab', 'Scrum', '敏捷', 'Graylog', 'Burp Suite', 'AWS', 'Salesforce', 'Oracle Siebel', '微服务'],
    linkedinButton: '在 LinkedIn 上联系',
    contactEmail: 'engineeroffduty@icloud.com',
    footer: '邱鼎砷 © 2026',
    onDuty: '👔 工作模式',
    offDuty: '🏖️ 下班模式',
    contactLinkedIn: '💼 LinkedIn',
    contactGitHub: '🐙 GitHub',
    contactEmailLabel: '✉️ 电子邮件',
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
