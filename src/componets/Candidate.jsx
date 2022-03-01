import {React} from 'react'
import { Link } from 'react-router-dom';

import deafultImport from '../stepHandler';

const Candidate = ({id, name, surname, nextStep, prevStep}) => {
    return (
        <div className='candidate'>
            <Link to={'/candidate/' + id}>{`${name} ${surname}`}</Link>
            <div className="panelActions">
                {prevStep && <button onClick={prevStep(id)}>{'<'}</button>}
                {nextStep && <button onClick={nextStep(id)}>{'>'}</button>}
            </div>
        </div>
    )
}

export default Candidate;