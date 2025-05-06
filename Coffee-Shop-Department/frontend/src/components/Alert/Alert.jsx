import Swal from "sweetalert2";

export function showFail(text) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: text,
  });
}

export function showSucess(text) {
  Swal.fire({
    title: "Sucess!",
    icon: "success",
    text: text,
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
export function showADD_Suc() {
  Swal.fire({
    title: "Product was added Sucessfully!",
    icon: "success",
  });
}
