export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '文件名称',
        align: 'center',
        key: 'filename',
        editable: true
    },
    {
        title: '文件路径',
        align: 'center',
        key: 'fileurl',
        editable: true
    }
];

export const table2Columns = [
    {
        title: '专利编号',
        align: 'center',
        key: 'patentNumber'
    },
    {
        title: '类型',
        align: 'center',
        key: 'type'
    },
    {
        title: '专利名称',
        align: 'center',
        key: 'patentName'
    },
    {
        title: '申请号',
        align: 'center',
        key: 'applyNumber'
    },
    {
        title: '申请日',
        align: 'center',
        key: 'applyDate'
    },
    {
        title: '公开号',
        align: 'center',
        key: 'publishNumber'
    },
    {
        title: '公开日',
        align: 'center',
        key: 'publishDate'
    },
    {
        title: '申请公司',
        align: 'center',
        key: 'applyCompany'
    },
    {
        title: '发明人',
        align: 'center',
        key: 'author'
    },
    {
        title: '状态',
        align: 'center',
        key: 'patentStatus'
    }
];

export var table1Data = [
    {
        filename: '十二五规划纲要',
        filetype: 'pdf',
        fileSize: '2M',
        uploadTime: '2018-07-08'
    },
    {
        filename: '十二五规划纲要',
        filetype: 'pdf',
        fileSize: '2M',
        uploadTime: '2018-07-08'
    },
    {
        filename: '十二五规划纲要',
        filetype: 'pdf',
        fileSize: '2M',
        uploadTime: '2018-07-08'
    }
];

export const table2Data = [
    {
        patentNumber:'CN102577946A',
        type:'发明公开',
        patentName:'大麦花药快速培养法及所用培养基123456',
        applyNumber:'CN201210024418.7',
        applyDate:'2012-02-01 T16:00:00.000Z',
        publishNumber:'CN102577946A',
        publishDate:'2012-02-01 T16:00:00.000Z',
        applyCompany:'浙江省农业科学院', 
        author:'张三、李四、王老五',
        patentStatus:'有效专利'
    }
];

const tableDatas = {
    table1Columns: table1Columns,
    table1Data: table1Data,
    table2Columns: table2Columns,
    table2Data: table2Data
};

export default tableDatas;