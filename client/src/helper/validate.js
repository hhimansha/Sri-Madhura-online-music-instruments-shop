import toast from "react-hot-toast"


export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
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
