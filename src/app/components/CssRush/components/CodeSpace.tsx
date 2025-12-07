"use client";

import React, { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CodeBlock } from "../types"; 
import { 
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"; 
import { SortableCodeItem } from "./SortableCodeItem";
import { CodeItem } from "./CodeItem";

interface CodeSpaceProps {
  codeBlocks: CodeBlock[];
  setCodeBlocks: (blocks: CodeBlock[]) => void;
}

/**
 * Code space where blocks are dropped and arranged
 */
export function CodeSpace({ codeBlocks, setCodeBlocks }: CodeSpaceProps) {
  
  const [activeId, setActiveId] = useState<string | null>(null);
 
  const sensors =useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

 function handleDragStart(event: any) {
  setActiveId(event.active.id);
}

function handleDragEnd(event: any) {
  const { active, over } = event;

  if (!over) {
    setActiveId(null);
    return;
  }

  if (active.id !== over.id) {
    const oldIndex = codeBlocks.findIndex((i) => i.id === active.id);
    const newIndex = codeBlocks.findIndex((i) => i.id === over.id);

    setCodeBlocks(arrayMove(codeBlocks, oldIndex, newIndex));
  }

  setActiveId(null);
}

function handleDragOver() {
  // NO REORDERING HERE
}

 

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragCancel={handleDragEnd}
    >
      <SortableContext items={codeBlocks.map((c) => c.id)}>
        <div
          className={`flex-1 p-4 rounded-lg border overflow-y-auto overflow-x-hidden max-h-[calc(100vh-250px)] transition-colors duration-500 ${"bg-slate-900/30 border-slate-700 hover:border-slate-600"}`}
        >
          {codeBlocks.map((block) => (
            <SortableCodeItem
              key={block.id}
              id={block.id}
              content={block.content} 
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
  {activeId && (
    <CodeItem
      id={activeId}
      content={codeBlocks.find((c) => c.id === activeId)!.content}
      className="text-white w-full border border-white px-3 py-2 rounded-md bg-slate-900/40 opacity-80"
    />
  )}
</DragOverlay>
    </DndContext>
  );
}
