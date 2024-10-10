import React from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import { RootState } from '../store';
import { CanvasComponent } from '../store/componentsSlice';

const generateCode = (components: CanvasComponent[]): string => {
  const imports = new Set<string>();
  const componentCode = components.map(component => {
    switch (component.type) {
      case 'button':
        imports.add("import { Button } from '@hudoro/button';");
        return '<Button>Generated Button</Button>';
      case 'toggle':
        imports.add("import { Toggle } from '@hudoro/toggle';");
        return '<Toggle />';
      case 'alert':
        imports.add("import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@hudoro/alert';");
        return '<Alert><AlertIcon /><AlertTitle>Alert Title</AlertTitle><AlertDescription>This is an alert description</AlertDescription></Alert>';
      case 'avatar':
        imports.add("import { Avatar } from '@hudoro/avatar';");
        return '<Avatar />';
      default:
        return '';
    }
  }).join('\n');

  const importStatements = Array.from(imports).join('\n');

  return `import React from 'react';

${importStatements}

const GeneratedComponent = () => (
  <>
${componentCode}
  </>
);

export default GeneratedComponent;`;
};

const ExportCodeButton: React.FC = () => {
  const components = useSelector((state: RootState) => state.components.components);

  const handleExport = () => {
    const code = generateCode(components);
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'GeneratedComponent.tsx');
  };

  return <button onClick={handleExport} className="export-code-button">Export Code</button>;
};

export default ExportCodeButton;