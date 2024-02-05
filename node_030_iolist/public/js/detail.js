document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn_box");
  const p_code = btn_box.dataset.p_code;
  btn_box.addEventListener("click", (e) => {
    const target = e.target;

    if (target.innerHTML === "수정") {
      if (confirm("수정하시겠습니까?")) {
        document.location.replace(`/products/${p_code}/update`);
      }
    } else if (target.innerHTML === "삭제") {
      if (confirm("삭제하시겠습니까?")) {
        document.location.replace(`/products/${p_code}/delete`);
      }
    }
  });
});
