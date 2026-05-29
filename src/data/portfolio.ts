import { Shield, Trophy, Award, Lock, type LucideIcon } from 'lucide-react';

// Certification badges
import crestCPSA from '../CREST-CPSA.png';
import crestCRT from '../CREST-CRT.png';
import giacGWAPT from '../GIAC-GWAPT.png';
import giacGPEN from '../GIAC-GPEN.png';
import giacGAWN from '../giacgawn.png';
import htbCPTS from '../HTB-CPTS.png';

// Bug bounty / VDP proof imagery
import hackeroneAustralia from '../HackerOne-Australia.jpeg';
import hackeroneHilton from '../HackerOne-Hilton.jpeg';
import hackeroneAdobe from '../HackerOne-Adobe.png';
import hackeroneWhoop from '../HackerOne-Whoop.png';
import waGov from '../WA-GOV.png';
import servicensw from '../servicensw.png';
import moad from '../moad.png';
import afsa from '../afsa.jpg';
import arc from '../arc.png';

// Case study media (optimized for web)
import credentialImg from '../cred-opt.jpg';
import captchaBypass from '../captcha-opt.mp4';

// Project Dark imagery
import boostExploitation from '../boost-opt.jpg';
import acsArticle from '../acs-article.png';

// Profile headshot
import headshot from '../headshot.jpg';

// Web development project screenshots (fresh 16:9 hero captures)
import rtt1 from '../web-rtt.png';
import subahireImage from '../web-subahire.jpg';
import supaping from '../web-supaping.jpg';
import aquaFlowPlumbing from '../web-aquaflow.png';
import aquaProCare from '../web-aquacare.png';
import documentSigning from '../web-docsign.png';
import portfolioWebsite from '../web-portfolio.png';

export const profile = {
  name: 'Daniel Farynski',
  role: 'Cybersecurity Consultant & Software Engineer',
  location: 'Australia',
  headshot,
  email: 'me@danielfarynski.com',
  phone: '+61 431 548 963',
  linkedin: 'https://linkedin.com/in/danielfarynski',
  tagline:
    'I find the vulnerabilities attackers exploit, and build the secure, scalable applications that close them.',
  about: [
    'Daniel Farynski is a cybersecurity consultant with a strong focus on application and API security and the secure software development lifecycle.',
    'His commitment to cybersecurity is a deep-rooted passion, exemplified by continuous efforts to secure businesses of all sizes, with notable bug bounty and vulnerability disclosure honours and commendations.',
    'That technical work is balanced by a commitment to crafting responsible defence and mitigation strategies, and to helping other developers build secure applications.',
  ],
};

export const headlineStats = [
  { value: '#1', label: 'WHOOP All-Time' },
  { value: '#3', label: 'HackerOne Australia 2025' },
  { value: '50+', label: 'Businesses assisted' },
  { value: '6', label: 'Gov VDP honours' },
];

export const certifications = [
  { name: 'CREST CPSA', description: 'Certified Penetration Testing Specialist', logo: crestCPSA },
  { name: 'CREST CRT', description: 'Certified Registered Tester', logo: crestCRT },
  { name: 'GIAC GWAPT', description: 'Web Application Penetration Tester', logo: giacGWAPT },
  { name: 'GIAC GPEN', description: 'Penetration Tester', logo: giacGPEN },
  { name: 'GIAC GAWN', description: 'Assessing & Auditing Wireless Networks', logo: giacGAWN },
  { name: 'HTB CPTS', description: 'Certified Penetration Testing Specialist', logo: htbCPTS },
];

export type Ranking = {
  title: string;
  ranking: string;
  period: string;
  description: string;
  icon: LucideIcon;
  image: string;
  link?: string;
  square?: boolean; // square/portrait logo — render larger so it isn't dwarfed by wide logos
};

