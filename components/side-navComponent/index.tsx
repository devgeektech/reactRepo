
import * as React from 'react';
import * as classNames from 'classnames';
import ToggleDisplay from 'react-toggle-display';
// let styles = require('./sid-navComponent.scss');


export interface Props  {
    currentStateData: Function;
    searchDataMethod: Function;
    searchKitDataFlag: any;
}

export default class SideNav extends React.Component<Props> {
    public selectCategories;
    public selectProperties;
    public selectSubProperties;
    public allProperties;
    public subCategoriesFiltersProperties;
    private currentQuery;
    public setInitialPropertiesValue;
    public currentState;
    public consoleData;
    public subCategories;

    constructor(props: Props) {
        super(props);
        this.changePageState('gov');

        this.subCategories = {
            govRecords: ["Federal Government", "State Government", "University ","Local Government", "City Government",
            "Oil and Gas Division", "Association of Washington","Department of the Interior","Fish and Wildlife Service",
            "NSGIC State | GIS Inventory", "Earth Data Analysis","Federal Laboratory","U.S. Department of Health & Human Services",
            "Department of Justice","US Census Bureau","Department of Commerce","National Park Service",
            "Social Security Administration","U.S. Geological Survey",
                "Game and Fish Department","Florida Department","Virginia Department", 
                "Information Technology Department", "Oklahoma State Department of Education",
                "Oklahoma Housing Finance Agency","Parks and Recreation Department","Department of Agriculture",
                "Legislative Council","Minnesota Department of Natural Resources", "State Water Commission",
                ,"Public Service Commission","Board of Tests for Alcohol and Drug Influence","State of Illinois",
                "State of Iowa","State of New York","State of Alaska","State of North Carolina", "State of Maryland","State of Arkansas",
                "State of Minnesota","State of Missouri","State of North Dakota","State of Oklahoma",
                "State of Hawaii","State of Oregon","State of Connecticut","Oklahoma Tax Commission","Education","Biodiversity","Civil Rights","Environment","Food Production",
                "Transportation","Species","Melting Glaciers","","",""
            ],
            jobCategries: ["IT", "Doctor", "Nurse", "Banking", "Accounts", "Government", "Engineering", 
            "Sales", "Teacher", "Telecommunications", "Transportation", "Marketing", "Consultant", "Hotel", "Insurance", 
            "Army","Water Supply", "Police", "Shop", "Sports", "Cook"],
            acticlesCategories: ["Arts and humanities","Biology","Business and economics","Housing and real estate",
            "Investments","Labor","Small business and entrepreneurship","Careers","Chemistry","Consumer issues","Documents",
            "Education","Financial issues","K-12","Postsecondary","Government and politics",
            "Congressional Research Service","GAO","National security","Political", "Election", "Taxation",
             "Health and healthcare", "Disabilities", "Diseases and conditions", "Obesity","Health insurance",
            "Mental health and substance abuse","Alcohol","Drug addiction","Psychology and counseling","Recreational drugs",
            "Tobacco and smoking","Prescription drugs", "Safety","Public safety","Veterinary Medicine/Animal Welfare",
            "Industries","Energy","Food and agriculture","Media and entertainment","International","Africa",
            "Asia","Afghanistan","China","India","Japan","Pakistan","Russia","Australia","New Zealand","Canada",
            "Central America","Emerging Economies","Europe","United Kingdom","Globalization","International Relations",
            "Latin America","Caribbean","Mexico","Middle East","North America","South America","Legal and law enforcement",
            "Crime","Intellectual property","Regulation and compliance","Military and defense","Terrorism","Veterans",
            "Nonprofits","Physics","Science","Environment","Climate Change/Global Warming","Natural Disasters",
            "Weather and climate","Social and cultural issues","Children and families","Ethics","Ethnic","Gender and sexuality",
            "Human rights","Immigration","Poverty","Privacy","Race","Religion and spirituality","Sports, recreation and leisure",
            "Professional sports","Technology","Internet","Security","Telecommunications","Transportation and travel",
            "Air travel","Infrastructure","Motor vehicles","Public transportation"],
            topStoriesCategories: ['top Stories'],
            movieCategories: ['Movie Reviews']
        };
        
        this.subCategoriesFiltersProperties =[];
        this.allProperties = ['news', 'gov', 'jobs', 'articles', 'movieReviews'];
        this.selectProperties = {};
        this.selectSubProperties = {};
        this.changePageState = this.changePageState.bind(this);
        this.setInitialPropertiesValue = function(state) {
            var rt = this;
            this.allProperties.forEach(function(item, index) {
                rt.selectProperties[item] = false;
            });
            if(state === 'initial') {
                this.currentState = 'gov';
                this.changePageState('gov');
                // this.props.currentStateData('gov');
                rt.selectProperties['gov'] = true;
            };
        };
        this.setInitialPropertiesValue('initial');

        this.state = {
            selectClassflag: this.selectProperties,
            selectSubCategoryFlag: this.selectSubProperties,
            loaderDisplay: false,
            currentState: 'gov'
        };
        
        this.selectCategories = function(type, intermediateCall) {
            this.setInitialPropertiesValue('intermediate');
            this.currentState = type;
            this.changePageState(type);
            // this.props.currentStateData(type);
            this.selectProperties[type] = true;
            this.setState({
                selectSubCategoryFlag: this.selectSubProperties,
                selectClassflag: this.selectProperties,
                currentState: this.currentState
            });
        };

        this.consoleData = function() {
            console.log(this);
        };    
    };

