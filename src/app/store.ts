import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {hoverTableAggirdHeader} from '../component/features/table-aggrid/setHoverHeader'
import {hoverTableAggirdCell} from '../component/features/table-aggrid/setHoverCell'
// import userSlice from 'src/features/user/userSlice'

export const store = configureStore({
  reducer: {
    hoverTableAggirdHeader: hoverTableAggirdHeader.reducer,
    hoverTableAggirdCell: hoverTableAggirdCell.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
