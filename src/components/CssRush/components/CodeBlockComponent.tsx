import React, { forwardRef } from "react";
import { CodeBlock } from "../types";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  codeBlock: CodeBlock;
  style?: React.CSSProperties;
  ref?: React.ForwardedRef<HTMLDivElement>;
  isDragging?: boolean;
  isOverlay?: boolean;
};

export const CodeBlockComponent = ({
  codeBlock,
  style,
  ref,
  isDragging,
  isOverlay,
  ...rest
}: Props) => {
  return (
    // when when being dragged
    <div
      ref={ref}
      style={{
        ...style,
      }}
      className={`flex items-start gap-2 mb-0 group cursor-grab active:cursor-grabbing select-none pointer-events-auto    ${
        isDragging ? " opacity-0 " : ""
      } ${isOverlay ? "bg-gray-600" : " hover:bg-gray-800"} `}
      {...rest}
    >
      <div className="flex-1 px-3 py-1 rounded transition-colors text-xs select-none pointer-events-none">
        <div className="text-white">
          {/* {codeBlock.content} */}
          <SyntaxHighlightedContent content={codeBlock.content} />
        </div>
      </div>
    </div>
  );
};

function SyntaxHighlightedContent({ content }: { content: string }) {
  // Split into lines first (before trimming)
  const lines = content.split("\n");

  // Find the first non-empty line to get base indentation
  const firstNonEmptyLine = lines.find((l) => l.trim());
  const baseIndent = firstNonEmptyLine
    ? (firstNonEmptyLine.match(/^(\s*)/) || [])[1]?.length || 0
    : 0;

  // Now trim start and end whitespace from the entire content
  const trimmedContent = content.trim();

  // Tokenize and highlight the content
  const parts = trimmedContent.split(
    /(<[^>]+>|"[^"]*"|'[^']*'|[#][0-9a-f]{3,6}|[{}:;])/
  );

  // Calculate padding (2px per space = 0.125rem)
  const paddingRem = baseIndent * 1;

  return (
    <pre
      className="font-mono whitespace-pre-wrap leading-relaxed text-slate-100 text-xl"
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

        // CSS property names and values
        if (
          parts[idx - 1] === "{" ||
          parts[idx + 1] === ":" ||
          parts[idx - 1] === ";" ||
          (idx > 0 && parts[idx - 1]?.includes("\n"))
        ) {
          const colonIndex = parts.indexOf(":", idx);
          const semiOrBraceIndex = Math.min(
            parts.indexOf(";", idx) !== -1 ? parts.indexOf(";", idx) : Infinity,
            parts.indexOf("}", idx) !== -1 ? parts.indexOf("}", idx) : Infinity
          );

          if (colonIndex !== -1 && colonIndex < semiOrBraceIndex) {
            // This is a property name
            return (
              <span key={idx} className="text-green-300">
                {part}
              </span>
            );
          }
        }

        // CSS values (after colon, before semicolon/brace)
        if (parts[idx - 1] === ":") {
          return (
            <span key={idx} className="text-pink-300">
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