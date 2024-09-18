import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
// import userSlice from 'src/features/user/userSlice'
// import listDataSlice from 'src/features/data/listDataSlice'

export const store = configureStore({
  reducer: {},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
