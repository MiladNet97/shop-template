/* =================================================================
                [ Mobile Menu ]
==================================================================*/
$('.navbar-toggler').click(function () {
  $(this).toggleClass('navbar-toggler__icon-is-active');
  $(this).toggleClass('change');
  $('.navbar__items').toggleClass('navbar__items-is-active');
});

/* =================================================================
                [ Scroll To Top ]
==================================================================*/
let offset = 150;
$(window).scroll(() => {
  let y = $(this).scrollTop();
  if (y >= offset) {
    // $('.back-to-top').fadeIn();
    $('.back-to-top').addClass('back-to-top-active');
  } else {
    // $('.back-to-top').fadeOut();
    $('.back-to-top').removeClass('back-to-top-active');
  }

})

$('.back-to-top').on('click', () => {
  $('html,body').animate({
    scrollTop: 0
  }, 800);
  return false
})

/* =================================================================
                [ Progress Bar ]
==================================================================*/
$(window).on('scroll', () => {
  $(".about-us__skills--item-progress-bar").each(function () {
    var bottom_of_object =
      $(this).offset().top + $(this).outerHeight();
    var bottom_of_window =
      $(window).scrollTop() + $(window).height();
    var myVal = $(this).attr('aria-valuenow');
    if (bottom_of_window > bottom_of_object) {
      $(this).css({
        width: myVal
      });
    }
  });
});



/* =================================================================
                [ Profile Img Change ]
==================================================================*/
$('.avatar-img__input').on('change', function () {
  var input = $(this);
  if (input[0] && input[0].files && input[0].files[0]) {
    if (!input[0].files[0].type.includes("image")) {
      // $('.avatar--img').attr('src', '../img/pr3o.png');
      return false;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.avatar___img')
        .attr('src', e.target.result);
    };

    reader.readAsDataURL(input[0].files[0]);
  }
});
$('input:file').change(
  function (e) {
    // console.log(e.currentTarget.files);
    // var numFiles = e.currentTarget.files.length;
    var fileSize = parseInt(e.currentTarget.files[0].size, 10) / 1024;
    filesize = Math.round(fileSize);
    $('.filesize').addClass('filesize').text('(' + filesize + 'kb)');
    $('.selectedFiles').text(e.currentTarget.files[0].name).appendTo($('.selectedFiles'));

  });


/* =================================================================
                [ ion Range Slider ]
==================================================================*/
try {
  let $range = $(".js-range-slider"),
    $inputFrom = $(".range-input-from"),
    $inputTo = $(".range-input-to"),
    instance,
    min = 0,
    max = 1000000,
    from = 0,
    to = 0;

  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    hide_min_max: true,
    hide_from_to: true,
    min: min,
    max: max,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs,

  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from + ' تومان');
    $inputTo.prop("value", to + ' تومان');
  }

  $inputFrom.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });

    $(this).prop("value", val);

  });

  $inputTo.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });

    $(this).prop("value", val);
  });
} catch (error) {}


/* =================================================================
                [ Filter Card Slide ]
==================================================================*/
$('.card-filter__header').on('click', function () {
  let card_filter = $(this).parent().find('.card-filter__body');
  if ($(this).hasClass('card--togglable')) {
    $(this).removeClass('card--togglable');
    card_filter.slideDown();
  } else {
    $(this).addClass('card--togglable');
    card_filter.slideUp();
  }
});

$('.card-accordion__button').on('click', function () {
  if ($(this).hasClass('card--togglable')) {
    $(this).removeClass('card--togglable');
  } else {
    $(this).addClass('card--togglable');
  }
});
/* =================================================================
                [ Video Play Button ]
==================================================================*/
try {
  var videoPlayButton,
    videoWrapper = document.getElementsByClassName('course__demo')[0],
    video = document.getElementsByTagName('video')[0],
    videoMethods = {
      renderVideoPlayButton: function () {
        if (videoWrapper.contains(video)) {
          this.formatVideoPlayButton()
          video.classList.add('has-media-controls-hidden')
          videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[0]
          videoPlayButton.addEventListener('click', this.hideVideoPlayButton)
        }
      },

      formatVideoPlayButton: function () {
        videoWrapper.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ')
      },

      hideVideoPlayButton: function () {
        video.play()
        videoPlayButton.classList.add('is-hidden')
        video.classList.remove('has-media-controls-hidden')
        video.setAttribute('controls', 'controls')
      }
    }
  videoMethods.renderVideoPlayButton()
} catch (error) {}


/* =================================================================
                [ Add Course To Shopping Cart]
==================================================================*/

class Message {
  showAlert(className, message) {
    const div = document.createElement('div');
    div.classList.add('alert', `${className}`, 'text-center', 'alert-dismissible', 'fade', 'show');
    div.innerHTML = `
      ${message}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="text-white">&times;</span>
        </button>
        
        `
    const cartMessage = document.querySelector('.cart-message');
    // const cartMessage = document.createElement('div');
    // cartMessage.classList.add('cart-message');
    // const header = document.querySelector('header');
    // document.querySelector('body').insertBefore(cartMessage, header)

    if (!document.querySelector(`.${className}`)) {
      cartMessage.appendChild(div)

      setTimeout(() => {
        if (document.querySelector(`.${className}`)) {
          document.querySelector(`.${className}`).remove()
        }
      }, 3500);
    }
  }
}

const courseBtn = document.querySelector('.course-info__sell--button'),
  shoppingCartBody = document.querySelector('.navbar__basket--content-body'),
  shoppingCartCount = document.querySelector('.navbar__basket--content-count'),
  shoppingCartContent = document.querySelector('.navbar__basket--content'),
  navbarBasket = document.querySelector('.navbar__basket'),
  message = new Message();

