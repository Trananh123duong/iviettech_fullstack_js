import { configureStore } from '@reduxjs/toolkit'
import tabReducer from './redux/tab.slice'

export default configureStore({
    reducer: {
        tab: tabReducer
    }
})