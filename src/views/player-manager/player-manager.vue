<style lang="less">
    @import '../../styles/common.less';
    @import 'upload.less';
</style>


<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        点击搜索进行搜索
                    </p>
                    <Row>
                        <Input v-model="searchConName3" placeholder="请输入姓名搜搜..." style="width: 200px" />
                        <span @click="handleSearch3" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                        <Button @click="handleCancel3" type="ghost" >取消</Button>
                    </Row>
                    <Row class="margin-top-10 margin-bottom-10 searchable-table-con1">
                        <Col span="24">
                            <div class="edittable-con-1">
                                <can-edit-table refs="table2" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
                                    </div>
                                </div>
                            </div>
                    </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import tableDatas from './tabledatas.js';
import canEditTable from './canEditTable.vue';
import Blob from '../../excel/Blob.js';
// import Export2Excel from '../excel/Export2Excel.js'
export default {
    name: 'file-upload',
    components: {
        canEditTable
    },
    data () {
        return {
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: [],
            columnsList: [],
            tableData: [],
            pageTotal: 0,
            pageNum: 1,
            pageSize: 10,
            allData: [],
            fileIndex: 0,
            searchConName3: ''
        };
    },
    methods: {
        getData(){
             this.columnsList = tableDatas.table2Columns;
             this.tableData = [];
        },
        updateTable(data){ //导入数据之后更新表格中的数据
            data.forEach(item => {
                this.allData.push(item);
            });
            this.pageTotal = this.allData.length;
            if(this.tableData.length == 0){
                for(var i = 0;i<this.pageSize * this.pageNum;i++){
                    this.tableData.push(this.allData[i]);
                }
            }
        },
        handlePage(value){
            this.pageNum = value;
            this.tableData = [];
            for(var i = (( value - 1 )  * this.pageSize);i<value*this.pageSize;i++){
                this.tableData.push(this.allData[i]);
            }
        },
        handlePageSize(pageSize){
            this.pageSize = pageSize;
            this.tableData = [];
            for(var i = ((this.pageNum - 1) * pageSize);i<this.pageNum * pageSize;i++){
                this.tableData.push(this.allData[i]);
            }
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
            });
        },
        handleBeforeUpload (file) {
            this.importFile(file);
            if (event.currentTarget.files.length == this.fileIndex + 1) {
                this.fileIndex = 0;
            }else{
                this.fileIndex = this.fileIndex + 1;
            }
            return false; //只做导入，不上传
        },
        importFile(obj,file){
            //console.log(fileIndex);
            let _this = this;
            let inputDOM = this.$refs.inputer;
            var rABS = false; //是否将文件读取为二进制字符串
            var f = event.currentTarget.files[_this.fileIndex];
            var reader = new FileReader();
            FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        _this.updateTable(outdata);
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
        },
        handleProgress (event, file) {
            this.$Notice.info({
                title: '文件正在上传',
                desc: '文件 ' + file.name + ' 正在上传。'
            });
        },
        handleSuccess (evnet, file) {
            this.$Notice.success({
                title: '文件上传成功',
                desc: '文件 ' + file.name + ' 上传成功。'
            });
        },
        handleError (event, file) {
            this.$Notice.error({
                title: '文件上传成功',
                desc: '文件 ' + file.name + ' 上传失败。'
            });
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess2 (res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError2 (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload2 () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        },
        handleDel(){
            console.log("delete one line data");
        },
        handleSearch3 () {
            this.data3 = this.initTable3;
            this.data3 = this.search(this.data3, {name: this.searchConName3});
        },
        handleCancel3 () {
            this.data3 = this.initTable3;
        }
    },
    created(){
       this.getData();
    },
    mounted () {
        //this.uploadList = this.$refs.upload.fileList;
    }
};
</script>
