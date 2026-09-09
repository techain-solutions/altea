(function () {
  function initFaq(root) {
    var search = root.querySelector('[data-altea-faq-search]');
    var filters = root.querySelectorAll('[data-altea-faq-filter]');
    var items = root.querySelectorAll('[data-altea-faq-item]');
    var empty = root.querySelector('[data-altea-faq-empty]');
    var activeCategory = 'all';

    function update() {
      var query = search ? search.value.trim().toLowerCase() : '';
      var visibleCount = 0;
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var category = item.getAttribute('data-category') || 'all';
        var visible = (!query || text.indexOf(query) !== -1) && (activeCategory === 'all' || category === activeCategory);
        item.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (empty) empty.classList.toggle('is-visible', visibleCount === 0);
    }

    if (search) search.addEventListener('input', update);
    filters.forEach(function (filter) {
      filter.addEventListener('click', function () {
        activeCategory = filter.getAttribute('data-category') || 'all';
        filters.forEach(function (button) {
          button.classList.toggle('is-active', button === filter);
          button.setAttribute('aria-pressed', button === filter ? 'true' : 'false');
        });
        update();
      });
    });
    update();
  }

  function init() { document.querySelectorAll('[data-altea-faq]').forEach(initFaq); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
