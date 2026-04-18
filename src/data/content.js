export const profile = {
  name: "Ritick Srivastava",
  tagline: "I turn data into decisions. And decisions into revenue.",
  role: "GTM Analyst & Data Scientist",
  company: "HackerRank",
  summary:
    "I sit at the intersection of data science and go-to-market strategy — running experiments, modeling funnels, and turning ambiguous data into decisions that move revenue.",
  resumeUrl:
    "https://drive.google.com/file/d/1727LrDxEj7JGmI944DUh776vZdQFu-BI/view?usp=sharing",
  email: "riticksrivastava.2000@gmail.com",
  linkedin: "https://www.linkedin.com/in/ritick-srivastava",
  github: "https://github.com/Ritick-Srivastava",
  phone: "+91-8958645175",
};

export const impactStats = [
  {
    value: "$1M+",
    label: "ARR Impact",
    story:
      "Built revenue forecasting models for self-serve products using historical and funnel trends — directly contributing to annual ARR growth.",
  },
  {
    value: "2.5%",
    label: "Conversion Rate",
    story:
      "Signup-to-paid was under 1%. Diagnosed the funnel, filtered low-intent signups, redesigned activation flows. Now it's 2.5%.",
  },
  {
    value: "100K+",
    label: "Experiment Visitors",
    story:
      "Owned experimentation analytics for high-traffic self-serve surfaces — defining success metrics and driving ship/kill decisions from A/B tests.",
  },
  {
    value: "1,300+",
    label: "Customer Accounts",
    story:
      "Analyzed pipeline coverage, conversion dynamics, and cohort-based marketing performance across the full customer base.",
  },
];

export const experience = [
  {
    company: "HackerRank",
    location: "Bangalore, India",
    roles: [
      {
        title: "GTM Analyst – Data Science & Analytics",
        period: "Jul 2023 – Present",
        summary:
          "Own experimentation, forecasting, and exec-facing analytics across self-serve and full-serve GTM. Built the analytical frameworks the business runs on.",
        tools: ["Python", "SQL", "Redshift", "dbt", "Bayesian Inference", "Looker"],
        highlights: [
          {
            text: "Defined and scaled core product KPIs across high-traffic self-serve surfaces (100K+ monthly users), improving signup-to-paid conversion from <1% to 2.5%.",
            tags: ["Funnel Analysis", "KPI Design"],
          },
          {
            text: "Designed experimentation frameworks — hypothesis framing, guardrail metrics, power analysis, and statistical validation — for ship/kill decisions.",
            tags: ["A/B Testing", "Bayesian Inference"],
          },
          {
            text: "Built revenue and activation forecasting models contributing to $1M+ annual ARR impact.",
            tags: ["Forecasting", "Python"],
          },
          {
            text: "Conducted pricing impact analysis using pre/post experimental methods, informing a pricing rollback that added $180K QoQ forward ARR.",
            tags: ["Causal Inference", "Pricing Analytics"],
          },
          {
            text: "Prepared quarterly board presentations covering usage, multi-product adoption, net dollar retention, and market coverage.",
            tags: ["Exec Analytics", "Storytelling"],
          },
          {
            text: "Analyzed product adoption and multi-product usage patterns to inform roadmap prioritization and cross-sell strategy.",
            tags: ["Product Analytics", "Segmentation"],
          },
          {
            text: "Built SQL Bot ('SQL Up') — automated basic SQL queries for account managers and sales reps needing quick data pulls.",
            tags: ["Automation", "SQL"],
          },
          {
            text: "Supported enterprise deals and RFPs with data stories around value realization and expansion potential.",
            tags: ["Data Storytelling", "Enterprise"],
          },
        ],
      },
      {
        title: "BI Report Analyst",
        period: "Jul 2022 – Jun 2023",
        summary:
          "Built the reporting backbone — sales pipeline dashboards, marketing analytics, product usage models, and the centralized data infrastructure multiple teams depend on.",
        tools: ["SQL", "Redshift", "Looker", "dbt", "Tableau"],
        highlights: [
          {
            text: "Built 4 types of sales pipeline dashboards: weekly tracking, quarter-over-quarter comparison, target tracking, and snapshot movement analysis.",
            tags: ["Pipeline Analytics", "Looker"],
          },
          {
            text: "Automated previously manual sales pipeline reports — added filters, drill-downs, and exec-friendly views.",
            tags: ["Automation", "BI"],
          },
          {
            text: "Created cohort-level and time-series upper funnel dashboards, plus key marketing performance metrics.",
            tags: ["Cohort Analysis", "Marketing Analytics"],
          },
          {
            text: "Designed a company-wide product usage matrix — adopted by Sales, Product, and Finance to understand market trends and account-level value realization.",
            tags: ["Product Analytics", "Cross-functional"],
          },
          {
            text: "Built centralized behavioral data models in Redshift across 3,000+ customer accounts — source of truth for churn monitoring, expansion, and lifecycle reporting.",
            tags: ["Redshift", "Data Modeling"],
          },
          {
            text: "Led data migration from global DB to replica DB for performance and reliability improvements.",
            tags: ["Data Infrastructure", "Migration"],
          },
          {
            text: "Supported weekly Sales Call (CRO-led) and built metrics for the CEO's annual company kick-off presentation.",
            tags: ["Exec Support", "Storytelling"],
          },
        ],
      },
      {
        title: "Product Analyst Intern",
        period: "Jan 2022 – Jun 2022",
        summary:
          "First role at HackerRank — learned the data stack, built account-level reports for enterprise clients, and shipped my first production dashboards.",
        tools: ["Redash", "Looker", "SQL"],
        highlights: [
          {
            text: "Built account-level reporting for key enterprise accounts including JPMC and Goldman Sachs.",
            tags: ["Enterprise Reporting", "SQL"],
          },
          {
            text: "Reported on plagiarism detection and related metrics across HackerRank's platform.",
            tags: ["Product Metrics", "Reporting"],
          },
          {
            text: "Created a dashboard tracking Test Templates feature adoption and response rates.",
            tags: ["Feature Adoption", "Looker"],
          },
          {
            text: "Built Redash queries to fetch and surface data for key account reviews.",
            tags: ["Redash", "SQL"],
          },
        ],
      },
    ],
  },
  {
    company: "ANS Commerce",
    location: "Remote (Gurugram, India)",
    roles: [
      {
        title: "Data Analyst Intern",
        period: "Jul 2021 – Dec 2021",
        summary:
          "Built reporting pipelines and real-time alerts across marketing and ops — reduced data turnaround by 80% and ad overspend by 25%.",
        tools: ["Tableau", "SQL", "Python", "Excel"],
        highlights: [
          {
            text: "Built scalable reporting pipelines reducing data turnaround time by 80%, improving operational decision speed.",
            tags: ["Automation", "Python"],
          },
          {
            text: "Developed dashboards tracking 50+ funnel and performance metrics across marketing and product surfaces.",
            tags: ["Tableau", "BI"],
          },
          {
            text: "Designed real-time alert systems to detect anomalous campaign performance, reducing overspend by 25%.",
            tags: ["Alerting", "Analytics"],
          },
          {
            text: "Created structured funnel reporting to monitor acquisition quality, user behavior, and conversion trends.",
            tags: ["Funnel Analysis", "Reporting"],
          },
        ],
      },
    ],
  },
];

