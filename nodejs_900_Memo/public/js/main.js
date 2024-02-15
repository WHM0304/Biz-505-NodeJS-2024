document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.input_box");

  btn_box?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.value === "새로작성") {
      document.location.href = "insert";
    }
  });
});
const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  const file = event.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = (e) => {
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  fileReader.readAsDataURL(file);
};

document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#m_image");

  img_add?.addEventListener("click", () => {
    input_img.click();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.list");
  table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const m_seq = tr.dataset.m_seq;
      // alert(m_seq);
      // document.location.replace(`/products/${m_seq}/detail`);
      document.location.replace(`/${m_seq}/detail`);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("div.btn_con");
  const m_seq = btn.dataset.m_seq;
  btn?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.value === "수정") {
      return document.location.replace(`/${m_seq}/update`);
    } else if (target.value === "삭제") {
      if (confirm("삭제하시겠습니까?")) {
        document.location.href = `/${m_seq}/delete`;
      } else {
        return false;
      }
    } else if (target.value === "리스트") {
      return document.location.replace("/");
    }
  });
});
