import { message } from "antd";
import { uploadApi } from '../http/index';

export function checkWebp() {
    return (document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0);
};

export const beforeUpload = (file)=>{
    const isImageFormat = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if(!isImageFormat){
        message.error('只可以上传JPG、PNG或GIF格式的图片哦！')
    }
    const isLimited2M = file.size / 1024 /1024 < 2;

    if(!isLimited2M){
        message.error('图片大小不能超过2M')
    }
    return isImageFormat && isLimited2M;
}


export const upload = () =>{
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        action:  uploadApi,
    }
}