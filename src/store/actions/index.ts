import axios from "axios"
import { GET_DATA } from "../reducers/dataTableReducer"


export const retrieveData = () => {

    return (dispatch: any) => {
        axios.get('https://jsonplaceholder.typicode.com/users')  
        .then(function (response) {
            console.log(response.data)
            // handle success
                dispatch({
                    type: GET_DATA,
                    payload: response.data
                })
            
          });
    };
}