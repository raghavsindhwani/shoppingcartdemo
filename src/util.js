import axios from 'axios';


export default async function login (data) {
  const res = await axios.get(`https://xebiascart.herokuapp.com/users?username=${data.name}`)
    .then(response => {
      const resp = response.data[0];
      if(resp.username === data.name && resp.password === data.password) {
        return resp;
      }
      throw new Error('User Name or Password invalid');
    })
    .catch(err => Promise.reject('User Name or Password invalid!'));
  return res;
}
