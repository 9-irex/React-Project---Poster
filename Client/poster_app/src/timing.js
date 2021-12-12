const getElapsedTime = (lastDateString) => {
  //   debugger;
  const currentDate = new Date();
  const lastDate = new Date(lastDateString);

  // 1 - Get seconds between two dates
  var seconds = Math.abs(lastDate - currentDate) / 1000;

  // 2 - Get Minutes between two dates
  var minutes = Math.floor(seconds / 60) % 60;
  seconds -= minutes * 60;

  // 3 - Get Hours between two dates
  var hours = Math.floor(seconds / 3600) % 24;
  seconds -= hours * 3600;

  // 4 - Get Days between two dates
  var days = Math.floor(seconds / 86400);
  seconds -= days * 86400;

  // 5 - Get Months between two dates
  var months = monthDiff(lastDate, currentDate);

  // 6 - Get Years between two dates
  var years = yearsDiff(lastDate, currentDate);

  var date_string = "";

  if (years !== 0) {
    date_string = years + " years ago";
  } else if (months !== 0) {
    date_string = months + " months ago";
  } else if (days !== 0) {
    date_string = days + " days ago";
  } else if (hours !== 0) {
    date_string = hours + " hours ago";
  } else if (minutes !== 0) {
    date_string = minutes + " minutes ago";
  } else {
    date_string = parseInt(seconds) + " seconds ago";
  }

  return { Date_String: date_string };
};

// External functions
function monthDiff(lastDate, currentDate) {
  return (
    currentDate.getMonth() -
    lastDate.getMonth() +
    12 * (currentDate.getFullYear() - lastDate.getFullYear())
  );
}

function yearsDiff(lastDate, currentDate) {
  let date1 = new Date(lastDate);
  let date2 = new Date(currentDate);
  let yearsDiff = date2.getFullYear() - date1.getFullYear();
  return yearsDiff;
}

export default getElapsedTime;
