import { TOGGLE_SIDEBAR } from "./actions";

import { initialState } from "./appContext";



const reducer = (state, action) => {
    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSideBar: !state.showSideBar };
    }

    throw new Error(`no such action: ${action.type}`);

}


export default reducer;