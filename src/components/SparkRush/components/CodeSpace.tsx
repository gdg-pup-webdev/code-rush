"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { SortableCodeBlockComponent } from "./SortableCodeBlockComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
import { CodeBlock } from "../types";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

type Props = {
  codeBlocks: CodeBlock[];
  setCodeBlocks: React.Dispatch<React.SetStateAction<CodeBlock[]>>;
};

import { useSparkRush } from "../SparkRushContext";

export const CodeSpace = () => {
  const { codeBlocks, setCodeBlocks } = useSparkRush();
  // 🔥 Local state for sorting
  const [localBlocks, setLocalBlocks] = useState<CodeBlock[]>([]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Sync initial / external changes into localBlocks
  useEffect(() => {
    setLocalBlocks(codeBlocks);
  }, [codeBlocks]);

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={localBlocks.map((i) => i.id)}>
        <div
          className={`absolute inset-0 flex-1 p-4 rounded-lg border overflow-y-auto overflow-x-hidden max-h-[calc(100vh-250px)] transition-colors duration-500 bg-slate-900  border-slate-700 hover:border-slate-600`}
        >
          {localBlocks.map((block) => (
            <>
              {block && (
                <SortableCodeBlockComponent key={block.id} codeBlock={block} />
              )}
            </>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <CodeBlockComponent
            codeBlock={localBlocks.find((b) => b.id === activeId)!}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setLocalBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    // Commit sorted order to parent
    setCodeBlocks(localBlocks);
  }
};
