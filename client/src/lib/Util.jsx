export default {
    isAuthenticated : () => {
        return (localStorage.getItem('auth_token'));
    },
    destroyToken : ()=> {
        delete localStorage.auth_token
    }
}