export const bugBountyRankings: Ranking[] = [
  {
    title: 'HackerOne Australia',
    ranking: 'Rank #3',
    period: '2025',
    description:
      'Reached Rank #3 in Australia for 2025 on the HackerOne platform, demonstrating expertise in identifying and reporting critical vulnerabilities.',
    icon: Trophy,
    image: hackeroneAustralia,
  },
  {
    title: 'WHOOP Bug Bounty',
    ranking: 'Rank #1',
    period: 'All-Time',
    description:
      'Reached Rank #1 All-Time for the WHOOP BBP. Disclosures include authentication bypasses and lack of rate limiting.',
    icon: Trophy,
    image: hackeroneWhoop,
  },
  {
    title: 'Hilton Bug Bounty',
    ranking: 'Rank #2',
    period: '2025',
    description:
      'Reached Rank #2 for 2025 on the Hilton BBP. Findings include 1-click account takeover (ATO), CSRF, authentication bypasses, information disclosure and attack chains.',
    icon: Trophy,
    image: hackeroneHilton,
  },
  {
    title: 'Adobe Bug Bounty',
    ranking: 'Rank #10',
    period: '2025',
    description:
      'Reached Rank #10 for 2025 on the Adobe BBP. Findings include complex DNS-related issues allowing takeover of Adobe-owned subdomains.',
    icon: Trophy,
    image: hackeroneAdobe,
  },
  {
    title: 'WA Government VDP',
    ranking: 'Honour Board',
    period: 'Recognition',
    description:
      'Identified and disclosed a broken access control vulnerability, then assisted in remediation and re-testing.',
    icon: Award,
    image: waGov,
    square: true,
    link: 'https://www.wa.gov.au/government/publications/vulnerability-disclosure-policy#people-who-have-disclosed-vulnerabilities-to-us',
  },
  {
    title: 'Service NSW VDP',
    ranking: 'Honour Board',
    period: 'Recognition',
    description:
      'Disclosed a series of misconfigurations that allowed for the identification and exposure of passport numbers.',
    icon: Award,
    image: servicensw,
    link: 'https://www.service.nsw.gov.au/about-us/contact-us/vulnerability-disclosures',
  },
  {
    title: 'AFSA VDP',
    ranking: 'Honour Board',
    period: 'Recognition',
    description:
      'Disclosed a broken access control vulnerability which, if exploited, would have exposed over 60,000 users’ PII.',
    icon: Award,
    image: afsa,
    link: 'https://www.afsa.gov.au/about-us/about-our-site/online-security/afsas-security-vulnerability-disclosure-policy',
  },
  {
    title: 'Museum of Australian Democracy VDP',
    ranking: 'Honour Board',
    period: 'Recognition',
    description:
      'Disclosed an injection-based vulnerability that would have allowed attackers to send phishing emails from the @moadoph.gov.au domain.',
    icon: Award,
    image: moad,
    link: 'https://www.moadoph.gov.au/about/reports-policies-and-plans/policies-and-plans/vulnerability-disclosure-program',
  },
  {
    title: 'Australian Research Council VDP',
    ranking: 'Honour Board',
    period: 'Recognition',
    description:
      'Disclosed three vulnerabilities: an immediately exploitable CSRF vector, an injection-based attack, and broken access controls.',
    icon: Award,
    image: arc,
    link: 'https://www.arc.gov.au/about-arc/corporate-information/security-vulnerability-disclosure-policy',
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  impact: string;
  timeline: string;
  icon: LucideIcon;
  image?: string;
  video?: string;
  link: string;
  tags: string[];
  overview: string[];
  outcomes: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'credential-stuffing',
    title: 'Eradicating Australian Credential Stuffing',
    client: '50+ Australian Businesses',
    summary:
      'A pro-bono mission assisting over 50 Australian organisations actively exploited via credential stuffing.',
    impact: 'Protected 2K+ customer accounts',
    timeline: 'Ongoing',
    icon: Shield,
    image: credentialImg,
    link: '/case-study/credential-stuffing',
    tags: ['Threat Intelligence', 'Incident Response', 'Penetration Testing'],
    overview: [
      'Across underground marketplaces on Discord, Telegram and the open web, the loyalty and stored-value accounts of major Australian brands were being itemised and sold for less than a dollar each. What began as a single incident-response engagement grew into a standalone, pro-bono mission.',
      'Using open-source and cyber threat intelligence techniques, I mapped the marketplaces, identified which Australian businesses were being actively exploited, and traced the credential-stuffing attack patterns being used against them.',
      'I then reached out directly to affected organisations with tailored security intelligence and remediation advisory, covering rate limiting, credential-stuffing detection, MFA and monitoring, so they could cut off the supply of compromised accounts at the source.',
    ],
    outcomes: [
      { label: 'Businesses assisted', value: '50+' },
      { label: 'Accounts protected', value: '2K+' },
      { label: 'Status', value: 'Ongoing' },
    ],
  },
  {
    slug: 'captcha-efficacy',
    title: 'Efficacy of CAPTCHA as a Bot Mitigation Control',
    client: 'Enterprise Production Environment',
    summary:
      'Demonstrated how advanced bots circumvent CAPTCHA protections in enterprise production environments.',
    impact: 'Bot defence control bypass',
    timeline: '1 Month',
    icon: Lock,
    video: captchaBypass,
    link: '/case-study/captcha-efficacy',
    tags: ['Bot Defence', 'Security Control Bypass', 'Automation'],
    overview: [
      'CAPTCHA is widely treated as a sufficient defence against automated abuse. This engagement set out to test that assumption in a real enterprise production environment.',
      'I demonstrated how modern automation frameworks and solver services circumvent CAPTCHA challenges, completing protected flows at scale without human interaction.',
      'The findings reframed CAPTCHA as one signal within a layered bot-defence strategy rather than a standalone control, and informed recommendations for behavioural detection, rate limiting and risk-based challenges.',
    ],
    outcomes: [
      { label: 'Duration', value: '1 Month' },
      { label: 'Result', value: 'Control bypassed' },
      { label: 'Focus', value: 'Bot Defence' },
    ],
  },
];

