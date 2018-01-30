import { TreeSelect } from 'antd';

// const treeData = [{
//   label: 'Node1',
//   value: '0-0',
//   key: '0-0',
//   children: [{
//     label: 'Child Node1',
//     value: '0-0-1',
//     key: '0-0-1',
//   }, {
//     label: 'Child Node2',
//     value: '0-0-2',
//     key: '0-0-2',
//   }],
// }, {
//   label: 'Node2',
//   value: '0-1',
//   key: '0-1',
// }];
const TreeNode = TreeSelect.TreeNode;

class MenuTreeSelect extends React.Component {
  state = {
    value: undefined,
  }
  onChange = (value) => {
    console.log(arguments,"argu");
    console.log(value)
    this.setState({ value });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.meunId} value={item.meunId}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  renderData = (data) =>{
     return data.map((item) => {
      if(item.children) {
        return this.renderData(item.children)
      }
      return {
        label:item.name
      }
    })
  }
  render() {
    const { data } = this.props;
    const data1 = this.renderData(data);
    console.log(data1, "data")
    return (
      <TreeSelect
        style={{ width: 300 }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        // treeData={treeData}
        treeNodeLabelProp="name"
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      >
      {this.renderTreeNodes(data)}
      </TreeSelect>
    );
  }
}
export default MenuTreeSelect;
