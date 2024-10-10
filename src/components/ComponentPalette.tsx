import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const DraggablePaletteItem: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('text/plain', id);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      draggable
      onDragStart={handleDragStart}
      className="palette-item"
    >
      {label}
    </div>
  );
};

const ComponentPalette: React.FC = () => {
  const components = [
    { id: 'button', label: 'Button Component' },
    { id: 'toggle', label: 'Toggle Component' },
    { id: 'alert', label: 'Alert Component' },
    { id: 'avatar', label: 'Avatar Component' },
  ];

  return (
    <div className="component-palette">
      {components.map((component) => (
        <DraggablePaletteItem key={component.id} id={component.id} label={component.label} />
      ))}
    </div>
  );
};

export default ComponentPalette;