// src/counter.js
export function RASimpleCounter(options = {}) {
  this.options = {
    selector: ".counter-section",
    counterSelector: ".counter-count .count",
    duration: 4000,
    ...options,
  };
  this.hasEntered = false;
  this.init();
}

RASimpleCounter.prototype.init = function () {
  this.section = document.querySelector(this.options.selector);
  if (!this.section) return;

  this.checkScroll = this.checkScroll.bind(this);
  window.addEventListener("scroll", this.checkScroll);
  this.checkScroll(); // Check initial state
};

RASimpleCounter.prototype.checkScroll = function () {
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;
  const sectionTop = this.section.offsetTop;
  const sectionBottom = sectionTop + this.section.offsetHeight;

  // Check if section is in view
  const isInView = sectionTop <= viewportBottom && sectionBottom >= viewportTop;

  if (isInView && !this.hasEntered) {
    this.hasEntered = true;
    this.counterActivate();
    window.removeEventListener("scroll", this.checkScroll);
  }
};

RASimpleCounter.prototype.counterActivate = function () {
  const counters = document.querySelectorAll(this.options.counterSelector);
  counters.forEach((counter) => {
    const target = parseInt(
      counter.getAttribute("data-target") || counter.textContent,
      10
    );
    let current = 0;
    const step = target / (this.options.duration / 16); // 16ms is approx. one frame at 60fps

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  });
};
