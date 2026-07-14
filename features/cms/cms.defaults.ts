import { CmsLocale, HomeCmsContent, LocaleCmsContent } from "@/types/cms.types";

const partnerTickerLogos = [
  "/microsoft.svg",
  "/microsoft.svg",
  "/microsoft.svg",
  "/microsoft.svg",
  "/microsoft.svg",
  "/microsoft.svg",
];

const enHowItWorksSteps = [
  {
    title: "Create an account",
    description: "Sign up for free and start using our platform to find your dream job.",
    icon: "/user-plus.svg",
  },
  {
    title: "Discover Opportunities",
    description: "Get matched with high-growth companies using our intelligent AI engine.",
    icon: "/chart-column-increasing.svg",
  },
  {
    title: "Get Hired",
    description: "Connect with hiring managers directly and land your dream role.",
    icon: "/handshake.svg",
  },
];

const enWhyChooseUsCards = [
  {
    image: "/whyChooseUs1.svg",
    title: "Smart Matching",
    description:
      "Our neural network matches talent based on technical skills and cultural fit with 94% accuracy.",
  },
  {
    image: "/whyChooseUs2.svg",
    title: "App Management",
    description:
      "Centralized pipeline for tracking every applicant from initial screening to final offer letter.",
  },
  {
    image: "/whyChooseUs3.svg",
    title: "Employer Branding",
    description:
      "Custom career pages that perfectly reflect your company's aesthetic and values.",
  },
  {
    image: "/whyChooseUs4.svg",
    title: "Rich Analytics",
    description:
      "Deep insights into your hiring funnel with predictive data on candidate conversion.",
  },
];

const arHowItWorksSteps = [
  {
    title: "أنشئ حساباً",
    description: "سجّل مجاناً وابدأ باستخدام منصتنا للعثور على وظيفة أحلامك.",
    icon: "/user-plus.svg",
  },
  {
    title: "اكتشف الفرص",
    description: "احصل على توافق مع شركات سريعة النمو عبر محرك الذكاء الاصطناعي.",
    icon: "/chart-column-increasing.svg",
  },
  {
    title: "احصل على الوظيفة",
    description: "تواصل مباشرة مع مديري التوظيف وانضم إلى دورك المثالي.",
    icon: "/handshake.svg",
  },
];

const arWhyChooseUsCards = [
  {
    image: "/whyChooseUs1.svg",
    title: "مطابقة ذكية",
    description: "شبكتنا العصبية تطابق المواهب بناءً على المهارات والتوافق الثقافي بدقة 94%.",
  },
  {
    image: "/whyChooseUs2.svg",
    title: "إدارة التطبيقات",
    description: "مسار مركزي لتتبع كل متقدم من الفحص الأولي حتى عرض العمل النهائي.",
  },
  {
    image: "/whyChooseUs3.svg",
    title: "علامة صاحب العمل",
    description: "صفحات وظائف مخصصة تعكس هوية شركتك وقيمها بشكل مثالي.",
  },
  {
    image: "/whyChooseUs4.svg",
    title: "تحليلات متقدمة",
    description: "رؤى عميقة لمسار التوظيف مع بيانات تنبؤية حول تحويل المرشحين.",
  },
];

