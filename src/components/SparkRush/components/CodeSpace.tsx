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
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { SortableCodeBlockComponent } from "./SortableCodeBlockComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
import { CodeBlock } from "../types";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={localBlocks.map((i) => i.id)}>
        <div
          className={`flex-1 p-4 rounded-lg border-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-250px)] transition-colors duration-500 bg-gray-100 border-gray-200 hover:border-gray-300`}
        >
          {localBlocks.map((b) => (
            <SortableCodeBlockComponent key={b.id} codeBlock={b} />
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
