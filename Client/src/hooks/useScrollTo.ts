const scrollToElement = (id) => {
  const targetId = id.replace(/^#/, ""); // Remove leading '#'
  const targetElement = document.getElementById(targetId);
  console.log(targetElement, "mm");
  if (targetElement) {
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  }
};

export default scrollToElement;
