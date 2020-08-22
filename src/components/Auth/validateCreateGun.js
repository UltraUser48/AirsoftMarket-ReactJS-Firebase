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

    //URL Image handling
    if (!values.image) {
        errors.image = "Please enter Url"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.image)) {
        errors.image = "Invalid Url Entered"
    }

    // Price Validation
    if (!values.price) {
        errors.price = "Price Required"
    } else if (values.price.length < 2) {
        errors.price = "Incorrect Price entered!"
    }


    // Contact Phone Validation
    if (!values.phone) {
        errors.phone = "Contact Information Required"
    } else if (values.phone.length < 8) {
        errors.phone = "Phone number needs to be atleast 8 digits"
    }


    return errors

}
