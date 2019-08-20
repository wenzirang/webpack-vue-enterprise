import { CHECKLISTOBJECT } from "./mutation-types"
let actions = {
    increment({ commit,state,getters }){
      console.log(1);
      return state;
    }, 


    [CHECKLISTOBJECT]({commit,state,getters}){
        commit(CHECKLISTOBJECT);
    }

}
// state.dispatch
export default actions;