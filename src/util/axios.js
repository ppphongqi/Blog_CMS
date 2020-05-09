import axios from 'axios';
// import { message } from 'antd/lib/index';
import baseUrl from './baseUrl';
// import history from '../history';

// 超时设置
axios.defaults.timeout = 5 * 1000;

// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

//设置基础URL
axios.defaults.baseURL = baseUrl.development;

//请求拦截
// let cancelFlag = true;
// axios.interceptors.request.use(
//     (req)=>{
//         if(req.url !== '/login'){
//             const now = new Date().getTime;
//             const token = window.localStorage.getItem('token');
//             const expires = window.localStorage.getItem('expires_date');
//             if(expires && token){
//                 if(expires - now < 0){
//                     message.error('token expires!');
//                     window.localStorage.clear();
//                     setTimeout(()=>{
//                         history.push('/login');
//                     },2000);
//                     return false
//                 }
//             req.headers.Authorization = `Bearer ${token}`;
//         } else if(cancelFlag) {
//             cancelFlag = false;
//             return false
//         } else {
//             history.push('/login');
//             return false
//         }
//     }
//     return req;
// },
// err => Promise.reject(err) 
// );

// 响应拦截
// axios.interceptors.response.use(
//     res => res , 
//     err => Promise.reject(err)
//     ,
// );

// GET方法
export function GET(url,params){
    return new Promise((resolve,reject)=>{
        axios
            .get(url,{params})
            .then((res)=>{
                
                resolve(res);
            })
            .catch((err)=>{
                reject(err)
            });
    });
}
//POST方法
export function POST(url,params,config){
    return new Promise((resolve,reject)=>{
        axios.post(url,params,config)
        .then(
            (res)=>{
                resolve(res);
            },
            (err)=>{
                reject(err)
            }
        ).catch((err)=>{
            reject(err)
        })
    })
}

// PUT
export function PUT(url,params){
    return new Promise((resolve,reject)=>{
        axios.put(url,params)
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

// DELETE
export function DELETE(url,params){
    return new Promise((resolve,reject)=>{
        axios.delete(url,{data:params})
        .then((res)=>{
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}