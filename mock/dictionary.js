import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    id: `${i}`,
    updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
    value: Math.ceil(Math.random() * 100),
    label: '平安银行',
    type: 'bank',
    updateTime: new Date(`2017-07-${Math.floor(i / 2) + 5}`),
    createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function selectDictionary(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.type === 'orgType') {
    const result = {
      code: 0,
      data: [{
        label: '银行机构',
        value: '1'
      },
      {
        label: '金融机构',
        value: '2'
      },
      {
        label: '小额贷款',
        value: '3'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'prodCategory') {
    const result = {
      code: 0,
      data: [{
        label: '信用贷',
        value: '100'
      },
      {
        label: '抵押贷',
        value: '110'
      },
      {
        label: '供应链贷',
        value: '120'
      },
      {
        label: '融资租赁',
        value: '130'
      },
      {
        label: '汽车金融',
        value: '140'
      }],
    };
    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }

  if (params.type === 'propCategory') {
    const result = {
      code: 0,
      data: [{
        label: '住宅',
        value: '200'
      },
      {
        label: '商住两用',
        value: '210'
      },
      {
        label: '商品房',
        value: '220'
      },
      {
        label: '别墅',
        value: '230'
      },
      {
        label: '临街商铺',
        value: '240'
      },
      {
        label: '写字楼',
        value: '250'
      },
      {
        label: '厂房',
        value: '260'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }

  if (params.type === 'cusCategory') {
    const result = {
      code: 0,
      data: [{
        label: '工薪族',
        value: '300'
      },
      {
        label: '企业主',
        value: '310'
      },
      {
        label: '自由职业',
        value: '320'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'adsType') {
    const result = {
      code: 0,
      data: [{
        label: '产品-搜索框广告词',
        value: '11100'
      },
      {
        label: 'Banner',
        value: '11200'
      },
      {
        label: '小喇叭',
        value: '11300'
      },
      {
        label: 'app启动页',
        value: '11400'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'repMethod') {
    const result = {
      code: 0,
      data: [{
        label: '等额本息',
        value: '400'
      },
      {
        label: '等额本金',
        value: '410'
      },
      {
        label: '先息后本',
        value: '420'
      },
      {
        label: '随借随还',
        value: '430'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'prodFeatures') {
    const result = {
      code: 0,
      data: [{
        label: '流程简单',
        value: '5000'
      },
      {
        label: '通过率高',
        value: '5100'
      },
      {
        label: '不电核',
        value: '5200'
      },
      {
        label: '不上征信',
        value: '5300'
      },
      {
        label: '不看小额',
        value: '5400'
      },
      {
        label: '三非可做',
        value: '5500'
      },
      {
        label: '公检法可做',
        value: '5600'
      },
      {
        label: '快速放款',
        value: '5700'
      },
      {
        label: '高额返佣',
        value: '5800'
      },
      {
        label: '资料简单',
        value: '5900'
      },
      {
        label: '上门签约',
        value: '6000'
      },
      {
        label: '还款灵活',
        value: '6100'
      },
      {
        label: '额度充足',
        value: '6200'
      },
      {
        label: '无手续费',
        value: '6300'
      },
      {
        label: '单签可做',
        value: '6400'
      },
      {
        label: '成数较高',
        value: '6500'
      },
      {
        label: '不看流水',
        value: '6600'
      },
      {
        label: '白户可做',
        value: '6700'
      },
      {
        label: '不看负债',
        value: '6800'
      },
      {
        label: '征信宽松',
        value: '6900'
      },
      {
        label: '不看查询',
        value: '7000'
      },
      {
        label: '无需考察',
        value: '7100'
      },
      {
        label: '电核宽松',
        value: '7200'
      },
      {
        label: '不核配偶',
        value: '7300'
      },
      {
        label: '行业不限',
        value: '7400'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }

  if (params.type === 'intRange') {
    const result = {
      code: 0,
      data: [{
        label: '<=0.5%',
        value: '14000'
      },
      {
        label: '0.5-1%',
        value: '14100'
      },
      {
        label: '1-1.5%',
        value: '14200'
      },
      {
        label: '1.5-2%',
        value: '14300'
      },
      {
        label: '>2%',
        value: '14400'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'city') {
    const result = {
      code: 0,
      data: [{
        label: '深圳',
        value: '20'
      },
      {
        label: '广州',
        value: '30'
      },
      {
        label: '珠海',
        value: '40'
      },
      {
        label: '东莞',
        value: '50'
      },
      {
        label: '惠州',
        value: '60'
      },
      {
        label: '中山',
        value: '70'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'pushmesType') {
    const result = {
      code: 0,
      data: [{
        label: '产品审核消息',
        value: '15000'
      },
      {
        label: '机构审核消息',
        value: '15100'
      },
      {
        label: 'app用户重置密码',
        value: '15200'
      },
      {
        label: '机构用户重置密码消息',
        value: '15300'
      },
      {
        label: '新增机构消息',
        value: '15400'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'auditStatus') {
    const result = {
      code: 0,
      data: [{
        label: '未通过',
        value: '0'
      },
      {
        label: '审核中',
        value: '1'
      },
      {
        label: '已通过',
        value: '2'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'mesType') {
    const result = {
      code: 0,
      data: [{
        label: '系统通知',
        value: '8000'
      },
      {
        label: '优惠通知',
        value: '8500'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }
  if (params.type === 'chaClassify') {
    const result = {
      code: 0,
      data: [{
        label: '众银学堂',
        value: '12100'
      },
      {
        label: '金融资讯',
        value: '12200'
      }],
    };

    if (res && res.json) {
      res.json(result);
    } else {
      return result;
    }
    return
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    code: 0,
    data: dataSource,
    count: dataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function saveDictionary(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    const i = Math.ceil(Math.random() * 10000);
    tableListDataSource.unshift({
      key: i,
      id: `${ i}`,
      updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
      value: body.value,
      label: body.label,
      type: body.type,
      updateTime: new Date,
      createTime: new Date,
    });
    const result = {
      code: 0,
      data: tableListDataSource,
      count: tableListDataSource.length,
    };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function deleteDictionary(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no } = body;
    /* eslint no-case-declarations:0 */
  const idArray = url.split("/")
  const id = idArray[idArray.length - 1]
    tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
  const result = {
    code: 0,
    data: tableListDataSource,
    count: tableListDataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}
export function updateDictionary(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, id } = body;
    /* eslint no-case-declarations:0 */
    // tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
    tableListDataSource.map((item,index) => {
      if(item.id == id){
      tableListDataSource[index]={
          key: body.id,
          id: `${body.id}`,
          updateUser: Math.floor(Math.random() * 2) > 0 ? '知乎' : '骚粉',
          value: body.value,
          label: body.label,
          type: body.type,
          updateTime: new Date,
          createTime: new Date,
        }
      }
    });
  const result = {
    code: 0,
    data: tableListDataSource,
    count: tableListDataSource.length,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default { selectDictionary, deleteDictionary, updateDictionary, saveDictionary};
