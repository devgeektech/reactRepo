import * as React from 'react';
import * as classNames from 'classnames';
// import { Link } from 'react-router-dom';
import ToggleDisplay from 'react-toggle-display';
import { Link } from 'react-router-dom';

let styles = require('./topComponent.scss');


export interface Props  {
    searchDataMethod: Function;
    exportCSV: Function;
    searchKitDataFlag: any;
};

export default class TopNav extends React.Component<Props> {
    private textInput: any;
    private loaderStyle: any;

    constructor(props:any) {
        super(props);
        this.loaderStyle = false;
        this.searchData = this.searchData.bind(this);
        this.state ={
            loaderDisplay: false
        };
    };
    
    //   focusTextInput() {
    //     // Explicitly focus the text input using the raw DOM API
    //     this.textInput.focus();
    //     console.log(this.textInput.value);
    //   }

    searchData = () => {
        console.log(this.textInput.value);
        this.loaderStyle = true;
        this.startLoader();
        this.setState({
            loaderDisplay: true
        }, this.props.searchDataMethod(this.textInput.value));
        // this.props.searchDataMethod(this.textInput.value);
        
        
        // this.stopLoader();
    };
    startLoader = () => {
        
        this.setState({
            loaderDisplay: false
        });
        // this.loaderStyle = !this.loaderStyle;
        // console.log(this.loaderStyle);
    };

    stopLoader = () => {
        this.loaderStyle= {
            display: "none"
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.searchKitDataFlag) {
            this.setState({
                loaderDisplay: !nextProps.searchKitDataFlag
            })
        }
        console.log('data came');
    }
    render() {
        
        return (
            <header className="toolbar toolbar-header">
                <h1 className="title">Research</h1>
                <div className="toolbar-actions">
                    <div className="btn-group">
                        <button className="btn btn-default">
                            <img src="http://www.iconhot.com/icon/png/rrze/720/data-transfer.png" alt="Smiley face" height="42" width="42"/>
                            <Link to="/importWorksheet">to Counter</Link>
                        </button>
                        <button className="btn btn-default">
                            <img src="https://www.shareicon.net/data/2015/10/27/662684_graph_512x512.png" alt="Smiley face" height="42" width="42"/>
                        </button>
                        <button className="btn btn-default">
                        <img src="http://meeconference.org/wp-content/uploads/2015/08/research-icon.png" alt="Smiley face" height="42" width="42"/>
                        </button>
                        <button className="btn btn-default">
                            <span className="icon icon-popup"></span>
                        </button>
                        <button className="btn btn-default">
                            <span className="icon icon-shuffle"></span>
                        </button>
                    </div>

                   
                    <ToggleDisplay if={this.state['loaderDisplay']}>
                        <i  className={ classNames("fa", "fa-cog", "fa-7x", "fa-spin", "pull-right", styles["loader-top-nav"] ) } aria-hidden="true"></i>
                    </ToggleDisplay>
                    <div className={ classNames("form-group" , styles["email-top-1"] ) }>
                        {/* <div className="form-group email-top-1"> */}
                        <input type="text" id="keyword" 
                        className={ classNames("form-control", styles.searchInput)} 
                        ref={(input) => { this.textInput = input; }}  placeholder="keyword" />
                    </div>
                    <button className={ classNames("btn", "btn-default", "pull-right", styles["email-top-btn1"] ) }
                        value="Focus the text input" onClick={this.searchData.bind(this)}>
                        <span className="icon icon-search"></span>
                            Search
                    </button>
                    <button className={ classNames("btn", "btn-default", "pull-right", styles["email-top-btn2"]) } 
                        onClick={this.props.exportCSV.bind(this)}>
                        <span className="icon icon-download"></span>
                            Export
                    </button>
                    {/*  <input className="form-control pull-right" type="text" placeholder="Search for someone"> */}
                </div>
            </header>

        );
    };
};
