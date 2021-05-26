/* =================================================================
                [ Password Visible ]
==================================================================*/
// Function to Check if element is in the page
function isInPage(node) {
  return node === document.body ? false : document.body.contains(node);
}

// Initialize Password Input
let passwordInput = document.querySelector("input[type='password']");
let passwordInputs = document.querySelectorAll("input[type='password']");

// Checks if the Page has an Input Password Field
if (isInPage(passwordInput)) {
  for (let i = 0; i < passwordInputs.length; i++) {
    let passwordVisibility = document.createElement("span");
    passwordVisibility.classList.add("password-toggle");
    passwordInputs[i].parentNode.insertBefore(
      passwordVisibility,
      passwordInputs[i].nextSibling
    );
    passwordVisibility.addEventListener("click", function () {
      passwordVisibility.classList.toggle("password-show");
      const type =
        passwordInputs[i].getAttribute("type") === "password" ? "text" : "password";
      passwordInputs[i].setAttribute("type", type);
    });
  }
} 


/* =================================================================
                [ Password Visible ]
==================================================================*/
class HTMLUI {
  // print success message
  successLogin(className, message) {
    // creat div for show message
    const div = document.createElement('div');
    div.classList.add(className, 'py-2', 'text-success', 'mb-2', 'text-center');
    div.innerText = message;
    const cardBody = document.querySelector('.card-body');

    if (!cardBody.querySelector(`.${className}`)) {
      cardBody.insertBefore(div, formLogin)
      setTimeout(() => {
        if (className) {
          document.querySelector(`.${className}`).remove()
        }
        formLogin.reset()
        window.location = 'profile.html';
      }, 2000);
    }


  }

  successRecover(className, message) {
    // creat div for show message
    const div = document.createElement('div');
    div.classList.add(className, 'py-2', 'text-success', 'mb-2', 'text-center', 'mx-3', 'p-2');
    div.innerText = message;
    const modalContent = document.querySelector('.modal-content');

    if (!modalContent.querySelector(`.${className}`)) {
      modalContent.insertBefore(div, formRecover)
    }


  }

  successRegister(className, message) {
    // creat div for show message
    const div = document.createElement('div');
    div.classList.add(className, 'py-2', 'text-success', 'mb-2', 'text-center');
    div.innerText = message;
    const cardBody = document.querySelector('.card-body');


    if (!cardBody.querySelector(`.${className}`)) {
      cardBody.insertBefore(div, formRegister)
      setTimeout(() => {
        if (className) {
          document.querySelector(`.${className}`).remove()
        }
        formRegister.reset()
        window.location = 'profile.html';
      }, 2000);

    }
  }

  onError(id, message) {
    let parent = id.parentElement.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.display = "block";
    messageEle.innerText = message;
    messageEle.classList.add("messageText");
    id.classList.add("messageBox");

  }

  onSuccess(id) {
    let parent = id.parentElement.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.display = "none";
    messageEle.classList.remove("messageText");
    id.classList.remove("messageBox");
  }

  loadSpinner() {
    sendBtn.setAttribute('disabled', true);
    spinner.classList.add('spinner-border');
    setTimeout(() => {
      sendBtn.removeAttribute('disabled');
      spinner.classList.remove('spinner-border');
    }, 2000);
  }

}

const html = new HTMLUI(),
  formLogin = document.querySelector('#form-login'),
  formRegister = document.querySelector('#form-register'),
  formRecover = document.querySelector('#form-recover'),
  emailLogin = document.querySelector('#login-email'),
  passwordLogin = document.querySelector('#login-password'),
  emailRecover = document.querySelector('#recover-email'),
  emailRegister = document.querySelector('#register-email'),
  passwordRegister = document.querySelector('#register-password'),
  PasswordConfirm = document.querySelector('#register-password-confirm'),
  sendBtn = document.querySelector('#btn-send'),
  spinner = document.querySelector('.spinner-border-sm');

validateLogin = () => {

  //check emailLogin is empty 
  if (emailLogin.value.trim() === "") {
    html.onError(emailLogin, "ایمیل نمی تواند خالی باشد");
  } else {
    if (!isValidEmail(emailLogin.value.trim())) {
      html.onError(emailLogin, "ایمیل اشتباه است");
    } else {
      html.onSuccess(emailLogin);
    }
  }

  //check password is empty 
  if (passwordLogin.value === "") {
    html.onError(passwordLogin, "رمز عبور نمی تواند خالی باشد");
  } //check password length
  else if (passwordLogin.value.length < 4) {
    html.onError(passwordLogin, "رمز عبور باید حداقل شامل 4 کاراکتر باشد");
  } else {
    html.onSuccess(passwordLogin);
  }

  // check all input
  if (emailLogin.value.trim() !== "" && emailLogin.value.length >= 4 && isValidEmail(emailLogin.value.trim()) && passwordLogin.value !== "" &&
    passwordLogin.value.length >= 4) {
    html.successLogin('success', 'شما با موفقیت وارد شدید')
  }

  // check input if keyup 
  formLogin.onkeyup = () => {
    //check emailLogin is empty 
    if (emailLogin.value.trim() === "") {
      html.onError(emailLogin, "ایمیل نمی تواند خالی باشد");
    } else {
      if (!isValidEmail(emailLogin.value.trim())) {
        html.onError(emailLogin, "ایمیل اشتباه است");
      } else {
        html.onSuccess(emailLogin);
      }
    }

    //check password is empty 
    if (passwordLogin.value === "") {
      html.onError(passwordLogin, "رمز عبور نمی تواند خالی باشد");
    } //check password length
    else if (passwordLogin.value.length < 4) {
      html.onError(passwordLogin, "رمز عبور باید حداقل شامل 4 کاراکتر باشد");
    } else {
      html.onSuccess(passwordLogin);
    }
  }
}

