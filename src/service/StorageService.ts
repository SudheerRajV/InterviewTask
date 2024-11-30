export const setToken = (jwtToken: string) =>{
    console.log('setToken', jwtToken)
    localStorage.setItem('jwtToken', jwtToken)
}

export const getToken = () => {
    console.log('getToken', localStorage.getItem('jwtToken'))
    return localStorage.getItem('jwtToken') || ""
}

export const removeToken = () =>{
    localStorage.removeItem('jwtToken')
}