import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    app_name: "Aeroboard",
    auth: {
      login: "Login",
      enter_account: "Enter Account",
      created_new_account: "created new account",
      login_with_password: "login with password",
    },
    inputs_form: {
      phone_number: "please enter your phone number",
      enter_otp: "please enter code number",
    },
    error: {
      try_again: "Please try again",
      problem: "Retry",
      login: "Please login then continue",
      unknown_problem_occured: "Unknown problem occured",
    },
    toast: {
      success: {
        login: "You logged-in successfully",
      },
      maximum_files_selected: "You cannot select more than 3 files",
    },
    brief: {
      no_brief: "No brief is available",
      no_brief_info:
        "You are all set! We will notify you once your images are ready for review.",
      create_new: "Create New Brief",
    },
    brief_create_form: {
      submit_action: "Create",
      add_scenario_action: "Add scenario",
      remove_scenario_action: "Remove",
      cancel_action: "Cancel",
      upload_image_action: "Upload image",
      brief_create_success: "Brief created successfully",
    },
    guideline: {
      no_guideline: "No guideline is available",
    },
    download: "Download",
    menu: {
      guidelines: "Guidelines",
      aeroBoard: "AeroBoard",
      title: "Menu",
    },
  },
});

export default strings;
