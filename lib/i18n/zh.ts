import type { Dictionary } from "./en";

/*
 * Simplified Chinese copy. Same shape as en.ts — TypeScript will flag any missing key.
 * DRAFT, machine-assisted translation (24 Nov 2026); have a native speaker
 * review before launch. Legal documents and the newsletter stay in English.
 * The language menu labels live in ./index.ts (LANGUAGES), not here.
 */

const zh: Omit<Dictionary, "lang"> = {
  meta: {
    siteDescription: "Screendibs Technologies Inc. — 发现文学知识产权，评估其改编为电影、电视、流媒体和游戏的价值。",
    aboutTitle: "关于我们",
    aboutDescription: "Screendibs 让娱乐行业发现和评估可改编知识产权的过程更高效、更有条理、更具可操作性。",
    teamTitle: "团队",
    teamDescription: "Screendibs 背后的人。",
    contactTitle: "联系",
    contactDescription: "与 Screendibs 交流。",
    newsletterTitle: "通讯",
    newsletterDescription: "Screendibs 周刊：每周五带来四个关于图书、版权和影视改编的故事。"
  },
  nav: {
    company: "公司",
    about: "关于我们",
    team: "团队",
    newsletter: "通讯",
    contact: "联系",
    home: "Screendibs — 首页",
    primary: "主导航"
  },
  footer: {
    label: "页脚",
    terms: "条款",
    privacy: "隐私",
    disclaimer: "免责声明",
    platform: "平台",
    place: "加拿大蒙特利尔。",
    social: "在 {network} 上关注 Screendibs"
  },
  contactBlock: {
    emailLabel: "邮箱地址",
    button: "申请使用",
    linkOut: "前往联系页面 →"
  },
  widgets: {
    search: "搜索",
    thinking: "正在翻书架……",
    found: "找到了",
    facts: "IP 小知识",
    total: "共计",
    scrollDown: "向下滚动",
    reel: {
      play: "播放",
      pause: "暂停",
      soundOn: "打开声音",
      soundOff: "关闭声音"
    }
  },
  hero: {
    title: "为改编精选的 IP 版权。"
  },
  home: {
    whatIndex: "01 — 做什么",
    whatTitle: "我们为改编发掘并呈现精选的 IP 版权。",
    whatLede: "Screendibs Technologies Inc. 正在文学与娱乐行业开辟新路。我们的使命是简化寻找和获取图书、漫画、电子游戏及其他有价值 IP 改编权的流程。依托一个超过 1 亿个来源的数据库，我们的高级搜索功能让用户找到想要的作品。用户可以查询改编权状态，并在需要时获取版权方的联系方式。",
    pillars: [
      {
        tone: "sage",
        title: "AI 搜索",
        body: "超越简单的关键词搜索。将您项目的故事梗概、风格或方案，与庞大的现有作品数据库进行概念匹配。"
      },
      {
        tone: "coral",
        title: "版权清晰",
        body: "即时查看匹配作品是否属于公有领域，或找到经过核实的版权方、经纪人和出版社。"
      },
      {
        tone: "peri",
        title: "生成报告",
        body: "生成由 AI 汇编的详尽尽职调查报告，涵盖改编权历史、权利链和市场分析。"
      }
    ],
    howIndex: "02 — 怎么做",
    howTitle: "我们的流程。",
    steps: [
      {
        title: "搜索",
        body: "用自然语言描述您的创意或方案，我们的 AI 引擎会识别并匹配精选的文学作品。"
      },
      {
        title: "查询",
        body: "核实 IP 改编权状态（包括公有领域），并找到版权方及其代理人的联系方式。"
      },
      {
        title: "报告",
        body: "导出可交给投资方的深度 IP 报告，详述作品、改编权、权利链及可比市场分析。"
      }
    ],
    tourLabel: "观看",
    tourTitle: "完整导览。",
    tourBody: "每一部伟大的改编都始于一本书。搜索它、给它打分，然后拿到报告：一页、三页或五页。",
    tourAlt: "Screendibs 短片：搜索《弗兰肯斯坦》，其可改编性评分为 94/100，以及一页、三页和五页报告。",
    whoIndex: "03 — 我们是谁",
    whoStatement: [
      "Screendibs 立足于",
      "科技、文学与娱乐的交汇点。"
    ],
    whoPara: "2021 年，我们的创始人与一家好莱坞大型制片厂达成了一项图书影视改编权交易。随后，他决定重塑这一流程，借助新一代技术让这些信息更容易获取。Screendibs 是一家 21 世纪的公司，团队由电影、软件和法律专业人士组成，致力于解决有价值的文学作品与寻找它们的人之间长期存在的脱节。我们提供解决方案，让优质文学 IP 易于发现，让购买选择权变得简单。",
    whoPara2: "我们的跨学科团队分布在蒙特利尔和巴黎，汇聚了电影开发、版权、语义搜索技术和界面设计等领域数十年的经验，帮助客户在今天找到并改编明天的故事。",
    meetTeam: "认识团队",
    factsHeading: "既然来了，聊几件关于 IP 的事。",
    clientsLabel: "我们的客户包括",
    clients: [
      "影视制作公司",
      "独立制片人",
      "流媒体制片厂",
      "编剧",
      "戏剧制作人",
      "剧作家",
      "游戏工作室",
      "游戏公司",
      "创业者",
      "等等"
    ],
    whyIndex: "04 — 为什么",
    pitches: [
      {
        tone: "coral",
        title: "正在寻找有价值 IP 的独立制片人？",
        body: "我们的平台帮助用户快速发现可供改编的图书、文章、漫画、电子游戏等，抢在竞争对手之前。"
      },
      {
        tone: "peri",
        title: "企业开发团队",
        body: "我们为企业客户提供实用的研究工具，帮助开发团队追踪和评估可改编的 IP。"
      }
    ],
    requestAccess: "申请使用",
    contactIndex: "05 — 联系",
    contactHeading: "申请使用发现平台。",
    contactNote: "如需目录集成或定制 API，请使用完整的联系表单。",
    whatSearches: [
      {
        query: "14 世纪意大利文学的奠基之作",
        answer: "但丁·阿利吉耶里的《神曲》，约 1320 年——俗语文学的奠基史诗，早已进入公有领域。"
      },
      {
        query: "现存最古老的印刷书籍",
        answer: "《金刚经》，公元 868 年印于中国——比古腾堡印刷机早五个多世纪。"
      },
      {
        query: "莎士比亚戏剧的版权现在归谁",
        answer: "没有人。莎士比亚的每一部戏剧都已进入公有领域数百年——尽情上演、印刷、改编。"
      },
      {
        query: "谁写了第一部小说",
        answer: "紫式部的《源氏物语》，约 1010 年——写于日本，比「小说」一词在其他地方出现早了几个世纪。"
      },
      {
        query: "现存最古老的英语史诗",
        answer: "《贝奥武甫》——创作于 8 至 11 世纪之间。作者不详，版权问题早已无从谈起。"
      },
      {
        query: "欧洲印刷的第一部重要书籍",
        answer: "古腾堡圣经，约 1455 年——西方第一部用活字印刷的重要书籍。"
      }
    ],
    howSearches: [
      {
        query: "一本书的版权什么时候到期",
        answer: "大多数司法辖区：作者终身加 70 年。有些更长——墨西哥 100 年，牙买加 95 年——所以同一部作品可能在一个国家属于公有领域，在另一个国家仍受保护。"
      },
      {
        query: "两个人能否对同一部公有领域作品主张权利",
        answer: "可以——原作人人可用，但它的某个译本、版本或改编作品可能拥有独立的权利。"
      },
      {
        query: "作品要满足什么条件才受版权保护",
        answer: "独创性和固定性——必须是您自己的表达，并且以某种形式记录下来，而不只是脑海中的想法。"
      },
      {
        query: "译本是否需要单独的权利",
        answer: "需要——译本本身就是一部创作。翻译一部公有领域小说不影响原作，但译本本身可以主张权利。"
      },
      {
        query: "未出版的手稿在作者去世后会怎样",
        answer: "仍然受保护——无论作品是否出版过，大多数司法辖区都适用同样的终身加 70 年期限。"
      },
      {
        query: "书名或一句话的设定能受版权保护吗",
        answer: "不能——书名、名称和短语通常太短，不符合条件。受保护的是表达，而不是创意。"
      }
    ],
    facts: [
      {
        label: "最古老的纠纷",
        text: "相传 6 世纪一位爱尔兰国王在一起诗篇抄本纠纷中裁定「牛犊归母牛，抄本归原书」——那位修士只得交出抄本。"
      },
      {
        label: "第一部法律",
        text: "英国 1710 年的《安妮法令》是第一部将权利授予作者而非印刷商的法律。"
      },
      {
        label: "最贵的手稿",
        text: "1994 年，比尔·盖茨以 3080 万美元购得达·芬奇的《莱斯特手稿》。"
      },
      {
        label: "最漫长的等待",
        text: "1928 年的《威利号汽船》受版权保护 95 年，米老鼠才于 2024 年 1 月 1 日进入美国公有领域。"
      },
      {
        label: "最大的反转",
        text: "《祝你生日快乐》收取授权费长达数十年——直到 2016 年一项裁决认定其版权主张从未真正成立。"
      },
      {
        label: "最慢的交接",
        text: "福尔摩斯在美国大部分已进入公有领域，但 20 世纪 20 年代的十个故事让这个角色的部分特征一直受保护到 2023 年。"
      },
      {
        label: "最奇怪的专利",
        text: "美国专利 5,443,036 号，1995 年授予：「一种让猫运动的方法」——用激光笔。"
      },
      {
        label: "没有已知卒年",
        text: "匿名和笔名作品按另一套时钟计算——通常从出版起算 70 到 95 年，而不是从一个无人记录的卒年起算。"
      },
      {
        label: "无需任何手续",
        text: "自 1886 年《伯尔尼公约》起，在世界大部分地区，作品一经固定即受版权保护——无需登记，无需标注。"
      },
      {
        label: "最长的保护期",
        text: "墨西哥给予作者去世后 100 年的保护，是世界上最长的之一。《伯尔尼公约》的底线只是终身加 50 年。"
      },
      {
        label: "第一个商标",
        text: "巴斯啤酒厂的红三角标志于 1876 年在英国注册——是世界上第一部商标法下登记的第一个商标。"
      },
      {
        label: "最漫长的投稿",
        text: "J.K. 罗琳于 1990 年写出第一份《哈利·波特》大纲。历经七年、十二次退稿，布鲁姆斯伯里出版社才接下它。"
      }
    ]
  },
  about: {
    eyebrow: "公司使命",
    mission: [
      "Screendibs 让娱乐行业发现和评估可改编知识产权的过程",
      "更高效、更有条理、更具可操作性",
      "。"
    ],
    missionTitle: "简化改编权的寻找过程。",
    missionParas: [
      "Screendibs Technologies Inc. 正在文学与娱乐行业开辟新路。我们让寻找和获取图书、漫画、电子游戏及其他有价值 IP 的改编权变得更简单。",
      "我们的搜索覆盖一个超过 1 亿个来源的数据库。用户可以找到想要的作品，查看其改编权状态，并在需要时获取版权方的联系方式。"
    ],
    customersTitle: "我们服务谁。",
    customers: "我们的客户包括影视制作公司、独立制片人、流媒体制片厂、编剧、戏剧制作人、剧作家、游戏工作室和游戏公司、创业者等。",
    platformTitle: "正在寻找有价值 IP 的独立制片人？",
    platformParas: [
      "我们的平台帮助用户快速发现可供改编的图书、文章、漫画、电子游戏等，抢在竞争对手之前。",
      "对于企业客户，我们提供研究工具，让开发团队追踪和评估可改编的 IP。"
    ],
    ctaHeading: "找到您的下一部改编作品。",
    ctaNote: "更想聊一聊？"
  },
  team: {
    eyebrow: "Screendibs",
    title: "Sd* 团队",
    stats: [
      {
        value: "2021",
        label: "首个制片厂改编交易"
      },
      {
        value: "3",
        label: "专业领域：电影、软件、法律"
      },
      {
        value: "2",
        label: "基地：蒙特利尔和巴黎"
      }
    ],
    members: {
      john: {
        role: "联合创始人兼 CEO",
        bio: [
          "John Feifer 是一位电影人，多年从事影视知识产权收购。当他在本地图书馆的书架上发现梦寐以求的那本书时，拿下改编权仍花了将近一年。",
          "在 Screendibs，John 正在打造一个让好故事更容易被发现、更容易被收购的平台——帮助制片人和电影人更快、更省钱、更顺畅地获取有价值的 IP。"
        ],
        quoteNote: "第二幕第七场"
      },
      jonathan: {
        role: "联合创始人，法务与公司事务",
        bio: [
          "Jonathan Nuss 是一名公司与商事律师，拥有十余年为企业和机构提供交易、融资、治理及监管事务咨询的经验。在创办自己的律所之前，他曾在 Dentons 和 Heenan Blaikie 执业。",
          "在 Screendibs，Jonathan 运用法律和战略经验支持平台的开发与商业合作——帮助打造一个连接创作者与制片人的、更透明、更易进入的市场。"
        ],
        quoteNote: "1958"
      },
      benjamin: {
        role: "COO",
        bio: [
          "Benjamin Coriat 是一名 AI 工程师和量化研究员，曾在法国巴黎银行从事金融市场工作。他的研究曾在 IJCAI 和 ACM ICAIF 上发表。",
          "在 Screendibs，Benjamin 负责平台的设计与工程——语义搜索、版权核查工具和尽职调查报告——让寻找合适的故事变得毫不费力。"
        ],
        quoteNote: "1954"
      }
    },
    ctaHeading: "抢先锁定它。"
  },
  contact: {
    eyebrow: "Screendibs",
    title: "联系我们。",
    lede: "无论您是在寻找新素材的制片人、推广版权目录的经纪人，还是有故事要讲的作家，我们都期待您的来信。我们的团队会在 1–2 个工作日内回复。",
    name: "姓名",
    email: "邮箱",
    org: "机构",
    message: "请介绍您的目录或开发需求。",
    send: "发送",
    beta: "我们的平台目前处于内测阶段。给我们留言即可申请抢先体验。",
    details: {
      general: "一般咨询",
      press: "媒体",
      careers: "招聘"
    },
    studio: "工作室",
    studioPlace: "加拿大蒙特利尔",
    visits: "参观需预约。"
  },
  newsletter: {
    eyebrow: "Sd* 通讯",
    title: "通讯",
    lede: "每周带来关于图书、版权和影视改编的行业洞察与故事。每周五发布新一期。",
    weekOf: "周：",
    latest: "最新",
    archiveTitle: "全部期刊",
    empty: "第一期即将推出。",
    englishOnly: "通讯目前仅以英文发布。"
  },
  legal: {
    tabsLabel: "法律文件",
    tabs: {
      terms: "网站条款",
      "platform-terms": "平台条款",
      privacy: "隐私",
      cookies: "Cookie",
      disclaimer: "免责声明"
    },
    englishOnly: "这些文件目前仅提供英文版。"
  }
};

export default zh;
