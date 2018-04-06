import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import { Link } from 'react-router-dom';
// import Request from 'react-http-request';
// let styles = require('./../Home.scss');
import  SideNav  from './../side-navComponent';
import  axios  from 'axios';
// import  _ from 'lodash';
import  TopNav  from './../TopComponent';
import  TablePan  from './../tableComponent';

// import * as PouchDB from 'pouchdb-browser';
// import PouchDB from 'pouchdb';

// const PouchDB = require('pouchdb');



// import * as PouchDB from 'pouchdb';
// import { Entity, EntityField, Collection } from 'pouchable'



export interface Props  {
    propData: Function;
}
// export declare function connect(): InferableComponentDecorator;

type AppState = {
    data: any;
    currentQueryState: string;
    currentStateData:Function
}

// PouchDB.plugin(require('pouchdb-find'));

// let db = new PouchDB("my_db");

// db.find({
//     selector: {
//       name: 'Raju'
//     }
//   }).then(function (result) {
//     console.log("query results", result);
// }).catch(function (err) {
//     console.log(err);
// });

// db.allDocs({
//     include_docs: true,
//     attachments: true,
//   }).then(function (result) {
//         console.log("query results", result);
//   }).catch(function (err) {
//         console.log(err);
// });

// db.get('001', function(err, doc) {
//     if (err) {
//        return console.log(err);
//     } else {
//        console.log(doc);
//     }
//  });

// posts.insert({ title: "Pouchable is here!!!", author: "Joe"}).then((p) => {
//     if (p.title != "Pouchable is here!!!") {
//         throw new Error("not really hapenning...");
//     }
//     console.log(p.title);
//  }).catch(() => {});


//Retrieving all the documents in PouchDB




export  default class Overflow extends React.Component<Props, AppState> {
    private tableData: any;
    private requestUrl: string;
    private manupulateData: Function;
    private tableHeaderData: any;
    private currentTableState: any;
    public loaderDisplayStyle: any;
    public loaderDisplayFlag: any;
    constructor(props:Props) {
        super(props);
        this.tableData = {
            type: '',
            items: []
        }
        this.setState({
            data: [],
            currentQueryState: 'gov'
        });

        this.currentTableState = 'gov';
        this.exportCSV = this.exportCSV.bind(this);
        this.getKeywordData = this.getKeywordData.bind(this);
        this.someMethod = this.someMethod.bind(this);
        this.setCurrentState = this.setCurrentState.bind(this);
        this.loaderDisplayFlag = false;
    };
    

