export function initSidebarBehavior() {
  const hideSidebarBtn = document.querySelector(".hide-sidebar-btn");
  const showSidebarBtn = document.querySelector(".show-sidebar-btn");
  const sidebar = document.querySelector(".sidebar");
  const mainContainer = document.querySelector("main");

  hideSidebarBtn.addEventListener("click", hideSidebar);
  showSidebarBtn.addEventListener("click", showSidebar);

  function hideSidebar() {
    sidebar.classList.add("hide-sidebar");
    mainContainer.classList.add("main-no-sidebar");
    showSidebarBtn.classList.remove("hide");
  }

  function showSidebar() {
    sidebar.classList.remove("hide-sidebar");
    mainContainer.classList.remove("main-no-sidebar");
    showSidebarBtn.classList.add("hide");
  }

  function checkMediaQuery() {
    const mediaQuery = window.matchMedia("(max-width: 1112px)");
    if (mediaQuery.matches) {
      hideSidebar();
    }
  }

  // Call the function initially to check the media query on page load
  checkMediaQuery();

  window.addEventListener("resize", checkMediaQuery);
}
