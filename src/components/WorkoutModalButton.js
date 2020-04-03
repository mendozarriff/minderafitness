import React from 'react';

class WorkoutModalButton extends React.Component{
  constructor(){
    super()
    this.state = {
      workoutModal: '',
      modalWorkoutName:'',
      modalWorkoutDescription:'',
      modalWorkoutGif: '',
      workoutModalOverlay: ''
    }
  }
  openModal(name, description, gif){
    this.setState({
      modalWorkoutName: name,
      modalWorkoutDescription: description,
      modalWorkoutGif: gif,
      workoutModalOverlay: 'display',
      workoutModal : 'display'
    })
  }

  render(){
    return(
      <div>
        
      </div>
    )
  }
}

export default WorkoutModalButton; 