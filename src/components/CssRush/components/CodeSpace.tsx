"use client";

import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import people from "../people.json";
import { SortableCodeBlockComponent } from "./SortableCodeBlockComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
import { CodeBlock } from "../types";


type Props = {
    codeBlocks: CodeBlock[];
    setCodeBlocks: React.Dispatch<React.SetStateAction<CodeBlock[]>>;
}


export const CodeSpace = ({codeBlocks, setCodeBlocks}: Props) => { 
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
    >
      <SortableContext items={codeBlocks.map((i) => i.id)}  >
        <div className="flex flex-col gap-1 w-full border-3 border-black">
          {codeBlocks.map((b) => (
            <SortableCodeBlockComponent
              key={b.id}
              codeBlock={b}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <CodeBlockComponent
            codeBlock={codeBlocks.find((b) => b.id === activeId)!}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCodeBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd() {
    setActiveId(null);
  }
};
