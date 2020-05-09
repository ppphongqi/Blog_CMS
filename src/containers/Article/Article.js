import React , { Component }from 'react';
import { observer , inject} from 'mobx-react';
import { Link } from 'react-router-dom';
import {
    Table, Button, Modal,  Popconfirm, Switch, Pagination, Spin, Input, DatePicker, Col,
} from 'antd';
import { Icon } from '@ant-design/compatible';
import { checkWebp} from '../../util/tools'


const Search = Input.Search;
const { Column , ColumnGroup } = Table;
const { RangePicker } = DatePicker;

@inject('articleStore')
@observer
class Article extends Component {
    constructor(props){
        super(props);
        this.state={
            test:[
                {
                    _id:'1',
                    title:'nihao',
                    summary:'这是一段测试，测试测试zcf是不是傻仔',
                    header_cover:'http://www.ppphongqi.xyz/01.jpg',
                    publish_date:'2020-5-2 16:30',
                    last_modified_date:'2020-5-2 16:31',
                    like_count:'99',
                    pv_count:'33',
                    status:true,
                },
                {
                    _id:'2',
                    title:'i am good ,thank you',
                    summary:'这个同样也是一段测试，ok good thank you',
                    header_cover:'http://www.ppphongqi.xyz/txbaobao.jpg',
                    publish_date:'2020-5-2 16:30',
                    last_modified_date:'2020-5-2 16:31',
                    like_count:'199',
                    pv_count:'33',
                    status:false,
                }
            ],
            spinning:false,
            totalAmount:100,
            


        }


    };
    componentDidMount(){
        const { articleStore } = this.props;
        articleStore.getData();
    }


    render(){
        const { articleStore } = this.props;
        const rowSelection= {
            selectedRowKeys:articleStore.selectedRowKeys,
            onChange:articleStore.onSelectChange
        }
        return (
            <main className="wrapper article_wrapper">
                <div 
                    className="search_container"
                    style={{
                        display:'flex', justifyContent: 'space-between', margin: '0px 0px 30px 0px', width: '50%',
                    }}
                >
                    <Search 
                        placeholder="Search article by title..."
                        style={{ width:300}}
                        enterButton 
                    />
                    <RangePicker
                        onchange={()=> console.log('rangePicker')}
                    />
                    <Button 
                        type="primary"
                        onClick={()=>console.log('this is button')}
                    >
                        Reset
                    </Button>
                </div>
                <div className="add_batch_delete_wrapper">
                <Link to="/article/add">
                    <Button
                        type="primary">
                        
                        <Icon 
                            type="plus"
                            theme="outlined"
                            style={{ position:'relative' , top:1, marginRight: 10}}
                        />
                        Add new Article
                    </Button>
                </Link>
                    <Popconfirm 
                        title="Are you sure delete"
                        icon={<Icon type="warning" style={{ color : "red"}}/>}
                        onConfirm={()=>console.log('You have delte this items')}
                    >
                        <Button
                            type="danger"
                        >
                            <Icon   
                                type="delete"
                                theme="outlined"
                            />
                            Batch Delete
                        </Button>
                    </Popconfirm>
                    <span style={{ marginLeft: 8 }}>
                        nothing
                    </span> 
                </div>
                <Table
                    rowKey={record => record._id}
                    dataSource={this.state.test}
                    pagination={false}
                    rowSelection={rowSelection}
                    loading={articleStore.loading}
                    >
                    <ColumnGroup>
                        <Column
                            title="Title"
                            dataIndex="title"
                            key="title"
                        />
                        <Column 
                            title="Summary"
                            dataIndex="summary"
                            key="summary"
                            width={300}
                        />
                        <Column 
                            title="Header cover"
                            dataIndex="header_cover"
                            render={(text,record)=>(
                                <span>
                                    <img
                                        src={record.header_cover}
                                        alt={record.title}
                                        style={{
                                            width:120,height:120,objectFit: 'cover', cursor: 'pointer', borderRadius: 4,
                                        }}
                                        onClick={()=>Modal.info({
                                            width:740,
                                            iconType:'zoom-in',
                                            maskClosable:true,
                                            title:'Look full size picture',
                                            content:<img
                                                src={record.header_cover}
                                                alt={record.title}
                                                style={{
                                                    marginTop:10,width:'600px',
                                                }}
                                                />
                                        })}
                                    />
                                </span>
                            )}
                        />
                        <Column 
                            title="Publish Date"
                            dataIndex="publish_date"
                        />
                        <Column 
                            title="Last Modified Date"
                            dataIndex="last_modified_date"
                        />
                        <Column 
                            title="Like_count"
                            dataIndex="like_count"
                            render={(text,record)=>(
                                <span>
                                    {record.like_count}
                                </span>
                            )}
                        />
                        <Column 
                            title="PV_count"
                            dataIndex="pv_count"
                            key="pv_count"
                        />
                        <Column 
                            title="Status"
                            dataIndex="status"
                            render={(text,record)=>(
                                <span>
                                    <Switch
                                        checkedChildren={<Icon type="check"/>}
                                        unCheckedChildren={<Icon type="close"/>}
                                        checked={record.status}
                                        defaultChecked={record.status}
                                        onChange={()=>console.log('Status changed')}
                                    />
                                </span>
                            )}
                        />
                        <Column 
                            title="Operation"
                            key="operation"
                            render={(text,record)=>(
                                <span>
                                    <Icon
                                        type="edit"
                                        theme="twoTone"
                                        twoToneColor="#007fff"
                                        style={{ cursor:'point',marginRight:16}}
                                    />
                                    <Popconfirm
                                        title="Are you sure delete this article?"
                                        icon={<Icon type="warning" style={{color:'red'}}/>}
                                        onConfirm={()=>console.log('delete this project')}
                                    >
                                        <Icon
                                            type="delete"
                                            theme="twoTone"
                                            twoToneColor="#f5222d"
                                            style={{ cursor : 'point'}}
                                        />
                                    </Popconfirm>
                                </span>
                            )}
                        />
                    
                    
                    
                    </ColumnGroup>
                </Table>
                <Spin
                    spinning={this.state.spinning}
                    style={{ marginLeft:'50%',marginTop:20}}
                />
                <Pagination
                    size="small"
                    showQuickJumper
                    defaultCurrent={1}
                    total={this.state.totalAmount}
                    showTotal={(total,range)=>`${range[0]}-${range[1]} of ${total} item`}
                    style={{ marginTop:20 , textAlign:'right'}}
                    />
            </main>
        )
    }
}

export default Article