const enDefaults: LocaleCmsContent = {
  general: {
    siteName: "Jobify",
    siteDescription:
      "Connecting talented professionals with leading companies worldwide.",
    keywords:
      "jobs, careers, hiring, job board, recruitment, talent, employers, job search",
    faviconUrl: "/jobify-logo.svg",
    ogImageUrl: "/career-card.png",
    supportEmail: "support@jobify.com",
    footerTagline: "Built for modern hiring.",
    footerCopyright: "© {year} Jobify. All rights reserved.",
  },
  home: {
    banner: {
      title: "The Platform for",
      titleHighlight: "Elite Career Growth",
      description:
        "Connecting world-class talent with the most innovative companies on the planet. Your next architectural masterpiece or engineering breakthrough starts here.",
      cta: "Explore Jobs",
      ctaSecondary: "Browse Categories",
      ctaHref: "/jobs",
      ctaSecondaryHref: "/categories",
    },
    partnerTickerTitle: "Partnering with Industry Leaders",
    partnerTickerLogos,
    ourValue: {
      title: "Our Values",
      description:
        "Define your career path or team with a platform that delivers real, measurable results at every step.",
    },
    howItWorks: {
      title: "How It Works",
      description:
        "Our platform is designed to help you find your dream job and grow your career.",
      steps: enHowItWorksSteps,
    },
    whyChooseUs: {
      title: "Why Companies Choose Us",
      description:
        "We provide a cutting-edge and advanced platform for companies to find the best talent to achieve their professional success.",
      cards: enWhyChooseUsCards,
    },
    featurePath: {
      title: "Feature Path",
      description: "The career path that suits you and helps you grow your career.",
      cta: "Explore Jobs",
    },
    testimonials: {
      title: "Hear it from the community.",
      subtitle: "Testimonials",
      description:
        "Join over 50,000 professionals who have leveled up their careers through Jobify's platform.",
    },
    stats: [
      { title: "Active Jobs", valueNumber: "8,612+" },
      { title: "Registered Candidates", valueNumber: "2,176+" },
      { title: "Hiring Companies", valueNumber: "578+" },
      { title: "Successful Hires", valueNumber: "3,876+" },
    ],
  },
  about: {
    hero: {
      subtitle: "About Jobify",
      title: "Building the future of",
      titleHighlight: "modern hiring",
      description:
        "Jobify connects ambitious professionals with companies that value talent, growth, and meaningful work. We make hiring clearer, faster, and more human.",
    },
    mission: {
      missionTitle: "Our Mission",
      missionDescription:
        "To empower people and companies to find the right match through a transparent, intelligent, and accessible hiring platform.",
      visionTitle: "Our Vision",
      visionDescription:
        "A world where every professional can discover opportunities that fit their skills, values, and ambitions — and every company can build teams that thrive.",
    },
    values: {
      title: "What we stand for",
      description:
        "These principles guide how we build Jobify and how we serve candidates and employers every day.",
      items: [
        {
          key: "people-first",
          title: "People first",
          description:
            "We design for real people — job seekers building careers and teams building companies.",
        },
        {
          key: "transparency",
          title: "Transparency",
          description:
            "Clear job details, honest communication, and straightforward processes at every step.",
        },
        {
          key: "trust",
          title: "Trust",
          description:
            "We protect user data, verify opportunities, and create a safe space for professional growth.",
        },
        {
          key: "innovation",
          title: "Innovation",
          description:
            "We continuously improve matching, discovery, and tools to make hiring smarter.",
        },
      ],
    },
    story: {
      title: "Our story",
      description: "From a simple idea to a platform trusted by thousands.",
      content:
        "Jobify started with a clear observation: great talent and great companies were often missing each other. Complicated processes, scattered listings, and unclear expectations slowed everyone down. We built Jobify to bring clarity — one place to discover roles, explore companies, apply with confidence, and hire with purpose. Today, we continue to refine that experience for candidates and recruiters across the region and beyond.",
    },
    cta: {
      title: "Ready to take the next step?",
      description:
        "Whether you're looking for your next role or your next hire, Jobify is built to help you move forward.",
      browseJobs: "Browse Jobs",
      browseCompanies: "Browse Companies",
    },
  },
  contact: {
    hero: {
      subtitle: "Contact Us",
      title: "Let's start a",
      titleHighlight: "conversation",
      description:
        "Have a question about Jobify, partnerships, or support? Send us a message and our team will get back to you as soon as possible.",
    },
    info: {
      title: "Contact information",
      emailTitle: "Email",
      emailValue: "support@jobify.com",
      locationTitle: "Location",
      locationValue: "Damascus, Syria",
      hoursTitle: "Support hours",
      hoursValue: "Sunday – Thursday, 9:00 AM – 6:00 PM (Damascus time)",
      supportTitle: "Need quick help?",
      supportDescription:
        "For job applications and account issues, include your registered email so we can assist you faster.",
    },
  },
};

