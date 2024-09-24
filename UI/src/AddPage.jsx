import React, { useState,useEffect } from 'react';
import ReactDOM, { render } from'react-dom';
import MapElement from './Map';
import {AddToDB} from './ConnectToBackend.js';



//feature:feedback infomation dialogs
export function FeedbackDialog(props){
  useEffect(()=>{
    const timer=setTimeout(()=>{ 
      props.changeSubmitToDefault();
    },2300);
    
  },[])

  if(props.submitValue=="illegal"){
    return(
      <div className="alert alert-danger">
         <strong className="me-auto">Fail to add a review :(</strong><br/>
         check if you have chosen a restaurant, rate it and write comments
      </div>
    );
  }
  else if(props.submitValue=="legalsubmit"){
    return(
      <div className="alert alert-success">
         <strong className="me-auto">Successfully add a review! :)</strong>
         <></>
      </div>
    );
  }
  else if(props.submitValue=="illegalsearch"){
    return(
      <div className="alert alert-danger">
         <strong className="me-auto">Fail to summarize :(</strong><br/>
         check if you have chosen a restaurant on map
      </div>
    );

  }
  return null
}


class CommentForm extends React.Component {
    state = {
      placeID: '',
      rate:'',
      comment: '',
    };
    componentDidUpdate(prevProps) {
      if (this.props.selectedPlaceID !== prevProps.selectedPlaceID) {
        this.setState({placeID: this.props.selectedPlaceID});
      }
    }
  
    handleChange = (event) => {
      this.setState({ comment: event.target.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      if(this.checkSubmitFormLegal()){
        //pass the data to backend
        AddToDB({id:`${this.state.placeID}`,restaurantName:"randomname",grade:`${this.state.rate}`,text:`${this.state.comment}`});
        // Clear the input after submission
        this.setState({ comment: ''});
        this.props.changeSubmitToTrue()
      
      }
      else{
        console.log("not fully fill out form")
        this.props.changeSubmitedToIllegal()
  
      }
      
    };

    changeSubmitedToFalse=()=>{
      this.setState({submited:false})
    }
    
  
    handleClickRate= (event) => {
      this.setState({ rate: event.target.value});
    }

    checkSubmitFormLegal=()=>{
      if(this.state.placeID!=""&&this.state.rate!="" && this.state.comment!=""){
        return true
      }
      else{
        return false
      }
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="comment-form">
          <h3>Write comments to </h3>
          <h4>{this.props.restaurantName}</h4>
          <h4>{this.props.restaurantAddress}</h4>
          <h4>Overall Rate:</h4>
          <div>
          <button type="button" onClick={this.handleClickRate} value="1">1</button>
          <button type="button" onClick={this.handleClickRate} value="2">2</button>
          <button type="button" onClick={this.handleClickRate} value="3">3</button>
          <button type="button" onClick={this.handleClickRate} value="4">4</button>
          <button type="button" onClick={this.handleClickRate} value="5">5</button>
          </div>
          <h4>Comments</h4>
          <textarea
            id="comment"
            value={this.state.comment}
            onChange={this.handleChange}
            placeholder="Input box...(TEXT)"
          />
          <button type="submit">Submit</button>
        </form>
      );
    }
  }
  
  
  
export class AddPage extends React.Component {
  
    state={
      selectedPlace:'',
      submited:false,
      restaurantName:'',
      restaurantAddress:'',
    };
    handleSelectedPlaceIDChange = (newSelectedPlaceID) => {     
      this.setState({selectedPlace:newSelectedPlaceID})
    };
    handlePlaceAddress = (placeAddress) => {
      this.setState({ restaurantAddress: placeAddress });
    }
    handlePlaceNameChange = (placeName) => {
      this.setState({ restaurantName: placeName });
    }
  
    render() {
      const { onSearch } = this.props;
      const { handleSelectedPlaceIDChange } = this.props;
      return (
        <div>
          {this.state.submited!=false && <FeedbackDialog submitValue={this.state.submited} changeSubmitToDefault={()=>this.setState({submited:false})}/>}
           <MapElement 
           handleSelectedPlaceIDChange={this.handleSelectedPlaceIDChange}
           handlePlaceNameChange={this.handlePlaceNameChange}
           handlePlaceAddress={this.handlePlaceAddress} />
           <CommentForm 
           selectedPlaceID={this.state.selectedPlace} 
           changeSubmitToTrue={()=>this.setState({submited:"legalsubmit"})} 
           changeSubmitedToIllegal={()=>this.setState({submited:"illegal"})}
           restaurantName={this.state.restaurantName}
           restaurantAddress={this.state.restaurantAddress}
           />
           
        </div>
      );
    }
  }
  
