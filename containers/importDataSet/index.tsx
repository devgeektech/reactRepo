import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import {connect} from 'react-redux';
import importWorksheet from './../../components/importDataComponent';


interface AppProps {
  humans: any;
  stores: any;
}


// export class importWorksheetPage extends React.Component<RouteComponentProps<any>, void> {
//   render() {
//     return (
//       <importWorksheet />
//     );
//   }
// }

export default (importWorksheet  as any as React.StatelessComponent<AppProps>);