const arDefaults: LocaleCmsContent = {
  general: {
    siteName: "Jobify",
    siteDescription: "نربط المحترفين الموهوبين بأفضل الشركات حول العالم.",
    keywords:
      "وظائف, توظيف, بحث عن عمل, فرص عمل, شركات, مواهب, لوحة وظائف, توظيف محترفين",
    faviconUrl: "/jobify-logo.svg",
    ogImageUrl: "/career-card.png",
    supportEmail: "support@jobify.com",
    footerTagline: "صُمم للتوظيف الحديث.",
    footerCopyright: "© {year} Jobify. جميع الحقوق محفوظة.",
  },
  home: {
    banner: {
      title: "المنصة لـ",
      titleHighlight: "النمو المهني المتميز",
      description:
        "نربط أفضل المواهب مع أكثر الشركات ابتكاراً في العالم. تحفتك المعمارية القادمة أو اختراقك الهندسي يبدأ هنا.",
      cta: "استكشف الوظائف",
      ctaSecondary: "تصفح الفئات",
      ctaHref: "/jobs",
      ctaSecondaryHref: "/categories",
    },
    partnerTickerTitle: "شراكة مع رواد الصناعة",
    partnerTickerLogos,
    ourValue: {
      title: "قيمنا",
      description:
        "حدد مسارك المهني أو فريقك مع منصة تحقق نتائج حقيقية وقابلة للقياس في كل خطوة.",
    },
    howItWorks: {
      title: "كيف يعمل",
      description: "منصتنا مصممة لمساعدتك في العثور على وظيفة أحلامك وتطوير مسيرتك المهنية.",
      steps: arHowItWorksSteps,
    },
    whyChooseUs: {
      title: "لماذا تختارنا الشركات",
      description:
        "نوفر منصة متطورة ومتقدمة للشركات للعثور على أفضل المواهب لتحقيق نجاحها المهني.",
      cards: arWhyChooseUsCards,
    },
    featurePath: {
      title: "مسار الميزات",
      description: "المسار المهني الذي يناسبك ويساعدك على تطوير مسيرتك.",
      cta: "استكشف الوظائف",
    },
    testimonials: {
      title: "اسمع من المجتمع.",
      subtitle: "آراء العملاء",
      description:
        "انضم إلى أكثر من 50,000 محترف طوروا مسيرتهم المهنية عبر منصة Jobify.",
    },
    stats: [
      { title: "وظائف نشطة", valueNumber: "8,612+" },
      { title: "مرشحون مسجلون", valueNumber: "2,176+" },
      { title: "شركات توظف", valueNumber: "578+" },
      { title: "توظيفات ناجحة", valueNumber: "3,876+" },
    ],
  },
  about: {
    hero: {
      subtitle: "عن Jobify",
      title: "نبني مستقبل",
      titleHighlight: "التوظيف الحديث",
      description:
        "تربط Jobify المحترفين الطموحين بالشركات التي تقدّر المواهب والنمو والعمل الهادف. نجعل التوظيف أوضح وأسرع وأكثر إنسانية.",
    },
    mission: {
      missionTitle: "مهمتنا",
      missionDescription:
        "تمكين الأفراد والشركات من إيجاد التوافق المناسب عبر منصة توظيف شفافة وذكية ومتاحة للجميع.",
      visionTitle: "رؤيتنا",
      visionDescription:
        "عالم يستطيع فيه كل محترف اكتشاف فرص تناسب مهاراته وقيمه وطموحاته — وكل شركة بناء فرق مزدهرة.",
    },
    values: {
      title: "ما نؤمن به",
      description:
        "هذه المبادئ توجه كيف نبني Jobify وكيف نخدم المرشحين وأصحاب العمل كل يوم.",
      items: [
        {
          key: "people-first",
          title: "الإنسان أولاً",
          description:
            "نصمم لأشخاص حقيقيين — باحثين عن عمل يبنون مسيرتهم وفرق تبني شركاتها.",
        },
        {
          key: "transparency",
          title: "الشفافية",
          description: "تفاصيل وظيفية واضحة وتواصل صادق وعمليات مباشرة في كل خطوة.",
        },
        {
          key: "trust",
          title: "الثقة",
          description:
            "نحمي بيانات المستخدمين ونتحقق من الفرص ونخلق مساحة آمنة للنمو المهني.",
        },
        {
          key: "innovation",
          title: "الابتكار",
          description: "نحسّن باستمرار المطابقة والاكتشاف والأدوات لجعل التوظيف أذكى.",
        },
      ],
    },
    story: {
      title: "قصتنا",
      description: "من فكرة بسيطة إلى منصة يثق بها الآلاف.",
      content:
        "بدأت Jobify بملاحظة واضحة: المواهب العظيمة والشركات العظيمة كثيراً ما تفوت بعضها البعض. العمليات المعقدة والقوائم المتفرقة والتوقعات غير الواضحة أبطأت الجميع. بنينا Jobify لجلب الوضوح — مكان واحد لاكتشاف الأدوار واستكشاف الشركات والتقديم بثقة والتوظيف بهدف.",
    },
    cta: {
      title: "مستعد للخطوة التالية؟",
      description:
        "سواء كنت تبحث عن دورك التالي أو موظفك التالي، Jobify مبنية لمساعدتك على المضي قدماً.",
      browseJobs: "تصفح الوظائف",
      browseCompanies: "تصفح الشركات",
    },
  },
  contact: {
    hero: {
      subtitle: "اتصل بنا",
      title: "لنبدأ",
      titleHighlight: "محادثة",
      description:
        "لديك سؤال عن Jobify أو الشراكات أو الدعم؟ أرسل لنا رسالة وسيتواصل معك فريقنا في أقرب وقت ممكن.",
    },
    info: {
      title: "معلومات التواصل",
      emailTitle: "البريد الإلكتروني",
      emailValue: "support@jobify.com",
      locationTitle: "الموقع",
      locationValue: "دمشق، سوريا",
      hoursTitle: "ساعات الدعم",
      hoursValue: "الأحد – الخميس، 9:00 صباحاً – 6:00 مساءً (بتوقيت دمشق)",
      supportTitle: "تحتاج مساعدة سريعة؟",
      supportDescription:
        "للاستفسارات المتعلقة بالتقديم على الوظائف أو الحساب، يرجى تضمين بريدك الإلكتروني المسجل لنتمكن من مساعدتك بشكل أسرع.",
    },
  },
};

