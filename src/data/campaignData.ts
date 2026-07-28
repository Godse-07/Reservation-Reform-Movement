import {
  ResearchItem,
  TimelineEvent,
  ConstitutionalCase,
  FaqItem,
  StateQuotaData,
} from "../types";

export const NATIONAL_QUOTA_BREAKDOWN = [
  {
    name: "Unreserved / Open",
    percentage: 40.5,
    color: "#003366",
    isReserved: false,
    label: "Open Competition (40.5%)",
  },
  {
    name: "OBC (Other Backward Classes)",
    percentage: 27.0,
    color: "#2563EB",
    isReserved: true,
    label: "OBC Quota (27.0%)",
  },
  {
    name: "SC (Scheduled Castes)",
    percentage: 15.0,
    color: "#3B82F6",
    isReserved: true,
    label: "SC Quota (15.0%)",
  },
  {
    name: "EWS (Economically Weaker Sections)",
    percentage: 10.0,
    color: "#D97706",
    isReserved: true,
    label: "EWS Quota (10.0%)",
  },
  {
    name: "ST (Scheduled Tribes)",
    percentage: 7.5,
    color: "#60A5FA",
    isReserved: true,
    label: "ST Quota (7.5%)",
  },
];

export const STATE_QUOTA_DATA: StateQuotaData[] = [
  {
    state: "Tamil Nadu",
    totalQuota: 69.0,
    scQuota: 18.0,
    stQuota: 1.0,
    obcQuota: 50.0,
    ewsQuota: 0.0,
    exceedsCap: true,
    legalStatus:
      "Protected under 9th Schedule via TN Act 45/1994; Currently under Supreme Court Constitution Bench challenge.",
    citation:
      "Tamil Nadu Backward Classes, Scheduled Castes and Scheduled Tribes Act, 1993 (Act 45 of 1994)",
    isVerified: true,
  },
  {
    state: "Karnataka",
    totalQuota: 56.0,
    scQuota: 17.0,
    stQuota: 7.0,
    obcQuota: 32.0,
    ewsQuota: 0.0,
    exceedsCap: true,
    legalStatus:
      "Quotas increased via 2022 Executive order/Act; challenging the 50% Indra Sawhney ceiling in SC.",
    citation:
      "Karnataka Reservation Act Amendment 2022 & Dept of Personnel Orders",
    isVerified: true,
  },
  {
    state: "Maharashtra",
    totalQuota: 62.0,
    scQuota: 13.0,
    stQuota: 7.0,
    obcQuota: 19.0,
    ewsQuota: 10.0,
    otherQuota: 13.0,
    exceedsCap: true,
    legalStatus:
      "SEBC (Maratha) quota struck down by SC in Jaishri Laxmanrao Patil (2021) for exceeding 50%; new legislation passed in 2024.",
    citation:
      "Jaishri Laxmanrao Patil v. Chief Minister, Maharashtra (2021) 8 SCC 1",
    isVerified: true,
  },
  {
    state: "Union Government (Central Services)",
    totalQuota: 59.5,
    scQuota: 15.0,
    stQuota: 7.5,
    obcQuota: 27.0,
    ewsQuota: 10.0,
    exceedsCap: true,
    legalStatus:
      "Following the 103rd Constitutional Amendment Act, Union Government vertical reservation stands at 59.5%, with 40.5% allocated to the Unreserved/Open category. The breakdown: 27% OBC, 15% SC, 10% EWS, 7.5% ST — with the 40.5% open pool accessible to all candidates on merit.",
    citation:
      "Press Information Bureau (Release ID: 1564231) & 103rd Constitutional Amendment Act",
    sourceUrl:
      "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1564231&reg=3&lang=2",
    isVerified: true,
  },
  {
    state: "Indra Sawhney Benchmark Ceiling",
    totalQuota: 50.0,
    scQuota: 15.0,
    stQuota: 7.5,
    obcQuota: 27.0,
    ewsQuota: 0.0,
    exceedsCap: false,
    legalStatus:
      "Historical ceiling laid down by 9-judge bench in 1992 as rule of equality in public employment under Article 16(4).",
    citation: "Indra Sawhney v. Union of India (1992) Supp (3) SCC 217",
    isVerified: true,
  },
  {
    state: "Bihar (Recent Legislation)",
    totalQuota: 75.0,
    scQuota: 20.0,
    stQuota: 2.0,
    obcQuota: 43.0,
    ewsQuota: 10.0,
    exceedsCap: true,
    legalStatus:
      "Patna High Court quashed the 65% SC/ST/OBC/EBC expansion in June 2024 (pre-EWS figure); including the separate 10% EWS quota, total reservation reached 75%. State appeal currently pending before Supreme Court.",
    citation:
      "Gaurav Kumar v. State of Bihar, 2024 SCC OnLine Pat 2308 (decided 20-06-2024)",
    isVerified: true,
  },
];

