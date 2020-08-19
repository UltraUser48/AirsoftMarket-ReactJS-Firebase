export default function validateLogin(values) {

    let errors = {}

    //Email Error Handling
    if (!values.email) {
        errors.email = "Email required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }

    //Password Error Handling
    if (!values.password) {
        errors.password = "Password Required"
    } else if (values.password.length < 5) {
        errors.password = "Password must be at least 5 characters"
    }

    return errors
}
