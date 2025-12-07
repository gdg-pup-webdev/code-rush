import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { CodeBlockComponent } from './CodeBlockComponent';
import { CodeBlock } from '../types';
 
type Props = {
  codeBlock: CodeBlock;
}


export function SortableCodeBlockComponent({codeBlock} : Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: codeBlock.id});

  return (
    <CodeBlockComponent
      codeBlock={codeBlock}
      ref={setNodeRef} 
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    />
  );
}
