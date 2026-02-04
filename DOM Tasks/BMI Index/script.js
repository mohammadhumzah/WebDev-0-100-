const submissionButton = document.getElementById('submission')
const weightSubmit = document.getElementById('weight')
const heightSubmit = document.getElementById('height')
const finalResult = document.getElementById('results')

submissionButton.addEventListener('click', () => {

    const valueWeight = Number(weightSubmit.value)          // Number is used because input field takes numbers as strings to be converted
    const valueHeight = Number(heightSubmit.value) / 100  // Convert cm to meters
    const bmi = (valueWeight / valueHeight ** 2) 

    if( bmi >= 0 && bmi < 16){
        finalResult.innerText = 'Underweight'
    }
    else if(bmi >= 16 && bmi < 18.5){
        finalResult.innerText = 'Mild Thinness'
    }
    else if(bmi >= 18.5 && bmi < 25 ){
        finalResult.innerText = 'Normal'
    }
    else if(bmi >= 25 && bmi < 30){
        finalResult.innerText = 'Overweight'
    }
    else{
        finalResult.innerText = 'Obese'
    }


})