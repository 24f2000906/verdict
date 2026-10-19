import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Shield, Eye, Database, Megaphone, Cookie, Lock, RefreshCw, Mail, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Verdict - AI Legal Assistant",
  description: "Learn how Verdict collects, uses, and protects your information, including our advertising disclosures and data handling practices.",
};

export default function PrivacyPolicyPage() {
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
            <Shield className="size-3.5" /> Legal Transparency
          </div>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ivory/60">
            Last updated: <span className="text-brass">October 18, 2026</span> · Effective immediately
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ivory/80">
            At <strong className="text-white">Verdict</strong> (&quot;Verdict&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to respecting and protecting your privacy. This Privacy Policy details how our AI-assisted legal research platform collects, processes, and safeguards information when you visit our website, interact with our legal question-answering tool, or view content and advertisements on our service.
          </p>
        </div>

        {/* Quick Highlights Box */}
        <div className="my-8 rounded-2xl border border-brass/30 bg-panel/80 p-6 backdrop-blur">
          <h2 className="flex items-center gap-2 font-serif text-xl text-brass">
            <AlertTriangle className="size-5 text-brass" /> Key Points at a Glance
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm sm:text-base text-ivory/80 list-disc list-inside">
            <li>
              <strong className="text-white">Informational Service Only:</strong> Verdict is an automated research aid for Indian statutes. We do not provide licensed legal counsel or create an advocate-client relationship.
            </li>
            <li>
              <strong className="text-white">Advertising Disclosure:</strong> You may see advertisements on Verdict. Third-party advertising partners use cookies and device identifiers to serve relevant ads.
            </li>
            <li>
              <strong className="text-white">Local Chat Storage:</strong> Your conversation history is stored locally in your browser&apos;s <code className="rounded bg-black/40 px-1.5 py-0.5 text-brass">localStorage</code> and is under your direct control.
            </li>
            <li>
              <strong className="text-white">Statutory Queries:</strong> Queries sent to our API are processed through our vector search and AI synthesis pipeline to retrieve citations from official Indian bare acts.
            </li>
          </ul>
        </div>

        {/* Policy Body */}
        <div className="space-y-12 text-ivory/80 leading-relaxed text-base">
          {/* Section 1 */}
          <section id="notice-on-ads" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Megaphone className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                1. Advertisements &amp; Third-Party Ad Networks
              </h2>
            </div>
            <div className="mt-4 space-y-4 rounded-xl border border-brass/20 bg-brass/5 p-5">
              <p className="font-medium text-white">
                <strong className="text-brass">Important Notice:</strong> You may see advertisements displayed across the Verdict platform.
              </p>
              <p>
                To support free access to legal information and maintain the compute resources required for vector retrieval and AI inference, Verdict displays third-party advertisements. These advertisements may be delivered by ad platforms, advertising exchanges, and advertising partners (such as Google AdSense, programmatic ad networks, or direct sponsors).
              </p>
              <p>
                When you access Verdict, third-party advertising vendors may:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-ivory/90">
                <li>Place or read cookies, web beacons, pixels, and tracking technologies on your browser.</li>
                <li>Collect non-personally identifiable diagnostic and interaction information, including your IP address, browser type, device identifiers, and timestamp.</li>
                <li>Serve advertisements tailored to your interests, past browsing activity across multiple websites, or contextual legal queries.</li>
              </ul>
              <div className="mt-4 rounded-lg bg-panel p-4 border border-white/10 text-sm">
                <p className="font-semibold text-brass mb-1">Your Ad Choices &amp; Opt-Out Controls:</p>
                <p className="text-ivory/70 mb-2">
                  You have the right to control how advertising partners use your data for personalized ads:
                </p>
                <ul className="space-y-1 list-disc list-inside text-ivory/80">
                  <li>
                    Google Ad Settings: Manage personalization via{" "}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brass underline hover:text-white">
                      Google Ads Settings
                    </a>.
                  </li>
                  <li>
                    Network Advertising Initiative (NAI): Opt out of participating third-party networks via{" "}
                    <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-brass underline hover:text-white">
                      optout.networkadvertising.org
                    </a>.
                  </li>
                  <li>
                    Digital Advertising Alliance (DAA): Manage ad preferences via{" "}
                    <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brass underline hover:text-white">
                      optout.aboutads.info
                    </a>.
                  </li>
                  <li>
                    Browser Controls: You can set your browser to reject all or certain cookies. Note that disabling cookies may affect certain non-essential visual settings, but you will still be able to browse legal provisions.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="information-collected" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Eye className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                2. Information We Collect and Process
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <p>
                Verdict is designed with data minimization in mind. We do not require you to create an account, register, or disclose your name to ask legal questions. We process the following categories of information:
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="rounded-xl border border-white/10 bg-panel p-4">
                  <h3 className="font-serif text-lg text-brass">A. Legal Questions &amp; Prompts</h3>
                  <p className="mt-2 text-sm text-ivory/70">
                    When you submit a query, the text is transmitted securely over HTTPS to our backend API to perform semantic search in ChromaDB across statutes (such as BNS, BNSS, BSA, and Constitution of India) and synthesize verified answers.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-panel p-4">
                  <h3 className="font-serif text-lg text-brass">B. Browser Local Storage</h3>
                  <p className="mt-2 text-sm text-ivory/70">
                    Your active conversation history is saved exclusively in your browser&apos;s local storage (<code className="text-brass">verdict:chat-history:v1</code>). We do not store your user session chat transcripts in a permanent cloud database linked to your personal identity.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-panel p-4">
                  <h3 className="font-serif text-lg text-brass">C. Server Cache &amp; Hashes</h3>
                  <p className="mt-2 text-sm text-ivory/70">
                    To reduce latency and cloud costs, our backend caches verified responses using a one-way cryptographic SHA-256 hash of the normalized query. This hash does not reveal personal identity.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-panel p-4">
                  <h3 className="font-serif text-lg text-brass">D. Technical Telemetry &amp; Logs</h3>
                  <p className="mt-2 text-sm text-ivory/70">
                    Standard server logs record IP addresses, user agent strings, HTTP status codes, and request timestamps to prevent denial-of-service attacks, detect abuse, and debug infrastructure errors.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm">
                <p className="font-semibold text-red-400">Caution Regarding Sensitive Personal Data:</p>
                <p className="text-ivory/80 mt-1">
                  Do NOT include sensitive personal information—such as government identification numbers (Aadhaar, PAN, Passport), bank accounts, financial credentials, or private details of ongoing sensitive litigations—in your query prompts.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="cookies-and-tracking" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Cookie className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                3. Cookies and Tracking Technologies
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                Cookies are small data files stored on your device by your web browser. Verdict uses cookies and similar storage mechanisms for:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">Essential Functionality:</strong> Storing temporary UI states, theme preferences, and ensuring reliable request routing.
                </li>
                <li>
                  <strong className="text-white">Third-Party Advertising:</strong> Facilitating ad delivery, frequency capping, fraud prevention, and performance measurement through ad networks.
                </li>
                <li>
                  <strong className="text-white">Performance Diagnostics:</strong> Aggregating anonymous load times and error rates to optimize server performance.
                </li>
              </ul>
              <p className="text-sm text-ivory/70">
                You can configure your browser to notify you before receiving a cookie or to block cookies entirely. Consult your browser&apos;s help menu (Chrome, Edge, Firefox, Safari) for instructions on clearing or disabling cookies.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="third-party-services" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Database className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                4. Third-Party AI Models &amp; Service Providers
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                To provide statutory retrieval and legal synthesis, Verdict integrates with trusted third-party technology providers:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">LLM and Embedding Providers:</strong> Queries are processed via AI model endpoints (such as NVIDIA AI Endpoints and LangChain integrations) solely to generate legal synthesis and match relevant bare act excerpts.
                </li>
                <li>
                  <strong className="text-white">Vector Database (ChromaDB):</strong> Vector embeddings of official bare acts are indexed locally or in our private containerized infrastructure.
                </li>
                <li>
                  <strong className="text-white">Hosting &amp; Cloud Infrastructure:</strong> Cloud hosting facilities for server execution, static asset delivery, and DDoS mitigation.
                </li>
              </ul>
              <p className="text-sm text-ivory/70">
                We do not sell, rent, or trade your query prompts or conversation history to data brokers.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="no-advocate-privilege" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Lock className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                5. No Advocate-Client Privilege or Confidentiality
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                Please note that Verdict is an automated technology platform and does not practice law. Communications sent through Verdict are <strong className="text-white">not protected by advocate-client legal privilege</strong> under Section 126 of the Indian Evidence Act, 1872 or corresponding provisions of the Bharatiya Sakshya Adhiniyam, 2023.
              </p>
              <p>
                Do not transmit confidential, privileged, or incriminating facts that you would only disclose in confidence to your licensed legal advocate.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="legal-compliance-india" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Shield className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                6. Compliance with Indian Law (DPDPA &amp; IT Act)
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                Verdict operates in compliance with applicable Indian digital privacy legislation, including:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">Information Technology Act, 2000</strong> and its Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </li>
                <li>
                  <strong className="text-white">Digital Personal Data Protection Act, 2023 (DPDPA):</strong> We respect user rights regarding personal digital data, including principles of consent, purpose limitation, and storage minimization.
                </li>
              </ul>
              <p>
                Under applicable Indian law, users may request information regarding data processed, demand correction, or request deletion of any identifiable logs held by contacting our Grievance Officer.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="children-privacy" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Eye className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                7. Children&apos;s Privacy
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                Verdict is intended for adults, law students, legal practitioners, and citizens seeking understanding of Indian statutory law. We do not knowingly collect personal information from individuals under the age of 18 without parental or guardian consent.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="changes-to-policy" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <RefreshCw className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                8. Changes to This Privacy Policy
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <p>
                We may revise this Privacy Policy periodically to reflect updates in our algorithmic pipeline, new advertising partners, statutory enactments, or changes in legal regulations. When changes are published, we will update the &quot;Last updated&quot; date at the top of this document. Continued use of Verdict after changes take effect indicates your acceptance.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="contact-grievance" className="scroll-mt-28">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-brass/10 text-brass border border-brass/20">
                <Mail className="size-5" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                9. Contact &amp; Grievance Officer
              </h2>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-panel p-6 space-y-4">
              <p>
                In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, if you have any questions, complaints, or grievances regarding this Privacy Policy or your data, you may reach out to our team:
              </p>
              <div className="space-y-1 text-sm sm:text-base">
                <p><strong className="text-white">Platform:</strong> Verdict (AI Legal Assistant)</p>
                <p><strong className="text-white">Grievance / Privacy Desk:</strong> legal@verdict.app</p>
                <p><strong className="text-white">General Inquiries:</strong> contact@verdict.app</p>
                <p><strong className="text-white">Jurisdiction:</strong> New Delhi / Bengaluru, India</p>
              </div>
              <p className="text-xs text-ivory/50">
                We endeavor to review and resolve inquiries and legitimate grievances within thirty (30) business days from receipt.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-ivory/60">
          <Link href="/" className="text-brass hover:underline flex items-center gap-1">
            <ArrowLeft className="size-4" /> Return to Verdict Home
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-ivory/80 hover:text-white hover:underline">
              Terms &amp; Conditions
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
