import React from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { CodeBlock } from '../types';
import { CodeItem } from './CodeItem';

interface CodeWrapperProps {
  code: CodeBlock[];
  activeId: string | null;
}

export function CodeWrapper({ code, activeId }: CodeWrapperProps) {
  return (
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
  );
}
