import OJRequest from "./requset";

export function login(phone,password){
  return OJRequest.get('/login/cellphone',{
    phone,
    password
  })
}