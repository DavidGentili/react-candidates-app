import { React, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './singleCandidate.css'

import api from '../api';

const correctData = (candidate, newCandidate) => (newCandidate.name !== candidate.name || newCandidate.surname !== candidate.surname || newCandidate.email !== candidate.email || newCandidate.description !== candidate.description) && newCandidate.name.length && newCandidate.surname.length

const SingleCandidate = ({candidates, setCandidates}) => {

    const inputName = useRef(null);
    const inputSurname = useRef(null);
    const inputEmail = useRef(null);
    const inputDescription = useRef(null);
    const navigate = useNavigate();


    const {id} = useParams();
    const candidate = candidates.find(candidate => candidate.id === id);

    const handlerSubmit = (e) => {
        e.preventDefault()
        const newCandidate = {
            name: inputName.current.value,
            surname: inputSurname.current.value,
            email: inputEmail.current.value,
            description: inputDescription.current.value
        }
        if(correctData(candidate,newCandidate)){
            const newCandidates = [...candidates];
            const index = newCandidates.findIndex(current => current.id === id);
            newCandidates[index].name = newCandidate.name;
            newCandidates[index].surname = newCandidate.surname;
            newCandidates[index].email = newCandidate.email;
            newCandidates[index].description = newCandidate.description;
            api.data.update(newCandidates).then(() => {
                setCandidates(newCandidates);
                navigate('/');
            })
        }
    }

    const handlerRemove = (e) => {
        const newCandidates = candidates.filter(candidate => candidate.id !== id);
        api.data.update(newCandidates).then(() => {
            navigate("/");
            setCandidates(newCandidates);
        })
    }

    return (

        <div className="candidateCard">
            <Link to='/'> {'<- Go home'}</Link>
            {candidate ? <form onSubmit={handlerSubmit}>
                <label >Name <input type="text" ref={inputName} placeholder='name' defaultValue={candidate.name} /></label>
                
                <label >Surname <input type="text" ref={inputSurname} placeholder='surname' defaultValue={candidate.surname} /></label>
                
                <label >Email <input type="text" ref={inputEmail} placeholder='Email' defaultValue={candidate.email} /></label>
                
                <label>Description <textarea ref={inputDescription} placeholder='Description' defaultValue={candidate.description} /></label>

                <button className='removeButton' onClick={handlerRemove} type='button'>remove candidate</button>
                <button className='updateButton' type='submit'>update candidate</button>
                
            </form> : <p>No se ha encontrado el candidato que busca</p>   
            }
        </div>
    )
}

export default SingleCandidate;