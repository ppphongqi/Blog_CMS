import React , { Component } from 'react';

import './login.css';
import { inject , observer } from 'mobx-react';
import loginStore from '../../../stores/LoginStore';
import { Button} from 'antd';
import sakura from './sakura';

@inject('loginStore')
@observer
class Login extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    componentDidMount() {
        const {loginStore} = this.props;
        loginStore.sayHello();
        sakura();
    }


    render(){
        const { loginStore} = this.props;
        const btnStyle = {
            background: '#ccc',
            boxShadow: '0 0 4px #ccc',
            cursor: 'not-allowed',
        };
        return (
            <main className="login_wrapper">
                <canvas id="sakura" className="sakura"/>
                <section className="login_container">
                    <h1 className = "title">
                        <figure className="title_img"/>
                    </h1>
                    <div className="user_input_group">
                        <label htmlFor="account">
                            Email Address
                            <input id="account" type="email" onChange={e => loginStore.onEmailChange(e)} />
                        </label>
                    </div>
                    <div className="user_input_group">
                        <label htmlFor="password">
                            Password
                            <input id="password" type="password" onChange={e => loginStore.onPasswordChange(e)} />
                        </label>
                    </div>

                    <button 
                        type="button"
                        className="login_btn"
                        onClick={loginStore.login}
                        disabled={(!loginStore.isFilled) || (loginStore.loginStatus)}
                        style={((!loginStore.isFilled) || (loginStore.loginStatus)) ? btnStyle : {}}
                    >
                        登录
                    </button>
                </section>
                
            </main>
        )
    }
}

export default Login