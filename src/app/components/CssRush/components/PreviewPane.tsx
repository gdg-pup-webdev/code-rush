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
    <div className="flex flex-col bg-slate-900/40 backdrop-blur rounded-lg p-6 border border-slate-800">
      <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
        {showTarget ? '🎯 Target Design' : '👁 Your Rendered Code'}
      </h3>

      <div
        onMouseEnter={() => setShowTarget(true)}
        onMouseLeave={() => setShowTarget(false)}
        className="flex-1 relative rounded-lg overflow-hidden border border-slate-700 bg-white"
      >
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
    </div>
  );
}
