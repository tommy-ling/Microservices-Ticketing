import axios from 'axios'

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server, request should be made to cross namespace stuff

    return axios.create({
      // just using '/api/users/currentuser' as url won't work because this is server
      // side rendering, meaning this function is called in a pod/container
      // By default it's localhost:80 before '/api/users/currentuser'
      // but it's localhost WITHIN the container, not from the browser
      
      // To solve the problem, we need to make a request to ingress instead
      // and let ingress route to '/api/users/currentuser'
      // Use cross-namespace service comm to communicate with ingress
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      // regarding this line, refer to lecture 241 and 242
      // it passes both HOST and COOKIE in request
      headers: req.headers
    })
  } else {
    // we are on the browser, request can be made to localhost or a base url of ''
    return axios.create({
      baseURL: '/'
    })
  }
}

export default buildClient