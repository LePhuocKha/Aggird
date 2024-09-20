import {createSlice} from '@reduxjs/toolkit'

export interface id_Cell_State {
  id_Cell: {
    idTr: string
    idHeader: number
  }
}

const initialState: id_Cell_State = {
  id_Cell: {
    idTr: '',
    idHeader: 0,
  },
}
export const hoverTableAggirdCell = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setHoverHeaderTableCellAggird: (state, action) => {
      state.id_Cell = action.payload
    },
  },
})

export const {setHoverHeaderTableCellAggird} = hoverTableAggirdCell.actions

export default hoverTableAggirdCell.reducer
