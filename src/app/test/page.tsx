"use client"

import React, {useState} from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import {arrayMove, SortableContext} from '@dnd-kit/sortable';

import {Item} from './Item';
import {SortableItem} from './SortableItem';
import people from './people';

const page = () => {
  const [items, setItems] = useState(people);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
    >
      <SortableContext items={items.map((i) => i.name)} strategy={() => {}}>
        <div
            className='flex flex-col gap-1 w-300 border-3 border-black'
        >
          {items.map(({name, description}) => (
            <SortableItem key={name} name={name} description={description} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <Item {...items.find((item) => item.name === activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event) {
    const {active, over} = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.name === active.id);
        const newIndex = items.findIndex((i) => i.name === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEnd() {
    setActiveId(null);
  }
};

export default page;
