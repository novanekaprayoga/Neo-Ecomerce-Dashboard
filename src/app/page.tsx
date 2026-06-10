import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex rounded-full bg-blue-500/20 px-4 py-1 text-sm font-medium text-blue-100">
              Neo Commerce Dashboard
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Insight, order management, and customer control — all in one place.
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              Launch your store operations faster with an admin dashboard built for selling, analytics, and customer management.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-slate-400/30 bg-white/10 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-white/40 hover:bg-white/10"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-lg sm:p-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-100">
                  📊
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Real-time Dashboard</p>
                  <p className="text-sm text-slate-400">Monitor sales, traffic, and customer growth at a glance.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-100">
                  🛒
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Order Management</p>
                  <p className="text-sm text-slate-400">Create, edit, and track orders with a modern workflow.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-100">
                  👥
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Customer Control</p>
                  <p className="text-sm text-slate-400">Manage your customer data with easy search and quick edits.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
