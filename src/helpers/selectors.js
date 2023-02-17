function getAppointmentsForDay(state, day) {
  // returns the day object for selected day
   const theDay  = state['days'].find(thisDay => thisDay.name === day);
  
   if(!theDay)return [];
  //gets the appointments based on theDay object
  const theAppointments = theDay['appointments'].map(i => state['appointments'][i]);
  
  return theAppointments;
}
function getInterviewersForDay(state, day) {
  // returns the day object for selected day
   const theDay  = state['days'].find(thisDay => thisDay.name === day);
  
   if(!theDay)return [];
  // gets the interviewers based on theDay object
  const theInterviewers = theDay['interviewers'].map(i => state['interviewers'][i]);
  
  return theInterviewers;
}

function getInterview(state, interview){
  
  if(!interview)return null;
  const returnObject = { interviewer : state.interviewers[interview.interviewer],student : interview.student}
  
  return returnObject;

}

module.exports = {getInterview,getAppointmentsForDay,getInterviewersForDay}