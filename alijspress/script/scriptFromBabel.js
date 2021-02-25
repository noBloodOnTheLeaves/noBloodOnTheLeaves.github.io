"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var search = document.querySelector('.search'),
      cartBtn = document.querySelector('#cart'),
      wishlistBtn = document.getElementById('wishlist'),
      goodsWrapper = document.querySelector('.goods-wrapper'),
      cart = document.querySelector('.cart'),
      cross = document.querySelector('.cart-close'),
      category = document.querySelector('.category'),
      cardCounter = cartBtn.querySelector('.counter'),
      wishlistCounter = wishlistBtn.querySelector('.counter'),
      cartWrapper = document.querySelector('.cart-wrapper');
  var wishlist = [];
  var goodsBascket = {}; //АНИМАЦИЯ ЗАГРУЗКИ

  var spinner = function spinner(nameFunction) {
    var loading = "<div class=\"loadingio-spinner-spin-taee92xm39n\"><div class=\"ldio-qt4m74a5gy8\">\n        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>\n        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>\n        <div><div></div></div><div><div></div></div></div></div>";

    if (nameFunction === 'renderCard') {
      goodsWrapper.innerHTML = loading;
    }

    if (nameFunction === 'renderBascket') {
      cartWrapper.innerHTML = loading;
    }
  }; //ЗАПРОС НА СЕРВЕР


  var getGoods = function getGoods(handler, filter) {
    spinner(handler.name);
    fetch('./db/db.json').then(function (response) {
      return response.json();
    }).then(filter).then(handler);
  }; //ГЕНЕРАЦИЯ КАРТОЧЕК, т.е. создаем их


  var createCardGoods = function createCardGoods(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = "<div class=\"card\">\n        <div class=\"card-img-wrapper\">\n            <img class=\"card-img-top\" src=\"".concat(img, "\" alt=\"\">\n            <button class=\"card-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\" \n                data-goods-id=\"").concat(id, "\"></button>\n        </div>\n        <div class=\"card-body justify-content-between\">\n            <a href=\"#\" class=\"card-title\">").concat(title, "</a>\n            <div class=\"card-price\">").concat(price, " \u20BD</div>\n            <div>\n                <button class=\"card-add-cart\" data-goods-id=\"").concat(id, "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n            </div>\n        </div>\n    </div>");
    return card;
    /*${wishlist.has(id) ? 'active' : '' } - можно вставить в верстку, но работает с коллекцией*/
  };

  var createCardGoodsBascket = function createCardGoodsBascket(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'goods';
    card.innerHTML = "\n        \t\t<div class=\"goods-img-wrapper\">\n\t\t\t\t\t\t<img class=\"goods-img\" src=\"".concat(img, "\" alt=\"\">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"goods-description\">\n\t\t\t\t\t\t<h2 class=\"goods-title\">").concat(title, "</h2>\n\t\t\t\t\t\t<p class=\"goods-price\">").concat(price, " \u20BD</p>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"goods-price-count\">\n\t\t\t\t\t\t<div class=\"goods-trigger\">\n                            <button class=\"goods-add-wishlist ").concat(wishlist.includes(id) ? 'active' : '', "\"\n                             data-goods-id=\"").concat(id, "\"></button>\n\t\t\t\t\t\t\t<button class=\"goods-delete\" data-goods-id=\"").concat(id, "\"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"goods-count\">").concat(goodsBascket[id], "</div>\n\t\t\t\t</div>");
    return card;
    /*${wishlist.has(id) ? 'active' : '' } - можно вставить в верстку, но работает с коллекцией*/
  }; //ПРОРИСОВКА(РЕНДЕР) КАРТОЧЕК, КОТОРЫЕ МЫ РИСОВАЛИ ВЫШЕ


  var renderCard = function renderCard(goods) {
    goodsWrapper.textContent = '';

    if (goods.length) {
      goods.forEach(function (_ref) {
        var id = _ref.id,
            title = _ref.title,
            price = _ref.price,
            imgMin = _ref.imgMin;
        //items.forEach( (item)=>{
        //const { id, title, price, imgMin} = item;
        goodsWrapper.append(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.innerHTML = "<img class=\"center-block col-12 col-md-12 col-lg-4 col-xl-3 pb-3\"  src=\"img/nothing.svg\" alt=\"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E\">";
    }
  };

  var renderBascket = function renderBascket(goods) {
    cartWrapper.textContent = '';

    if (goods.length) {
      goods.forEach(function (_ref2) {
        var id = _ref2.id,
            title = _ref2.title,
            price = _ref2.price,
            imgMin = _ref2.imgMin;
        //items.forEach( (item)=>{
        //const { id, title, price, imgMin} = item;
        cartWrapper.append(createCardGoodsBascket(id, title, price, imgMin));
      });
    } else {
      cartWrapper.innerHTML = "<div id=\"cart-empty\">\u0412\u0430\u0448\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u0430</div>";
    }
  }; //КАЛЬКУЛЯЦИЯ


  var checkCount = function checkCount() {
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBascket).length;
  };

  var calcTotalPrice = function calcTotalPrice(goods) {
    var sum = goods.reduce(function (accum, item) {
      return accum + item.price * goodsBascket[item.id];
    }, 0);
    cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
  }; //ФИЛЬТРЫ


  var showCardBascket = function showCardBascket(goods) {
    var BascketGoods = goods.filter(function (item) {
      return goodsBascket.hasOwnProperty(item.id);
    });
    calcTotalPrice(BascketGoods);
    return BascketGoods;
  };

  var randomSort = function randomSort(item) {
    return item.sort(function () {
      return Math.random() - 0.5;
    });
  };

  var showWishList = function showWishList() {
    getGoods(renderCard, function (goods) {
      return goods.filter(function (item) {
        return wishlist.includes(item.id);
      });
    });
  }; //РАБОТА С ХРАНИЛИЩАМИ
  // возвращает куки с указанным name,
  // или undefined, если ничего не найдено


  var getCookie = function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  var cookieQuery = function cookieQuery(get) {
    if (get) {
      if (getCookie('goodsBascket')) {
        /*goodsBascket =  JSON.parse(getCookie('goodsBascket'));*/
        Object.assign(goodsBascket, JSON.parse(getCookie('goodsBascket')));
      }

      checkCount();
    } else {
      document.cookie = "goodsBascket=".concat(JSON.stringify(goodsBascket), "; max-age=86400e3");
    }
  };

  var storageQuery = function storageQuery(get) {
    if (get) {
      if (localStorage.getItem('wishlist')) {
        // (JSON.parse(localStorage.getItem('wishlist'))).forEach(id => wishlist.push(id));
        // ИЛИ wishlist.splice(0,0,...JSON.parse(localStorage.getItem('wishlist')));
        wishlist.push.apply(wishlist, _toConsumableArray(JSON.parse(localStorage.getItem('wishlist'))));
      }

      checkCount();
    } else {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }; //СОБЫТИЯ


  var closeCart = function closeCart(event) {
    var target = event.target;

    if (target === cart || target.classList.contains('cart-close') || event.keyCode === 27) {
      cart.style.display = '';
      document.removeEventListener('keydup', closeCart);
    }
  };

  var openCart = function openCart(event) {
    event.preventDefault();
    cart.style.display = 'flex';
    document.addEventListener('keydown', closeCart);
    getGoods(renderBascket, showCardBascket);
  };

  var choiceCategory = function choiceCategory(event) {
    event.preventDefault();
    var target = event.target;

    if (target.classList.contains('category-item')) {
      var _category = target.dataset.category;
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return item.category.includes(_category);
        });
      });
    }
  };

  var searchGoods = function searchGoods(event) {
    event.preventDefault();
    var input = event.target.elements.searchGoods;
    var inputValue = input.value.trim();

    if (input.value.trim() !== '') {
      var searchString = new RegExp(inputValue, 'i');
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return searchString.test(item.title);
        });
      });
    } else {
      search.classList.add('error');
      setTimeout(function () {
        search.classList.remove('error');
      }, 2000);
    }

    input.value = '';
  };

  var toggleWishlist = function toggleWishlist(id, elem) {
    if (wishlist.includes(id)) {
      wishlist.splice(wishlist.indexOf(id), 1);
      /*document.querySelector(`.card-add-wishlist[data-goods-id='${id}]'`)*/

      elem.classList.remove('active');
    } else {
      wishlist.push(id);
      /*document.querySelector(`.card-add-wishlist[data-goods-id='${id}]'`)*/

      elem.classList.add('active');
    }

    checkCount();
    storageQuery();
  };

  var addBascket = function addBascket(id) {
    if (goodsBascket[id]) {
      goodsBascket[id] += 1;
    } else {
      goodsBascket[id] = 1;
    }

    checkCount();
    cookieQuery();
  };

  var removeGoods = function removeGoods(id) {
    delete goodsBascket[id];
    checkCount();
    cookieQuery();
    getGoods(renderBascket, showCardBascket);
  }; //HENDLER - то куда тыкаем


  var handlerGoods = function handlerGoods(event) {
    var target = event.target;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    if (target.classList.contains('card-add-cart')) {
      addBascket(target.dataset.goodsId);
    }
  };

  var handlerBascket = function handlerBascket(event) {
    var target = event.target;

    if (target.classList.contains('goods-add-wishlist')) {
      toggleWishlist(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('goods-delete')) {
      removeGoods(target.dataset.goodsId);
    }

    ;
  }; //ИНИЦИАЛИЗАЦИЯ


  {
    getGoods(renderCard, randomSort);
    storageQuery(true);
    cookieQuery(true);
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', choiceCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    cartWrapper.addEventListener('click', handlerBascket);
    wishlistBtn.addEventListener('click', showWishList);
  } ///////////////////////////////////////////////////////////////////////////
});