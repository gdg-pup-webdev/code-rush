import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { CodeBlock } from "./types";

/**
 * Manages active dragged item state
 */
export function useDragStart() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  return { activeId, setActiveId, handleDragStart };
}

/**
 * Gets the content of the currently dragged item
 */
export function useActiveContent(
  activeId: string | null,
  code: CodeBlock[],
  targetBlocks: string[]
) {
  return useCallback(() => {
    if (!activeId) return null;
    const codeBlock = code.find((c) => c.id === activeId);
    return codeBlock ? codeBlock.content : null;
  }, [activeId, code, targetBlocks]);
}

/**
 * Handles drag end logic and code updates (reordering only)
 */
export function useDragEnd() {
  const handleDragEnd = (
    event: any,
    code: CodeBlock[],
    setCode: (code: CodeBlock[]) => void
  ) => {
    const { active, over } = event;

    if (!over || over.id === active.id) return;

    // Only reorder blocks within code space
    if (active.id.startsWith("code-") && over.id.startsWith("code-")) {
      const oldIndex = code.findIndex((item) => item.id === active.id);
      const newIndex = code.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setCode(arrayMove(code, oldIndex, newIndex));
      }
    }
  };

  return { handleDragEnd };
}

