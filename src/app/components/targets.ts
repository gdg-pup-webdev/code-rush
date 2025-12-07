export interface Target {
  id: string;
  blocks: string[];
}

/**
 * Generate HTML from target blocks
 */
export function generateTargetHtml(blocks: string[]): string {
  const code = blocks.join('');
  return `<html><body style="margin:0;padding:1rem;">${code}</body></html>`;
}

export const targets: Target[] = [
  {
    id: 'target-1',
    blocks: [
      '<div></div>\n',
      '<style>\n',
      '  div {\n',
      '    background-color: #3b82f6;\nwidth: 6rem;\nheight: 6rem;\n',
      '  }\n',
      '</style>',
    ]
  },
  {
    id: 'target-2',
    blocks: [
      '<h1>Hello</h1>\n',
      '<style>\n',
      '  h1 {\n',
      '    color: #ef4444;\n',
      '  }\n',
      '</style>',
    ]
  },
  {
    id: 'target-4',
    blocks: [
      '<p>Center Me</p>\n',
      '<style>\n',
      '  p {\n',
      '    text-align: center;\nmargin-top: 3rem;\ncolor: #3b82f6;\n',
      '  }\n',
      '</style>',
    ]
  },
  {
    id: 'target-5',
    blocks: [
      '<div></div>\n',
      '<style>\n',
      '  div {\n',
      '    background-color: #ec4899;\nwidth: 5rem;\nheight: 5rem;\nborder-radius: 9999px;\n',
      '  }\n',
      '</style>',
    ]
  }, 
];

// Utility function to get a random target
export const getRandomTarget = (): Target => {
  return targets[Math.floor(Math.random() * targets.length)];
};