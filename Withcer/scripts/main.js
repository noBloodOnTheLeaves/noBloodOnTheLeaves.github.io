let mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    speed: 400,
    spaceBetween: 20,
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.arrow',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {

      540: {
        slidesPerView: 2,
      }
    },
  });

  const menuButton = document.querySelector('.menu-button'),
  header = document.querySelector('.header');

  menuButton.addEventListener('click',()=>{
    menuButton.classList.toggle('menu-button-active');
    header.classList.toggle('header-active');
    console.log('click');
    
  });
  