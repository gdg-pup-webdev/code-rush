export const targets = [
  {
    id: 'target-1',
    html: `
      <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
        <p style="font-size: 2.25rem; font-weight: 700; color: #3b82f6;">Hello, World!</p>
      </div>
    `,
    solution: [
      '<div>',
      '<p>',
      'Hello, World!',
      '</p>',
      '</div>',
      '<style>',
      'div { display: flex; justify-content: center; align-items: center; height: 100%; }',
      'p { font-size: 2.25rem; font-weight: 700; color: #3b82f6; }',
      '</style>',
    ]
  },
  {
    id: 'target-2',
    html: `
      <div style="background-color: #ef4444; width: 8rem; height: 8rem;"></div>
    `,
    solution: [
      '<div>',
      '</div>',
      '<style>',
      'div { background-color: #ef4444; width: 8rem; height: 8rem; }',
      '</style>',
    ]
  },
  {
    id: 'target-3',
    html: `
      <div style="display: flex; justify-content: space-around; align-items: center; width: 100%; height: 100%; background-color: #f3f4f6;">
        <div style="background-color: #3b82f6; width: 4rem; height: 4rem; border-radius: 9999px;"></div>
        <div style="background-color: #ef4444; width: 4rem; height: 4rem;"></div>
        <div style="background-color: #10b981; width: 4rem; height: 4rem; transform: rotate(45deg);"></div>
      </div>
    `,
    solution: [
      '<div>',
      '<div></div>',
      '<div></div>',
      '<div></div>',
      '</div>',
      '<style>',
      'div:first-child { display: flex; justify-content: space-around; align-items: center; width: 100%; height: 100%; background-color: #f3f4f6; }',
      'div:first-child div:nth-child(1) { background-color: #3b82f6; width: 4rem; height: 4rem; border-radius: 9999px; }',
      'div:first-child div:nth-child(2) { background-color: #ef4444; width: 4rem; height: 4rem; }',
      'div:first-child div:nth-child(3) { background-color: #10b981; width: 4rem; height: 4rem; transform: rotate(45deg); }',
      '</style>',
    ]
  }
];