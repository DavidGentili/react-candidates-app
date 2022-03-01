import {React} from 'react';
import Candidate from './Candidate'

const StatePanel = ({stepName, candidates, nextStep, prevStep}) => {

    candidates = candidates.sort((a,b) => {
        return a.id.localeCompare(b.id);
    });

    return(
        <div className="statePanel">
            <h3>{stepName}</h3>
            <div className="candidatesPanel">
                {!candidates.length && <p>No hay candidatos</p>}
                {
                    candidates.map(candidate => <Candidate 
                        key = {candidate.id}
                        id = {candidate.id} 
                        name = {candidate.name}
                        surname = {candidate.surname}
                        nextStep = {nextStep}
                        prevStep = {prevStep}
                    />)
                }
            </div>
        </div>
    )
}

export default StatePanel;