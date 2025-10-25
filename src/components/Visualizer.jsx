import { useState } from 'react';
import { Play } from 'lucide-react';

function Pill({ children, active }) {
  return (
    <div
      className={`px-3 py-2 rounded-md border text-sm font-medium ${
        active
          ? 'bg-cyan-500/10 border-cyan-600/40 text-cyan-300'
          : 'bg-slate-900 border-slate-800 text-slate-200'
      }`}
    >
      {children}
    </div>
  );
}

function ArrayView({ data }) {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((v, i) => (
        <div key={i} className="text-center">
          <div className="w-16 h-16 grid place-items-center rounded-lg border border-slate-800 bg-slate-900 text-lg font-semibold">
            {v}
          </div>
          <div className="text-xs text-slate-400 mt-1">{i}</div>
        </div>
      ))}
    </div>
  );
}

function StackView({ data }) {
  return (
    <div className="flex flex-col-reverse items-center gap-2">
      {data.length === 0 && (
        <div className="text-sm text-slate-400">Empty stack</div>
      )}
      {data.map((v, i) => (
        <div key={i} className="w-40 h-10 grid place-items-center rounded-md border border-slate-800 bg-slate-900">
          {v}
        </div>
      ))}
      <div className="text-xs text-slate-400">bottom</div>
    </div>
  );
}

function QueueView({ data }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400">front</span>
      {data.map((v, i) => (
        <div key={i} className="w-16 h-16 grid place-items-center rounded-lg border border-slate-800 bg-slate-900 font-semibold">
          {v}
        </div>
      ))}
      <span className="text-xs text-slate-400">rear</span>
    </div>
  );
}

function LinkedListView({ data }) {
  return (
    <div className="flex items-center flex-wrap gap-2">
      {data.length === 0 && <div className="text-sm text-slate-400">Empty list</div>}
      {data.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 font-semibold">{v}</div>
          {i !== data.length - 1 && (
            <div className="text-cyan-400">→</div>
          )}
        </div>
      ))}
      {data.length > 0 && <div className="text-xs text-slate-400 ml-2">NULL</div>}
    </div>
  );
}

export default function Visualizer({
  selected,
  data,
  onArrayInsert,
  onArrayRemove,
  onStackPush,
  onStackPop,
  onQueueEnqueue,
  onQueueDequeue,
  onListInsertHead,
  onListInsertTail,
  onListDeleteValue,
  message
}) {
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');

  const renderView = () => {
    switch (selected) {
      case 'Array':
        return <ArrayView data={data} />;
      case 'Stack':
        return <StackView data={data} />;
      case 'Queue':
        return <QueueView data={data} />;
      default:
        return <LinkedListView data={data} />;
    }
  };

  const Controls = () => {
    if (selected === 'Array') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
            placeholder="value (number)"
          />
          <input
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
            placeholder="index"
          />
          <button
            onClick={() => onArrayInsert(value, index)}
            className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
          >
            Insert
          </button>
          <button
            onClick={() => onArrayRemove(index)}
            className="px-4 py-2 rounded-md bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white font-medium"
          >
            Delete
          </button>
        </div>
      );
    }
    if (selected === 'Stack') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
            placeholder="value (number)"
          />
          <button
            onClick={() => onStackPush(value)}
            className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
          >
            Push
          </button>
          <button
            onClick={() => onStackPop()}
            className="px-4 py-2 rounded-md bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white font-medium"
          >
            Pop
          </button>
        </div>
      );
    }
    if (selected === 'Queue') {
      return (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
            placeholder="value (number)"
          />
          <button
            onClick={() => onQueueEnqueue(value)}
            className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
          >
            Enqueue
          </button>
          <button
            onClick={() => onQueueDequeue()}
            className="px-4 py-2 rounded-md bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white font-medium"
          >
            Dequeue
          </button>
        </div>
      );
    }
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-3 py-2 rounded-md bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
          placeholder="value (number)"
        />
        <button
          onClick={() => onListInsertHead(value)}
          className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium"
        >
          Insert Head
        </button>
        <button
          onClick={() => onListInsertTail(value)}
          className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
        >
          Insert Tail
        </button>
        <button
          onClick={() => onListDeleteValue(value)}
          className="px-4 py-2 rounded-md bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white font-medium"
        >
          Delete Value
        </button>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill active>{selected}</Pill>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Play size={14} />
          Try an operation below
        </div>
      </div>

      <div className="mt-6">
        {renderView()}
      </div>

      <div className="mt-6">
        <Controls />
      </div>

      {message && (
        <div className="mt-4 text-sm text-slate-300">
          {message}
        </div>
      )}
    </div>
  );
}
