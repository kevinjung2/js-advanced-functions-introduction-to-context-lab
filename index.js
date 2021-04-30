// Your code here
function createEmployeeRecord(array) {
  return {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(array) {
  let records = []
  for (const index in array) {
    records.push(createEmployeeRecord(array[index]))
  }
  return records
}

function createTimeInEvent(record, time) {
  let t = time.split(' ')
  record.timeInEvents.push({type: "TimeIn", date: t[0], hour: parseInt(t[1])})
  return record
}

function createTimeOutEvent(record, time) {
  let t = time.split(' ')
  record.timeOutEvents.push({type: "TimeOut", date: t[0], hour: parseInt(t[1])})
  return record
}

function hoursWorkedOnDate(record, date) {
  let inDate = record.timeInEvents.find(i => i.date === date)
  let outDate = record.timeOutEvents.find(i => i.date === date)
  return (outDate.hour - inDate.hour) / 100
}

function wagesEarnedOnDate(record, date) {
  let hours = hoursWorkedOnDate(record, date)
  return hours * record.payPerHour
}

function allWagesFor(record) {
  const dates = record.timeInEvents.map(function(e) {return e.date})
  const wages = []
  for (const index in dates) {
    wages.push(wagesEarnedOnDate(record, dates[index]))
  }
  return wages.reduce(function(ele, total) {return total + ele})
}

function calculatePayroll(employees) {
  const wages = []
  for (const index in employees) {
    wages.push(allWagesFor(employees[index]))
  }
  return wages.reduce(function(ele, total){return total + ele})
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(e => e.firstName === name)
}
