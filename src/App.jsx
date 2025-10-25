import { useState, useMemo } from 'react';
import Header from './components/Header';
import DSNavigator from './components/DSNavigator';
import Visualizer from './components/Visualizer';
import CodePanel from './components/CodePanel';

const initialStates = {
  Array: [2, 5, 8, 13],
  Stack: [3, 7],
  Queue: [4, 9, 1],
  'Linked List': [10, 20, 30]
};

export default function App() {
  const [selectedDS, setSelectedDS] = useState('Array');
  const [array, setArray] = useState(initialStates.Array);
  const [stack, setStack] = useState(initialStates.Stack);
  const [queue, setQueue] = useState(initialStates.Queue);
  const [linkedList, setLinkedList] = useState(initialStates['Linked List']);
  const [lastOperation, setLastOperation] = useState({ ds: 'Array', op: 'init' });
  const [message, setMessage] = useState('');

  const state = useMemo(() => {
    if (selectedDS === 'Array') return array;
    if (selectedDS === 'Stack') return stack;
    if (selectedDS === 'Queue') return queue;
    return linkedList;
  }, [selectedDS, array, stack, queue, linkedList]);

  const perform = {
    array: {
      insert: (value, index) => {
        const idx = Number(index);
        if (!Number.isInteger(idx) || idx < 0 || idx > array.length) {
          setMessage('Index out of bounds');
          return;
        }
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        const next = [...array];
        next.splice(idx, 0, v);
        setArray(next);
        setLastOperation({ ds: 'Array', op: 'insert' });
        setMessage(`Inserted ${v} at index ${idx}`);
      },
      remove: (index) => {
        const idx = Number(index);
        if (!Number.isInteger(idx) || idx < 0 || idx >= array.length) {
          setMessage('Index out of bounds');
          return;
        }
        const next = [...array];
        const removed = next.splice(idx, 1)[0];
        setArray(next);
        setLastOperation({ ds: 'Array', op: 'delete' });
        setMessage(`Removed ${removed} from index ${idx}`);
      },
    },
    stack: {
      push: (value) => {
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        setStack((s) => {
          const next = [...s, v];
          setMessage(`Pushed ${v}`);
          return next;
        });
        setLastOperation({ ds: 'Stack', op: 'push' });
      },
      pop: () => {
        setStack((s) => {
          if (s.length === 0) {
            setMessage('Stack underflow');
            return s;
          }
          const next = [...s];
          const x = next.pop();
          setMessage(`Popped ${x}`);
          return next;
        });
        setLastOperation({ ds: 'Stack', op: 'pop' });
      }
    },
    queue: {
      enqueue: (value) => {
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        setQueue((q) => {
          const next = [...q, v];
          setMessage(`Enqueued ${v}`);
          return next;
        });
        setLastOperation({ ds: 'Queue', op: 'enqueue' });
      },
      dequeue: () => {
        setQueue((q) => {
          if (q.length === 0) {
            setMessage('Queue underflow');
            return q;
          }
          const next = [...q];
          const x = next.shift();
          setMessage(`Dequeued ${x}`);
          return next;
        });
        setLastOperation({ ds: 'Queue', op: 'dequeue' });
      }
    },
    linked: {
      insertHead: (value) => {
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        setLinkedList((l) => [v, ...l]);
        setLastOperation({ ds: 'Linked List', op: 'insertHead' });
        setMessage(`Inserted ${v} at head`);
      },
      insertTail: (value) => {
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        setLinkedList((l) => [...l, v]);
        setLastOperation({ ds: 'Linked List', op: 'insertTail' });
        setMessage(`Inserted ${v} at tail`);
      },
      deleteValue: (value) => {
        const v = Number(value);
        if (Number.isNaN(v)) {
          setMessage('Enter a number value');
          return;
        }
        setLinkedList((l) => {
          const idx = l.indexOf(v);
          if (idx === -1) {
            setMessage(`Value ${v} not found`);
            return l;
          }
          const next = [...l];
          next.splice(idx, 1);
          setMessage(`Deleted value ${v}`);
          return next;
        });
        setLastOperation({ ds: 'Linked List', op: 'deleteValue' });
      }
    }
  };

  const code = useMemo(() => {
    const snippets = {
      Array: {
        insert: `// Insert at index in array (shift elements to the right)
void insert(int arr[], int *n, int index, int value) {
    if (index < 0 || index > *n) return; // bounds check
    for (int i = *n; i > index; --i) {
        arr[i] = arr[i-1];
    }
    arr[index] = value;
    (*n)++;
}`,
        delete: `// Delete at index in array (shift elements to the left)
void erase(int arr[], int *n, int index) {
    if (index < 0 || index >= *n) return; // bounds check
    for (int i = index; i < *n - 1; ++i) {
        arr[i] = arr[i+1];
    }
    (*n)--;
}`,
        init: `// Array basics in C
int arr[100]; // static allocation
int n = 0;    // current size
// use insert/erase to modify contents`
      },
      Stack: {
        push: `// Stack (array-based)
#define MAX 100
int stack[MAX];
int top = -1;

void push(int x) {
    if (top == MAX - 1) return; // overflow
    stack[++top] = x;
}`,
        pop: `int pop(void) {
    if (top == -1) return -1; // underflow
    return stack[top--];
}`,
        init: `// Initialize stack
int top = -1;`
      },
      Queue: {
        enqueue: `// Queue (circular array)
#define MAX 100
int q[MAX];
int front = 0, rear = 0, size = 0;

void enqueue(int x) {
    if (size == MAX) return; // overflow
    q[rear] = x;
    rear = (rear + 1) % MAX;
    size++;
}`,
        dequeue: `int dequeue(void) {
    if (size == 0) return -1; // underflow
    int x = q[front];
    front = (front + 1) % MAX;
    size--;
    return x;
}`,
        init: `// Initialize queue
int front = 0, rear = 0, size = 0;`
      },
      'Linked List': {
        insertHead: `// Singly linked list: insert at head
struct Node { int data; struct Node* next; };

void push_front(struct Node** head, int x) {
    struct Node* node = malloc(sizeof *node);
    node->data = x;
    node->next = *head;
    *head = node;
}`,
        insertTail: `// Insert at tail
void push_back(struct Node** head, int x) {
    struct Node* node = malloc(sizeof *node);
    node->data = x; node->next = NULL;
    if (!*head) { *head = node; return; }
    struct Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = node;
}`,
        deleteValue: `// Delete first occurrence of value
void delete_value(struct Node** head, int x) {
    struct Node* cur = *head, *prev = NULL;
    while (cur && cur->data != x) { prev = cur; cur = cur->next; }
    if (!cur) return; // not found
    if (!prev) *head = cur->next; else prev->next = cur->next;
    free(cur);
}`,
        init: `// Node definition
struct Node { int data; struct Node* next; };`
      }
    };
    const map = snippets[selectedDS];
    return map[lastOperation.op] || map.init;
  }, [selectedDS, lastOperation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <section className="mt-8">
          <DSNavigator selected={selectedDS} onSelect={setSelectedDS} />
        </section>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Visualizer
              selected={selectedDS}
              data={state}
              onArrayInsert={perform.array.insert}
              onArrayRemove={perform.array.remove}
              onStackPush={perform.stack.push}
              onStackPop={perform.stack.pop}
              onQueueEnqueue={perform.queue.enqueue}
              onQueueDequeue={perform.queue.dequeue}
              onListInsertHead={perform.linked.insertHead}
              onListInsertTail={perform.linked.insertTail}
              onListDeleteValue={perform.linked.deleteValue}
              message={message}
            />
          </div>
          <div className="lg:col-span-2">
            <CodePanel ds={selectedDS} operation={lastOperation.op} code={code} />
          </div>
        </section>
      </main>
    </div>
  );
}
