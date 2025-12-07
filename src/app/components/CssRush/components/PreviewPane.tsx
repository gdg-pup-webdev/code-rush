import React, { useState } from 'react';
import { CodeBlock } from '../types';

interface PreviewPaneProps {
  code: CodeBlock[];
  targetHtml: string;
}

/**
 * Preview pane showing user code and target design
 */
export function PreviewPane({ code, targetHtml }: PreviewPaneProps) {
  const [showTarget, setShowTarget] = useState(false);

  const userCode = code.map((c) => c.content).join('');
  const userHtml =
    code.length === 0
      ? '<html><body style="margin:0;padding:0;"></body></html>'
      : `<html><body style="margin:0;padding:0;">${userCode}</body></html>`;

  return (
    <div className="flex flex-col bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
      <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
        {showTarget ? '🎯 Target Design' : '👁 Your Rendered Code'}
      </h3>

      <div className="flex-1 relative rounded-lg overflow-hidden border-2 border-gray-700 bg-white">
        <iframe
          key="user"
          title="User Output"
          srcDoc={userHtml}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            showTarget ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        <iframe
          key="target"
          title="Target Output"
          srcDoc={targetHtml}
          className={`absolute inset-0 w-full h-full transition-opacity ${
            showTarget ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      </div>

      <div
        onMouseEnter={() => setShowTarget(true)}
        onMouseLeave={() => setShowTarget(false)}
        className="mt-4 p-3 bg-slate-700/30 border border-slate-600 rounded-lg text-center text-slate-300 text-sm cursor-pointer hover:bg-slate-700/50 transition-colors"
      >
        👆 Hover here to see the target design
      </div>
    </div>
  );
}
