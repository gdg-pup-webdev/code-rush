"use client";
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDraggable, useDroppable } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, arrayMove, useSortable } from '@dnd-kit/sortable';
import { targets } from './targets';

// --- Draggable Block Component ---
function DraggableBlock({ id, content }: { id: string; content: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { content: content }
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-white p-2 rounded shadow-md cursor-grab">
      <code>{content}</code>
    </div>
  );
}

// --- Sortable Item Component ---
function SortableItem({ id, content }: { id: string; content: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 mb-2 bg-green-100 rounded shadow-sm">
      <code>{content}</code>
    </div>
  );
}


const createBlock = (content: string, id: string) => ({ id, content });

const getInitialBlocks = () => [
  createBlock('<div>', 'block-1'),
  createBlock('<p>', 'block-2'),
  createBlock('</p>', 'block-3'),
  createBlock('</div>', 'block-4'),
  createBlock('<style>', 'block-5'),
  createBlock('</style>', 'block-6'),
  createBlock('display: flex;', 'block-7'),
  createBlock('justify-content: center;', 'block-8'),
  createBlock('align-items: center;', 'block-9'),
  createBlock('background-color: #ef4444;', 'block-10'),
  createBlock('width: 8rem;', 'block-11'),
  createBlock('height: 8rem;', 'block-12'),
  createBlock('color: #3b82f6;', 'block-13'),
  createBlock('font-size: 2.25rem;', 'block-14'),
  createBlock('font-weight: 700;', 'block-15'),
  createBlock('Hello, World!', 'block-16'),
];

const CssRush = () => {
  // --- State Variables ---
  const [blocks, setBlocks] = useState(getInitialBlocks());
  const [code, setCode] = useState<{ id: string; content: string }[]>([]);
  const [timer, setTimer] = useState(180);
  const [score, setScore] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(targets[0]);

  // --- Effects ---
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (code.length > 0) {
      const userCode = code.map((c) => c.content).join('');
      const solution = currentTarget.solution.join('');
      if (userCode === solution) {
        setScore(score + 1);
        const nextTargetIndex = (targets.indexOf(currentTarget) + 1) % targets.length;
        setCurrentTarget(targets[nextTargetIndex]);
        setCode([]);
      }
    }
  }, [code, score, currentTarget]);

  // --- Drag and Drop Logic ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over) {
      if (over.id === 'code-space') {
        // Dragging from blocks to code space
        if(active.data.current.content){
          const newId = `code-${new Date().getTime()}`;
          setCode((oldCode) => [...oldCode, { id: newId, content: active.data.current.content }]);
        }
      } else {
        // Reordering within code space
        const oldIndex = code.findIndex((c) => c.id === active.id);
        const newIndex = code.findIndex((c) => c.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          setCode((items) => arrayMove(items, oldIndex, newIndex));
        }
      }
    }
  }

  const { setNodeRef } = useDroppable({
    id: 'code-space',
  });


  // --- Render ---
  const userHtml = code.map((c) => c.content).join('');

  return (
    <div className="font-sans">
      <div className="grid grid-cols-2 gap-4 h-screen">
        {/* Left Column */}
        <div className="flex flex-col p-4 bg-gray-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">CSS Rush</h1>
          <div className="flex justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-gray-700">
              Time: <span className="text-blue-500">{timer}s</span>
            </div>
            <div className="text-lg font-semibold text-gray-700">
              Score: <span className="text-green-500">{score}</span>
            </div>
          </div>
          {isClient && (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <div className="flex flex-wrap gap-2 p-2 bg-gray-200 rounded-lg mb-4">
                {blocks.map((block) => (
                  <DraggableBlock key={block.id} id={block.id} content={block.content} />
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Code Space</h2>
              <div ref={setNodeRef} className="flex-grow p-4 bg-white rounded-lg shadow-inner border-2 border-gray-300">
                <SortableContext items={code.map(i => i.id)}>
                  {code.map((block) => (
                    <SortableItem key={block.id} id={block.id} content={block.content} />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          )}
        </div>

        {/* Right Column */}
        <div className="p-4 bg-gray-50 flex flex-col">
          <div className="flex-grow relative"
            onMouseEnter={() => setShowTarget(true)}
            onMouseLeave={() => setShowTarget(false)}
          >
            <div className="w-full h-full bg-white rounded-lg shadow-inner border-2 border-gray-300">
              <iframe
                title="User Output"
                srcDoc={userHtml}
                className="w-full h-full rounded-lg"
              />
            </div>
            {showTarget && (
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-inner border-2 border-blue-400">
                <iframe
                  title="Target Output"
                  srcDoc={currentTarget.html}
                  className="w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center h-10 mt-2 text-gray-600">
            Hover to see the target design
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssRush;