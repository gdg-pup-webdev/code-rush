import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Item, ItemProps} from './Item';

type SortableItemProps = {
  name: string;
  description: string;
};

export function SortableItem({ ...props} : SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.name});

  return (
    <Item
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
