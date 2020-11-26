const BASE_URL = "https://my-network-api.herokuapp.com/";

const api = {
    users:BASE_URL+'users',
    login:BASE_URL+'users/login',
    register:BASE_URL+'users/register',
    follower:BASE_URL+'users/follower',
    unfollower:BASE_URL+'users/unfollower',
    following:BASE_URL+'users/following',
    unfollowing:BASE_URL+'users/unfollowing',
    posts:BASE_URL+'posts'
}

export default api;