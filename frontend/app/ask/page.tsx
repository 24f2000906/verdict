"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, BadgeCheck, Loader2, TriangleAlert, Scale, Home, Sparkles } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

type Reply = {
  answer: string;
  citations: Citation[] | string[] | string;
  verification_status: string;
};
type Msg = { role: "user"; text: string } | { role: "ai"; data: Reply } | { role: "error"; text: string };
type Citation = { source: string; section?: string; excerpt?: string };

const samples = [
  "What are my rights if I am arrested under BNSS?",
  "What is the punishment for theft under BNS?",
  "Explain Article 21 of the Constitution of India",
  "How do I file an FIR if police refuse to register it?",
];

function Verification({ status }: { status: string }) {
  const s = (status || "").toLowerCase();
  const ok = s.includes("verified") && !s.includes("unverified") && !s.includes("not");
  const Icon = ok ? BadgeCheck : TriangleAlert;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium ${ok ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
      <Icon className="size-3.5 sm:size-4 shrink-0" /> {status || "Not verified"}
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

const STORAGE_KEY = "verdict:chat-history:v1";

function isMsg(x: unknown): x is Msg {
  if (!x || typeof x !== "object") return false;
  const m = x as Record<string, unknown>;
  if (m.role === "user" || m.role === "error") return typeof m.text === "string";
  if (m.role === "ai") {
    const d = m.data as Record<string, unknown> | null | undefined;
    return !!d && typeof d === "object" && typeof d.answer === "string";
  }
  return false;
}

function loadMsgs(): Msg[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isMsg) : [];
  } catch {
    return []; // corrupted JSON, or storage blocked (private mode, disabled cookies)
  }
}

function saveMsgs(msgs: Msg[]) {
  try {
    // Error banners are transient ("could not reach server"), so they are not saved.
    const toSave = msgs.filter((m) => m.role !== "error");
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Quota exceeded or storage unavailable: keep the chat working in memory.
  }
}

