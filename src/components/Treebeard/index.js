'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

// const data = {
//     name: 'root',
//     toggled: true,
//     children: [
//         {
//             name: 'parent',
//             children: [
//                 { name: 'child1' },
//                 { name: 'child2' }
//             ]
//         },
//         {
//             name: 'loading parent',
//             loading: true,
//             children: []
//         },
//         {
//             name: 'parent',
//             children: [
//                 {
//                     name: 'nested parent',
//                     children: [
//                         { name: 'nested child 1' },
//                         { name: 'nested child 2' }
//                     ]
//                 }
//             ]
//         }
//     ]
// };
const decorators = {
    Loading: (props) => {
        return (
            <div style={props.style}>
                loading...
            </div>
        );
    },
    Toggle: (props) => {
        return (
            <div style={props.style}>
                <svg height={props.height} width={props.width}>
                    // Vector Toggle Here
                </svg>
            </div>
        );
    },
    Header: (props) => {
        return (
            <div style={props.style}>
                {props.node.name}
            </div>
        );
    },
    Container: (props) => {
        return (
            <div onClick={this.props.onClick}>
                // Hide Toggle When Terminal Here
                <this.props.decorators.Toggle/>
                <this.props.decorators.Header/>
            </div>
        );
    }
};
class TreeExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
        if(this.props.onToggle) {
          this.props.onToggle(node);
        }
    }
    render(){
       const { data:{ data } } = this.props;
       console.log(this.props,"sd")
        return (
            <Treebeard
                data={data.data}
                onToggle={this.onToggle}
                // decorators={decorators}
            />
        );
    }
}
export default TreeExample;
