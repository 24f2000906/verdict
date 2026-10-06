"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, BadgeCheck, Loader2, TriangleAlert, Scale, Home } from "lucide-react";
import Link from "next/link";

type Reply = {
  answer: string;
  citations: Citation[] | string[] | string;
  verification_status: string;
};
type Msg = { role: "user"; text: string } | { role: "ai"; data: Reply } | { role: "error"; text: string };
type Citation = { source: string; section?: string; excerpt?: string };


const samples = [
  "What are my rights if I am arrested?",
  "What is the punishment for theft under BNS?",
  "Explain Article 21 of the Constitution",
  "How do I file an FIR if police refuse?",
];

function Verification({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  const ok = s.includes("verified") && !s.includes("unverified") && !s.includes("not");
  const Icon = ok ? BadgeCheck : TriangleAlert;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${ok ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
      <Icon className="size-4" /> {status || "Not verified"}
    </span>
  );
}

function normalizeCitations(raw: Reply["citations"]): Citation[] {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : raw.split(/\n|;/);
  return arr
    .map((c): Citation | null => {
      if (typeof c === "string") {
        return c.trim() ? { source: c.trim() } : null;
      }
      return c && c.source ? c : null;
    })
    .filter((c): c is Citation => c !== null);
}

export default function Ask() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setQ("");
    setBusy(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question, question }),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data: Reply = await res.json();
      console.log(data)
      setMsgs((m) => [...m, { role: "ai", data }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "error", text: `Could not reach the Verdict server at this moment. We are trying to reconenct. Please try again after few seconds. (${(e as Error).message})` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-3/5 flex-col px-5 pt-24">
      <div className="flex justify-center">
        <header className="fixed top-3 z-50 border-2 border-brass bg-ink/50 backdrop-blur-xl w-3/5 rounded-2xl ">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
            <Link href="/" className="flex items-center gap-2 font-serif text-2xl">
              <Scale className="size-7 text-brass" /> Verdict
            </Link>
            <Link href="/" className="flex items-center gap-1 text-sm rounded-full bg-brass px-5 py-2 font-medium text-ink transform duration-300 hover:scale-105">
              <Home className="size-4" /> Home
            </Link>
          </nav>
        </header>
      </div>
      <div className="flex-1 space-y-8 pb-40">
        {msgs.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-10">
            <h1 className="font-serif text-5xl sm:text-6xl">What do you want to know about Indian law?</h1>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {samples.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-2xl bg-panel p-4 text-left text-ivory/80 cursor-pointer transform duration-300 hover:scale-105 hover:ring-2 ring-brass">{s}</button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {msgs.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {m.role === "user" && <p className="ml-auto w-fit max-w-[85%] rounded-3xl bg-white/8 px-5 py-3">{m.text}</p>}
              {m.role === "error" && <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">{m.text}</p>}
              {m.role === "ai" &&
                (() => {
                  const cites = normalizeCitations(m.data.citations);
                  if (cites.length === 0) return null;
                  return (
                    <div className="rounded-3xl border border-white/10 bg-panel p-6">
                      <Verification status={m.data.verification_status} />
                      <p className="mt-4 whitespace-pre-wrap text-lg leading-relaxed">{m.data.answer}</p>
                      <div className="mt-6 rounded-xl bg-white/5 p-4">
                        <p className="text-sm text-ivory/50">Citations</p>
                        <ul className="mt-2 space-y-3 text-ivory/85">
                          {cites.map((c, j) => (
                            <li key={j} className="border-l-2 border-brass/60 pl-3">
                              <p className="font-medium">
                                {c.source}
                                {c.section && <span className="text-brass"> · Section {c.section}</span>}
                              </p>
                              {c.excerpt && (
                                <p className="mt-1 line-clamp-3 text-sm text-ivory/60">{c.excerpt}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()
              }
            </motion.div>
          ))}
        </AnimatePresence>

        {busy && (
          <p className="flex items-center gap-2 text-brass/60"><Loader2 className="size-4 animate-spin" /> Reading the statutes and checking citations…</p>
        )}
        <div ref={end} />
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-linear-to-t from-ink via-ink to-transparent px-5 pb-6 pt-10">
        <form onSubmit={(e) => { e.preventDefault(); send(q); }} className="mx-auto flex w-3/5 items-center gap-3 rounded-3xl border-2 border-brass bg-panel p-1">
          <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={1} placeholder="Describe your situation or ask about a law…"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(q); } }}
            className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 outline-none placeholder:text-brass/35" />
          <button type="submit" disabled={busy || !q.trim()} aria-label="Send" className="rounded-2xl bg-brass p-3 text-ink transition disabled:opacity-30 cursor-pointer">
            <ArrowUp className="size-5" />
          </button>
        </form>
        <p className="mt-2 text-center text-xs text-ivory/40">Legal information, not legal advice.</p>
      </div>
    </div>
  );
}
