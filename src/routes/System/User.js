import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  // handleTabChange = (key = 'list') => {
  //   const { dispatch, match } = this.props;
  //   switch (key) {
  //     case 'list':
  //       dispatch(routerRedux.push(`${match.url}/list`));
  //       break;
  //     case 'add':
  //       dispatch(routerRedux.push(`${match.url}/add`));
  //       break;
  //     case 'edit':
  //       dispatch(routerRedux.push(`${match.url}/edit`));
  //       break;
  //     default:
  //       break;
  //   }
  // }

  render() {

    const { match, routerData, location, dispatch } = this.props;
    const routes = getRoutes(match.path, routerData);
    return (
        <Switch>
          {
            routes.map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )
          }
          <Route exact path="/system/user" component={routerData['/system/user/list'].component} />
        </Switch>
    );
  }
}
