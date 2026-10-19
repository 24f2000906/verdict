import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, FileText, AlertOctagon, Megaphone, ShieldCheck, CheckCircle2, XCircle, Gavel, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Verdict - AI Legal Assistant",
  description: "Read the terms, disclaimers, and conditions governing the use of Verdict, including our advertising notices and legal information disclaimers.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-ink text-ivory selection:bg-brass selection:text-ink">
      {/* Navigation Header */}
      <div className="flex justify-center">
        <header className="fixed top-3 z-50 border-2 border-brass bg-ink/75 backdrop-blur-xl w-[94%] max-w-6xl rounded-2xl shadow-xl shadow-black/40">
          <nav className="mx-auto flex h-14 sm:h-16 items-center justify-between px-3.5 sm:px-5">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 font-serif text-xl sm:text-2xl transition hover:opacity-90">
              <Scale className="size-6 sm:size-7 text-brass" /> Verdict
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/ask"
                className="rounded-full bg-brass px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-ink transition duration-300 hover:scale-105"
              >
                Ask Verdict
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs sm:text-sm font-medium text-ivory/80 transition hover:bg-white/5 hover:text-white"
              >
                <ArrowLeft className="size-3.5 sm:size-4" /> Home
              </Link>
            </div>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-24">
        {/* Title Header */}
        <div className="border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brass">
            <FileText className="size-3.5" /> User Agreement
          </div>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-ivory/60">
            Last updated: <span className="text-brass">October 18, 2026</span> · Effective immediately
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ivory/80">
            Please read these Terms and Conditions (&quot;Terms&quot;, &quot;Agreement&quot;) carefully before accessing or using <strong className="text-white">Verdict</strong> (&quot;the Service&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By visiting, browsing, querying, or utilizing any feature of Verdict, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree to all provisions, you must immediately discontinue use of the Service.
          </p>
        </div>

        {/* Primary Legal Disclaimer Banner */}
        <div className="my-8 rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-6 backdrop-blur">
          <div className="flex items-start gap-3">
            <AlertOctagon className="size-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-amber-300">
                CRITICAL DISCLAIMER: NOT LEGAL ADVICE
              </h2>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ivory/90">
                Verdict is an automated, experimental artificial intelligence research and information tool grounded in statutory texts of Indian law. <strong className="text-white">Verdict does NOT constitute a law firm, advocate, or legal practitioner, and does NOT provide formal legal advice, representation, or opinions.</strong>
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-ivory/80">
                Using Verdict does not establish an advocate-client relationship under the Advocates Act, 1961 or any other statutory authority. For any active dispute, criminal charge, civil matter, contract drafting, or court deadline, you must always consult a licensed advocate enrolled with the Bar Council of India.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12 text-ivory/80 leading-relaxed text-base">
          {/* Section 1 */}
          <section id="ads-disclosure" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Megaphone className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                1. Advertisements &amp; Commercial Messages
              </h2>
            </div>
            <div className="mt-4 rounded-xl border border-brass/30 bg-brass/5 p-5 space-y-4">
              <p className="font-medium text-white">
                <strong className="text-brass">Explicit Advertisement Notice:</strong> You acknowledge and explicitly agree that you may see advertisements, commercial banners, sponsored placements, and promotional links while using Verdict.
              </p>
              <p>
                In order to offer free access to our AI search engine, vector indexing, and statutory database, we partner with third-party advertising networks (including Google AdSense, programmatic advertising exchanges, and direct commercial sponsors).
              </p>
              <ul className="list-disc list-inside space-y-2 text-ivory/90 pl-2">
                <li>
                  <strong className="text-white">No Endorsement:</strong> The appearance of an advertisement on Verdict does not constitute an endorsement, recommendation, guarantee, or warranty by Verdict of the advertiser, its products, its services, or its legal competence.
                </li>
                <li>
                  <strong className="text-white">Third-Party Dealings:</strong> Any transactions, correspondence, purchases, or interactions with advertisers found on or through Verdict are solely between you and the respective third-party advertiser.
                </li>
                <li>
                  <strong className="text-white">Limitation of Liability for Ads:</strong> Verdict disclaims all liability for any damages, losses, fraud, or dissatisfaction arising from your interaction with any third-party advertisement or external link.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="nature-of-service" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Gavel className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                2. Nature of the Service &amp; AI Citation Verification
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <p>
                Verdict functions by indexing enacted Indian legislation, such as the Bharatiya Nyaya Sanhita (BNS) 2023, Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023, Bharatiya Sakshya Adhiniyam (BSA) 2023, Constitution of India, Code of Civil Procedure (CPC), Indian Penal Code (IPC), and related statutes.
              </p>
              <p>
                When you submit a natural language question:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>A vector similarity search retrieves relevant sections and provisions from ChromaDB.</li>
                <li>A Large Language Model (LLM) synthesizes a conversational answer quoting sections.</li>
                <li>An automated verification node validates citation tags against the retrieved source texts.</li>
              </ol>
              <div className="rounded-xl border border-white/10 bg-panel p-4 text-sm">
                <p className="font-semibold text-brass mb-1">Status Indicators:</p>
                <p className="text-ivory/70">
                  Responses may be marked as <strong className="text-emerald-400">Verified</strong> (citations matched retrieved text) or <strong className="text-amber-400">Flagged / Unverified</strong>. You understand that automated verification is not a guarantee of legal correctness, judicial consensus, or currency of judicial precedents.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="acceptable-use" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                3. Acceptable Use Policy &amp; Restrictions
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <p>
                You agree to use Verdict exclusively for lawful educational, informational, and statutory research purposes. You agree <strong className="text-white">NOT</strong> to:
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-panel p-4">
                  <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Submit prompts aimed at facilitating criminal offenses, evading law enforcement, or violating Indian statutes.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-panel p-4">
                  <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Engage in automated scraping, data extraction, bot querying, or denial-of-service (DoS) attempts against our API.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-panel p-4">
                  <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Attempt prompt injection, jailbreaking, or exploiting vulnerabilities in the LangGraph orchestration framework.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-panel p-4">
                  <XCircle className="size-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Input confidential child welfare records, sealed judicial proceedings, or defamatory falsehoods about private persons.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="intellectual-property" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <CheckCircle2 className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                4. Intellectual Property &amp; Statutory Public Domain
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                <strong className="text-white">Public Domain Legislative Acts:</strong> Under Section 52(1)(q) of the Indian Copyright Act, 1957, the reproduction or publication of any Act of the Legislature, court judgments, or official government gazettes is exempt from copyright infringement. The statutory texts indexed by Verdict belong to the public domain.
              </p>
              <p>
                <strong className="text-white">Platform Rights:</strong> All proprietary code, user interface designs, logos, graphics, compilation algorithms, and verification systems are the intellectual property of Verdict. You may not copy, reproduce, or republish our software without express written authorization.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="disclaimer-warranties" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <AlertOctagon className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                5. Disclaimer of Warranties
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p className="uppercase tracking-wide text-xs text-brass font-semibold">
                Provided &quot;As Is&quot; &amp; &quot;As Available&quot;
              </p>
              <p>
                VERDICT AND ITS ASSOCIATED CONTENT, SERVICES, RETRIEVAL SYSTEM, AND CITATIONS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE EXPRESSLY DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-ivory/70 text-sm">
                <li>Warranties of merchantability, fitness for a particular legal or commercial purpose, and non-infringement.</li>
                <li>Warranties that answers will be error-free, exhaustive, complete, or current with recent judicial amendments.</li>
                <li>Warranties that the service will be continuous, uninterrupted, secure, or free from server downtimes.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="limitation-liability" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Scale className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                6. Limitation of Liability
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                IN NO EVENT SHALL VERDICT, ITS FOUNDERS, CONTRIBUTORS, DEVELOPERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, LEGAL COSTS, ADVERSE COURT JUDGMENTS, ARREST, FINES, PENALTIES, OR LOSS OF BUSINESS) ARISING OUT OF OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="text-sm text-ivory/70">
                Your sole and exclusive remedy for dissatisfaction with Verdict is to stop using the platform. In jurisdictions where limitations of liability are restricted, our aggregate liability shall not exceed INR ₹100 (One Hundred Indian Rupees) or the amount paid by you to Verdict in the preceding month, whichever is lower.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="indemnification" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                7. Indemnification
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                You agree to defend, indemnify, and hold harmless Verdict, its operators, officers, affiliates, and licensors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or legal fees arising out of your violation of these Terms, your misuse of the Service, or your reliance on any generated output without independent verification by an advocate.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="governing-law" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Gavel className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                8. Governing Law &amp; Jurisdiction
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                These Terms and any dispute or claim arising out of or related to Verdict shall be governed by and construed in accordance with the laws of the <strong className="text-white">Republic of India</strong>, without giving effect to any principles of conflict of law.
              </p>
              <p>
                You agree to submit to the exclusive personal jurisdiction and venue of the competent courts situated in <strong className="text-white">New Delhi, India</strong> for the resolution of all disputes.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="modifications-terms" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <RefreshCw className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                9. Modifications to Terms
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. When modifications occur, we will revise the &quot;Last updated&quot; date at the top of this document. Continued use of Verdict following any amendments constitutes full acceptance of the updated terms.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="contact-info" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Mail className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                10. Contact Information
              </h2>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-panel p-6 space-y-3">
              <p>
                For questions regarding these Terms and Conditions or the Verdict service, please contact us at:
              </p>
              <div className="space-y-1 text-sm sm:text-base">
                <p><strong className="text-white">Platform:</strong> Verdict (AI Legal Assistant)</p>
                <p><strong className="text-white">Legal &amp; Compliance Team:</strong> legal@verdict.app</p>
                <p><strong className="text-white">Support:</strong> support@verdict.app</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-ivory/60">
          <Link href="/" className="text-brass hover:underline flex items-center gap-1">
            <ArrowLeft className="size-4" /> Return to Verdict Home
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-ivory/80 hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/ask" className="text-ivory/80 hover:text-white hover:underline">
              Ask a Question
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
