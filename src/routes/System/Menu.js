import React, { Component } from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { connect } from 'dva';
import { Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { getRoutes } from '../../utils/utils';

@connect()
export default class SearchList extends Component {

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
          <Route exact path="/system/menu" component={routerData['/system/menu/list'].component} />
        </Switch>
    );
  }
}
