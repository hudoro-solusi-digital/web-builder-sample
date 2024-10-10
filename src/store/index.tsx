import { configureStore } from '@reduxjs/toolkit';
   import componentsReducer from './componentsSlice';

   const store = configureStore({
     reducer: {
       components: componentsReducer,
     },
   });

   export type RootState = ReturnType<typeof store.getState>;
   export default store;