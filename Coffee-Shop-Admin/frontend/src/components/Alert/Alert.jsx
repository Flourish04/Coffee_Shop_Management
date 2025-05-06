import Swal from "sweetalert2";

export function showFail() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong! Try again!!!",
  });
}

export function showSucess(text) {
  Swal.fire({
    title: "Logging Sucess!",
    icon: "success",
  });
}

export function showLogOutSucess() {
  Swal.fire({
    title: "Log Out Sucess!",
    icon: "success",
  });
}

export function showRegister_Suc() {
  Swal.fire({
    title: "Register Sucess!",
    icon: "success",
  });
}
