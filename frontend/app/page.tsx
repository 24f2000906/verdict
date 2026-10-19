"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  BadgeCheck,
  BookMarked,
  Landmark,
  ScanSearch,
  ShieldAlert,
  Languages,
  Scale,
  Library,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";

const IMG = {
  hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=70",
  books: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=70",
  gavel: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=1400&q=70",
};

const verifiedDocuments = [
  {
    name: "Bharatiya Nyaya Sanhita",
    year: "2023",
    category: "Criminal Law",
    description: "Substantive penal law replacing the IPC; defines offences, penalties, community service, and state security provisions.",
  },
  {
    name: "Bharatiya Nagarik Suraksha Sanhita",
    year: "2023",
    category: "Criminal Procedure",
    description: "Replaces the CrPC; governs arrest safeguards, bail rights, electronic FIRs, forensic mandates, and trial timelines.",
  },
  {
    name: "Bharatiya Sakshya Adhiniyam",
    year: "2023",
    category: "Evidence Law",
    description: "Replaces the Indian Evidence Act; regulates electronic evidence admissibility, primary vs. secondary proof, and witness testimony.",
  },
  {
    name: "Constitution of India",
    year: "1950",
    category: "Supreme Constitutional Law",
    description: "Supreme legal framework; guarantees Fundamental Rights (Articles 12–35), writ remedies (Articles 32 & 226), and judicial duties.",
  },
  {
    name: "Code of Civil Procedure",
    year: "1908",
    category: "Civil Litigation",
    description: "Governs civil court jurisdiction, suits, summons, temporary injunctions, execution of decrees, appeals, and revision procedures.",
  },
  {
    name: "Code of Criminal Procedure",
    year: "1973",
    category: "Procedural Law",
    description: "Historical criminal procedure governing complaints, investigations, and trials instituted prior to July 1, 2024.",
  },
  {
    name: "Hindu Marriage Act",
    year: "1955",
    category: "Family & Matrimonial",
    description: "Codifies marriage conditions, registration, restitution of conjugal rights, judicial separation, divorce grounds, and alimony.",
  },
  {
    name: "Indian Divorce Act",
    year: "1869",
    category: "Family & Matrimonial",
    description: "Regulates matrimonial relief, dissolution of marriage, judicial separation, and child custody for Christians in India.",
  },
  {
    name: "Indian Evidence Act",
    year: "1872",
    category: "Law of Evidence",
    description: "Classical rules on burden of proof, examination of witnesses, estoppel, and admissibility for proceedings prior to BSA.",
  },
  {
    name: "Indian Penal Code",
    year: "1860",
    category: "Substantive Penal Law",
    description: "Classical penal code establishing criminal liability and punishments for offences committed prior to July 1, 2024.",
  },
  {
    name: "Motor Vehicles Act",
    year: "1988",
    category: "Traffic & Transport",
    description: "Covers road safety regulations, vehicle registration, traffic fines, third-party liability insurance, and accident claims tribunals.",
  },
  {
    name: "Negotiable Instruments Act",
    year: "1881",
    category: "Commercial & Banking",
    description: "Regulates promissory notes, bills of exchange, and criminal liabilities for dishonour of cheques under Section 138.",
  },
];

