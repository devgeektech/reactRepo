import * as React from 'react';
// import { Link } from 'react-router-dom';

// let styles = require('./Home.scss');

export interface Props  {
    searchResults: any;
    tableHeaders: any;
    currentTableState: string;
    // enthusiasmLevel: string;
}


export default class TablePan extends React.Component<Props> {
    public srcElement: any
    constructor(props:Props) {
        super(props);
        this.setState({
            data: this.props.searchResults.items || []
        });
        this.srcElement = '';
    }

    getData () {
        console.log(this.props.searchResults.items)
        {this.props.searchResults.items};
    };

  render() {
    var data;
    // var loaderStyle = {
    //     "margin-left": "45%"
    // }
    if(!this.props.searchResults) {
        data = [];
    } else  {
        data = this.props.searchResults.items || [];
    }
    
    var ts = this;
    if(
        (ts.props.currentTableState == "movieReviews" || ts.props.currentTableState == "news") && 
        ((ts.props.searchResults.type == "movieReviews" || ts.props.searchResults.type == "news"))
    ) {
        var srcElement = {
            display: 'block'
        };
    } else {
        var srcElement = {
            display: 'none'
        };
    };
    
    data = data.map(function(item, index) {
        return (
            <tr>
                <td style={srcElement}><img src={item.src} /></td>
                <td>{item[Object.keys(item)[0]]}</td>
                <td>{item[Object.keys(item)[1]]}</td>
                <td>{item[Object.keys(item)[2]]}</td>
                <td>{item[Object.keys(item)[3]]}</td>
                <td>{item[Object.keys(item)[4]]}</td>
                <td>{item[Object.keys(item)[5]]}</td>
            </tr>
        )
    });
    
    var tableHeaders = this.props.tableHeaders || [];
    tableHeaders = tableHeaders.map(function(item, index) {
        return (
            <th>
                {item}
            </th>
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
                {data}                    
            </tbody>
        </table> 
    );
  };
};
