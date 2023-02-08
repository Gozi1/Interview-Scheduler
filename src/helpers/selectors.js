function getAppointmentsForDay(state, day) {
  // finds theDay object of the day in days State
   const theDay  = state['days'].find(thisDay => thisDay.name === day);

   if(!theDay)return [];

  const theAppointments = theDay['appointments'].map(i => state['appointments'][i]);

  return theAppointments;
}


function getInterview(state, interview){
  if(!interview)return null;
  const returnObject = { interviewer : state.interviewers[interview.interviewer],student : interview.student}
  return returnObject;

}

module.exports = {getInterview,getAppointmentsForDay}