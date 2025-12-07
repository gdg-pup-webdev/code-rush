import React, { useState } from "react";
import { CodeBlock } from "../types";
import { generateHtml } from "../challenge";

interface PreviewPaneProps {
  codeBlocks: CodeBlock[];
  targetHtml: string;
  showTargetFlash?: boolean;
}

/**
 * Preview pane showing user code and target design
 */
export function PreviewPane({
  codeBlocks,
  targetHtml,
  showTargetFlash,
}: PreviewPaneProps) {
  const [showTarget, setShowTarget] = useState(false);
  const displayTarget = showTarget || showTargetFlash;

  const userCode = generateHtml(codeBlocks);
  const userHtml = `${userCode}`;

  return (
    <div
      className={`flex flex-col backdrop-blur rounded-lg p-6 border h-full transition-colors ${
        displayTarget
          ? "bg-yellow-400/20 border-yellow-400/30"
          : "bg-slate-900/40 border-slate-800"
      }`}
    >
      <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
        {displayTarget ? "Target Design" : "Your Output"}
      </h3>

      <div
        onMouseEnter={() => setShowTarget(true)}
        onMouseLeave={() => setShowTarget(false)}
        className="flex-1 relative rounded-lg overflow-hidden border border-slate-700 bg-white p-4"
      >
        <iframe
          key="user"
          title="User Output"
          srcDoc={userHtml}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            displayTarget ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        <iframe
          key="target"
          title="Target Output"
          srcDoc={targetHtml}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            displayTarget ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
}