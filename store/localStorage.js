export const state = () => ({
    userinfo:{},
})
export const mutations = {
    setUserInfo(state,userinfo){
        state.userinfo = userinfo
    }
}