import { 
    action , 
    observable , 
    configure , 
    computed 
} from 'mobx';
import { loginApi } from '../http/index'

import { message } from 'antd/lib/index';
import history from '../history';

configure({
    strict : 'always',
});

class LoginStore {
    @observable email;

    @observable password;

    @observable captcha;

    @observable loginStatus;

    constructor(){
        this.loginApi = loginApi;
        this.email = '';
        this.password = '';
        this.captcha = '';
        this.loginStatus = false;
    }

    login = async ( )=>{
        console.log('logining')
        const params = {
            email:this.email,
            password: this.password,
        }
        this.loginStatus = true;
        try{
            const response = await this.loginApi.login(params);
            window.localStorage.token = response.data.token;
            window.localStorage.expires_date = response.data.expires_date;
            message.success('登录成功');
            history.push('/');
            this.email = '';
            this.password = '';
            this.loginStatus = false;
        }catch(e){
            if(e.response){
                message.error(e.response.data.message);
            }else{
                message.error('登录失败');
            }
            this.loginStatus = false;
        }
    };

    sayHello(){
        console.log('loginStore is running')
    }

    @computed get isFilled(){
        return this.email !== '' && this.password !== '' ;
    }

    @action onEmailChange = (e) =>{
        this.email = e.target.value;
    }

    @action onPasswordChange = (e) =>{
        this.password = e.target.value
    }

    
}

const loginStore = new LoginStore(loginApi);
export default loginStore;