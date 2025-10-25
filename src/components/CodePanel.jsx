import { Copy } from 'lucide-react';

function Code({ children }) {
  return (
    <pre className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 overflow-auto">
      <code className="text-slate-200 text-xs leading-relaxed whitespace-pre">{children}</code>
    </pre>
  );
}

export default function CodePanel({ ds, operation, code }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">C Code</div>
          <div className="text-base font-medium">{ds} — {operation}</div>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm"
        >
          <Copy size={16} /> Copy
        </button>
      </div>
      <div className="mt-4">
        <Code>{code}</Code>
      </div>
      <div className="mt-3 text-xs text-slate-400">
        Tip: Paste into a C compiler (gcc/clang) and experiment alongside the visualizer.
      </div>
    </div>
  );
}
