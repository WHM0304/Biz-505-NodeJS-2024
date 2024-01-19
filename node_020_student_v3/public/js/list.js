document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table?.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      const paTR = target.closest("TR");
      const tds = paTR.querySelectorAll("TD");
      const st_num = tds[1].innerText;

      document.location.href = `/student/${st_num}/detail`;
    }
  });
});
