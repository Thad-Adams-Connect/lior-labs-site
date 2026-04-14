export default function TermsOfServicePage() {
  return (
    <div className="page-shell safe-x min-dvh">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12">
        <h1 className="font-space text-4xl font-bold tracking-tight text-white md:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-gray-300">
          <p>
            Project scopes, pricing, delivery schedules, and support commitments
            are defined in individual agreements between Lior Labs and each
            client.
          </p>
          <p>
            All proposals and build timelines depend on timely feedback,
            approved content, and access to required third-party services.
          </p>
          <p>
            For questions about a specific engagement, contact hello@liorlabs.com.
          </p>
        </div>
      </div>
    </div>
  );
}