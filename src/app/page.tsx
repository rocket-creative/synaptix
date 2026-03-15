import Link from "next/link";
import Image from "next/image";
import { 
  DemoRequestForm, 
  TrustSignal,
  ServiceSchema,
  SoftwareApplicationSchema,
  OrganizationSchema,
  WebSiteSchema,
  FAQSchema,
  HeroBackground,
} from "@/components";
import {
  Users,
  FileText,
  Brain,
  Smartphone,
  Activity,
  ArrowRight,
  CheckCircle,
  Clock,
  Calendar,
  Shield,
  Zap,
  TrendingUp,
  ChevronDown,
  Heart,
  Moon,
  AlertCircle,
} from "lucide-react";

const programStats = [
  { value: "12 Week", label: "Treatment Cycle" },
  { value: "3", label: "Visit Types" },
  { value: "6", label: "NPE Instruments" },
  { value: "2×/week", label: "CRT Sessions" },
];

const visitTypes = [
  {
    id: "ie",
    title: "Initial Evaluation (IE)",
    subtitle: "First visit · Occurs one time",
    description: "The initial evaluation establishes the complete clinical baseline. The patient completes a comprehensive concussion history while the physician performs a neurological and vestibular exam. Neuropsychological testing is administered at this visit.",
  },
  {
    id: "fb",
    title: "Feedback Visit (FB)",
    subtitle: "Second visit · ~2 weeks post-IE",
    description: "The feedback visit is where the physician reviews all initial evaluation results with the patient and establishes the treatment plan. NPE results administered at the IE are formally reviewed and interpreted at this visit.",
  },
  {
    id: "re",
    title: "Re-Evaluation (RE)",
    subtitle: "Recurring · Every 12 weeks",
    description: "The re-evaluation is the program's longitudinal checkpoint. It includes an updated patient history, all NPE assessments since the last Feedback Visit, a full CRT session summary with trends, and cumulative digital evaluation data.",
  },
];

const ongoingServices = [
  { service: "Weekly Digital Check-ins", description: "Symptom tracking via SMS/email" },
  { service: "Cognitive Remediation Therapy", description: "Brain training exercises 2×/week" },
  { service: "Monthly NPE Testing", description: "Full battery re-administration" },
  { service: "Progress Monitoring", description: "Dashboard with trends and alerts" },
];

const practiceTypes = [
  { name: "Orthopedic Surgery", icon: Activity },
  { name: "Neurosurgery", icon: Brain },
  { name: "Sports Medicine", icon: Users },
];

const practiceValues = [
  "Capture post injury revenue already entering your practice",
  "Zero added staff required",
  "No referrals lost",
  "Stronger compliance and documentation",
  "Recurring engagement every 12 weeks",
  "Built by clinicians for clinicians",
  "30 day trial from existing patients",
  "Monthly license by volume",
];

const npeBattery = [
  { abbr: "PCSS", name: "Post-Concussion Symptom Scale", desc: "22 symptom self-report validating concussion symptom burden", icon: Brain },
  { abbr: "HIT-6", name: "Headache Impact Test", desc: "Measures headache impact on daily functioning", icon: AlertCircle },
  { abbr: "PHQ-9", name: "Patient Health Questionnaire", desc: "Depression severity screening and monitoring", icon: Heart },
  { abbr: "GAD-7", name: "Generalized Anxiety Disorder Scale", desc: "Anxiety severity measure for cognitive complaints", icon: Activity },
  { abbr: "PCL-5", name: "PTSD Checklist (DSM-5)", desc: "Trauma symptom assessment for injury-related cases", icon: Shield },
  { abbr: "PSQI", name: "Pittsburgh Sleep Quality Index", desc: "Sleep quality assessment critical for recovery", icon: Moon },
];

const platformBenefits = [
  { title: "Reduced Documentation Time", desc: "Intelligent defaults pre-populate normal findings, letting physicians document only deviations", icon: Zap },
  { title: "Automated Plan of Care", desc: "Clinical findings automatically generate customized treatment recommendations", icon: FileText },
  { title: "Longitudinal Tracking", desc: "All assessment data stored and trended across visits without manual entry", icon: TrendingUp },
  { title: "Standardized Protocols", desc: "Evidence-based workflows ensure consistent care across all providers", icon: CheckCircle },
];