export const projectDark = {
  image: credentialImg,
  subtitle: "A cyber threat intelligence exercise into Australia's credential-stuffing epidemic.",
  blurb:
    'A multi-year cyber threat intelligence effort tracking, and dismantling, the credential-stuffing marketplaces targeting Australian businesses.',
  context:
    'Following a Cyber Threat Intelligence exercise during an incident response engagement, the fraudulent marketplaces selling our client’s compromised user accounts were identified. The client remediated the root cause and had their accounts de-listed, but who takes action for the other 50+ Australian businesses whose accounts are still being sold? Project Dark aims to eradicate the credential-stuffing epidemic that has gripped Australian businesses for years.',
  results: [
    { value: '50+', label: 'Australian businesses assisted' },
    { value: '2K+', label: 'User accounts protected' },
    { value: '6+', label: 'Months of active monitoring' },
  ],
  timeline: [
    {
      date: 'Early 2022',
      title: 'Initial Discovery',
      description:
        'Identification of fraudulent marketplaces selling compromised user accounts of large Australian businesses. The primary product for sale: Boost Juice accounts with loyalty points.',
      image: boostExploitation,
    },
    {
      date: 'December 2023',
      title: 'Credential Stuffing Makes National Headlines',
      description:
        "The credential-stuffing exploitation of major Australian businesses ('Guzman y Gomez', 'Event Cinemas', 'The ICONIC') makes national news, with confronting images of the scale of exploitation.",
      image: acsArticle,
    },
    {
      date: 'Early 2025',
      title: 'Discovery of Further Fraudulent Marketplaces',
      description:
        'During a client engagement following a credential-stuffing attack, a CTI exercise led to the discovery of the marketplace selling the client’s compromised user accounts.',
      image: credentialImg,
    },
    {
      date: 'Since April 2025',
      title: 'Business Outreach Campaign',
      description:
        'Actively contacting and assisting 50+ Australian businesses, providing critical security intelligence and remediation advisory for ongoing credential-stuffing attacks and to protect against future exploitation.',
      graphic: 'outreach',
    },
    {
      date: 'Now',
      title: 'Results to Date',
      description:
        'Documented a significant reduction in credential-stuffing incidents among contacted businesses and helped establish ongoing security monitoring. Over 2,000 user accounts across 8 businesses have been protected, with 5 businesses remediating enough to have their compromised accounts removed from fraudulent marketplaces.',
      graphic: 'results',
    },
  ],
  article: {
    title: 'Fraud markets sell off Aussie accounts',
    publisher: 'ACS Information Age',
    description:
      'User accounts from 60+ Australian businesses are itemised and sold for less than a dollar on fraudulent marketplaces across Discord, Telegram and the web.',
    link: 'https://ia.acs.org.au/article/2025/fraud-markets-sell-off-aussie-accounts.html',
    image: acsArticle,
  },
};

export type WebProject = {
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
};

export const webProjects: WebProject[] = [
  {
    title: 'R T Accounting & Taxation',
    description:
      'High-quality accounting & taxation services site, built with TypeScript and React, with Resend & Supabase powering contact submissions.',
    image: rtt1,
    url: 'https://rttaxation.com.au',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
  {
    title: 'Suba Hire',
    description:
      'Premium e-bike rentals for urban professionals, tourists and commuters, offering the freedom of electric mobility.',
    image: subahireImage,
    url: 'https://subahire.com.au',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
  {
    title: 'SupaPing',
    description:
      'Monitors free-tier Supabase projects to prevent inactivity pauses by injecting zero-impact daily queries, saving $25/month vs. the Pro tier.',
    image: supaping,
    url: 'https://supaping.com',
    technologies: ['React', 'TypeScript', 'Supabase', 'AWS'],
  },
  {
    title: 'AquaFlow Plumbing',
    description:
      'Modern full-stack React/TypeScript web application for plumbers, showcasing capabilities, pricing and contact options.',
    image: aquaFlowPlumbing,
    url: 'https://plumbing.danielfarynski.com',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
  {
    title: 'AquaCare Pro',
    description:
      'Full-stack web application for aquarium specialists offering maintenance services and call-outs.',
    image: aquaProCare,
    url: 'https://aquarium.danielfarynski.com',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
  {
    title: 'Document Signing',
    description:
      'Lets a business serve a static contract, have the customer sign and submit it, then emails the signed contract to both parties.',
    image: documentSigning,
    url: 'https://documentsign.danielfarynski.com',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio showcasing cybersecurity projects, honours and achievements alongside software and web development work.',
    image: portfolioWebsite,
    url: 'https://danielfarynski.com',
    technologies: ['React', 'TypeScript', 'Supabase', 'Resend'],
  },
];

export const navItems = [
  { name: 'Work', href: '/#work' },
  { name: 'About', href: '/#about' },
  { name: 'Project Dark', href: '/#project-dark' },
  { name: 'Web Development', href: '/#web' },
  { name: 'Contact', href: '/#contact' },
];
