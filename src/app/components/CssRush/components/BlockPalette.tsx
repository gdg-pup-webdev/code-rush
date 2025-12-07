import React from 'react';
import { PaletteBlock } from './PaletteBlock';

interface BlockPaletteProps {
  blocks: string[];
}

/**
 * Block palette section showing all available blocks
 */
export function BlockPalette({ blocks }: BlockPaletteProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">Blocks</h3>
      <div className="flex flex-wrap gap-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
        {blocks.map((block, idx) => (
          <PaletteBlock key={`palette-${idx}`} id={`palette-${idx}`} content={block} />
        ))}
      </div>
    </div>
  );
}
