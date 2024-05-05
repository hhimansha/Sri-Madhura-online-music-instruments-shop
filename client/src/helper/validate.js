import toast from "react-hot-toast"

/*validate username on login page*/
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
    return errors;
}

/* validate password*/
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);
    return errors;
}
/*validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match..");
    }
}

/*validate signup form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    emailVerify(errors, values);
    
    return errors;
}





/*validate password*/
function passwordVerify(errors = {}, values){
    //const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?/~`\\|\-=\'\"]/;
    if(!values.password){
        errors.password = toast.error("Enter the Password");
    }else if (values.password.includes ("")){
        errors.password = toast.error("Wrong Password");
    }else if (values.password.length < 5){
        errors.password = toast.error("Password must be more than five characters");
    }//else if(!specialCharacters.test(values.password)){
        //errors.password = toast.error("Password must contain a special character");
    //}
    return errors;
}

/*validate username*/
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username Required..!");

    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid username...!')

    }
    return error;
}
/*validate email*/

function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email Required...");
    }else if(values.email.includes("")){
        error.email = toast.error("Wrong Email");

    }

    return error;
}