document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn_box");

  btn_box.addEventListener("click", (e) => {
    const target = e.target;

    if (target.innerHTML === "수정") {
      const p_code = btn_box.dataset.p_code;

      document.location.replace(`/products/${p_code}/update`);
    } else if (target.innerHTML === "삭제") {
    }
  });
});