const faqItems = [
  {
    question: "What practices is Synaptix designed for?",
    answer: "Synaptix is built for orthopedic surgery, neurosurgery, sports medicine, and dedicated concussion programs. Any practice managing post-concussion patients can benefit from the standardized protocol and longitudinal tracking.",
  },
  {
    question: "How quickly can we deploy Synaptix?",
    answer: "Most practices are operational within days, not months. Synaptix requires no EHR integration, no complex IT setup, and minimal training. Your team can start with existing patients immediately.",
  },
  {
    question: "Does Synaptix require EHR integration?",
    answer: "No. Synaptix operates as a standalone platform, eliminating the delays and costs associated with EHR integration. Reports can be exported and added to your existing medical records.",
  },
  {
    question: "What clinical instruments are included?",
    answer: "The NPE-CX battery includes six validated, peer-reviewed instruments: PCSS, HIT-6, PHQ-9, GAD-7, PCL-5, and PSQI. All are administered digitally and scored automatically.",
  },
  {
    question: "Is training required for staff?",
    answer: "Minimal training is needed. The platform guides users through each visit type with structured forms and intelligent defaults. Most clinical teams are comfortable within a single session.",
  },
  {
    question: "Is Synaptix HIPAA compliant?",
    answer: "Yes. Synaptix is built on HIPAA-compliant infrastructure with encrypted data storage, secure access controls, and audit logging. Patient data is never shared without authorization.",
  },
  {
    question: "What support is available?",
    answer: "All Synaptix licenses include dedicated onboarding, clinical support, and ongoing technical assistance. Our team includes clinicians who understand concussion management workflows.",
  },
  {
    question: "Can we customize the protocol for our practice?",
    answer: "Yes. While Synaptix provides evidence-based defaults, practices can customize assessment frequencies, report formats, and workflow preferences to match their clinical approach.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Schema Markup */}
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <ServiceSchema
        name="Synaptix Concussion Management Platform"
        description="Comprehensive concussion assessment and recovery software with neuropsychological testing, cognitive remediation therapy, and digital monitoring for medical practices."
        url="https://synaptix.vercel.app"
      />
      <FAQSchema questions={faqItems} />

      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] sm:min-h-screen bg-[#0A0A0A] overflow-hidden"
        aria-labelledby="synaptix-hero-heading"
      >
        <HeroBackground color="15, 189, 213" />

        <div className="relative z-10 min-h-[80vh] sm:min-h-screen flex items-center">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
            <div className="backdrop-blur-md bg-black/40 border border-white/10 p-8 sm:p-10 lg:p-14 max-w-xl">
              <p className="text-xs tracking-widest uppercase text-white/50 mb-4 sm:mb-6">
                Concussion Management Software
              </p>
              
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/synaptix-logo-white.svg"
                  alt="Synaptix Cognitive Software"
                  width={320}
                  height={90}
                  className="w-[180px] sm:w-[240px] lg:w-[280px] h-auto"
                  priority
                />
              </div>
              
              <h1 
                id="synaptix-hero-heading"
                className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4"
              >
                Concussion Assessment & Recovery Platform
              </h1>

              <p className="font-body text-sm sm:text-base text-white/70 font-light leading-relaxed mb-4">
                Streamlining concussion care with precision and intelligence. A comprehensive management system combining clinical history, neurological examination protocols, and advanced neuropsychological testing.
              </p>

              <p className="font-body text-xs text-[#0FBDD5] font-light leading-relaxed mb-6 sm:mb-8">
                Built for sports medicine, orthopedics, neurology, and concussion programs. Structured, standardized, recurring.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-4 bg-[#0FBDD5] text-[#0A0A0A] py-3 sm:py-4 px-6 sm:px-8 uppercase tracking-widest text-xs font-light hover:gap-6 transition-all w-full sm:w-fit focus:outline-none focus:ring-2 focus:ring-[#0FBDD5] focus:ring-offset-2 focus:ring-offset-black/40"
                >
                  Request Demo
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#visits"
                  className="inline-flex items-center justify-center gap-2 text-white/60 py-3 sm:py-4 uppercase tracking-widest text-xs hover:text-white transition-colors focus:outline-none focus:text-white"
                >
                  See Visit Protocol
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stats */}
      <section 
        className="py-10 sm:py-12 lg:py-16 bg-[#0A3D62]/20 border-y border-[#0FBDD5]/20" 
        id="program"
        aria-labelledby="program-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="program-heading" className="sr-only">Program Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {programStats.map((stat) => (
              <div key={stat.value} className="text-center hover:bg-white/5 p-4 -m-4 transition-colors">
                <div className="font-heading text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[#0FBDD5] mb-1">
                  {stat.value}
                </div>
                <p className="font-body text-[10px] sm:text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] sm:text-xs text-white/40 mt-4 sm:mt-6">
            Comprehensive concussion management protocol
          </p>
        </div>
      </section>

      {/* Visit Types */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#1A1A1A]" 
        id="visits"
        aria-labelledby="visits-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 sm:mb-12 lg:mb-16">
            <p className="text-xs tracking-widest uppercase text-white/50 mb-4">
              Visit Protocol
            </p>
            <h2 
              id="visits-heading"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4"
            >
              Three Visit Types. One Standardized System.
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/60 font-light max-w-2xl">
              Synaptix structures concussion management into three defined visit types — each with its own form requirements, testing components, and automatically assembled clinical report.
            </p>
          </header>

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {visitTypes.map((visit, idx) => (
              <article 
                key={visit.id} 
                className="bg-[#262626] p-6 sm:p-8 lg:p-10 border-l-4 border-[#0FBDD5] hover:bg-[#404040] transition-colors"
                aria-labelledby={`visit-${visit.id}-title`}
              >
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div>
                    <span 
                      className="text-[50px] sm:text-[70px] lg:text-[90px] font-heading text-white/10 leading-none block -mb-6 sm:-mb-8"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                    <h3 
                      id={`visit-${visit.id}-title`}
                      className="font-heading text-xl sm:text-2xl lg:text-3xl text-white relative z-10"
                    >
                      {visit.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[#0FBDD5] mt-2 sm:mt-3">{visit.subtitle}</p>
                  </div>
                </div>

                <p className="font-body text-sm sm:text-base text-white/60 font-light mb-6 sm:mb-8 leading-relaxed max-w-3xl">
                  {visit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Services */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#1A1A1A]"
        aria-labelledby="services-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <p className="text-xs tracking-widest uppercase text-white/50 mb-4">
                Between Visits
              </p>
              <h2 
                id="services-heading"
                className="font-heading text-xl sm:text-2xl lg:text-3xl text-white mb-4"
              >
                Ongoing Recovery Services
              </h2>
              <p className="font-body text-xs sm:text-sm text-white/60 font-light mb-6 sm:mb-8">
                Three integrated recovery programs keep patients engaged and recovering between clinic visits.
              </p>

              <ul className="space-y-2 sm:space-y-3" role="list">
                {ongoingServices.map((item) => (
                  <li key={item.service} className="flex items-center justify-between bg-[#262626] p-2 sm:p-3 hover:bg-[#404040] transition-colors">
                    <span className="text-xs sm:text-sm text-white">{item.service}</span>
                    <span className="text-[10px] sm:text-xs text-[#0FBDD5]/70">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <article className="bg-[#0A3D62]/20 p-4 sm:p-6 border-l-2 border-[#0FBDD5] hover:bg-[#0A3D62]/30 transition-colors">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-[#0FBDD5]/60 mb-4" strokeWidth={1} aria-hidden="true" />
                <h3 className="font-heading text-sm sm:text-base lg:text-lg text-white mb-2">
                  Computerized Cognitive Remediation Therapy
                </h3>
                <p className="font-body text-[10px] sm:text-xs text-white/60 font-light mb-4">
                  Brain training exercises based on Montreal Cognitive Assessment framework. Strengthens working memory, processing speed, attention, and executive function.
                </p>
                <dl className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <dt className="text-white/50">Frequency</dt>
                    <dd className="text-white font-bold">2×/week</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-white/50">Duration</dt>
                    <dd className="text-white font-bold">12 weeks</dd>
                  </div>
                </dl>
              </article>

              <article className="bg-[#262626] p-4 sm:p-6 border-l-2 border-[#0FBDD5]">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-[#0FBDD5]/60 mb-4" strokeWidth={1} aria-hidden="true" />
                <h3 className="font-heading text-sm sm:text-base lg:text-lg text-white mb-2">
                  Weekly Digital Check-Ins
                </h3>
                <p className="font-body text-[10px] sm:text-xs text-white/60 font-light mb-4">
                  Patients receive secure weekly check-in via SMS or email. Weekly data streams into dashboard for monitoring without requiring office visits.
                </p>
                <dl className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <dt className="text-white/50">Instruments</dt>
                    <dd className="text-white font-bold">PCSS, PHQ-9, GAD-7</dd>
                  </div>
                </dl>
              </article>

              <article className="bg-[#161616] p-4 sm:p-6 border-l-2 border-white/30 hover:bg-[#161616]/80 transition-colors">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white/50 mb-4" strokeWidth={1} aria-hidden="true" />
                <h3 className="font-heading text-sm sm:text-base lg:text-lg text-white mb-2">
                  Monthly Neuropsychological Assessments
                </h3>
                <p className="font-body text-[10px] sm:text-xs text-white/60 font-light mb-4">
                  Full NPE-CX battery re-administered monthly throughout treatment cycle. Each session generates score snapshot aggregated in RE report.
                </p>
                <dl className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                  <div className="flex justify-between">
                    <dt className="text-white/50">Battery</dt>
                    <dd className="text-white font-bold">6 instruments</dd>
                  </div>
                </dl>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Target Practices + Values */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#0A0A0A]"
        aria-labelledby="practices-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <p className="text-xs tracking-widest uppercase text-white/40 mb-4">
                Built For
              </p>
              <h2 
                id="practices-heading"
                className="font-heading text-xl sm:text-2xl lg:text-3xl text-white mb-6 sm:mb-8"
              >
                Clinical Programs
              </h2>

              <ul className="space-y-3 sm:space-y-4" role="list">
                {practiceTypes.map((practice) => {
                  const Icon = practice.icon;
                  return (
                    <li key={practice.name} className="flex items-center gap-4 bg-[#161616] p-3 sm:p-4 hover:bg-[#161616]/80 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0A3D62]/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0FBDD5]/60" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <span className="font-heading text-xs sm:text-sm lg:text-base text-white">{practice.name}</span>
                    </li>
                  );
                })}
              </ul>

              <p className="font-body text-[10px] sm:text-xs text-white/40 font-light mt-4 sm:mt-6">
                Streamlines workflow, reduces documentation burden, and standardizes concussion protocols.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-white/40 mb-4">
                Practice Impact
              </p>
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl text-white mb-6 sm:mb-8">
                Why Synaptix
              </h3>

              <ul className="space-y-2 sm:space-y-3 lg:space-y-4" role="list">
                {practiceValues.map((value) => (
                  <li key={value} className="flex items-start gap-3 sm:gap-4">
                    <CheckCircle className="w-4 h-4 text-[#0FBDD5] flex-shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-body text-[10px] sm:text-xs lg:text-sm text-white/70">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Example */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#161616]"
        aria-labelledby="example-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 sm:mb-12">
            <p className="text-xs tracking-widest uppercase text-white/40 mb-4">
              Clinical Example
            </p>
            <h2 
              id="example-heading"
              className="font-heading text-xl sm:text-2xl lg:text-3xl text-white mb-4"
            >
              Patient Journey
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/50 font-light">
              A 35 year old involved in a motor vehicle accident sustaining a concussion presents for complete evaluation. She has severe headache and dizziness with some irritability.
            </p>
          </header>

          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            <article className="bg-[#0A0A0A] p-4 sm:p-6 border-t-2 border-[#0FBDD5] hover:bg-[#0A0A0A]/80 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#0FBDD5]" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-[#0FBDD5]">Initial Visit</span>
              </div>
              <dl className="space-y-2 text-[10px] sm:text-xs">
                <div className="flex justify-between">
                  <dt className="text-white/60">History & Physical</dt>
                  <dd className="text-white">Complete evaluation</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">NPE-CX Battery</dt>
                  <dd className="text-white">6 instruments</dd>
                </div>
              </dl>
              <p className="text-[10px] sm:text-xs text-white/40 mt-4">
                Patient told to rest, no work, reduce screen time for 2 weeks.
              </p>
            </article>

            <article className="bg-[#0A0A0A] p-4 sm:p-6 border-t-2 border-[#525252] hover:bg-[#0A0A0A]/80 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-[#737373]" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-[#737373]">Feedback Visit</span>
              </div>
              <dl className="space-y-2 text-[10px] sm:text-xs">
                <div className="flex justify-between">
                  <dt className="text-white/60">NPE Interpretation</dt>
                  <dd className="text-white">Results review</dd>
                </div>
              </dl>
              <p className="text-[10px] sm:text-xs text-white/40 mt-4">
                Scores past thresholds. Diagnosis confirmed. Enrolled in Digital Evaluations, CRT 2×/week, Monthly NPE.
              </p>
            </article>

            <article className="bg-[#0A0A0A] p-4 sm:p-6 border-t-2 border-[#0FBDD5] hover:bg-[#0A0A0A]/80 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-[#0FBDD5]" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-[#0FBDD5]">Re-Evaluation (12 wks)</span>
              </div>
              <dl className="space-y-2 text-[10px] sm:text-xs">
                <div className="flex justify-between">
                  <dt className="text-white/60">History Update</dt>
                  <dd className="text-white">Progress check</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/60">NPE-CX Retest</dt>
                  <dd className="text-white">Trend analysis</dd>
                </div>
              </dl>
              <p className="text-[10px] sm:text-xs text-white/40 mt-4">
                Continue program cycle until symptoms subside.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* NPE-CX Battery Section */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#1A1A1A]"
        id="battery"
        aria-labelledby="battery-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 sm:mb-12 lg:mb-16">
            <p className="text-xs tracking-widest uppercase text-white/50 mb-4 italic">
              Neuropsychological Battery
            </p>
            <h2 
              id="battery-heading"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4"
            >
              <em className="not-italic">Six Validated Instruments.</em>{" "}
              <em className="text-[#0FBDD5]">Complete Cognitive Picture.</em>
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/60 font-light max-w-2xl italic">
              The NPE-CX battery combines gold-standard instruments for concussion-related cognitive and psychological assessment — administered digitally, scored automatically, and compared against validated clinical benchmarks.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {npeBattery.map((item) => {
              const Icon = item.icon;
              return (
                <article 
                  key={item.abbr} 
                  className="bg-[#0A0A0A] p-4 sm:p-6 border border-white/5 hover:border-[#0FBDD5]/30 transition-colors group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#0A3D62]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A3D62]/30 transition-colors">
                      <Icon className="w-4 h-4 text-[#0FBDD5]/60" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-heading text-lg sm:text-xl text-[#0FBDD5]">{item.abbr}</span>
                    </div>
                  </div>
                  <h3 className="font-body text-xs sm:text-sm text-white font-normal mb-2 italic">{item.name}</h3>
                  <p className="font-body text-[10px] sm:text-xs text-white/50 font-light italic">{item.desc}</p>
                </article>
              );
            })}
          </div>

          <p className="text-center text-[10px] sm:text-xs text-white/40 mt-6 sm:mt-8 italic">
            All instruments are peer-reviewed and validated for both clinical and population-level screening contexts.
          </p>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#0A0A0A]"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 sm:mb-12 lg:mb-16 text-center">
            <p className="text-xs tracking-widest uppercase text-white/50 mb-4 italic">
              Platform Advantages
            </p>
            <h2 
              id="benefits-heading"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            >
              <em className="not-italic">Designed for</em>{" "}
              <em className="text-[#0FBDD5]">Clinical Efficiency</em>
            </h2>
            <p className="font-body text-xs sm:text-sm text-white/60 font-light max-w-2xl mx-auto italic">
              Synaptix streamlines every aspect of concussion management, from initial assessment through longitudinal outcomes tracking.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {platformBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article 
                  key={benefit.title} 
                  className="bg-[#161616] p-5 sm:p-6 lg:p-8 border-l-2 border-[#0FBDD5]/50 hover:border-[#0FBDD5] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0A3D62]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0FBDD5]/70" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm sm:text-base lg:text-lg text-white mb-2 italic">{benefit.title}</h3>
                      <p className="font-body text-[10px] sm:text-xs lg:text-sm text-white/60 font-light italic">{benefit.desc}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section 
        className="py-10 sm:py-12 lg:py-16 bg-[#0A3D62]/10 border-y border-[#0FBDD5]/10"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="trust-heading" className="sr-only">Trust and Compliance</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <Shield className="w-8 h-8 text-[#0FBDD5]/60 mx-auto mb-3" strokeWidth={1} aria-hidden="true" />
              <p className="font-heading text-xs sm:text-sm text-white italic">HIPAA Compliant</p>
              <p className="font-body text-[9px] sm:text-[10px] text-white/40 mt-1 italic">Secure infrastructure</p>
            </div>
            <div className="text-center">
              <FileText className="w-8 h-8 text-[#0FBDD5]/60 mx-auto mb-3" strokeWidth={1} aria-hidden="true" />
              <p className="font-heading text-xs sm:text-sm text-white italic">Peer-Reviewed</p>
              <p className="font-body text-[9px] sm:text-[10px] text-white/40 mt-1 italic">Validated instruments</p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-[#0FBDD5]/60 mx-auto mb-3" strokeWidth={1} aria-hidden="true" />
              <p className="font-heading text-xs sm:text-sm text-white italic">Clinician-Built</p>
              <p className="font-body text-[9px] sm:text-[10px] text-white/40 mt-1 italic">By neurosurgeons</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-[#0FBDD5]/60 mx-auto mb-3" strokeWidth={1} aria-hidden="true" />
              <p className="font-heading text-xs sm:text-sm text-white italic">Evidence-Based</p>
              <p className="font-body text-[9px] sm:text-[10px] text-white/40 mt-1 italic">Clinical protocols</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#0A0A0A]"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10 sm:mb-12 text-center">
            <p className="text-xs tracking-widest uppercase text-white/50 mb-4 italic">
              Common Questions
            </p>
            <h2 
              id="faq-heading"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white"
            >
              Frequently Asked Questions
            </h2>
          </header>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, idx) => (
              <details 
                key={idx} 
                className="group bg-[#161616] border border-white/5 hover:border-[#0FBDD5]/20 transition-colors"
              >
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                  <h3 className="font-body text-xs sm:text-sm text-white font-normal pr-4 italic">{item.question}</h3>
                  <ChevronDown className="w-4 h-4 text-[#0FBDD5]/60 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="font-body text-[10px] sm:text-xs text-white/60 font-light leading-relaxed italic">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* E-E-A-T Trust Signal */}
      <section className="py-6 sm:py-8 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustSignal 
            author="Dr. John M. Abrahams, M.D."
            credentials="Board-Certified Neurosurgeon"
            reviewedBy="Clinical Advisory Board"
            lastUpdated="2026-03-01"
          />
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-12 sm:py-16 lg:py-24 bg-[#0FBDD5]" 
        id="demo"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 
                id="cta-heading"
                className="font-heading text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[#0A0A0A] mb-4"
              >
                Standardize Your Concussion Program
              </h2>
              <p className="font-body text-xs sm:text-sm lg:text-base text-[#0A0A0A]/70 font-light mb-4">
                Synaptix deploys into existing practices without EHR integration or extensive IT setup. Start in days, not months.
              </p>
              <ul className="space-y-2 mb-6 sm:mb-8" role="list">
                <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0A0A0A]/80">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  Low startup costs
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0A0A0A]/80">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  30 day trial from existing patients
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-[#0A0A0A]/80">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  Short training, operational in a day
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="tel:+19147056830"
                  className="inline-flex items-center justify-center gap-3 bg-[#0A0A0A] text-white py-3 sm:py-4 px-6 sm:px-8 uppercase tracking-widest text-xs font-light hover:gap-5 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0FBDD5]"
                  aria-label="Call us at (914) 705 6830"
                >
                  (914) 705 6830
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="bg-[#0A0A0A]/10 p-4 sm:p-6">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
