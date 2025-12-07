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
      className={`flex items-start gap-2 mb-1 group cursor-grab active:cursor-grabbing select-none pointer-events-auto rounded-md  ${
        isDragging ? " opacity-0 " : ""
      } ${isOverlay ? "bg-gray-200" : " hover:bg-gray-200"} `}
      {...rest}
    >
      <div className="flex-1 px-3 py-2 rounded-md transition-colors text-xs select-none pointer-events-none">
        <div className="text-gray-800">
          <SyntaxHighlightedContent content={codeBlock.content} />
        </div>
      </div>
    </div>
  );
};

function SyntaxHighlightedContent({ content }: { content: string }) {
  // ... (rest of the function is the same)

  // Tokenize and highlight the content
  const parts = content.split(
    /(<[^>]+>|"[^"]*"|'[^']*'|[#][0-9a-f]{3,6}|[{}:;])/
  );

  return (
    <pre
      className="font-mono whitespace-pre-wrap leading-relaxed text-gray-800 text-base"
    >
      {parts.map((part, idx) => {
        if (!part) return null;

        // HTML tags
        if (part.match(/^<[^>]+>$/)) {
          return (
            <span key={idx} style={{ color: 'var(--google-red)' }}>
              {part}
            </span>
          );
        }

        // Quoted strings
        if (part.match(/^["'][^"']*["']$/)) {
          return (
            <span key={idx} style={{ color: 'var(--google-green)' }}>
              {part}
            </span>
          );
        }

        // Color codes
        if (part.match(/^#[0-9a-f]{3,6}$/i)) {
          return (
            <span key={idx} style={{ color: 'var(--google-blue)' }}>
              {part}
            </span>
          );
        }

        // Delimiters
        if (part.match(/^[{}:;]$/)) {
          return (
            <span key={idx} style={{ color: 'var(--google-red)' }}>
              {part}
            </span>
          );
        }

        // CSS property names
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
              <span key={idx} style={{ color: 'var(--google-blue)' }}>
                {part}
              </span>
            );
          }
        }

        // CSS values
        if (parts[idx - 1] === ":") {
          return (
            <span key={idx} style={{ color: 'var(--google-green)' }}>
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