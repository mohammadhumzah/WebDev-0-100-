import { DateTime } from 'https://cdn.skypack.dev/luxon'
const btn = document.getElementById("calculate")
const finalResult = document.getElementById("result")

const picker = datepicker(document.querySelector("#age"), {
  format: "dd-mm-yyyy",
  maxDate: new Date(),
  autohide: true,
  updateOnBlur: true
});


btn.addEventListener("click", (e) => {

     e.preventDefault();      // prevent form refresh and form getting submitted

  
      const selected = document.querySelector('#age').value
        // get date as string by user
      if(!selected){
        finalResult.innerText = "Input can't be empty"
        return
      }
    
      let dt = DateTime.fromJSDate(new Date(selected))
      if(!dt.isValid) {
        finalResult.innerText = "Invalid date"
        return
      }
      let today = DateTime.now()

      const {years, months, days, hours} = today.diff(dt, ["years", "months", "days", "hours"]).toObject()
      
      finalResult.innerText = `Your age is ${Math.floor(years)} Years, ${Math.floor(months)} Months, ${Math.floor(days)} Days, ${Math.floor(hours)} Hours`

});