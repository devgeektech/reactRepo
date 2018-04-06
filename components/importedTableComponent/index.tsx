import * as React from 'react';
// import { Link } from 'react-router-dom';

// let styles = require('./Home.scss');


export interface Props  {
    tableHeaders: any;
    tableData: any;
}


export default class ImportedTableComponent extends React.Component<Props> {
    public srcElement: any
    constructor(props:Props) {
        super(props);
    }

    consoleData () {
        console.log(this.props.tableHeaders);
    };


  render() {
    //   var tempThis = this;
    var tableHeaders = this.props.tableHeaders.map(function(item, index) {
        return (
            <th>
                {item}
            </th>
        )
    });
    var tableData = this.props.tableData.map(function(item, index) {
        // var currentItem = item[tempThis.props.tableHeaders[index]]
        var currentRowItem =  Object.keys(item).map(function(localObjectKey, index) {
            return (
                <td>
                    {item[localObjectKey]}
                </td>
            )
        })
        return (
            <tr>
                {currentRowItem}
            </tr>
        )
    });
    return (
        
        
        <table className="table-striped">
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                    {tableData}
            </tbody>
        </table> 
    );
  };
};