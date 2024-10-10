import React from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { removeComponent, clearSelection } from '../store/componentsSlice';
   import { RootState } from '../store';

   const DeleteComponentButton: React.FC = () => {
     const dispatch = useDispatch();
     const selectedComponentId = useSelector((state: RootState) => state.components.selectedComponentId);

     const handleDelete = () => {
       if (selectedComponentId !== null) {
         dispatch(removeComponent(selectedComponentId));
         dispatch(clearSelection());
       }
     };

     if (selectedComponentId === null) return null;

     return <button onClick={handleDelete} className="delete-component-button">Delete Component</button>;
   };

   export default DeleteComponentButton;