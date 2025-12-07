import React, { useState } from "react";
import { CodeBlock } from "../types";
import { generateHtml } from "../challenge";

import { useSparkRush } from "../SparkRushContext";

interface PreviewPaneProps {
  showTargetFlash?: boolean;
}

/**
 * Preview pane showing user code and target design
 */
export function PreviewPane({
  showTargetFlash,
}: PreviewPaneProps) {
  const { codeBlocks, challenge } = useSparkRush();
  const [showTarget, setShowTarget] = useState(false);
  const displayTarget = showTarget || showTargetFlash;

  const userCode = generateHtml(codeBlocks);
  const userHtml = `${userCode}`;

  const targetHtml = generateHtml(challenge.codeBlocks);

  return (
    <div
      className={`flex flex-col rounded-xl border-2 h-full transition-colors ${
        displayTarget
          ? "bg-yellow-100 border-yellow-400"
          : "bg-white border-gray-200"
      }`}
    >
      <h3 className="text-lg font-bold text-gray-700 mb-4 uppercase tracking-wide p-6">
        {displayTarget ? "Target Design" : "Your Output"}
      </h3>

      <div
        onMouseEnter={() => setShowTarget(true)}
        onMouseLeave={() => setShowTarget(false)}
        className="flex-1 relative rounded-b-xl overflow-hidden border-t-2 border-gray-200 bg-white"
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