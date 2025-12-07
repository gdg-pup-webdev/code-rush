import React, {forwardRef} from 'react';


export type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  description: string;
  ref?: React.Ref<HTMLDivElement>;
}


export const Item = ({ name, description, style, ref,  ...props }: ItemProps) => {
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
};
