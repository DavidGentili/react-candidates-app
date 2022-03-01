const stepsOfProcess = ['Entrevista Inicial', 'Entrevista Tecnica', 'Oferta', 'Asignacion', 'Rechazo'];

const getIndex = (step) => {
    return stepsOfProcess.findIndex(stepOfProcess => step.toLowerCase() === stepOfProcess.toLowerCase());
}

const getNextStep = (currentStep) => {
    if(currentStep && typeof currentStep === 'string' && getIndex(currentStep) !== -1){
        const index = getIndex(currentStep);
        return stepsOfProcess[(index < stepsOfProcess.length - 1 ) ? index + 1 : index];
    } else
        return stepsOfProcess[0];
}

const getPrevStep = (currentStep) => {
    if(currentStep && typeof currentStep === 'string' && getIndex(currentStep) !== -1){
        const index = getIndex(currentStep);
        return stepsOfProcess[(index > 0 ) ? index - 1 : index];
    } else
        return stepsOfProcess[0];
}


export default {
    stepsOfProcess,
    getNextStep,
    getPrevStep,
}