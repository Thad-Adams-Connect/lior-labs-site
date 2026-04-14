export default function PrivacyPolicyPage() {
  return (
    <div className="page-shell safe-x min-dvh">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-12">
        <h1 className="font-space text-4xl font-bold tracking-tight text-white md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-gray-300">
          <p>
            Lior Labs collects only the information you choose to share through
            contact and quote forms, including your name, email address, and
            project details.
          </p>
          <p>
            We use this information to respond to inquiries, prepare proposals,
            and improve our services. We do not sell personal information or use
            it for unrelated marketing without consent.
          </p>
          <p>
            If you would like your information updated or removed, contact us at
            hello@liorlabs.com.
          </p>
        </div>
      </div>
    </div>
  );
}