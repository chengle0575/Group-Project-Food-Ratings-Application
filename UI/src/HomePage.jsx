import React from 'react';
import ReactDOM from'react-dom';
import MapElement from './Map';
import { FeedbackDialog }  from './AddPage.jsx'; //import  the feedback dialog implemented in addpage.jsx 
import { fetchSummary } from './ConnectToBackend.js';


class Tag extends React.Component {
  render() {
    const { textcontent, deletefunc } = this.props;
    return (
      <div className="tag">
        <span>{textcontent}</span>
        <button className="delete-tag" onClick={() => deletefunc(textcontent)}>❌</button>
      </div>
    );
  }
}
  
  //feature: click 'AddButton' to 'Input' user-defined tag, providing fluent user experience
  class AddtagButton extends React.Component {
    state = {
      clicked: false,
    };
  
    setClicked = () => this.setState({ clicked: true });
  
    handleKeyDown = (event) => {
      if (event.key === "Enter") {
        let getTag = event.target.value;
        this.props.addfunc(getTag);
        this.setState({ clicked: false });
      }
    };
  
    render() {
      return (
        <div>
          {!this.state.clicked && (
            <button className="add-tag-button" onClick={this.setClicked}>Add</button>
          )}
          {this.state.clicked && (
            <input type="text" onKeyDown={this.handleKeyDown} autoFocus />
          )}
          {/*{this.state.clicked && <TagsuggestionBar />}*/}
        </div>
      );
    }
  }
  
  /*
  //feature: suggest a tag  ,come from database in the future
  class TagsuggestionBar extends React.Component {
    render() {
      return (
        <div className="tag-suggestions">
          <button className="suggested-tag">abc</button>
          <button className="suggested-tag">bcd</button>
          <button className="suggested-tag">npq</button>
         
        </div>
      );
    }
  }
  */
  
  //feature: control the amount of tags
  class PreferenceTags extends React.Component {

    constructor(props){
      super(props);
      this.state={taglist:JSON.parse(localStorage.getItem("taglist")),
             count:JSON.parse(localStorage.getItem("taglist")).length};
  
      this.deleteTag=this.deleteTag.bind(this);
      this.addTag=this.addTag.bind(this);
    }
    
    //feature: delete a tag if not interested
    deleteTag(Tag){

      let taglist=this.state.taglist;
      taglist=taglist.filter(element=>element!=Tag); 

      let count=this.state.count;
      count--;

      console.log('this is the count',count);
      //deal with  local storage
      localStorage.setItem("taglist",JSON.stringify(taglist));
      //trigger render
      this.setState({taglist:taglist,count:count});
      console.log('current count:',this.state.count<5);  
    }
  
    addTag(Tag){
      let taglist=this.state.taglist;
      taglist.push(Tag);

      let count=this.state.count;
        count++;
 
      localStorage.setItem("taglist",JSON.stringify(taglist));
      this.setState({taglist:taglist,count:count});  

    }
  
  
    render() {
  
      
      return (
  
        <div className="preference-tags">
          <span>Tag-Preference</span>
          {this.state.taglist.map((element,index)=><Tag key={index} textcontent={element} deletefunc={this.deleteTag}/>)}
          {this.state.count < 5 }
          {this.state.count < 5 && <AddtagButton addfunc={this.addTag} countnow={this.state.count}/>}
  
  
        </div>
      );
    }
  }
  
