import qs from 'qs'
import type { AxiosError } from '../../src/index'
import axios from '../../src/index'

import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

/* document.cookie = 'a=b12'

axios.get('/more/get').then((res) => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true,
}).then((res) => {
  console.log(res)
}) */
//
/* const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D',
})

instance.get('/more/get').then((res) => {
  console.log(res)
}) */
/*
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use((config) => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use((response) => {
      NProgress.done()
      return response
    }, (error) => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', (e) => {
  instance.get('https://images.unsplash.com/photo-1650766172415-aa6b1fc31a85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', (e) => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})
*/
/* axios.post('/more/post', {
  a: 1,
}, {
  auth: {
    username: 'Yee',
    password: '123456',
  },
}).then((res) => {
  console.log(res)
}) */

/* axios.get('/more/304').then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400
  },
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
}) */

/* axios.get('/more/get', {
  params: new URLSearchParams('a=b&c=d'),
}).then((res) => {
  console.log(res)
})

axios.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c'],
  },
}).then((res) => {
  console.log(res)
})

const instance = axios.create({
  paramsSerializer(params) {
    console.log(qs.stringify(params, { arrayFormat: 'brackets' }))
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
})

instance.get('/more/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c'],
  },
}).then((res) => {
  console.log(res)
}) */

const instance = axios.create({
  baseURL: 'https://images.unsplash.com/',
})

instance.get('photo-1650852826322-ebc34010f0a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60')
instance.get('https://images.unsplash.com/photo-1650861509880-ef1a5ef99436?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=700&q=60')
/*
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))

axios.all([getA(), getB()])
  .then(([resA, resB]) => {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig)) */
