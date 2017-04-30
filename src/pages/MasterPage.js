import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import Header from './Header';

export class MasterPage extends React.Component {
  render() {
    return (
      <DocumentTitle title='My React App'>
        <div className='MasterPage'>
          <Header />
          { this.props.children }
        </div>
      </DocumentTitle>
    );
  }
};
export default MasterPage;