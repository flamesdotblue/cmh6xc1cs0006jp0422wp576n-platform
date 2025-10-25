import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800/60 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Rocket size={18} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              C M&Y
            </h1>
            <p className="text-xs text-slate-400 -mt-0.5">Visual DSA in C — Learn by Doing</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-300">
          <a className="hover:text-white transition" href="#">Home</a>
          <a className="hover:text-white transition" href="#">Data Structures</a>
          <a className="hover:text-white transition" href="#">About</a>
        </nav>
      </div>
    </header>
  );
}
