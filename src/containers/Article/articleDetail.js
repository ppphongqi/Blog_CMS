import React , { Component } from 'react';
import { observer , inject} from 'mobx-react';
import Article from './Article';
import {
    Button ,Input , Upload ,Modal ,Tag,Tooltip,Popconfirm
} from 'antd';
import { Icon } from '@ant-design/compatible';
import { beforeUpload , upload} from '../../util/tools';
import 'tui-editor/dist/tui-editor-extScrollSync.min';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'highlightjs/styles/github.css';
import './articleDetail.css';

/* 拖拽上传 */
const Dragger = Upload.Dragger;

@inject('articleDetailStore')
@observer
class ArticleDetail extends Component{
        constructor(props){
            super(props);
            this.state={
            }
        }
        componentDidMount(){
            const {articleDetailStore } = this.props;
            articleDetailStore.test();
            articleDetailStore.initEditor();
            if(window.location.pathname.indexOf('update') !== -1){
                articleDetailStore.getDataById();
            } else {
                articleDetailStore.clearData()
            }
            this.uploadImage();
        }
        uploadImage = () =>{
            const { articleDetailStore} = this.props;
            const editor = articleDetailStore.editorInstance;
            editor.eventManager.addEventType('upload');
            editor.eventManager.listen('upload',()=>{
                Modal.confirm({
                    title: 'upload image',
                    width: 700,
                    content: (
                    <div>
                        <Dragger
                            name="avatar"
                            {...upload()}
                            beforeUpload={beforeUpload}
                            onChange={articleDetailStore.onContentImageUploadChange}
                        >
                            <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                        </Dragger>
                    </div>
                    ),
                    onOk() {
                        editor.insertText(`\n\n![${articleDetailStore.editorImageName}](${articleDetailStore.editorImage})`);
                    },
                });
            });

        }

        render(){
            const {articleDetailStore } = this.props;
            const uploadButton = (
                <div>
                    <Icon type={articleDetailStore.uploadStatus ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>
            )
            const tagColorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
            return (
                <main className="wrapper article_detail_wrapper">
                    <h1>
                    { window.location.pathname.indexOf('update') !== -1 ? 'Update the article' : 'Add new article'}
                    </h1>
                    <section className="article_detail_container">
                        <span style={{ lineHeight:'102px'}}>
                            Header cover:
                        </span>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            {...upload()}
                            beforeUpload={beforeUpload}
                            onchange={articleDetailStore.onHeaderCoverUploadChange}
                        >

                            {articleDetailStore.headerCover ? <img src={articleDetailStore.headerCover} alt="avatar"/> : uploadButton }
                        </Upload>
                        <span>
                            Title:
                        </span>
                        <Input 
                            id="title"
                            type="text"
                            value={articleDetailStore.title}
                            placeholder="Input Title..."
                            onChange={event=>articleDetailStore.onTitleChange(event)}
                            style={{ width:'40%'}}
                        />
                        <span>
                            Summary:
                        </span>
                        <textarea
                            name="summary"
                            id="summary"
                            cols="30"
                            rows="6"
                            value={articleDetailStore.summary}
                            onChange={event=>articleDetailStore.onSummaryChange(event)}
                            placeholder="Input Summary..."
                            style={{ width:'60%'}}
                        />
                        <span   
                            style={{ position:'relative'}}
                        >
                            Content:
                        </span>
                        <div id="editSection" />
                        <span className="tags_label">
                            Tags:
                        </span>
                        <div className="tags_container"> 
                            {articleDetailStore.tags.map((tag,index)=>{
                                const isLongTag = tag.length > 10 ;
                                const tagElem = (
                                    <Tag
                                        key={tag}
                                        closable
                                        color={tagColorList[index]}
                                        afterClose={()=>articleDetailStore.handleClose(tag)}
                                    >
                                        {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                                    </Tag>
                                );
                                return  isLongTag ? <Tooltip title={tag} key={tag} >{tagElem}</Tooltip> : tagElem 
                            })}
                            {articleDetailStore.inputVisible && (
                                <Input  
                                    ref={articleDetailStore.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{width:78}}
                                    value={articleDetailStore.inputValue}
                                    onChange={articleDetailStore.handleInputChange}
                                    onBlur={articleDetailStore.handleInputConfirm}
                                    onPressEnter={articleDetailStore.handleInputConfirm}
                                />
                            )}
                            {!articleDetailStore.inputVisible && (
                                <Tag    
                                    onClick={articleDetailStore.showInput}
                                    style={{ background:'#fff',borderStyle:'dashed'}}
                                >
                                    <Icon type="plus"/>
                                    {' '}
                                    New Tag
                                </Tag>
                            )}
                        </div>
                        <div className="submit_btn_group">
                            <Popconfirm
                                title="保存并提交?"
                                icon={<Icon type="warning" style={{ color : "red"}}/>}
                                onConfirm={() => articleDetailStore.handleSave("toUpdate",articleDetailStore.editorInstance.convertor.toHTML(articleDetailStore.editorInstance.getValue()),true)}
                                onCancel={()  => articleDetailStore.handleSave('toUpdate',articleDetailStore.editorInstance.convertor.toHTML(articleDetailStore.editorInstance.getValue()), false) }
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        marginBottom:16,
                                        marginLeft : 20
                                    }}
                                >
                                    保存并继续修改
                                </Button>
                            </Popconfirm>
                            <Button
                                onClick={()=>articleDetailStore.handleSave('toList',articleDetailStore.editorInstance.convertor.toHTML(articleDetailStore.editorInstance.getValue()),true)}
                                style={{
                                    marginBottom:16,
                                    marginLeft : 20,
                                    background:'#19be6b',
                                    borderColor:'#19be6b'
                                }}
                            >
                                保存
                            </Button>

                        </div>

                    </section>



                </main>

                
            )
        }

}

export default ArticleDetail
