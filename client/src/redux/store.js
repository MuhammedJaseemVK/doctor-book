import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from '../redux/features/alertSlice'

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer
    }
})