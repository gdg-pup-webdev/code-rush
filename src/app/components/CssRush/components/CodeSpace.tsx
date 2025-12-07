"use client";

import React, { useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CodeBlock } from "../types";
import { CodeItem } from "./CodeItem";
import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Target } from "../targets";
import { createCodeBlocks, shuffleArray } from "../utils";
import { SortableCodeItem } from "./SortableCodeItem";

interface CodeSpaceProps {
  codeBlocks: CodeBlock[];
  setCodeBlocks: (blocks: CodeBlock[]) => void;
}

/**
 * Code space where blocks are dropped and arranged
 */
export function CodeSpace({ codeBlocks, setCodeBlocks }: CodeSpaceProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  function handleDragOver(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = codeBlocks.findIndex((i) => i.id === active.id);
      const newIndex = codeBlocks.findIndex((i) => i.id === over.id);

      setCodeBlocks(arrayMove(codeBlocks, oldIndex, newIndex));
    }
  }

  // Handlers
  const handleDragEnd = (event: any) => {
    setActiveId(null);
     
  };

  // Drag and drop setup
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
        {/* {activeId && (
          <GhostCodeItem content={codeBlocks.find((c) => c.id === activeId)!.content} />
        )} */}
      </DragOverlay>
    </DndContext>
  );
}
