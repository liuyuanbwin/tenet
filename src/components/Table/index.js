import React, { Component } from 'react';
import { Table, Empty } from 'antd';
/**
 * api
 * requestfirst 默认不加载 'no'
 * getList      获取数据的请求方法
 * dataAttr     列表数据的属性
 * pagination   false 为不要分页
 * getResult    获取请求到的数据
 * params       api需要传的对象
 * */
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dataSource: [],
      params: {},
      loading: false,
    }
  }
  componentDidMount() {
    if (this.props.requestfirst === 'no') return;
    this.props.api && this.getList();
    this.props.onRef && this.props.onRef(this)
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
  onChange = (page, filter, sorter) => {
    this.setState({
      pageNum: page.current,
      pageSize: page.pageSize
    }, () => {
      this.props.onChange && this.props.onChange(page, filter, sorter)
      this.props.api && this.getList();
    })
  }
  getList = async (params) => {
    this.setState({ loading: true });
    let { pageNum, pageSize } = this.state;
    if (params) {
      this.setState({ params, pageNum: 1 });
      pageNum = 1;
    } else {
      params = this.state.params;
    }
    let page = this.props.pagination === false ? {} : {
      pageNum,
      pageSize
    }
    let res = await this.props.api({
      ...this.props.params,
      ...params,
      ...page
    });
    if (!res) return;
    if (res.code === 0 && !res.records) res = [];
    this.setState({ loading: false });
    this.props.getResult && this.props.getResult(res);
    if (this.props.dataAttr) res = res[this.props.dataAttr];
    this.setState({
      dataSource: res.page && res.page.data || res.resourcePage && res.resourcePage.data || res.data || res.records || res || [],
      total: res.total || 0,
    })
  }
  render() {
    let { api, ...props } = this.props;

    const { dataSource, pageNum, pageSize, total } = this.state;
    for (let obj of props.columns) {
      if (!obj.render) {
        obj.render = text => text || '--'
      }
    }
    return (
      <Table
        className="search-table"
        pagination={{
          pageNum,
          pageSize,
          total,
          current: pageNum,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100', '500'],
          showTotal: e => `共 ${e} 条`
        }}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        rowKey={(e, i) => i}
        {...props}
        loading={this.state.loading}
        onChange={this.onChange}
      />
    );
  }
}
export default Index;