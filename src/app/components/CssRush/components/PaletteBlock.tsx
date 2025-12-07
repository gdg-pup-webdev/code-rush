import React from 'react';
import { useDraggable } from '@dnd-kit/core';

/**
 * A draggable block from the palette
 */
export function PaletteBlock({ id, content }: { id: string; content: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${id}`,
    data: { type: 'palette', id, content },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 bg-white rounded-md shadow-md cursor-grab hover:shadow-lg transition-shadow whitespace-nowrap text-sm font-mono ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {content}
    </div>
  );
}
