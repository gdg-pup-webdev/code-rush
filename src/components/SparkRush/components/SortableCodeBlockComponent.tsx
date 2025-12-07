import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { CodeBlockComponent } from './CodeBlockComponent';
import { CodeBlock } from '../types';
 
type Props = React.HTMLAttributes<HTMLDivElement> & {
  codeBlock: CodeBlock;
}


export function SortableCodeBlockComponent({codeBlock, ...rest} : Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id: codeBlock.id});


  return (
    <CodeBlockComponent
      codeBlock={codeBlock}
      isDragging={isDragging}
      ref={setNodeRef} 
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}

      {...rest}
    />
  );
}
