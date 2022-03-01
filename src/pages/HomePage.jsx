import {React, useState, useEffect, useRef} from 'react';
import StatePanel from '../componets/StatePanel';

import './homePage.css'

import stepHandler from '../stepHandler';
import api from '../api';

const {stepsOfProcess, getNextStep, getPrevStep} = stepHandler

const HomePage = ({candidates, setCandidates}) => {

    
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputName = useRef(null);
    const inputSurname = useRef(null);

    useEffect(() => {
        if(inputName.current)
            inputName.current.value = '';
        if(inputSurname.current)
        inputSurname.current.value = ''
    },[openForm])

    const updateData = (data) => {
        setLoading(true);
        api.data.update(data).then(() => {
            setLoading(false);
            setOpenForm(false);
            setCandidates(data);
        })
    }
    

    const nextStepEvent = (id) => {
        return (e) => {
            const index = candidates.findIndex(candidate => candidate.id === id)
            if(index !== -1){
                const newCandidates = [...candidates];
                newCandidates[index].state = getNextStep(newCandidates[index].state);
                updateData(newCandidates);
            }
        }
    }

    const prevStepEvent = (id) => {
        return (e) => {
            const index = candidates.findIndex(candidate => candidate.id === id)
            if(index !== -1){
                const newCandidates = [...candidates];
                newCandidates[index].state = getPrevStep(newCandidates[index].state);
                updateData(newCandidates);  
            }
        }
    }

    const openFormHandler = (e) => {
        e.preventDefault();
        setOpenForm(!openForm);
    }

    const addCandidateHandler = (e) => {
        e.preventDefault();
        const childs = e.target.elements;
        const name = childs[0].value;
        const surname = childs[1].value;
        if(name && name.length && surname && surname.length){
            const id = `${name}-${surname}-${candidates.reduce((acc,act) => name+surname === act.name+act.surname ? acc + 1 : acc,0)}`; 
            const newCandidates = [...candidates, {id, name, surname, state: stepsOfProcess[0], description: '', email: ''}];
            updateData(newCandidates);              
        }
    }
    
    return (
        <div className={'homePage' + (loading ? ' loading' : '')}>
            <div className="addCandidate">
                {openForm && <form onSubmit={addCandidateHandler}>
                    <input ref={inputName} type="text" placeholder='Name'/>
                    <input ref={inputSurname} type="text" placeholder='Surname'/>
                    <button type='submit' disabled={loading}>Add</button>
                </form>}
                <button onClick={openFormHandler}>+</button>
            </div>
            <div className="MainBoard">
                {
                    stepsOfProcess.map((step, index) => <StatePanel 
                        key={step} 
                        stepName = {step} 
                        candidates = {candidates.filter(candidate => candidate.state.toLowerCase() === step.toLowerCase())}
                        prevStep = {(index !== 0) ? prevStepEvent : undefined}
                        nextStep  = {(index < stepsOfProcess.length - 1) ? nextStepEvent : undefined}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default HomePage