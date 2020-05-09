import { action ,observable ,configure ,runInAction} from 'mobx';
import { articleApi } from '../http/index' 
import { message } from 'antd';


configure({
    strict:'always'
});

class ArticleStore{
    @observable dataSource;
    @observable dayDataSource;
    @observable PVDataSource;
    @observable selectedRowKeys;
    @observable curId;
    @observable curPage;
    @observable totalAmount;
    @observable spinning;

    constructor() {
        this.articleApi = articleApi;
        this.dataSource = [];
        this.dayDataSource = [];
        this.PVDataSource = [];
        this.selectedRowKeys = [];
        this.curId = '';
        this.curPage = 1 ;
        this.totalAmount = 0;
        this.spinning = false;
    }

    getData = async ()=>{
        this.spinning = true;
        try {
            const response = await this.articleApi.getDataByPage(this.curPage);
            runInAction(()=>{
                this.dataSource.splice(0,this.dataSource.length);
                this.dataSource = response.data;
                this.totalAmount =parseInt(response.headers.amount,10);
                this.spinning =false;
                window.scrollTo(0,0);
            })
        } catch (e){
            message.error('getData error')
        }
    }

    getDataByTitle = async title=>{
        this.spinning = true;
        try{
            const response = await this.articleApi.getDataByTitle(title);
            runInAction(()=>{
                this.dataSource.splice(0,this.dataSource.length)
                this.dataSource = response.data;
                this.totalAmount = parseInt(response.headers.amount,10);
                this.spinning = false;
            })
            
        } catch(e){
            message.error('getDataByTitle error')
        }
    };

    getDataByDay = async ()=>{
        try{
            const response = await this.articleApi.getDataByDay();
            runInAction(()=>{
                const arr = [];
                for(let i = 0 ,l=response.data.length ; i < l ; i += 1){
                    const obj = {
                        data:response.data[i]._id,
                        count:response.data[i].count
                    }
                    arr.push(obj)
                }
                this.dayDataSource = arr;
            })
        } catch (e){
            message.error('getDataByDay error')
        }
    };

    getDataByPV = async ()=>{
        try {
            const response = await this.articleApi.getDataByPV();
            runInAction(()=>{
                const arr = [];
                for(let i = 0, l = response.data.length; i < l; i += 1){
                    const obj = {
                        title:response.data[i].title,
                        pv_count:response.data[i].pv_count
                    }
                    arr.push(obj)
                }
                this.PVDataSource = arr;
            })
            
        } catch (e){
            message.error('getDataByPV error')
        }
    };

    getDataByDateRange = async (start , end)=>{
        this.spinning = true;
        try {
            const response = await this.articleApi.getDataByDateRange();
            runInAction(()=>{
                this.dataSource.splice(0,this.dataSource.length)
                this.dataSource = response.data;
                this.totalAmount = parseInt(response.headers.amount);
                this.spinning = false;
            })
        }catch (e){
            message.error('getDataByDateRange error')
        }
    };

    switchStatus = async (id, checked) => {
        const params = {
            status: checked
        };
        try {
            await this.articleApi.switchStatus(id, params);
            if (checked) {
                message.success('this article has been published');
            } else {
                message.success('the article will be hidden');
            }
            this.dataSource.splice(0, this.dataSource.length);
            await this.getData();
        } catch (e) {
            message.error('unknown error!');
        }
    };

    deleteData = async id => {
        try {
            await this.articleApi.deleteData(id);
            message.success('delete success');
            this.dataSource.splice(0, this.dataSource.length);
            await this.getData();
        } catch (e) {
            message.error('unknown error!');
        }
    };

    batchDelete = async () => {
        const params = {
            selectedList: this.selectedRowKeys
        };
        try {
            await this.articleApi.batchDeleteData(params);
            message.success('delete success');
            this.dataSource.splice(0, this.dataSource.length);
            this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
            await this.getData();
        } catch (e) {
            message.error('unknown error!');
        }
    };

    @action onSelectChange = selectedRowKeys => {
        this.selectedRowKeys = selectedRowKeys;
        console.log(this.selectedRowKeys)
    };

    @action onSwitchPage = pageNumber => {
        this.curPage = pageNumber;
        this.getData();
        // reset pageNumber, make sure the first request is the first page
        this.curPage = 1;
    };

    @action onTitleSearchChange = value => {
        this.getDataByTitle(value);
    };

    @action onDateRangeSearchChange = (date, daterange) => {
        this.getDataByDateRange(daterange[0], daterange[1]);
    };

    @action resetSearch = () => {
        this.getData();
    };
}

const articleStore = new ArticleStore(articleApi);

export default articleStore ;