//feature: the prefencetag  should be saved in local storage(browser), to rememeber user's behavior
//initiate default localstorage
if(localStorage.getItem("taglist")==null || JSON.parse(localStorage.getItem("taglist")).length==0){
    let defualtag=["Taste","Cost","Environment","Cleanness"];
    let defaultTagsJson=JSON.stringify(defualtag);
    localStorage.setItem("taglist",defaultTagsJson);
  }

  
  class Ratings extends React.Component {
    render() {
      const { data } = this.props;
      let grade = '';
      let summary = '';
      let positiveEvidence = '';
      let negativeEvidence = '';
  
      //seperate the data with key words
      if (data) {
        const parts = data.review.split('\n');
        console.log('parts:', parts)
        const gradeIndex = parts.findIndex(part => part.includes('grade:'));
        const summaryIndex = parts.findIndex(part => part.includes('summary:'));
        const positiveEvidenceIndex = parts.findIndex(part => part.includes('positive evidence:'));
        console.log('positiveEvidenceIndex:', positiveEvidenceIndex)
        const negativeEvidenceIndex = parts.findIndex(part => part.includes('negative evidence:'));
  
        grade = gradeIndex !== -1 ? parts[gradeIndex].split(':').slice(1).join(':').trim() : '';
        summary = summaryIndex !== -1 ? parts[summaryIndex].split(':').slice(1).join(':').trim() : '';
        positiveEvidence = positiveEvidenceIndex !== -1 && negativeEvidenceIndex !== -1 ? parts.slice(positiveEvidenceIndex + 1, negativeEvidenceIndex) : [];
        negativeEvidence = negativeEvidenceIndex !== -1 ? parts.slice(negativeEvidenceIndex + 1) : [];
      }
  
      return (
        <div className="ratings">
          <h2>Restaurant Name: {this.props.restaurantName}</h2>
          <h3>{this.props.restaurantAddress}</h3>
          <h3>Overall Ratings: {grade ? grade.replace('Grade:', '') : 'N/A'}</h3>
          <p>{summary ? summary.replace('Summary:', '') : 'No data'}</p>
          <div className="evidence">
            <div>
              <h4>Positive Evidence</h4>
              {positiveEvidence.length > 0 ? positiveEvidence.map((evidence, index) => <p key={index}>{evidence}</p>) : <p>No data</p>}
            </div>
            <div>
              <h4>Negative Evidence</h4>
              {negativeEvidence.length > 0 ? negativeEvidence.map((evidence, index) => <p key={index}>{evidence}</p>) : <p>No data</p>}
            </div>
          </div>
        </div>
      );
    }
  }
  
  


class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchPlaceID:'',
        data: null,
        isSearching:false,
        selectedPlaceName: '',
        selectedPlaceAddress: '',

      };
      this.handleDataChange = this.handleDataChange.bind(this);
      this.handleSearchPlaceIdChange = this.handleSearchPlaceIdChange.bind(this);
    }
    handleDataChange(newData) {
      this.setState({ data: newData });
    }

    handlePlaceAddress = (placeAddress) => {
      this.setState({ selectedPlaceAddress: placeAddress });
    }

    handlePlaceNameChange = (placeName) => {
      this.setState({ selectedPlaceName: placeName });
    }

    handleSearchPlaceIdChange(newPlaceId){
      this.setState({searchPlaceID:newPlaceId})
    }

    searchReview= async () => {
        // newSelectedPlaceID is the new selectedPlaceID from MapElement's state
        // Send it to the backend using a REST API call
      
        // Retrieve the tags from local storage
      let tags = localStorage.getItem('taglist');
      tags = tags ? JSON.parse(tags) : [];
      
      this.setState({isSearching:true});

      //check if selected place, before sending request
      if(this.state.searchPlaceID!=''){
        //setState for button display change
        try {
          const data = await fetchSummary(this.state.searchPlaceID, tags);
          this.handleDataChange(data)
          console.log('Received data:', data);

          //setState for button display change
          this.setState({isSearching:false});
          return data;
        } catch (error) {
          console.error(error);
        }
        
      }
      else{
          console.log("fail ")
      }  
      };
    
    render() {
      return (
        <div>
              {this.state.isSearching==true && <FeedbackDialog submitValue={this.state.searchPlaceID===""? "illegalsearch":null} changeSubmitToDefault={()=>{this.setState({isSearching:false})}}/>}
              <div style={{ position: 'relative' }}>
                <MapElement 
                handleSelectedPlaceIDChange={this.handleSearchPlaceIdChange}
                handlePlaceNameChange={this.handlePlaceNameChange} 
                handlePlaceAddress={this.handlePlaceAddress}
               />
              </div>
              <div style={{ clear: 'both' }}>
                <PreferenceTags />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                {this.state.isSearching === false && (
                  <button className="btn btn-primary" onClick={this.searchReview}>
                    Search for reviews based on your preferences
                  </button>
                )}
                {this.state.isSearching === true && (
                  <button className="btn btn-primary">
                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    <span>AI is thinking</span>
                  </button>
                )}
              </div>
              {this.state.isSearching===false&&this.state.data!=null &&
                 <Ratings 
                 data={this.state.data} 
                 restaurantName={this.state.selectedPlaceName} 
                 restaurantAddress={this.state.selectedPlaceAddress}
                 />
              }
             
            </div>
      );
    }
  }

export default HomePage;
