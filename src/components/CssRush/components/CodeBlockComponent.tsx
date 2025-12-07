import React, {forwardRef} from 'react';
import { CodeBlock } from '../types';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  codeBlock: CodeBlock; 
  style: React.CSSProperties;
  ref: React.ForwardedRef<HTMLDivElement>;
}


export const CodeBlockComponent = ({codeBlock, style, ref, ...rest}: Props) => {
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
      {...rest}
    >
      {codeBlock.id}
      <br />
      {codeBlock.content}
    </div>
  );
};
