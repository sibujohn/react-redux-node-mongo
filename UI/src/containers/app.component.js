import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import AppRoutes from '../routes/app.routes'


class AppComponent extends Component {
  render() {
    return (
      <div>
          {AppRoutes}
      </div>
    )
  }
}

export default connect()(AppComponent)
