import React, {forwardRef} from 'react';

export const Item = forwardRef(({name, description, style, ...props}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'inline-block',
        backgroundColor: '#ddd',
        padding: '.5rem',
        width: '100px',
        margin: '0 1rem 1rem 0',
        ...style,
      }}
      {...props}
    >
      {name}
      <br />
      {description}
    </div>
  );
});
