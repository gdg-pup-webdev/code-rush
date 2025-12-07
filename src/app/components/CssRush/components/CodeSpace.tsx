import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CodeBlock } from '../types';
import { CodeItem } from './CodeItem';

interface CodeSpaceProps {
  code: CodeBlock[];
  setDroppableRef: (ref: HTMLDivElement | null) => void;
  activeId: string | null;
}

/**
 * Code space where blocks are dropped and arranged
 */
export function CodeSpace({ code, setDroppableRef, activeId }: CodeSpaceProps) {
  return (
    <div className="flex-1 flex flex-col">
      <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
        Code Space
      </h3>
      <div
        ref={setDroppableRef}
        className="flex-1 p-4 bg-slate-900/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors overflow-y-auto overflow-x-hidden max-h-[calc(100vh-250px)]"
      >
        <SortableContext items={code.map(c => c.id)}>
          {code.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              Drag blocks here to build your code
            </div>
          ) : (
            code.map(block => (
              <CodeItem
                key={block.id}
                id={block.id}
                content={block.content}
                isDragging={activeId === block.id}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
