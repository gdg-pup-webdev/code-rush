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
import { CodeBlock } from "../types";
import { SortableCodeBlockComponent } from "./SortableCodeBlockComponent";
import { CodeBlockComponent } from "./CodeBlockComponent";
 
type Props = {
    codeBlocks: CodeBlock[];
    setCodeBlocks: React.Dispatch<React.SetStateAction<CodeBlock[]>>;
}

export const CodeSpace = ({codeBlocks, setCodeBlocks} : Props) => { 
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
      <SortableContext items={codeBlocks.map((i) => i.name)} strategy={() => {}}>
        <div className="flex flex-col gap-1 w-300 border-3 border-black">
          {codeBlocks.map(({ name, description }) => (
            <SortableCodeBlockComponent
              key={name}
              codeBlock={{
                id: name,
                content: description
              }}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <CodeBlockComponent
            codeBlock={(() => {
              const item = codeBlocks.find((item) => item.name === activeId)!;
              return {
                id: item.name,
                content: item?.description,
              };
            })()}
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
        const oldIndex = items.findIndex((i) => i.name === active.id);
        const newIndex = items.findIndex((i) => i.name === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd() {
    setActiveId(null);
  }
};
