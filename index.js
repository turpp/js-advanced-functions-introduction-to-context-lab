// Your code here
function createEmployeeRecord(array){
    let obj = {firstName: array[0], familyName: array[1], title:array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
    return obj
}

function createEmployeeRecords(array){
   let arrOfObj = array.map(createEmployeeRecord)
   return arrOfObj
}

function createTimeInEvent(object, timeStamp){
    let obj = {}
    obj.type = "TimeIn"
    obj.hour = parseInt(timeStamp.split(' ')[1])
    obj.date = timeStamp.split(' ')[0]
    object.timeInEvents.push(obj)
    return object
}

function createTimeOutEvent(object, timeStamp){
    let obj = {}
    obj.type = "TimeOut"
    obj.hour = parseInt(timeStamp.split(' ')[1])
    obj.date = timeStamp.split(' ')[0]
    object.timeOutEvents.push(obj)
    return object
}

function hoursWorkedOnDate(object, date){
   let timeIn = object.timeInEvents.find(timestamps => timestamps.date == date)
    let timeOut = object.timeOutEvents.find(timestamps => timestamps.date == date)
let hours = parseInt(timeOut.hour.toString().split('00')) - parseInt(timeIn.hour.toString().split('00'))
return hours
}

function wagesEarnedOnDate(object, date){
    let hours = hoursWorkedOnDate(object, date)
    let wage = hours * object.payPerHour
    return wage
}

function allWagesFor(object){
    let dates = object.timeInEvents.map(time => time.date)
    let wages = []
    dates.forEach(function(date){
       wages.push( wagesEarnedOnDate(object, date))
    })
   let owed = wages.reduce(function(dollar, cv){
        return dollar + cv
    })
    return owed
}

function calculatePayroll(array){
    let wages = []
    array.forEach(function(obj){
        wages.push(allWagesFor(obj))
    })
    let total = wages.reduce(function(wage, cv){
        return wage + cv
    })
    return total
}

function findEmployeeByFirstName(array, firstName){
    // let person = array.find(function(obj){
    //     obj.firstName == firstName
    // })

    let person = array.find(obj => obj.firstName == firstName)
    return person
}