import React, { useState } from 'react';
   import { useDroppable } from '@dnd-kit/core';
   import { useDispatch, useSelector } from 'react-redux';
   import { addComponent, selectComponent } from '../store/componentsSlice';
   import { Button } from '@hudoro/button';
   import { Toggle } from '@hudoro/toggle';
   import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@hudoro/alert';
   import { Avatar } from '@hudoro/avatar';
   import { RootState } from '../store';

   const BuilderCanvas: React.FC = () => {
     const dispatch = useDispatch();
     const components = useSelector((state: RootState) => state.components.components);
     const selectedComponentId = useSelector((state: RootState) => state.components.selectedComponentId);
     const [isOver, setIsOver] = useState(false);

     const { setNodeRef } = useDroppable({
       id: 'canvas',
     });

     const handleDragEnter = () => {
       setIsOver(true);
     };

     const handleDragLeave = () => {
       setIsOver(false);
     };

     const handleDrop = (event: React.DragEvent) => {
       event.preventDefault();
       setIsOver(false);
       const componentType = event.dataTransfer.getData('text/plain');
       if (componentType) {
         dispatch(addComponent({ id: Date.now(), type: componentType }));
       }
     };

     const handleClick = (id: number) => {
       dispatch(selectComponent(id));
     };

     return (
       <div
         ref={setNodeRef}
         className={`builder-canvas ${isOver ? 'highlight' : ''}`}
         onDrop={handleDrop}
         onDragOver={(e) => e.preventDefault()}
         onDragEnter={handleDragEnter}
         onDragLeave={handleDragLeave}
       >
         {components.map((component) => {
           const isSelected = component.id === selectedComponentId;
           const componentClass = isSelected ? 'selected-component' : '';

           switch (component.type) {
             case 'button':
               return (
                 <div key={component.id} className={componentClass} onClick={() => handleClick(component.id)}>
                   <Button>Generated Button</Button>
                 </div>
               );
             case 'toggle':
               return (
                 <div key={component.id} className={componentClass} onClick={() => handleClick(component.id)}>
                   <Toggle />
                 </div>
               );
             case 'alert':
               return (
                 <div key={component.id} className={componentClass} onClick={() => handleClick(component.id)}>
                   <Alert>
                     <AlertIcon />
                     <AlertTitle>Alert Title</AlertTitle>
                     <AlertDescription>This is an alert description</AlertDescription>
                   </Alert>
                 </div>
               );
             case 'avatar':
               return (
                 <div key={component.id} className={componentClass} onClick={() => handleClick(component.id)}>
                   <Avatar />
                 </div>
               );
             default:
               return null;
           }
         })}
       </div>
     );
   };

   export default BuilderCanvas;