"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BadgeCheck, BookMarked, Landmark, ScanSearch, ShieldAlert, Languages, Scale } from "lucide-react";

const IMG = {
  hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=70",
  books: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1400&q=70",
  gavel: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=1400&q=70",
};
const laws = ["Constitution of India", "Bharatiya Nyaya Sanhita", "Bharatiya Nagarik Suraksha Sanhita", "Bharatiya Sakshya Adhiniyam", "Consumer Protection Act", "Right to Information Act", "Motor Vehicles Act", "Hindu Succession Act"];
const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.7, ease: "easeOut" as const } };

export default function Home() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <main>
      <div className="flex justify-center">
          <header className="fixed top-3 z-50 border-2 border-brass bg-ink/50 backdrop-blur-xl w-9/10 rounded-2xl ">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
              <Link href="/" className="flex items-center gap-2 font-serif text-2xl">
                <Scale className="size-7 text-brass" /> Verdict
              </Link>
              <Link href="/ask" className="rounded-full bg-brass px-5 py-2 text-sm font-medium text-ink transform duration-300 hover:scale-105">
                Ask a question
              </Link>
            </nav>
          </header>
        </div>

      {/* Hero: the product's real output is the centrepiece */}
      <section ref={hero} className="relative overflow-hidden pt-16">
        <motion.div style={{ y }} className="absolute inset-0 -z-10">
          <img src={IMG.hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/80 to-ink" />
          <div className="absolute -right-40 top-10 size-150 rounded-full bg-chakra/20 blur-[140px]" />
        </motion.div>
        <div className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
              className="font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl">
              Ask the law.<br />Get the section, <span className="italic text-brass/90">not a guess.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.9 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/70">
              Verdict is an AI lawyer trained on Indian law. Ask about the Constitution, BNS, BNSS or BSA in plain language and get an answer with the exact provisions it relied on, checked before you see it.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10 flex flex-wrap gap-4">
              <Link href="/ask" className="rounded-full bg-brass px-7 py-3.5 font-medium text-ink transition hover:scale-105">Ask your first question</Link>
              <a href="#how" className="rounded-full border border-white/15 px-7 py-3.5 transition hover:bg-white/5">See how it works</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.6, duration: 1, type: "spring", bounce: 0.25 }}
            className="rounded-3xl border border-white/10 bg-panel/80 p-6 shadow-2xl shadow-black/60 backdrop-blur">
            <p className="text-sm text-ivory/50">Someone asked</p>
            <p className="mt-1 font-serif text-2xl">Can police arrest me without a warrant?</p>
            <div className="my-5 h-px bg-white/10" />
            <p className="leading-relaxed text-ivory/80">For cognizable offences, yes. Police may arrest without a warrant, but must tell you the grounds and produce you before a magistrate within 24 hours.</p>
            <div className="mt-5 rounded-xl bg-white/5 p-4 text-sm">
              <p className="text-ivory/50">Citations</p>
              <p className="mt-1">BNSS, Section 35 · Constitution, Article 22(1) and 22(2)</p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400"><BadgeCheck className="size-4" /> Verified against source text</div>
          </motion.div>
        </div>
      </section>

      {/* Statute marquee */}
      <div className="overflow-hidden border-y border-white/5 py-6">
        <div className="marquee flex w-max gap-12 font-serif text-2xl text-ivory/40">
          {[...laws, ...laws].map((l, i) => <span key={i} className="whitespace-nowrap">{l}</span>)}
        </div>
      </div>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-30">
        <motion.div {...reveal} className="grid gap-10 lg:grid-cols-2">
          <h2 className="font-serif text-5xl leading-tight sm:text-6xl">Most Indians never read the law that governs them.</h2>
          <div className="space-y-5 text-lg leading-relaxed text-ivory/70">
            <p>Bare acts are long, the language is dense, and since July 2024 the IPC, CrPC and Evidence Act have been replaced by BNS, BNSS and BSA. Old section numbers you know from search results no longer apply.</p>
            <p>Verdict reads the current text for you, explains it in plain words, and shows where each claim comes from so you can check it yourself or take it to your advocate.</p>
          </div>
        </motion.div>
      </section>

      {/* How: a real sequence */}
      <section id="how" className="mx-auto max-w-6xl px-5 pb-32">
        <motion.h2 {...reveal} className="mb-14 max-w-2xl font-serif text-5xl sm:text-6xl">From question to checked answer in three steps</motion.h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[
            { n: 1, icon: ScanSearch, t: "You ask", d: "Describe your situation in English or Hindi, the way you would tell a friend." },
            { n: 2, icon: BookMarked, t: "Verdict finds the provisions", d: "It pulls the relevant articles and sections from the Constitution and current criminal codes." },
            { n: 3, icon: BadgeCheck, t: "The answer is verified", d: "Every citation is compared to the source text. You see the result as a status on the answer." },
          ].map((s, i) => (
            <motion.div key={s.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}
              className={`rounded-3xl transform duration-300 hover:scale-105 hover:shadow-[0px_0px_10px_1px] hover:shadow-brass bg-panel p-8`}>
              <div className="flex items-center justify-between"><s.icon className="size-7 text-brass" /><span className="font-serif text-4xl text-white">{s.n}</span></div>
              <h3 className="mt-8 font-serif text-3xl text-brass">{s.t}</h3>
              <p className="mt-3 leading-relaxed text-white">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Image band */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-32 lg:grid-cols-5">
        <motion.div {...reveal} className="relative min-h-105 overflow-hidden rounded-3xl lg:col-span-3">
          <img src={IMG.books} alt="Rows of law books" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute bottom-0 p-8"><h3 className="max-w-md font-serif text-4xl">Built on the text of the law, not on hearsay</h3></div>
        </motion.div>
        <motion.div {...reveal} className="grid gap-6 lg:col-span-2">
          {[
            { icon: Landmark, t: "Constitutional rights", d: "Fundamental rights, remedies under Articles 32 and 226, and duties explained clearly." },
            { icon: Languages, t: "Plain language", d: "No Latin, no clause soup. Just what the provision means for you." },
            { icon: ShieldAlert, t: "Honest about limits", d: "When the law is unclear or you need a lawyer, Verdict says so." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl hover:scale-105 border border-brass bg-panel/60 p-6 transform duration-300">
              <f.icon className="size-5 text-brass" />
              <h4 className="mt-3 text-lg font-medium">{f.t}</h4>
              <p className="mt-1 text-ivory/60">{f.d}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden py-36 text-center">
        <img src={IMG.gavel} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-ink/70" />
        <motion.div {...reveal} className="mx-auto max-w-3xl px-5">
          <h2 className="font-serif text-5xl sm:text-7xl">Know where you stand.</h2>
          <Link href="/ask" className="mt-10 inline-block rounded-full bg-brass px-8 py-4 text-lg font-medium text-ink transition hover:scale-105">Ask Verdict</Link>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 px-5 py-10 text-center text-sm text-ivory/45">
        Verdict provides legal information, not legal advice. For your specific case, consult a qualified advocate.
      </footer>
    </main>
  );
}