const marqueeLaws = verifiedDocuments.map((doc) => doc.name);

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Fixed Header */}
      <div className="flex justify-center">
        <header className="fixed top-3 z-50 w-[94%] max-w-6xl rounded-2xl border-2 border-brass bg-ink/70 backdrop-blur-xl shadow-lg shadow-black/40">
          <nav className="mx-auto flex h-14 sm:h-16 items-center justify-between px-3.5 sm:px-5">
            <Link href="/" className="flex items-center gap-2 font-serif text-xl sm:text-2xl">
              <Scale className="size-6 sm:size-7 text-brass" /> Verdict
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/ask"
                className="rounded-full bg-brass px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-ink transition duration-300 hover:scale-105"
              >
                Ask a question
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* Hero Section */}
      <section ref={hero} className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
        <motion.div style={{ y }} className="absolute inset-0 -z-10">
          <img src={IMG.hero} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/80 to-ink" />
          <div className="absolute -right-20 sm:-right-40 top-10 size-96 sm:size-150 rounded-full bg-chakra/20 blur-[100px] sm:blur-[140px]" />
        </motion.div>
        
        <div className="mx-auto grid min-h-[82vh] lg:min-h-[88vh] max-w-6xl items-center gap-10 sm:gap-14 px-4 sm:px-6 py-12 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 px-3 py-1 text-xs font-semibold text-brass mb-6">
              <BadgeCheck className="size-3.5" /> 12 Verified Statutory Acts
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] sm:leading-[0.95] tracking-tight"
            >
              Ask the law.<br />
              Get the section, <span className="italic text-brass/90">not a guess.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 sm:mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-ivory/70"
            >
              Verdict is an AI lawyer trained on Indian law. Ask about the Constitution, BNS, BNSS or BSA in plain language and get an answer grounded in the exact official sections, verified before you see it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/ask"
                className="w-full sm:w-auto text-center rounded-full bg-brass px-7 py-3.5 font-medium text-ink transition hover:scale-105 shadow-md shadow-brass/20"
              >
                Ask your first question
              </Link>
              <a
                href="#sources"
                className="w-full sm:w-auto text-center rounded-full border border-white/15 px-7 py-3.5 text-ivory/80 transition hover:bg-white/5 hover:text-white"
              >
                Explore verified sources
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.9, type: "spring", bounce: 0.2 }}
            className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-panel/85 p-5 sm:p-6 shadow-2xl shadow-black/60 backdrop-blur"
          >
            <p className="text-xs sm:text-sm text-ivory/50">Someone asked</p>
            <p className="mt-1 font-serif text-xl sm:text-2xl text-white">Can police arrest me without a warrant?</p>
            <div className="my-4 h-px bg-white/10" />
            <p className="text-sm sm:text-base leading-relaxed text-ivory/80">
              For cognizable offences, yes. Police may arrest without a warrant, but must immediately inform you of the full grounds of arrest and produce you before a magistrate within 24 hours.
            </p>
            <div className="mt-4 rounded-xl bg-white/5 p-3.5 sm:p-4 text-xs sm:text-sm">
              <p className="text-ivory/50">Citations</p>
              <p className="mt-1 text-white font-medium">BNSS, Section 35 · Constitution of India, Article 22(1) &amp; 22(2)</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-emerald-400">
              <BadgeCheck className="size-4 shrink-0" /> Verified against source statutory text
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statute Marquee */}
      <div className="overflow-hidden border-y border-white/5 py-4 sm:py-6 bg-ink/40">
        <div className="marquee flex w-max gap-8 sm:gap-12 font-serif text-lg sm:text-2xl text-ivory/40">
          {[...marqueeLaws, ...marqueeLaws].map((l, i) => (
            <span key={i} className="whitespace-nowrap flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-brass/60" />
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Why Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
        <motion.div {...reveal} className="grid gap-8 sm:gap-10 lg:grid-cols-2 items-center">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight">
            Most Indians never read the law that governs them.
          </h2>
          <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed text-ivory/70">
            <p>
              Bare acts are long, the language is dense, and since July 2024 the IPC, CrPC, and Evidence Act have been superseded by the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA). Old section numbers from search engines no longer apply.
            </p>
            <p>
              Verdict reads the current official text for you, explains it in plain words, and shows the exact provisions it relied on so you can check them yourself or discuss them with your advocate.
            </p>
          </div>
        </motion.div>
      </section>

      {/* How: 3 Steps */}
      <section id="how" className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-28">
        <motion.div {...reveal} className="mb-10 sm:mb-14 max-w-2xl">
          <span className="text-xs uppercase font-semibold tracking-wider text-brass">Simple Workflow</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl">
            From question to checked answer in three steps
          </h2>
        </motion.div>
        
        <div className="grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-3">
          {[
            {
              n: 1,
              icon: ScanSearch,
              t: "You ask",
              d: "Describe your situation in English or Hindi, the way you would explain it to a trusted friend.",
            },
            {
              n: 2,
              icon: BookMarked,
              t: "Verdict finds the provisions",
              d: "It runs a deterministic similarity search across our indexed corpus of 12 official statutes.",
            },
            {
              n: 3,
              icon: BadgeCheck,
              t: "The answer is verified",
              d: "Every cited section and claim is rigorously cross-referenced against the raw bare act before it is shown.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.12 }}
              className="rounded-2xl sm:rounded-3xl border border-white/5 bg-panel p-6 sm:p-8 transform duration-300 hover:scale-[1.02] hover:border-brass/50 hover:shadow-lg hover:shadow-brass/10"
            >
              <div className="flex items-center justify-between">
                <s.icon className="size-6 sm:size-7 text-brass" />
                <span className="font-serif text-3xl sm:text-4xl text-white/90">{s.n}</span>
              </div>
              <h3 className="mt-6 sm:mt-8 font-serif text-2xl sm:text-3xl text-brass">{s.t}</h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-ivory/80">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Verified Source Documents Section */}
      <section id="sources" className="scroll-mt-24 border-y border-white/10 bg-panel/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brass">
              <FileCheck2 className="size-3.5" /> Verified Legal Corpus
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              Verified Source Documents
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ivory/70">
              Verdict does not guess or browse unverified internet forums. The data of this AI is strictly grounded in these <strong className="text-brass">12 official statutory documents</strong> of Indian law, with citations verified directly against their enacted texts:
            </p>
          </motion.div>

          <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedDocuments.map((doc, idx) => (
              <motion.div
                key={doc.name}
                {...reveal}
                transition={{ ...reveal.transition, delay: (idx % 3) * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-panel/90 p-5 sm:p-6 transition duration-300 hover:border-brass hover:shadow-xl hover:shadow-brass/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-brass border border-brass/20">
                      {doc.category}
                    </span>
                    <span className="text-xs font-semibold text-ivory/40 group-hover:text-brass transition">
                      Act · {doc.year}
                    </span>
                  </div>
                  
                  <h3 className="mt-4 font-serif text-xl sm:text-2xl text-white group-hover:text-brass transition">
                    {doc.name}
                  </h3>
                  
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ivory/70">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 border-t border-white/5 pt-3 text-xs text-emerald-400">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  <span>Verified AI Knowledge Source</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 rounded-2xl border border-brass/30 bg-brass/5 p-5 sm:p-6 text-center">
            <p className="text-xs sm:text-sm text-ivory/80">
              <strong className="text-white">Strict Source Grounding:</strong> If a legal claim cannot be mapped to an exact section or article within these 12 statutes, Verdict flags the answer or responds with an honest <code className="rounded bg-black/40 px-1.5 py-0.5 text-brass">NOT FOUND</code> notice rather than hallucinating.
            </p>
          </div>
        </div>
      </section>

      {/* Image Band & Feature Cards */}
      <section className="mx-auto grid max-w-6xl gap-5 sm:gap-6 px-4 sm:px-6 py-20 sm:py-28 lg:grid-cols-5 items-stretch">
        <motion.div
          {...reveal}
          className="relative min-h-72 sm:min-h-96 lg:min-h-105 overflow-hidden rounded-2xl sm:rounded-3xl lg:col-span-3 shadow-xl"
        >
          <img src={IMG.books} alt="Rows of law books" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-8">
            <h3 className="max-w-md font-serif text-2xl sm:text-4xl text-white">
              Built on the text of the law, not on hearsay
            </h3>
          </div>
        </motion.div>
        
        <motion.div {...reveal} className="grid gap-4 sm:gap-6 lg:col-span-2">
          {[
            {
              icon: Landmark,
              t: "Constitutional rights",
              d: "Fundamental rights, remedies under Articles 32 and 226, and constitutional guarantees explained clearly.",
            },
            {
              icon: Languages,
              t: "Plain language",
              d: "No Latin legalese or clause soup. Just clear explanations of what each provision means for you.",
            },
            {
              icon: ShieldAlert,
              t: "Honest about limits",
              d: "When statutes are ambiguous, unsettled, or require an advocate in court, Verdict says so.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl border border-brass/40 bg-panel/70 p-5 sm:p-6 transform duration-300 hover:scale-[1.02] hover:border-brass"
            >
              <f.icon className="size-5 text-brass" />
              <h4 className="mt-3 text-base sm:text-lg font-medium text-white">{f.t}</h4>
              <p className="mt-1 text-xs sm:text-sm text-ivory/60 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative isolate overflow-hidden py-24 sm:py-36 text-center px-4 sm:px-6">
        <img src={IMG.gavel} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-ink/75" />
        <motion.div {...reveal} className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl">Know where you stand.</h2>
          <p className="mt-4 text-base sm:text-lg text-ivory/70">
            Ask any question across our 12 verified Indian legal statutes.
          </p>
          <Link
            href="/ask"
            className="mt-8 sm:mt-10 inline-block rounded-full bg-brass px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-ink transition hover:scale-105 shadow-xl shadow-brass/20"
          >
            Ask Verdict
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-panel/30 px-4 sm:px-6 py-10 sm:py-12 text-sm text-ivory/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 font-serif text-xl text-white md:justify-start">
              <Scale className="size-5 text-brass" /> Verdict
            </div>
            <p className="mt-2 max-w-md text-xs text-ivory/50 leading-relaxed">
              Verdict provides automated legal research and statutory citations for Indian law, not legal advice. For your specific case, consult a qualified advocate. Users may see advertisements on this platform.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="#sources" className="text-ivory/70 transition hover:text-brass">
              Verified Sources
            </a>
            <Link href="/privacy" className="text-ivory/70 transition hover:text-brass">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-ivory/70 transition hover:text-brass">
              Terms &amp; Conditions
            </Link>
            <Link href="/ask" className="text-ivory/70 transition hover:text-brass">
              Ask Verdict
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-ivory/40">
          © {new Date().getFullYear()} Verdict. All statutory bare acts and Constitution texts belong to public domain.
        </div>
      </footer>
    </main>
  );
}
