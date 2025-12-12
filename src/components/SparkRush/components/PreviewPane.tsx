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
      className={`flex flex-col rounded-xl border-2 h-full transition-colors duration-300 ease-in-out font-sans ${
        displayTarget
          ? "bg-yellow-100 border-yellow-400"
          : "bg-yellow-100 border-yellow-400"
      }`}
    >
      <h3 className="text-2xl font-extrabold text-gray-800 capitalize tracking-wide p-6 pb-4 border-b border-gray-200">
        {displayTarget ? "Target Design" : "Target Design"}
      </h3>

      <div
        onMouseEnter={() => setShowTarget(true)}
        onMouseLeave={() => setShowTarget(false)}
        className="flex-1 relative rounded-b-xl overflow-hidden bg-white"
      >
        {/* <iframe
          key="user"
          title="User Output"
          srcDoc={userHtml}
          className={`absolute inset-0 w-full h-full transition-opacity border-none ${
            displayTarget ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        /> */}

<iframe
          key="targetsssssdsfsdfsafdas"
          title="Target Output"
          srcDoc={targetHtml}
          className={`absolute inset-0 w-full h-full transition-opacity border-none ${
             displayTarget ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        <iframe
          key="target"
          title="Target Output"
          srcDoc={targetHtml}
          className={`absolute inset-0 w-full h-full transition-opacity border-none ${
            displayTarget ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      </div>
    </div>
  );
}