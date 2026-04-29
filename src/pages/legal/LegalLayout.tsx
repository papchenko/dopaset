export default function LegalLayout({ title, children }) {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white px-6 py-24">

      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-[-200px] left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-purple-600 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">{title}</h1>
        {children}
      </div>

    </main>
  );
}