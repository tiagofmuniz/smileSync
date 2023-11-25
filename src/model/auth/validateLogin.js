export function validateLogin(email, pass) {
  let adminList = JSON.parse(window.localStorage.getItem("adminList")) || [];

  const userValid = adminList.filter((user) => user.email === email && user.pass === pass);

  if (userValid.length > 0) {
    return true;
  } else {
    return false;
  }
}