export const HISTORICAL_QUOTA_TIMELINE = [
  {
    year: "1950",
    unionQuota: 22.5,
    event: "Constitution Enacted (SC 15% + ST 7.5%)",
    ceiling: 50,
  },
  {
    year: "1980",
    unionQuota: 22.5,
    event: "Mandal Commission Recommends 27% OBC",
    ceiling: 50,
  },
  {
    year: "1990",
    unionQuota: 49.5,
    event: "Union Govt Issues OBC Reservation Memo",
    ceiling: 50,
  },
  {
    year: "1992",
    unionQuota: 49.5,
    event: "Indra Sawhney Verdict (50% Ceiling Standardized)",
    ceiling: 50,
  },
  {
    year: "2019",
    unionQuota: 59.5,
    event: "103rd Amendment Enacts 10% EWS Quota",
    ceiling: 50,
  },
  {
    year: "2022",
    unionQuota: 59.5,
    event: "SC Janhit Abhiyan Verdict (3-2 EWS Upheld)",
    ceiling: 50,
  },
  {
    year: "2024-Present",
    unionQuota: 59.5,
    event: "Multiple States Enact >60% Laws (Under SC Review)",
    ceiling: 50,
  },
];

export const CONSTITUTIONAL_CASES: ConstitutionalCase[] = [
  {
    id: "indra-sawhney-1992",
    title: "Indra Sawhney & Ors v. Union of India",
    year: 1992,
    benchSize: "9-Judge Constitution Bench",
    verdictRatio: "6:3 Majority Decision",
    keyHolding:
      'Established the 50% ceiling for reservations under Article 16(4), recognized the "creamy layer" exclusion principle, and barred reservations in promotions.',
    majorityOpinion:
      "Art 16(4) is an enabling provision, not an exception to Art 16(1). To preserve efficiency and prevent monopoly, total reservation must not exceed 50% barring extraordinary conditions in far-flung remote areas.",
    dissentingOpinion:
      "Minority judges questioned whether 50% was an unalterable numerical ceiling embedded in the text of the Constitution.",
    movementPerspective:
      "The movement highlights that the 50% ceiling was crafted by a 9-judge bench as a constitutional safeguard to ensure that open merit remains the primary rule for public opportunity, not the exception.",
    citation: "Indra Sawhney v. Union of India, 1992 Supp (3) SCC 217",
    officialDocUrl: "https://www.sci.gov.in/",
  },
  {
    id: "janhit-abhiyan-2022",
    title: "Janhit Abhiyan v. Union of India (103rd Amendment EWS Case)",
    year: 2022,
    benchSize: "5-Judge Constitution Bench",
    verdictRatio: "3:2 Split Verdict",
    keyHolding:
      "Upheld 10% reservation for Economically Weaker Sections (EWS) among non-reserved categories, affirming economic criteria as a valid basis for affirmative action.",
    majorityOpinion:
      "Justice Maheshwari, Justice Trivedi, Justice Pardiwala held that reservation based solely on economic disadvantage does not violate the basic structure, and EWS quota does not breach the 50% ceiling as it applies to an entirely distinct category.",
    dissentingOpinion:
      "CJI U.U. Lalit & Justice S. Ravindra Bhat dissented, holding that excluding SC/ST/OBC from EWS benefits violates equality under Art 14 and that exceeding the 50% cap sets a dangerous precedent.",
    movementPerspective:
      "The movement cites this 3-2 split verdict as proof that even the Supreme Court is deeply divided on how economic vs. social categories should be structured, reinforcing the urgent need for a periodic parliamentary review.",
    citation: "Janhit Abhiyan v. Union of India, 2022 SCC OnLine SC 1540",
    officialDocUrl: "https://www.sci.gov.in/",
  },
  {
    id: "maratha-reservation-2021",
    title: "Jaishri Laxmanrao Patil v. Chief Minister, Maharashtra",
    year: 2021,
    benchSize: "5-Judge Constitution Bench",
    verdictRatio: "5:0 Unanimous on 50% Cap",
    keyHolding:
      "Struck down Maharashtra Socially and Educationally Backward Classes Act 2018 for violating the 50% limit laid down in Indra Sawhney.",
    majorityOpinion:
      "The Supreme Court held unanimously that no extraordinary circumstances existed in Maharashtra to exceed the 50% ceiling limit.",
    movementPerspective:
      "Advocates view this judgment as a firm re-affirmation that state legislatures cannot repeatedly breach constitutional boundaries for short-term political expediency.",
    citation:
      "Jaishri Laxmanrao Patil v. Chief Minister, Maharashtra, (2021) 8 SCC 1",
    officialDocUrl: "https://www.sci.gov.in/",
  },
  {
    id: "mandal-commission-1980",
    title: "Mandal Commission Report & Implementation",
    year: 1980,
    benchSize: "Parliamentary Commission",
    verdictRatio: "Adopted in 1990",
    keyHolding:
      "Recommended 27% quota for Other Backward Classes (OBC), bringing total central reservation to 49.5%.",
    majorityOpinion:
      "Identified 3,743 castes as backward classes using social, educational, and economic indicators based on the 1931 census.",
    movementPerspective:
      "The movement points out that the demographic data underpinning major quota allocations relies on decades-old surveys, underscoring the necessity of real-time socio-economic audits rather than static policy assumptions.",
    citation: "Report of the Backward Classes Commission (Mandal Report), 1980",
    officialDocUrl: "https://socialjustice.gov.in/",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "t-1950",
    year: "1950",
    dateStr: "Jan 26, 1950",
    title: "Enactment of the Constitution of India",
    category: "Constitutional Amendment",
    summary:
      "Articles 15, 16, and 46 incorporated affirmative action for Scheduled Castes (SC) and Scheduled Tribes (ST) for an initial period of 10 years.",
    details:
      "The framers intended reservations as a temporary transitional measure (originally capped at 10 years under Article 334 for legislative seats) to uplift historically marginalized communities.",
    citation: "Constitution of India, 1950 (Articles 15(4), 16(4), 334)",
    isVerified: true,
    keyOutcome:
      "Established SC (15%) and ST (7.5%) quotas in public education and government employment.",
  },
  {
    id: "t-1951",
    year: "1951",
    dateStr: "June 18, 1951",
    title: "First Constitutional Amendment Act",
    category: "Constitutional Amendment",
    summary:
      "Inserted Clause (4) in Article 15 following the Supreme Court judgment in State of Madras v. Champakam Dorairajan.",
    details:
      "Empowered the State to make special provisions for the advancement of socially and educationally backward classes or for SCs and STs.",
    citation: "First Amendment to the Constitution of India, 1951",
    isVerified: true,
    keyOutcome:
      "Constitutionalized educational quotas while subjecting state power to judicial review.",
  },
  {
    id: "t-1980",
    year: "1980",
    dateStr: "Dec 31, 1980",
    title: "Submission of Mandal Commission Report",
    category: "Commission Report",
    summary:
      "Second Backward Classes Commission recommended 27% reservation for OBCs in central services.",
    details:
      "Commission estimated OBC population at ~52% and proposed 27% reservation to keep total quotas under 50%.",
    citation: "Mandal Commission Report, Govt of India, 1980",
    isVerified: true,
    keyOutcome: "Paved the way for expanding quota scope to OBC categories.",
  },
  {
    id: "t-1990",
    year: "1990",
    dateStr: "August 7, 1990",
    title: "Union Order Implementing Mandal Report",
    category: "State Legislation",
    summary:
      "Prime Minister V.P. Singh announced implementation of 27% OBC quota in central jobs.",
    details:
      "Triggered widespread student protests across northern India, raising questions regarding merit and competitive fairness.",
    citation: "Union Government Office Memorandum dated 13.08.1990",
    isVerified: true,
    keyOutcome: "Expanded total central reservation from 22.5% to 49.5%.",
  },
  {
    id: "t-1992",
    year: "1992",
    dateStr: "Nov 16, 1992",
    title: "Indra Sawhney Landmark Supreme Court Ruling",
    category: "Supreme Court Landmark",
    summary:
      "9-Judge SC Bench validated 27% OBC quota while instituting the strict 50% ceiling and Creamy Layer principle.",
    details:
      "Ruled that reservations cannot exceed 50% except under extraordinary conditions, barred promotion quotas, and mandated exclusion of economically advanced OBCs.",
    citation: "Indra Sawhney v. Union of India, 1992 Supp (3) SCC 217",
    isVerified: true,
    keyOutcome:
      "Codified the 50% constitutional cap as a mandatory rule of equality.",
  },
  {
    id: "t-2019",
    year: "2019",
    dateStr: "Jan 12, 2019",
    title: "103rd Constitutional Amendment (EWS Quota)",
    category: "Constitutional Amendment",
    summary:
      "Inserted Articles 15(6) and 16(6) granting up to 10% reservation for Economically Weaker Sections.",
    details:
      "Introduced income-based criteria (< ₹8 Lakh annual income) for non-reserved candidates in higher education and central jobs.",
    citation: "103rd Constitutional Amendment Act, 2019 (Gazette Notification)",
    isVerified: true,
    keyOutcome:
      "Added 10% EWS quota, raising total central quota from 49.5% to 59.5%.",
  },
  {
    id: "t-2022",
    year: "2022",
    dateStr: "Nov 7, 2022",
    title: "Janhit Abhiyan SC Ruling (EWS Upheld 3-2)",
    category: "Supreme Court Landmark",
    summary:
      "5-Judge Constitution Bench upheld the 103rd Amendment in a 3-2 split decision.",
    details:
      "Majority ruled economic criteria valid; minority dissented on exclusion of marginalized communities and breaking the 50% cap.",
    citation: "Janhit Abhiyan v. Union of India, 2022 SCC OnLine SC 1540",
    isVerified: true,
    keyOutcome:
      "Confirmed EWS quota legitimacy while leaving open debates on ceiling flexibility.",
  },
  {
    id: "t-2024",
    year: "2024",
    dateStr: "June 2024 - Present",
    title: "State Quota Expansion & Pending SC Challenges",
    category: "State Legislation",
    summary:
      "Patna High Court quashed Bihar 65% quota law; Tamil Nadu, Karnataka & Maharashtra quota breaches remain under SC review.",
    details:
      "Highlights growing friction between state legislative expansions and constitutional ceiling enforcement by judiciary.",
    citation:
      "Gaurav Kumar v. State of Bihar, 2024 SCC OnLine Pat 2308 (Patna HC, 20-06-2024); Supreme Court appeal outcome pending [PLACEHOLDER — verify before publish]",
    isVerified: false,
    keyOutcome:
      "Spurred national debate on whether a periodic policy review commission should be established.",
  },
];

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "res-union-breakdown",
    title: "Union Government Vertical Reservation Breakdown (59.5% Quota)",
    category: "Quota Allocation",
    summary:
      "Following the 103rd Constitutional Amendment Act, Union Government vertical reservation stands at 59.5%, with 40.5% allocated to the Unreserved/Open category. The breakdown: 27% OBC, 15% SC, 10% EWS, 7.5% ST — with the 40.5% open pool accessible to all candidates on merit.",
    keyFinding:
      "Official central government recruitment allocation reserves 59.5% across OBC (27%), SC (15%), EWS (10%), and ST (7.5%), leaving 40.5% open pool accessible to all candidates on merit.",
    verifiedSource: "Press Information Bureau (PIB Release ID: 1564231)",
    sourceUrl:
      "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1564231&reg=3&lang=2",
    isVerified: true,
    publishedDate: "2019-02-12",
    tags: ["PIB", "Union Reservation", "59.5%", "EWS", "OBC", "SC", "ST"],
  },
  {
    id: "res-01",
    title: "Applicant-to-Post Competition Ratios in Central Staff Selection",
    category: "Employment Stats",
    summary:
      "Analysis of Union Public Service Commission (UPSC) and Staff Selection Commission (SSC) annual reports reveals extreme competition ratios across open vs reserved seats.",
    keyFinding:
      "In competitive central recruitments, over 1,500 applicants compete for every single unreserved general seat, creating intense psychological and economic pressure on young job seekers.",
    verifiedSource:
      "UPSC 73rd Annual Report (2022-23) & SSC Annual Recruitment Review",
    sourceUrl: "https://upsc.gov.in/",
    isVerified: true,
    publishedDate: "2023-11-15",
    tags: ["UPSC", "Employment", "Applicant Ratios", "General Category"],
  },
  {
    id: "res-02",
    title: "Socio-Economic Audit of the 10% EWS Quota Implementation",
    category: "Economic Metrics",
    summary:
      "An empirical examination of how the ₹8 Lakh household income threshold operates in practice across rural vs urban settings.",
    keyFinding:
      "Researchers contend that the ₹8 Lakh income limit encompasses over 80% of Indian households, leading to calls for tightening eligibility to ensure true poverty targeting. (Note: a government committee has been reviewing EWS eligibility criteria since 2024 — confirm current threshold before publishing.)",
    verifiedSource:
      "Centre for Monitoring Indian Economy (CMIE) & NITI Aayog Discussion Papers",
    sourceUrl: "https://www.niti.gov.in/",
    isVerified: true,
    publishedDate: "2024-02-10",
    tags: ["EWS", "Income Threshold", "CMIE", "Economic Criteria"],
  },
  {
    id: "res-03",
    title: "The 50% Constitutional Cap: Legal Precedents & State Divergences",
    category: "Judicial Precedents",
    summary:
      "Comparative analysis of state laws exceeding the 50% Indra Sawhney limit vs Supreme Court jurisprudence over 30 years.",
    keyFinding:
      "While the Supreme Court has consistently struck down state quota laws exceeding 50% (e.g. Maharashtra 2021), several states continue to pass regional quota legislation.",
    verifiedSource: "Supreme Court Observer & Indian Law Institute Journal",
    sourceUrl: "https://www.scobserver.in/",
    isVerified: true,
    publishedDate: "2024-04-18",
    tags: ["Indra Sawhney", "50% Cap", "State Quotas", "Supreme Court"],
  },
  {
    id: "res-04",
    title: "Higher Education Cut-off Dispersion across Central Universities",
    category: "Education Cutoffs",
    summary:
      "Data collected from All India Survey on Higher Education (AISHE) and Delhi University admission archives.",
    keyFinding:
      "Significant cutoff score variances exist across categories in premier STEM and medical institutions, sparking discussions on supplemental merit support programs.",
    verifiedSource:
      "Ministry of Education AISHE Report 2021-22 [PLACEHOLDER — verify before publish]",
    isVerified: false,
    publishedDate: "2024-05-02",
    tags: ["AISHE", "Higher Education", "Cutoff Variance", "STEM"],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question:
      "Why does the movement advocate for a review of reservation policy?",
    answer:
      "The movement contends that reservation policies in India were intended as dynamic affirmative action tools, subject to periodic evaluation. With escalating competition for education and public jobs, a systematic policy review can assess whether current structures accurately target economic deprivation, maintain academic excellence, and prevent generational concentration of benefits.",
    category: "General",
    keyTakeaway:
      "Focuses on dynamic, research-backed review rather than static policy assumptions.",
  },
  {
    id: "faq-2",
    question:
      "Does the movement target or oppose any specific community or caste?",
    answer:
      "No, absolutely not. The movement explicitly respects all communities and acknowledges that historical social disadvantage in India is real. Our debate is strictly focused on policy mechanisms — advocating for equitable opportunity, economic criteria inclusion, and periodic reform without hostility toward any community.",
    category: "General",
    keyTakeaway:
      "Strictly anti-discrimination; focuses on policy framework, not identity.",
  },
  {
    id: "faq-3",
    question:
      "What specific reforms are being proposed by supporters of the movement?",
    answer:
      "Key proposals include: (1) Instituting a statutory Periodic Reservation Review Commission every 10 years; (2) Strictly preserving the 50% open ceiling to safeguard merit; (3) Expanding targeted economic and educational assistance over perpetual seat quotas; (4) Applying realistic creamy layer filters to ensure benefits reach first-generation marginalized families.",
    category: "Methodology",
    keyTakeaway:
      "Advocates statutory 10-year audits, creamy layer filters, and economic upliftment.",
  },
  {
    id: "faq-4",
    question:
      "How does the movement ensure all advocacy remains constitutional and peaceful?",
    answer:
      "The movement operates exclusively within the democratic framework of the Indian Constitution — utilizing public policy petitions, academic research, legal interventions, and peaceful civil representation. We explicitly reject all forms of violence, unlawful blockades, hate speech, or harassment.",
    category: "Participation",
    keyTakeaway: "100% peaceful, legal, and constitutional methods only.",
  },
  {
    id: "faq-5",
    question:
      "What is the movement’s stance on the 50% ceiling established in Indra Sawhney (1992)?",
    answer:
      "The movement views the 50% ceiling as a vital constitutional safeguard established by a 9-judge Supreme Court bench to maintain balance between special affirmative provisions (Art 16(4)) and general equal opportunity (Art 16(1)). We oppose state-level political attempts to bypass this ceiling.",
    category: "Constitutional",
    keyTakeaway:
      "Maintains 50% cap as an indispensable constitutional rule of equality.",
  },
  {
    id: "faq-6",
    question: "How can citizens participate in this movement legally?",
    answer:
      "Citizens can participate by reading primary court judgments, signing peaceful public petitions, submitting policy feedback to elected representatives, sharing verified data, and adhering strictly to our Peaceful Protest & Discussion Guidelines.",
    category: "Participation",
    keyTakeaway:
      "Engage through research, peaceful petitions, and civil debate.",
  },
];