validateRecover = () => {

  //check email Recover is empty 
  if (emailRecover.value.trim() === "") {
    html.onError(emailRecover, "ایمیل نمی تواند خالی باشد");
  } else {
    if (!isValidEmail(emailRecover.value.trim())) {
      html.onError(emailRecover, "ایمیل اشتباه است");
    } else {
      html.onSuccess(emailRecover);
    }
  }

  // check all input
  if (emailRecover.value.trim() !== "" && isValidEmail(emailRecover.value.trim()) && emailRecover.value.length >= 4) {
    html.successRecover('success', 'یک ایمیل حاوی رمز عبور به ایمیل شما ارسال شد')
  }

  // check input if keyup 
  formRecover.onkeyup = () => {
    //check emailRecover is empty 
    if (emailRecover.value.trim() === "") {
      html.onError(emailRecover, "ایمیل نمی تواند خالی باشد");
    } else {
      if (!isValidEmail(emailRecover.value.trim())) {
        html.onError(emailRecover, "ایمیل اشتباه است");
      } else {
        html.onSuccess(emailRecover);
      }
    }

  }
}

validateRegister = () => {

  //check email register is empty 
  if (emailRegister.value.trim() === "") {
    html.onError(emailRegister, "ایمیل نمی تواند خالی باشد");
  } else {
    if (!isValidEmail(emailRegister.value.trim())) {
      html.onError(emailRegister, "ایمیل اشتباه است");
    } else {
      html.onSuccess(emailRegister);
    }
  }

  //check password is empty 
  if (passwordRegister.value === "") {
    html.onError(passwordRegister, "رمز عبور نمی تواند خالی باشد");
  } //check password length
  else if (passwordRegister.value.length < 4) {
    html.onError(passwordRegister, "رمز عبور باید حداقل شامل 4 کاراکتر باشد");
  } else {
    html.onSuccess(passwordRegister);
  }

  //check confirm password is empty 
  if (PasswordConfirm.value === "") {
    html.onError(PasswordConfirm, "تکرار رمز عبور نمی تواند خالی باشد");
  } else {
    if (passwordRegister.value !== PasswordConfirm.value) {
      html.onError(PasswordConfirm, 'رمز عبور با تکرار رمز عبور یکسان نیست');
    } else
      html.onSuccess(PasswordConfirm);
  }
  // check all input
  if (emailRegister.value.trim() !== "" && isValidEmail(emailRegister.value.trim()) && passwordRegister.value !== "" &&
    passwordRegister.value.length >= 4 && PasswordConfirm.value !== "" && PasswordConfirm.value.length >= 4) {
    html.successRegister('success', `ثبت نام شما انجام شد `)
  }

  // check input if keyup 
  formRegister.onkeyup = () => {

    //check emailRegister is empty 
    if (emailRegister.value.trim() === "") {
      html.onError(emailRegister, "ایمیل نمی تواند خالی باشد");
    } else {
      if (!isValidEmail(emailRegister.value.trim())) {
        html.onError(emailRegister, "ایمیل اشتباه است");
      } else {
        html.onSuccess(emailRegister);
      }
    }

    //check password is empty 
    if (passwordRegister.value === "") {
      html.onError(passwordRegister, "رمز عبور نمی تواند خالی باشد");
    } //check password length
    else if (passwordRegister.value.length < 4) {
      html.onError(passwordRegister, "رمز عبور باید حداقل شامل 4 کاراکتر باشد");
    } else {
      html.onSuccess(passwordRegister);
    }

    //check confirm password is empty 
    if (PasswordConfirm.value === "") {
      html.onError(PasswordConfirm, "تکرار رمز عبور نمی تواند خالی باشد");
    } else {
      if (passwordRegister.value !== PasswordConfirm.value) {
        html.onError(PasswordConfirm, 'رمز عبور با تکرار رمز عبور یکسان نیست');
      } else
        html.onSuccess(PasswordConfirm);
    }
  }
}

isValidEmail = (email) => {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
}



if (formLogin !== null || formRecover !== null) {
  // form login submiut
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    html.loadSpinner();
    setTimeout(() => {
      validateLogin()
    }, 2000);
  })

  // form recover submiut
  formRecover.addEventListener('submit', (e) => {
    e.preventDefault();
    validateRecover()
  })

}

if (formRegister !== null) {
  // form register submiut
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    html.loadSpinner();
    setTimeout(() => {
      validateRegister()
    }, 2000);
  })
}