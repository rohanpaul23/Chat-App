export const shouldDisableSubmit = (errors, touched) => {
    if (Object.keys(touched).length === 0 && Object.keys(errors).length !== 0) {
      return true;
    }
    else if(Object.keys(errors).length !== 0){
      return true
    }
    return false;
  };
  export const formatTime = (dateString) =>{
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }
  // Helper function to pad single-digit numbers with a leading zero
  const padZero= (number) => {
    return number.toString().padStart(2, "0");
  }