    getKeywordData (data:any) {
        return this.state.data
    };
    setCurrentState (value: any) {
        this.setState({
            data: [],
            currentQueryState: value
        });
        this.currentTableState = value;
    };
    someMethod(value: any) {
        this.loaderDisplayFlag = true;
        this.loaderDisplayStyle = {
            "margin-left": "45%",
            "display": "inline-block"
        };
        switch(this.state.currentQueryState) {
            case 'gov': 
                this.requestUrl = `http://api.us.socrata.com/api/catalog/v1?q=` + value;
                this.manupulateData = function (value) {
                    value = value.data.results.map(function(item, index) {
                        return {
                            resource: item.resource.name,
                            domain: item.metadata.domain,
                            description: item.resource.description,
                            link: item.link,
                            owner: item.owner.display_name,
                            updatedAt: item.resource.updatedAt
                        };  
                    });
                    return value;
                };
                this.tableHeaderData  = ['Resource', 'Meta Data Domain', 'Description', 'Link', 'Owner', 'Updated At'];
                break;
            case 'news': 
                this.requestUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=d09bc4084bb1469da8fd258856435298`;
                this.manupulateData = function (value) {
                    value = value.data.results.map(function(item, index) {
                        if(item.multimedia.length>0) {
                            var image = item.multimedia[0].url;
                        }
                        return {
                            headline: item.title,
                            resource: "The New York Times",
                            url: item.short_url,
                            updatedAt: item.updated_date,
                            src: image
                        };  
                    });
                    this.tableHeaderData  = ['Image', 'HeadLine', 'Resource', 'Link', 'Updated At'];
                    return value;
                };
                break;
            case 'articles': 
                this.requestUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d09bc4084bb1469da8fd258856435298&q=` + value;
                this.manupulateData = function (value) {
                    value = value.data.response.docs.map(function(item, index) {
                        // if(item.multimedia.length>0) {
                        //     var image = item.multimedia[0].url;
                        // };
                        return {
                            headline: item.headline.main,
                            description: item.snippet,
                            link: item.web_url,
                            resource: item.source,
                            owner: item.source,
                            updatedAt: item.pub_date
                        };  
                    });
                    this.tableHeaderData  = [ 'Headline', 'Description', 'Link', 'Resource', 'Owner', 'Updated At'];
                    return value;
                };
                
                break;
            case 'movieReviews': 
                if(value == "Movie Reviews") {
                    value = "";
                } 
                this.requestUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=d09bc4084bb1469da8fd258856435298&query=` + value;
                this.manupulateData = function (value) {
                    value = value.data.results.map(function(item, index) {
                        if(item.multimedia) {
                            var image = item.multimedia.src;
                        }
                        return {
                            display_title: item.display_title,
                            headline: item.headline,
                            Summary_short: item.summary_short,
                            mpaa_rating: item.mpaa_rating,
                            link: item.link.url,
                            owner: item.source,
                            opening_date: item.opening_date,
                            src: image
                        };  
                    });
                    this.tableHeaderData  = ['Image', 'Display Title', 'Headline', 'Short Summary', 'Mpaa_rating', 'Link', 'Owner', 'Opening date'];
                    return value;
                };
                break;
            case 'jobs': 
                this.requestUrl = `https://api.usa.gov/jobs/search.json?query=` + value;
                this.manupulateData = function (value) {
                    value = value.data.map(function(item, index) {
                        return {
                            position_title: item.position_title,
                            organization_name: item.organization_name,
                            locations: item.locations,
                            start_date: item.start_date,
                            end_date: item.end_date,
                            link: item.url
                        };
                    });
                    this.tableHeaderData  = ['Position Title', 'Organization', 'Locations', 'Start Date', 'End Date', 'Link'];
                    return value;
                };
                break;
        };
        axios.get(this.requestUrl)
        .then(response => {
            this.loaderDisplayStyle = {
                "margin-left": "101%",
                "display": "none"
            };
            this.tableData =  {
                type: this.state.currentQueryState,
                items: this.manupulateData(response)
            }
            this.setState({
                data: response.data.results,
                currentQueryState: this.state.currentQueryState
            });
            this.currentTableState = this.state.currentQueryState;
        });
    };

    exportCSV() {
        console.log('test');
        var ap = this.tableData.items;
        var tempThis = this
        console.log(ap);
        console.log(ap.length);
        var len = ap.length;
        if(len > 0) {
            var csv = "";
            this.tableHeaderData.map(function(item, index) {
                if(index == tempThis.tableHeaderData.length -1){
                    csv = csv + item + "\n";
                }else {
                    csv = csv +  item + ",";
                }
            });

            for(var i=0; i<len; i++) {
                var str = '"';
                

                if(this.tableData.type == 'movieReviews' || this.tableData.type == 'news') {
                    str = ''+'","';
                }
                str = str +
                ap[i][Object.keys(ap[i])[0]]+'","'+
                ap[i][Object.keys(ap[i])[1]]+'","'+
                ap[i][Object.keys(ap[i])[2]]+'","'+
                ap[i][Object.keys(ap[i])[3]]+'","'+
                ap[i][Object.keys(ap[i])[4]]+'","'+
                ap[i][Object.keys(ap[i])[5]]+'"\n"';
                csv += str;
            };



            var rand = Math.floor(Math.random() * 999999) + 100000
        
            //console.log(csv);
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.setAttribute("download", this.state.currentQueryState + rand.toString() + ".csv");
            hiddenElement.target = '_blank';
            //hiddenElement.download = 'product.csv';
            hiddenElement.click();
        };

    };

    render() {
        return (
            <div className="window">
                {/* keywordDataPass= { this.getKeywordData } */}
                <TopNav searchDataMethod={this.someMethod.bind(this)} 
                exportCSV= { this.exportCSV } searchKitDataFlag={this.loaderDisplayFlag}/>
                <div className="window-content">
                    <div className="pane-group">
                        <SideNav currentStateData={ this.setCurrentState.bind(this) } searchDataMethod={this.someMethod.bind(this)} searchKitDataFlag={this.loaderDisplayFlag}/>
                        <div className="pane">
                            <TablePan searchResults={this.tableData} 
                            tableHeaders={this.tableHeaderData} 
                            currentTableState= {this.currentTableState} / >
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};


