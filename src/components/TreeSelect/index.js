import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

class MenuTreeSelect extends React.Component {
  state = {
    value: undefined,
  }
  componentWillReceiveProps(nextProps) {
    if ('default' in nextProps) {
      this.setState({
        value: nextProps.default,
      });
    }
  }
  onChange = (value) => {
    console.log(arguments);
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value)
    }
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
      return <TreeNode title={item.name} key={item.meunId} value={item.meunId} />;
    });
  }
  render() {
    const { data } = this.props;
    return (
      <TreeSelect
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        // treeData={treeData}
        placeholder="请选择"
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        {data?this.renderTreeNodes(data):null}
      </TreeSelect>
    );
  }
}
export default MenuTreeSelect;
