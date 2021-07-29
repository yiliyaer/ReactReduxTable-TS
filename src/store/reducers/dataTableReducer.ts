export const GET_DATA = "GET_DATA";
export const dataTableReducer = (state = [{}], action:any ) => {
    switch(action.type) {
        case GET_DATA:
            state = action.payload;
            return state;
        default:
            return state;
    }
}