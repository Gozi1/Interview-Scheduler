function getAppointmentsForDay(state, day) {
  // finds theDay object of the day in days State
   const theDay  = state['days'].find(thisDay => thisDay.name === day);

   if(!theDay)return [];

  const theAppointments = theDay['appointments'].map(i => state['appointments'][i]);

  return theAppointments;
}
function getInterviewersForDay(state, day) {
  // finds theDay object of the day in days State
   const theDay  = state['days'].find(thisDay => thisDay.name === day);
  
   if(!theDay)return [];

  const theInterviewers = theDay['interviewers'].map(i => state['interviewers'][i]);
  
  return theInterviewers;
}

function getInterview(state, interview){
  if(!interview)return null;
  const returnObject = { interviewer : state.interviewers[interview.interviewer],student : interview.student}
  return returnObject;

}

module.exports = {getInterview,getAppointmentsForDay,getInterviewersForDay}