import React, {forwardRef} from 'react';
import { CodeBlock } from '../types';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  codeBlock: CodeBlock; 
  style?: React.CSSProperties;
  ref?: React.ForwardedRef<HTMLDivElement>;
}


export const CodeBlockComponent = ({codeBlock, style, ref, ...rest}: Props) => {
  return (
    <div
      ref={ref}
      style={{ 
        ...style,
      }}
      className='w-full bg-gray-200'
      {...rest}
    >
      {codeBlock.id}
      <br />
      {codeBlock.content}
    </div>
  );
};
