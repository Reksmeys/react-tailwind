export default function authHeader() {
    const auth = JSON.parse(localStorage.getItem('auth'));
  
    if (auth && auth.access_token) {
      return { Authorization: 'Bearer ' + auth.access_token };
    } else {
      return {};
    }
}

// for node.js express backend-end
// export default function authHeader() {
//     const auth = JSON.parse(localStorage.getItem('auth'));
  
//     if (auth && auth.access_token) {
//       // for Node.js Express back-end
//       return { 'x-access-token': auth.access_token };
//     } else {
//       return {};
//     }
// }