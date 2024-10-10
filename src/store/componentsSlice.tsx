import { createSlice, PayloadAction } from '@reduxjs/toolkit';

   export interface CanvasComponent {
     id: number;
     type: string;
   }

   export interface ComponentsState {
     components: CanvasComponent[];
     selectedComponentId: number | null;
     items: CanvasComponent[];
   }

   const initialState: ComponentsState = {
     components: [],
     selectedComponentId: null,
    items: [], 
   };

   const componentsSlice = createSlice({
     name: 'components',
     initialState,
     reducers: {
       addComponent: (state, action: PayloadAction<CanvasComponent>) => {
         state.components.push(action.payload);
       },
       removeComponent: (state, action: PayloadAction<number>) => {
         state.components = state.components.filter(component => component.id !== action.payload);
       },
       selectComponent: (state, action: PayloadAction<number>) => {
         state.selectedComponentId = action.payload;
       },
       clearSelection: (state) => {
         state.selectedComponentId = null;
       },
     },
   });

   export const { addComponent, removeComponent, selectComponent, clearSelection } = componentsSlice.actions;
   export default componentsSlice.reducer;