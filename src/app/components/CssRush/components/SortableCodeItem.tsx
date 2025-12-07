import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { CodeItem } from './CodeItem';


export function SortableCodeItem(props : {
  id: string;
  content: string; 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  return (
    <CodeItem
      ref={setNodeRef}
      {...props}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
    />
  );
}
