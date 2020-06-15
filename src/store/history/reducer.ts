import {HistoryState, UPDATE_HISTORY, HistoryActionTypes } from './types'
import {message} from "antd"
import {db} from "../../firebase/config"
const success = (info:string) => {
  message.success(info, 0.5);
 };
 const error = (info:string) => {
   message.error(info, 0.5);
  };

//load init  from firestore
var searches:Object[]=[];
db.collection("history").get().then((querySnapshot) => {
  success("Connected to firestore")
  querySnapshot.forEach((doc) => {
    searches.push(doc.data());
  });
}).catch((err)=>{error("An error occured:"+err)});

//initial state
const initialState:any = {
    data: searches
  }
  
//reducer function
export function historyReducer(
  state = initialState,
  action: HistoryActionTypes
): HistoryState{
  switch (action.type) {
    case UPDATE_HISTORY: {
      return {
        data:[action.payload.data,...state.data]
      }
    }
    default:
      return state
  }
}