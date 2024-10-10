import React from 'react';
   import ComponentPalette from './components/ComponentPalette';
   import BuilderCanvas from './components/BuilderCanvas';
   import ExportCodeButton from './components/ExportCodeButton';
   import DeleteComponentButton from './components/DeleteComponentButton';
   import './App.css';

   const App: React.FC = () => {
     return (
       <div className="app-container">
         <div className="sidebar">
           <ComponentPalette />
           <ExportCodeButton />
           <DeleteComponentButton />
         </div>
         <BuilderCanvas />
       </div>
     );
   };

   export default App;