    changePageState (data: any) {
        this.props.currentStateData(data);
    };

    selectSubCategories (id, item) {
        var rt = this;
        this.subCategoriesFiltersProperties.forEach(function(item, index) {
            rt.selectSubProperties[item] = false;
        });
        this.currentQuery = item;
        this.selectSubProperties[id] = true;
        this.setState({
            selectSubCategoryFlag: this.selectSubProperties,
            selectClassflag: this.selectProperties,
            currentState: this.currentState,
            loaderDisplay: true,
            currentQuery: this.currentQuery
        },this.props.searchDataMethod(item));
        console.log(item);
    };

    componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.searchKitDataFlag) {
            this.setState({
                loaderDisplay: !nextProps.searchKitDataFlag
            })
        }
        console.log('data came');
    }

    render() {
        var tempThis = this;
        var selectedSubcategories;
        this.subCategoriesFiltersProperties = [];
        ['news', 'gov', 'jobs', 'articles', 'movieReviews'];
        switch(this.currentState) {
            case 'gov':
                selectedSubcategories = this.subCategories['govRecords']
                break;
            case 'jobs':
                selectedSubcategories = this.subCategories['jobCategries']  
                break;
            case 'articles':
                selectedSubcategories = this.subCategories['acticlesCategories']
                break;
            case 'news':
                selectedSubcategories = this.subCategories['topStoriesCategories']
                break;
            case 'movieReviews':
                selectedSubcategories = this.subCategories['movieCategories']
                break;
        };
        var subCategory = selectedSubcategories.map(function(item, index) {
            var id = "sub_" + index.toString();
            tempThis.subCategoriesFiltersProperties.push(id);
            return (
                <span id={id} 
                className={ classNames("nav-group-item", { 'active' : tempThis.state['selectSubCategoryFlag'][id] })} 
                onClick={tempThis.selectSubCategories.bind(tempThis, id, item)}>
                    <span className="icon icon-record" ></span>
                    {item}
                </span>
            )
        });
        return (
            <div className="pane pane-sm sidebar fullHeight">
                <nav className="nav-group">
                    <h5 className="nav-group-title">Categories</h5>
                    <span  className={ classNames("nav-group-item", { 'active' : this.state['selectClassflag']['gov'] })} 
                    onClick={this.selectCategories.bind(this, 'gov', true)}>
                        <span className="icon icon-clipboard"></span>
                        Gov. Open Records
                    </span>
                    <span className={ classNames("nav-group-item", { 'active' : this.state['selectClassflag']['jobs'] })} 
                    onClick={this.selectCategories.bind(this, 'jobs', true)}>
                        <span className="icon icon-briefcase"></span>
                        Jobs
                    </span>
                    <span className={ classNames("nav-group-item", { 'active' : this.state['selectClassflag']['articles'] })} 
                    onClick={this.selectCategories.bind(this, 'articles', true)}>
                        <span className="icon icon-docs"></span>
                        Articles
                    </span>
                    <span className={ classNames("nav-group-item", { 'active' : this.state['selectClassflag']['news']})} 
                    onClick={this.selectCategories.bind(this, 'news', true)}>
                        <span className="icon icon-newspaper"></span>
                        Top Stories
                    </span>
                    <span className={ classNames("nav-group-item", { 'active' : this.state['selectClassflag']['movieReviews'] })} 
                    onClick={this.selectCategories.bind(this, 'movieReviews')}>
                        <span className="icon icon-print"></span>
                        Movie Reviews
                    </span>
                </nav>
                
                <nav className="nav-group">
                    <h5 className="nav-group-title">Select Filters
                    <ToggleDisplay if={this.state['loaderDisplay']}>
                        <i  className={ classNames("fa", "fa-cog", "fa-7x", "fa-spin", "pull-right") } aria-hidden="true"></i>
                    </ToggleDisplay>
                    </h5>
                    {subCategory}                
                </nav>
            </div>

        );
    };
};
