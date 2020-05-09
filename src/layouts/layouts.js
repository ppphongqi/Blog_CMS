import React , { Component } from 'react';
import { Route ,Switch , Link , Redirect} from 'react-router-dom';
import {Layout ,Menu,Tooltip} from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Icon } from '@ant-design/compatible';
import Article from '../containers/Article/Article';
import ArticleDetail from '../containers/Article/articleDetail'
import './layouts.css'
const { Header , Sider ,Content , Footer } = Layout;

class layouts extends Component{
    state={
        collapsed:false
    };
    toggle = ()=>{
        const {collapsed} = this.state;
        this.setState({
            collapsed : !collapsed
        })
    }

    render(){
        const {collapsed} = this.state;
        // const token = window.localStorage.token;
        return (
            <Layout style={{ minHeight : '100vh'}}>
                <Sider trigger={null} collapsible collapsed={collapsed} width={256} collapsedWidth={80}>
                    <div className='logo'>
                        logo
                        <h1>Pty Blog Admin</h1>
                    </div>
                    <div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key='1'>
                                <Icon type="dashboard"/>
                                <span>Overview</span>
                            </Menu.Item>
                            <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="home" />
                                    <span>Home</span>
                                </span>
                            }>
                            <Menu.Item key="2">
                                <span>Motto</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <span>Announcement</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <span>Project</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <span>Cover</span>
                            </Menu.Item>
                            </SubMenu>
                        <SubMenu 
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="customer-service" />
                                    <span>Game</span>
                                </span>
                            }>
                            <Menu.Item key="6">
                                <span>Pty Like</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <span>Great Video</span>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="8">
                            <Icon type="solution" />
                            <span>CV</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/article/list"> 
                                <Icon type="file-text" />
                                <span>Article</span>
                            </Link>
                            
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Icon type="team" />
                            <span>About</span>
                        </Menu.Item>
                        <Menu.Item key="11">
                            <Icon type="setting" />
                            <span>Setting</span>
                        </Menu.Item>
                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Header 
                        style={{
                            background:'#fff',
                            padding:0
                        }}
                    >
                        <Icon 
                            className="trigger"
                            type={collapsed ? 'menu-unfold':'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="global_config">
                            <span className="config_item">
                                <Tooltip title="Official Document">
                                    <a  
                                        href="https://github.com/ppphongqi/Pty-Blog-typescript"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon 
                                            type="question-circle"
                                            theme="outlined"
                                            style={{ position: 'relative', top: 4 }}
                                        />
                                    </a>
                                </Tooltip>
                            </span>
                            <span className="config_item">

                            </span>
                        </div>
                    </Header>
                    <Content>
                        <Switch>
                            <Route path="/article/list" component={Article}/>
                            <Route path="/article/add" component={ArticleDetail}/>
                        </Switch>
                    </Content>
                </Layout>
                



            </Layout>
        )
    }

}

export default layouts