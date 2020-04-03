import React from 'react';
import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


function WorkoutInfoModal ({workoutModal,closeModal,modalWorkoutName,modalWorkoutGif,modalWorkoutDescription}){
    return(
      <div className={`workout_modal ${workoutModal}`}>
        <button className="workout_modal_close" type="button" onClick={closeModal} ><FontAwesomeIcon size="2x" icon={faTimesCircle} /></button>
        <p className="workout_modal_name">{modalWorkoutName}</p>
        
        <img src={modalWorkoutGif} alt=""/>
        <div className="workout_modal_description_container">
          <div className="workout_modal_description">
            <p>{modalWorkoutDescription}</p>
          </div>
        </div>
      </div>
    )
}

export default WorkoutInfoModal;