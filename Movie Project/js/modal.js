const modal = document.querySelector(".modal");
const openModalClick = document.querySelector("#btn-get");
const closeModalClick = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

openModalClick.onclick = openModal;
closeModalClick.onclick = closeModal;

modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

setTimeout(openModal, 10000);

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', document.body.scrollHeight)
  }
});


const resultRegister = document.querySelector("#result_register"); 

const regExpName = /^[a-z0-9_]+$/; 
const regExpEmail = /^[A-Za-z0-9]+@gmail\.com$/; 
const regExpNumber = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/; 
 

const validateName = () => { 
  const nameInput = document.querySelector("#name_input"); 
  const nameResult = document.querySelector("#name_result"); 
 
  if (regExpName.test(nameInput.value.trim())) { 
    nameResult.innerHTML = ""; 
    nameResult.style.color = "green"; 
    nameInput.style.border = "3px solid green"; 
  } else { 
    nameInput.style.border = "3px solid red"; 
  } 
}; 
 

const validatePhoneNumber = () => { 
  const numberInput = document.querySelector("#number_input"); 
  const numberResult = document.querySelector("#number_result"); 
 
  if (regExpNumber.test(numberInput.value)) { 
    numberResult.innerHTML = ""; 
    numberResult.style.color = "green"; 
    numberInput.style.border = "3px solid green"; 
  } else { 
    numberInput.style.border = "3px solid red"; 
  } 
}; 


const validateGmail = () => { 
  const gmailInput = document.querySelector("#gmail_input"); 
  const gmailResult = document.querySelector("#gmail_result"); 
 
  if (regExpEmail.test(gmailInput.value.trim())) { 
    gmailResult.innerHTML = ""; 
    gmailResult.style.color = "green"; 
    gmailInput.style.border = "3px solid green"; 
  } else { 
    gmailInput.style.border = "3px solid red"; 
  } 
}; 
 
resultRegister.onclick = () => { 
  validateName(); 
  validatePhoneNumber(); 
  validateGmail(); 
};