export const projects = [
  {
    title: "Onboarding Experimentation System",
    question:
      "How do you decide whether an onboarding change actually works — without guessing?",
    description:
      "An end-to-end system for simulating and analyzing onboarding experiments, from synthetic data generation to automated ship/kill recommendations.",
    details: [
      "Synthetic data simulation with configurable effect sizes for Control and Treatment groups.",
      "Statistical decision framework using hypothesis testing for automated Ship/No-Ship calls.",
      "Guardrail monitoring ensuring primary metric gains don't sacrifice signup volume or engagement.",
    ],
    tags: ["Bayesian Inference", "Frequentist Approach", "A/B Testing", "Python"],
    github: "https://github.com/Ritick-Srivastava/onboarding-experimentation-system",
    demo: "https://Ritick-Srivastava.github.io/onboarding-experimentation-system/",
    image: "projects/onboarding-system.png",
  },
  {
    title: "Customer Churn Prediction",
    question:
      "Which customers are about to leave — and what behavioral patterns predict it?",
    description:
      "Churn prediction models using logistic regression, tree-based methods, and Cox Proportional Hazards to identify at-risk customers.",
    details: [
      "Interpreted hazard ratios and survival curves to find behavioral drivers of churn.",
      "Informed targeted retention strategies through survival analysis.",
    ],
    tags: ["Survival Analysis", "Scikit-Learn", "Pandas"],
    github: null,
    demo: null,
    image: null,
    comingSoon: true,
  },
];

export const skills = {
  analytical: [
    "Funnel & Cohort Analysis",
    "Retention/Churn Analytics",
    "Time-Series Analysis",
    "Experimentation",
    "Hypothesis Testing",
    "Causal Inference",
    "KPI Design & Measurement",
    "Power Analysis",
    "Behavioural Segmentation",
    "Revenue Forecasting",
    "Activation & North Star Metrics",
  ],
  applied: [
    "Product Analytics",
    "Pricing Analytics",
    "Pipeline & Sales Analytics",
    "Marketing Analytics",
    "Data Modeling",
    "Data Storytelling",
  ],
  libraries: [
    "NumPy",
    "pandas",
    "SciPy",
    "scikit-learn",
    "statsmodels",
    "Matplotlib",
    "Seaborn",
    "Plotly",
  ],
  tools: [
    "SQL",
    "Python",
    "Looker",
    "Tableau",
    "Power BI",
    "Redash",
    "Excel",
    "FullStory",
    "Airflow",
    "dbt",
    "AWS (S3, Redshift)",
    "Salesforce",
    "Pendo",
    "ChurnZero",
  ],
};

export const education = {
  institution: "BITS Pilani",
  degree: "BE in Electronics and Communication",
  period: "Aug 2018 – May 2022",
};
