document.addEventListener("DOMContentLoaded", () => {
  const login_from = document.querySelector("form.login");
  const input_username = login_from.querySelector("input.userid");
  const input_password = login_from.querySelector("input.password");
  const btn_login = login_from.querySelector("input.btn_login");

  btn_login.addEventListener("click", () => {
    if (!input_username.value) {
      alert("사용자 ID는 반드시 입력해야 합니다");
      input_username.select();
      return false;
    }
    if (!input_password.value) {
      alert("비밀번호는 반드시 입력해야 합니다");
      input_password.select();
      return false;
    }
    login_from.submit();
  });
});
