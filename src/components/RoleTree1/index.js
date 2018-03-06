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
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {

    // var checked = checkedKeys.concat(e.halfCheckedKeys)
    if(this.props.onCheck) {
      this.props.onCheck(checkedKeys.checked);
    }
    this.setState({ checkedKeys });

    console.log('onCheck', checkedKeys);
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
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
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        checkStrictly="ture"
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
