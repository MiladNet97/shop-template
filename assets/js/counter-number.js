/* =================================================================
                [ Counter on Scroll  ]
==================================================================*/
let zero = 0;
$(window).scroll(function () {

  let oTop = $('.achievements__item--count').offset().top - window.innerHeight;
  if (zero == 0 && $(window).scrollTop() > oTop) {
    $('.achievements__item--count').each(function () {
      let $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {
          duration: 3000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }

        });
    });
    a = 1;
  }
});