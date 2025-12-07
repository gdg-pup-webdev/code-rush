import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Syntax highlighting for code content
 */
function SyntaxHighlightedContent({ content }: { content: string }) {
  // Split into lines first (before trimming)
  const lines = content.split('\n');
  
  // Find the first non-empty line to get base indentation
  const firstNonEmptyLine = lines.find((l) => l.trim());
  const baseIndent = firstNonEmptyLine
    ? (firstNonEmptyLine.match(/^(\s*)/) || [])[1]?.length || 0
    : 0;

  // Now trim start and end whitespace from the entire content
  const trimmedContent = content.trim();
  
  // Tokenize and highlight the content
  const parts = trimmedContent.split(/(<[^>]+>|:[^;}\n]+|"[^"]*"|'[^']*'|[#][0-9a-f]{3,6}|[{}:;])/);

  // Calculate padding (2px per space = 0.125rem)
  const paddingRem = baseIndent * 1;

  return (
    <pre
      className="font-mono whitespace-pre-wrap leading-relaxed text-slate-100"
      style={{ paddingLeft: `${paddingRem}rem` }}
    >
      {parts.map((part, idx) => {
        if (!part) return null;

        // HTML tags
        if (part.match(/^<[^>]+>$/)) {
          return (
            <span key={idx} className="text-blue-300">
              {part}
            </span>
          );
        }

        // CSS property names (ends with :)
        if (part.match(/^[a-z-]+:$/)) {
          return (
            <span key={idx} className="text-green-300">
              {part}
            </span>
          );
        }

        // Quoted strings
        if (part.match(/^["'][^"']*["']$/)) {
          return (
            <span key={idx} className="text-yellow-300">
              {part}
            </span>
          );
        }

        // Color codes
        if (part.match(/^#[0-9a-f]{3,6}$/i)) {
          return (
            <span key={idx} className="text-orange-300">
              {part}
            </span>
          );
        }

        // Delimiters
        if (part.match(/^[{}:;]$/)) {
          return (
            <span key={idx} className="text-purple-300">
              {part}
            </span>
          );
        }

        // Default text
        return part;
      })}
    </pre>
  );
}

/**
 * A sortable code block in the code space
 */
export function CodeItem({
  id,
  content,
  isDragging,
}: {
  id: string;
  content: string;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSorting } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSorting ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-start gap-2 mb-0 group cursor-grab active:cursor-grabbing select-none pointer-events-auto"
    >
      {/* Drag Handle */}
      <div
        className="shrink-0 w-1 bg-slate-500 rounded hover:bg-slate-400 transition-colors mt-1"
        title="Drag to reorder"
      />

      {/* Code Content */}
      <div className={`flex-1 px-3 py-1 rounded transition-colors text-xs select-none pointer-events-none ${
        isSorting ? 'border border-slate-500' : 'border border-transparent group-hover:border-slate-600'
      }`}>
        <SyntaxHighlightedContent content={content} />
      </div>
    </div>
  );
}