export const CMS_DEFAULTS: Record<CmsLocale, LocaleCmsContent> = {
  en: enDefaults,
  ar: arDefaults,
};

export const CMS_SLUG = "site-content";

export function isCmsLocale(value: string): value is CmsLocale {
  return value === "en" || value === "ar";
}

export function mergeHomeContent(
  home: Partial<HomeCmsContent> | undefined,
  locale: CmsLocale
): HomeCmsContent {
  const defaults = CMS_DEFAULTS[locale].home;
  if (!home) return defaults;

  return {
    ...defaults,
    ...home,
    banner: { ...defaults.banner, ...home.banner },
    ourValue: { ...defaults.ourValue, ...home.ourValue },
    howItWorks: {
      ...defaults.howItWorks,
      ...home.howItWorks,
      steps:
        home.howItWorks?.steps?.length
          ? home.howItWorks.steps
          : defaults.howItWorks.steps,
    },
    whyChooseUs: {
      ...defaults.whyChooseUs,
      ...home.whyChooseUs,
      cards:
        home.whyChooseUs?.cards?.length
          ? home.whyChooseUs.cards
          : defaults.whyChooseUs.cards,
    },
    featurePath: { ...defaults.featurePath, ...home.featurePath },
    testimonials: { ...defaults.testimonials, ...home.testimonials },
    stats: home.stats?.length ? home.stats : defaults.stats,
    partnerTickerLogos:
      home.partnerTickerLogos?.length
        ? home.partnerTickerLogos
        : defaults.partnerTickerLogos,
  };
}

export function mergeLocaleContent(
  content: Partial<LocaleCmsContent> | undefined,
  locale: CmsLocale
): LocaleCmsContent {
  const defaults = CMS_DEFAULTS[locale];
  if (!content) return defaults;

  return {
    general: { ...defaults.general, ...content.general },
    home: mergeHomeContent(content.home, locale),
    about: {
      ...defaults.about,
      ...content.about,
      hero: { ...defaults.about.hero, ...content.about?.hero },
      mission: { ...defaults.about.mission, ...content.about?.mission },
      values: {
        ...defaults.about.values,
        ...content.about?.values,
        items:
          content.about?.values?.items?.length
            ? content.about.values.items
            : defaults.about.values.items,
      },
      story: { ...defaults.about.story, ...content.about?.story },
      cta: { ...defaults.about.cta, ...content.about?.cta },
    },
    contact: {
      ...defaults.contact,
      ...content.contact,
      hero: { ...defaults.contact.hero, ...content.contact?.hero },
      info: { ...defaults.contact.info, ...content.contact?.info },
    },
  };
}