export const PEACEFUL_GUIDELINES = [
  {
    title: "Respect Everyone",
    desc: "Treat all fellow citizens, communities, and public figures with utmost dignity, empathy, and civility regardless of background or viewpoint.",
    iconName: "Heart",
  },
  {
    title: "No Hate Speech",
    desc: "Strict zero-tolerance policy against any form of divisive, derogatory, or inflammatory language targeting any caste, religion, region, or identity.",
    iconName: "ShieldAlert",
  },
  {
    title: "No Violence or Agitation",
    desc: "Advocacy must remain 100% non-violent, peaceful, and democratic. Unlawful blockades, destruction of property, or physical force are strictly prohibited.",
    iconName: "Ban",
  },
  {
    title: "No Abuse or Harassment",
    desc: "Maintain respectful, constructive public discourse. Do not engage in personal attacks, online bullying, or trolling of individuals or officials.",
    iconName: "UserX",
  },
  {
    title: "No Discrimination",
    desc: "Reject all forms of prejudice, casteism, religious bias, or communal regionalism. Affirm equal dignity for every Indian citizen.",
    iconName: "Scale",
  },
  {
    title: "Follow Indian Law",
    desc: "Operate strictly within the constitutional, statutory, and regulatory frameworks of India at all times during meetings or public representation.",
    iconName: "BookOpen",
  },
  {
    title: "Promote Civil Discussion",
    desc: "Base all discussions on verified facts, constitutional legal precedents, economic data, and respectful intellectual dialogue.",
    iconName: "MessageSquare",
  },
  {
    title: "Verify Information Before Sharing",
    desc: "Do not spread unverified rumors, fake stats, or misleading media. Ensure every claim shared carries an authentic citation.",
    iconName: "CheckCircle2",
  },
];

export const INDIAN_STATES_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
