import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job'
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import JobModal from './JobModal'

  


function Jobs({jobs}){

//Paginations    Logic
const numJobs = jobs.length
const numPages = Math.ceil(numJobs / 20);
const [activeStep, setActiveStep] = useState(0)
const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
};
const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
};
const jobsOnPage = jobs.slice(activeStep * 20, (activeStep * 20) + 20)

// Modal Logic
const [open, setOpen] = React.useState(false);
const [selectedJob, selectJob] = React.useState({});
const handleClickOpen = (job) => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};

    return(
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose}/>
            <div >
            <Typography variant="h4" component="h1">
                Entry level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>
            {jobsOnPage.map((job,index)=><Job job={job} key={`${job.id}_${index}`} onClick={() => {
                        console.log('clicked')
                        handleClickOpen();
                        selectJob(job)
                    }}/>)}
            </div>
            <div>Page {activeStep+1} of {numPages}</div>
            <MobileStepper
                    steps={numPages}
                    position="static"
                    variant="progress"
                    activeStep={activeStep}
                    nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                        Next
                        <KeyboardArrowRight /> 
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                    }
                />
        </div>
        
        
    )
}
export default Jobs