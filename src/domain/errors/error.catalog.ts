
export const REGISTERED_USER   = ({ errorCode: '-1', errorMessage: 'REGISTERED USER IN DB' });
export const USER_NOT_EXIST    = ({ errorCode: '-2', errorMessage: 'THE USER DOES NOT EXIST IN DB' })
export const USER_CREDENTIALS  = ({ errorCode: '-3', errorMessage: 'INCORRECT USER CREDENTIALS' });
export const EVENTID_NOT_EXIST = ({ errorCode: '-4', errorMessage: 'THERE IS NO EVENT WITH THAT ID' });
export const NOT_PRIVILEGE     = ({ errorCode: '-5', errorMessage: 'YOU DO NOT HAVE THE PRIVILEGE TO EDIT THIS EVENT' });

export const NOT_TOKEN         = ({ errorCode: '-27', errorMessage: 'ENTER THE TOKEN IN THE REQUEST' });
export const INVALID_TOKEN     = ({ errorCode: '-28', errorMessage: 'INVALID TOKEN' });
export const UNEXPECTED_ERROR  = ({ errorCode: '-50', errorMessage: 'AN UNEXPECTED ERROR HAS OCCURRED, PLEASE TRY LATER OR CONTACT THE ADMINISTRATOR' });
export const INVALID_REQUEST  = ({ errorCode: '-51', errorMessage: 'AN UNEXPECTED ERROR HAS OCCURRED, PLEASE TRY LATER OR CONTACT THE ADMINISTRATOR' });
