import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import {connect} from 'react-redux';
import Overview from './../../components/OverviewComponent';


interface AppProps {
  humans: any;
  stores: any;
}


// export class OverviewPage extends React.Component<RouteComponentProps<any>, void> {
//   render() {
//     return (
//       <Overview />
//     );
//   }
// }

export default (Overview  as any as React.StatelessComponent<AppProps>);
