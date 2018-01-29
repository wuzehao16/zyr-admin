import React, { Component } from 'react';
import { Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {
  render() {
    const { match, routerData } = this.props;
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
        {/* 默认跳转list */}
        <Route exact path="/system/menu" component={routerData['/system/menu/list'].component} />
      </Switch>
    );
  }
}