export default function Ask() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  // Restore saved history after mount (localStorage doesn't exist during server render).
  useEffect(() => {
    setMsgs(loadMsgs());
    setLoaded(true);
  }, []);

  // Save on every change, but only after the restore ran, so the initial
  // empty state can never overwrite saved history.
  useEffect(() => {
    if (loaded) saveMsgs(msgs);
  }, [msgs, loaded]);

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
      setMsgs((m) => [...m, { role: "ai", data }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "error", text: `Could not reach the Verdict server at this moment. Please check your connection or try again in a moment. (${(e as Error).message})` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 sm:px-6 pt-20 sm:pt-24 selection:bg-brass selection:text-ink">
      {/* Floating Responsive Header */}
      <div className="flex justify-center">
        <header className="fixed top-3 z-50 w-[94%] max-w-4xl rounded-2xl border-2 border-brass bg-ink/75 backdrop-blur-xl shadow-lg shadow-black/40">
          <nav className="mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-5">
            <Link href="/" className="flex items-center gap-2 font-serif text-xl sm:text-2xl transition hover:opacity-90">
              <Scale className="size-6 sm:size-7 text-brass" /> Verdict
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs sm:text-sm rounded-full bg-brass px-3.5 py-1.5 sm:px-5 sm:py-2 font-medium text-ink transition duration-300 hover:scale-105"
              >
                <Home className="size-3.5 sm:size-4" /> Home
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* Main Conversation Container */}
      <div className="flex-1 space-y-6 sm:space-y-8 pb-44 sm:pb-40">
        {loaded && msgs.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-6 sm:pt-10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-brass/10 px-3 py-1 text-xs font-semibold text-brass mb-4">
              <Sparkles className="size-3.5" /> 12 Verified Statutory Acts
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              What do you want to know about Indian law?
            </h1>
            <p className="mt-3 text-sm sm:text-base text-ivory/60">
              Ask in plain language. Verdict retrieves relevant sections from BNS, BNSS, BSA, Constitution, CPC, IPC, and 6 other enacted statutes.
            </p>
            <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-2">
              {samples.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-2xl border border-white/5 bg-panel p-4 text-left text-xs sm:text-sm text-ivory/80 cursor-pointer transition duration-300 hover:scale-[1.02] hover:border-brass/50 hover:ring-2 hover:ring-brass/30"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {m.role === "user" && (
                <div className="flex justify-end">
                  <p className="w-fit max-w-[90%] sm:max-w-[85%] rounded-2xl sm:rounded-3xl bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              )}
              
              {m.role === "error" && (
                <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 sm:p-4 text-xs sm:text-sm text-red-300">
                  {m.text}
                </p>
              )}
              
              {m.role === "ai" &&
                (() => {
                  const cites = normalizeCitations(m.data.citations);
                  return (
                    <div className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-panel p-4 sm:p-6 shadow-xl shadow-black/40">
                      <Verification status={m.data.verification_status} />
                      <div className="mt-4 text-sm sm:text-base sm:text-lg leading-relaxed text-white prose prose-invert max-w-none break-words">
                        <ReactMarkdown>
                          {m.data.answer}
                        </ReactMarkdown>
                      </div>
                      
                      {cites.length > 0 && (
                        <div className="mt-5 sm:mt-6 rounded-xl bg-brass p-3.5 sm:p-4 text-panel">
                          <p className="text-xs sm:text-sm bg-panel text-brass font-medium w-max rounded-xl px-2.5 py-0.5 sm:px-3 sm:py-1">
                            Citations
                          </p>
                          <ul className="mt-2.5 space-y-2.5 sm:space-y-3">
                            {cites.map((c, j) => (
                              <li key={j} className="border-l-2 border-brass/60 pl-3">
                                <p className="font-bold text-xs sm:text-sm">
                                  {c.source}
                                  {c.section && <span> · Section {c.section}</span>}
                                </p>
                                {c.excerpt && (
                                  <p className="mt-1 line-clamp-3 text-xs leading-relaxed opacity-90">
                                    {c.excerpt}
                                  </p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()
              }
            </motion.div>
          ))}
        </AnimatePresence>

        {busy && (
          <p className="flex items-center gap-2 text-xs sm:text-sm text-brass/80">
            <Loader2 className="size-4 animate-spin shrink-0" />
            <span>Reading the statutes and checking citations against source text…</span>
          </p>
        )}
        <div ref={end} />
      </div>

      {/* Responsive Fixed Bottom Input Bar */}
      <div className="fixed inset-x-0 bottom-0 bg-linear-to-t from-ink via-ink to-transparent px-3 sm:px-5 pb-3 sm:pb-5 pt-6 sm:pt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(q);
          }}
          className="mx-auto flex w-full max-w-4xl items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl border-2 border-brass bg-panel p-1 sm:p-1.5 shadow-2xl"
        >
          <textarea
            value={q}
            onChange={(e) => setQ(e.target.value)}
            rows={1}
            placeholder="Describe your situation or ask about a law…"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(q);
              }
            }}
            className="max-h-32 sm:max-h-40 flex-1 resize-none bg-transparent px-3 py-1.5 sm:py-2 text-sm sm:text-base outline-none placeholder:text-brass/35"
          />
          <button
            type="submit"
            disabled={busy || !q.trim()}
            aria-label="Send"
            className="rounded-xl sm:rounded-2xl bg-brass p-2.5 sm:p-3 text-ink transition disabled:opacity-30 cursor-pointer hover:scale-105 shrink-0"
          >
            <ArrowUp className="size-4 sm:size-5" />
          </button>
        </form>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[10px] sm:text-xs text-ivory/40 px-2">
          <span>Legal information, not legal advice</span>
          <span>·</span>
          <span>May contain ads</span>
          <span>·</span>
          <Link href="/privacy" className="hover:text-brass transition underline">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-brass transition underline">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
