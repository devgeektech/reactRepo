import * as console from 'console';
import * as React from 'react';
import  ImportedTableComponent  from './../importedTableComponent';
import * as classNames from 'classnames';
import * as filesize from 'file-size';
var fs = require('fs');
var CSV2SQL = require('csv2sql-lite');
var Database = require('better-sqlite3');
var db = new Database('foobar.db');

var row = db.prepare('SELECT * FROM users')
console.log(row.firstName, row.lastName, row.email);
// var db = new sqlite3.Database('./tempCsv/mysql.sql');




// import { Link } from 'react-router-dom';


// var csv = require('csv-array');

import * as PouchDB from 'pouchdb-browser'; // alternatively 'pouchdb-browser'
// const PouchDB = require('pouchdb');
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import ToggleDisplay from 'react-toggle-display';
const sqlite3 = require('sqlite3-offline').verbose()
var db = new sqlite3.Database('./tempCsv/mysql.sql')

db.serialize(function() {


   
    db.each("SELECT * FROM myTableName", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
  });
   
  db.close();
var row = db.prepare('SELECT * FROM myTableName');
console.log('test', row);


 





export interface Props  {

};
var rt = new PouchDB('myDB');

        
rt.get('001', function(err, response) {
    if (err) {
        return console.log(err);
    } else {
        console.log("Document created Successfully");
    };
});

export default class importWorksheet extends React.Component<Props> {

    public csvData;
    public data;
    public tableHeadersData;
    public fileSize;
    constructor(props:any) {
        super(props);
        this.tableHeadersData = [];
        this.csvData = [];
        this.state ={
            loaderDisplay: false
        };
    };
    handleData (selectorFiles) {
        // var tempThis = this;
        if(selectorFiles.length > 0) {
            const csvFilePath=selectorFiles[0].path;
            var rstream = fs.createReadStream(csvFilePath);
            var wstream = fs.createWriteStream('./tempCsv/mysql1.sql');
            var csv2sql = CSV2SQL({
                tableName: 'myTableName',
                dbName: 'myFancyDatabaseName',
            });
            rstream.pipe(csv2sql).pipe(wstream).on('finish', function() {
                console.log('finish data');
            })
            // csv.parseCSV(csvFilePath, function(data){
            //     tempThis.csvData = data;
            //         // console.log(this.csvData);
            //     if(tempThis.csvData.length) {
            //         tempThis.tableHeadersData = [];
            //         Object.keys(tempThis.csvData[0]).forEach(function(item, index) {
            //             tempThis.tableHeadersData.push(item);
            //         });
            //         tempThis.setState({
            //             tableData: tempThis.tableHeadersData,
            //             loaderDisplay: false
            //         })
            //     };   
            // });
        };
    };
    handleChange(selectorFiles) {
        this.fileSize = filesize(selectorFiles[0].size).human('jedec');
        this.setState({
            selectedFile: selectorFiles,
            loaderDisplay: true
        }, this.handleData.bind(this, selectorFiles));
        
        
        
        
    };
   
    render() {
        // var fileInputStyle = {
        //     display: 'none'
        // }    
        
        return (
            <div className="window">
                <header className="toolbar toolbar-header">
                    <h1 className="title">Research</h1>
                    <div className="toolbar-actions">
                        <div className="btn-group">
                            <button className="btn btn-default">
                            <img src="http://www.iconhot.com/icon/png/rrze/720/data-transfer.png" alt="Smiley face" height="42" width="42"/>
                                <label className="input-group-btn">
                                <span className="btn btn-w-m btn-success">
                                    <input name="myFile" type="file" onChange={ (e) => this.handleChange(e.target.files) } /> 
                                </span>
                                </label>
                            </button>
                            <ToggleDisplay if={this.state['loaderDisplay']}>
                                <i  className={ classNames("fa", "fa-cog", "fa-7x", "fa-spin", "pull-right") } aria-hidden="true">
                                </i>
                                loading file ...{this.fileSize}
                            </ToggleDisplay>
                            
                        </div>
                    </div>
                </header>
                <div className="window-content">
                    <div className="pane-group">
                        <div className="pane">
                            <ImportedTableComponent tableData= {this.csvData} tableHeaders={this.tableHeadersData} />
                        </div>
                    </div>
                </div>
            </div>

        );
    };
};
