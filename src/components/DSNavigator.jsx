const items = [
  { key: 'Array', desc: 'Contiguous memory with index-based access' },
  { key: 'Stack', desc: 'LIFO structure for push/pop' },
  { key: 'Queue', desc: 'FIFO with enqueue/dequeue' },
  { key: 'Linked List', desc: 'Nodes with pointers' },
];

export default function DSNavigator({ selected, onSelect }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            className={`text-left rounded-lg p-4 transition border ${
              selected === it.key
                ? 'bg-cyan-500/10 border-cyan-600/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            <div className="font-medium">{it.key}</div>
            <div className="text-xs text-slate-400 mt-1">{it.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
