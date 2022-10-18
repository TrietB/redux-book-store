import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import bookSlice from "../features/bookSlice"


const initialState = {}
const store = createStore(
    combineReducers({
        book: bookSlice
    })
        ,initialState
        ,composeWithDevTools(applyMiddleware(thunk))
    
)

export default store