navbarBasket.addEventListener('mouseover', () => {
  if (shoppingCartBody.innerHTML.length === 0) {
    shoppingCartContent.style.visibility = 'hidden'
  } else {
    shoppingCartContent.style.visibility = 'visible'
  }
})
navbarBasket.addEventListener('mouseout', () => {
  shoppingCartContent.style.visibility = 'hidden'
})

try {
  // adding the course to the shopping cart 
  courseBtn.addEventListener('click', (e) => {
    e.preventDefault()

    // receiving course info
    const courseInfo = {
      image: document.querySelector('.course-info__img img').src,
      title: document.querySelector('.page__title').textContent,
      price: document.querySelector('.course-info__sell--price-amount').textContent,
      id: document.querySelector('.course-info__sell--button').getAttribute('data-id'),
    }

    if (shoppingCartBody.querySelector('.navbar__basket--content-remove')) {
      if (shoppingCartBody.querySelector('.navbar__basket--content-remove').getAttribute('data-id') === `${courseInfo.id}`) {
        message.showAlert('danger', `دوره در سبد خرید وجود دارد!`)
      }
    } else {
      // create li tag for add course to shopping cart
      const li = document.createElement('li');
      li.classList.add('navbar__basket--content-item', 'text-right', 'mb-2');
      li.innerHTML = `
      <a href="cart.html" class="d-flex align-items-center flex-column">
        <div class="d-flex">
          <div class="navbar__basket--content-img">
            <img src="${courseInfo.image}" class="img-thumbnail" alt="">
          </div>
  
          <div class="d-flex flex-column mr-2">
              <div class="navbar__basket--content-title">
                <p>${courseInfo.title}</p>
              </div>
              <div class="d-flex justify-content-between mt-1">
                <p class="navbar__basket--content-price">${courseInfo.price} تومان</p>
                <a href="#" data-id ="${courseInfo.id}" class="navbar__basket--content-remove position-relative"></a>
              </div>
          </div>
        </div>
      </a>
  `

      // append li tag to shopping cart
      shoppingCartBody.appendChild(li)

      const shoppingCartItem = document.querySelectorAll(".navbar__basket--content-item").length;
      shoppingCartCount.innerHTML = shoppingCartItem + ' محصول';
      document.querySelector('.navbar__basket--count').innerHTML = shoppingCartItem;

      saveToStorage(courseInfo)

      message.showAlert('success', `دوره ${courseInfo.title} به سبد خرید اضافه شد`)
    }


  })
} catch (error) {}

// add to localstorage
const saveToStorage = (course) => {
  // get array of courses from storage
  let courses = getFromStorage()

  // add the new course to the array of courses
  courses.push(course)

  localStorage.setItem('courses', JSON.stringify(courses))
}

// get content from storage
function getFromStorage() {
  let courses;

  // if courses exist before
  if (localStorage.getItem('courses')) {
    courses = JSON.parse(localStorage.getItem('courses'))
  } else {
    courses = []
  }

  return courses
}

// remove course from the shopping cart
shoppingCartBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('navbar__basket--content-remove')) {

    e.target.closest(".navbar__basket--content-item").remove();
    const shoppingCartItem = document.querySelectorAll(".navbar__basket--content-item").length;
    shoppingCartCount.innerHTML = shoppingCartItem + ' محصول';
    document.querySelector('.navbar__basket--count').innerHTML = shoppingCartItem

    if (shoppingCartItem === 0) {
      shoppingCartCount.innerHTML = ''
      document.querySelector('.navbar__basket--count').innerHTML = '';
      shoppingCartContent.style.visibility = 'hidden'
    }

    course = e.target.closest(".navbar__basket--content-item");
    courseId = course.querySelector('.navbar__basket--content-remove').getAttribute('data-id');
  }

  // remove course from LS
  removeCourseLS(courseId)

  courseTitle = course.querySelector('.navbar__basket--content-title p').textContent;
  message.showAlert('danger', `دوره ${courseTitle} از سبد خرید حذف شد`)

})

// remove course from local storage
const removeCourseLS = (id) => {
  let coursesLS = getFromStorage()

  coursesLS.forEach(function (course, index) {
    if (course.id === id) {
      coursesLS.splice(index, 1)
    }
  });

  localStorage.setItem('courses', JSON.stringify(coursesLS))
}


// show courses when document loaded and add courses into the cart
document.addEventListener('DOMContentLoaded', (e) => {
  let coursesLS = getFromStorage();

  // add courses into the cart
  coursesLS.forEach(function (courseInfo) {
    // create li tag for add course to shopping cart
    const li = document.createElement('li');
    li.classList.add('navbar__basket--content-item', 'text-right', 'mb-2');
    li.innerHTML = `
      <a href="cart.html" class="d-flex align-items-center flex-column">
        <div class="d-flex">
          <div class="navbar__basket--content-img">
            <img src="${courseInfo.image}" class="img-thumbnail" alt="">
          </div>
  
          <div class="d-flex flex-column mr-2">
              <div class="navbar__basket--content-title">
                <p>${courseInfo.title}</p>
              </div>
              <div class="d-flex justify-content-between mt-1">
                <p class="navbar__basket--content-price">${courseInfo.price} تومان</p>
                <a href="#" data-id ="${courseInfo.id}" class="navbar__basket--content-remove position-relative"></a>
              </div>
          </div>
        </div>
      </a>
  `
    // append li tag to shopping cart
    shoppingCartBody.appendChild(li)


    const shoppingCartItem = document.querySelectorAll(".navbar__basket--content-item").length;
    shoppingCartCount.innerHTML = shoppingCartItem + ' محصول';
    document.querySelector('.navbar__basket--count').innerHTML = shoppingCartItem;
  });
})