import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class RoleTree extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultCheckedKeys) {
      this.setState({
        checkedKeys: nextProps.defaultCheckedKeys
      });
    }
  }
  state = {
    expandedKeys: ['0'],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    // console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys, e) => {
    // console.log(e.halfCheckedKeys)
    this.setState({ checkedKeys });
    var checked = checkedKeys.concat(e.halfCheckedKeys)
    if(this.props.onCheck) {
      this.props.onCheck(checked);
    }

    // console.log('onCheck', checkedKeys);
  }
  onSelect = (selectedKeys, info) => {
    // console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  // defaultCheckedKeys = () => {
  //   console.log(this, "this")
  //   if(this.props.defaultCheckedKeys) {
  //     thie.setState({
  //       checkedKeys:this.props.defaultCheckedKeys,
  //     })
  //   }
  // }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.meunId} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.meunId} />;
    });
  }
  render() {
    const { data } = this.props;
    console.log('data',data)
    return (
      <Tree
        showLine
        checkable
        onExpand={this.onExpand}
        defaultExpandedKeys={['3d19e06771b645b5abaa6cac598c24af','4eb3b9eb9c31426f89b00fa87e554daa']}
        // defaultExpandParent
        expandedKeys={this.state.expandedKeys}
        checkedKeys="halfChecked"
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        // defaultValue={this.state.selectedKeys}
      >
        {this.renderTreeNodes([data])}
      </Tree>
    );
  }
}

export default RoleTree;
