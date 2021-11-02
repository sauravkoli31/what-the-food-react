import { configureStore } from "@reduxjs/toolkit"
import userdataReducer from "./userData"

export default configureStore({
    reducer: {
        userData:userdataReducer
    }
})