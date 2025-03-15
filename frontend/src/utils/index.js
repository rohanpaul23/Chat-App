export const shouldDisableSubmit = (errors, touched) => {
    if (Object.keys(touched).length === 0 && Object.keys(errors).length !== 0) {
      return true;
    }
    else if(Object.keys(errors).length !== 0){
      return true
    }
    return false;
  };