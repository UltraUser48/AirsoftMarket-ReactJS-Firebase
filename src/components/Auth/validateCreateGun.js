export default function validateCreateGun(values) {


    let errors = {}

    //Description Error Handling
    if (!values.description) {
        errors.description = "Description required"
    } else if (values.description.length < 10) {
        errors.description = "Gun Description must be at least 10 characters"
    }

    //Gun Title Error Handling
    if (!values.title) {
        errors.title = "Title Required"
    } else if (values.title.length < 5) {
        errors.title = "Title must be at least 5 characters"
    }

    return errors

}
