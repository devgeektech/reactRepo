import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Sidenav from './../../components/side-navComponent';


export interface Props extends RouteComponentProps<any> {
  name: string;
  enthusiasmLevel: number;
}

// export class sidenavPage extends React.Component<RouteComponentProps<any>, void> {
//   render() {
//     return (
//       <Sidenav />
//     );
//   }
// }

export default (Sidenav as any as React.StatelessComponent<RouteComponentProps<Props>>);
