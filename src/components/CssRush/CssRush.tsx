"use client";

import React, { useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import people from "./people.json";
import { SortableCodeBlockComponent } from "./components/SortableCodeBlockComponent";
import { CodeBlockComponent } from "./components/CodeBlockComponent";
import { CodeSpace } from "./components/CodeSpace";


const convertPeopleToCodeBlock = () => {
  return people.map((person) => ({
    id: person.name,
    content: person.description
  }))
}


export const CssRush = () => {



  const [codeBlocks, setCodeBlocks] = useState(convertPeopleToCodeBlock());


  return <>
  
    <CodeSpace codeBlocks={codeBlocks} setCodeBlocks={setCodeBlocks}/>
  </>
}