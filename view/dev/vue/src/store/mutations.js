import { CHECKLISTID, CHECKLISTOBJECT, SETUSERINFO,BINDPHONE,NEWBINDPHONE } from "./mutation-types"
let mutations = {
    [CHECKLISTID](state, id) {
        state.thatPageId = id ? id : -1;
    },
    [CHECKLISTOBJECT](state, data) {
        state.openPage = data;
    },
    [SETUSERINFO](state, userInfo) {
        state.currentUserInfo = userInfo
    },
    [BINDPHONE](state, oldPhone) {
        state.oldPhone = oldPhone
    },
    [NEWBINDPHONE](state, newPhone) {
        state.newPhone = newPhone
    },
}
// state.commit
export default mutations;