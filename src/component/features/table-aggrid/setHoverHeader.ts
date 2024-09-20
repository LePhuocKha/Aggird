import {createSlice} from '@reduxjs/toolkit'

export interface id_Header_State {
  id_header: number
}

const initialState: id_Header_State = {
  id_header: 0,
}
export const hoverTableAggirdHeader = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setHoverHeaderTableHoverAggird: (state, action) => {
      state.id_header = action.payload
    },
  },
})

export const {setHoverHeaderTableHoverAggird} = hoverTableAggirdHeader.actions

export default hoverTableAggirdHeader.reducer
