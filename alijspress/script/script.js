'sue strict'
document.addEventListener('DOMContentLoaded', function () {
    const search = document.querySelector('.search'),
        cartBtn = document.querySelector('#cart'),
        wishlistBtn = document.getElementById('wishlist'),
        goodsWrapper = document.querySelector('.goods-wrapper'),
        cart = document.querySelector('.cart'),
        cross = document.querySelector('.cart-close'),
        category = document.querySelector('.category'),
        cardCounter = cartBtn.querySelector('.counter'),
        wishlistCounter = wishlistBtn.querySelector('.counter'),
        cartWrapper = document.querySelector('.cart-wrapper');

        const wishlist = [];
        const goodsBascket = {};

        
//АНИМАЦИЯ ЗАГРУЗКИ
    const spinner = (nameFunction) =>{    
        const loading = `<div class="loadingio-spinner-spin-taee92xm39n"><div class="ldio-qt4m74a5gy8">
        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
        <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
        <div><div></div></div><div><div></div></div></div></div>`;
        if(nameFunction === 'renderCard'){
            goodsWrapper.innerHTML = loading;
        } 
        if(nameFunction === 'renderBascket'){
            cartWrapper.innerHTML = loading;
        } 

 
    };

//ЗАПРОС НА СЕРВЕР
    const getGoods = (handler,filter) =>{
        spinner(handler.name);
        fetch('./db/db.json')
            .then((response) => {
             return response.json()})
            .then(filter)
            .then(handler);
        };

//ГЕНЕРАЦИЯ КАРТОЧЕК, т.е. создаем их

    const createCardGoods = (id, title, price, img) =>{
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
        <div class="card-img-wrapper">
            <img class="card-img-top" src="${img}" alt="">
            <button class="card-add-wishlist ${wishlist.includes(id) ? 'active' : '' }" 
                data-goods-id="${id}"></button>
        </div>
        <div class="card-body justify-content-between">
            <a href="#" class="card-title">${title}</a>
            <div class="card-price">${price} ₽</div>
            <div>
                <button class="card-add-cart" data-goods-id="${id}">Добавить в корзину</button>
            </div>
        </div>
    </div>`;
    return card;
    /*${wishlist.has(id) ? 'active' : '' } - можно вставить в верстку, но работает с коллекцией*/ 
    };

    const createCardGoodsBascket = (id, title, price, img) =>{
        const card = document.createElement('div');
        card.className = 'goods';
        card.innerHTML = `
        		<div class="goods-img-wrapper">
						<img class="goods-img" src="${img}" alt="">

					</div>
					<div class="goods-description">
						<h2 class="goods-title">${title}</h2>
						<p class="goods-price">${price} ₽</p>

					</div>
					<div class="goods-price-count">
						<div class="goods-trigger">
                            <button class="goods-add-wishlist ${wishlist.includes(id) ? 'active' : '' }"
                             data-goods-id="${id}"></button>
							<button class="goods-delete" data-goods-id="${id}"></button>
						</div>
						<div class="goods-count">${goodsBascket[id]}</div>
				</div>`;

    return card;
    /*${wishlist.has(id) ? 'active' : '' } - можно вставить в верстку, но работает с коллекцией*/ 
    };

//ПРОРИСОВКА(РЕНДЕР) КАРТОЧЕК, КОТОРЫЕ МЫ РИСОВАЛИ ВЫШЕ
    const renderCard = (goods) =>{
        goodsWrapper.textContent = '';
        if(goods.length){
            goods.forEach(({ id, title, price, imgMin})=>{
                //items.forEach( (item)=>{
                    //const { id, title, price, imgMin} = item;
                    goodsWrapper.append(createCardGoods(id, title, price, imgMin));
        });
    }else {
        goodsWrapper.innerHTML = `<img class="center-block col-12 col-md-12 col-lg-4 col-xl-3 pb-3"  src="img/nothing.svg" alt="Ничего не найдено">`;
    }
}; 

const renderBascket = (goods) =>{
    cartWrapper.textContent = '';
    if(goods.length){
        goods.forEach(({ id, title, price, imgMin})=>{
            //items.forEach( (item)=>{
                //const { id, title, price, imgMin} = item;
                cartWrapper.append(createCardGoodsBascket(id, title, price, imgMin));
    });
}else {
    cartWrapper.innerHTML = `<div id="cart-empty">Ваша корзина пока пуста</div>`;
}
}; 

//КАЛЬКУЛЯЦИЯ
const checkCount = () => {
    wishlistCounter.textContent = wishlist.length;
    cardCounter.textContent = Object.keys(goodsBascket).length;  
};

const calcTotalPrice = goods => {
    let sum = goods.reduce((accum, item)=>{
        return accum+item.price * goodsBascket[item.id];
    }, 0)
    cart.querySelector('.cart-total>span').textContent = sum.toFixed(2);
};

//ФИЛЬТРЫ
const showCardBascket = goods => {
    const BascketGoods = goods.filter(item => goodsBascket.hasOwnProperty(item.id));
    calcTotalPrice(BascketGoods);
    return BascketGoods;
};
const randomSort = (item) => {
    return item.sort(() => Math.random() - 0.5);
};
const showWishList = () => {
    getGoods(renderCard, goods => goods.filter(item => wishlist.includes(item.id)))
};
//РАБОТА С ХРАНИЛИЩАМИ
// возвращает куки с указанным name,
// или undefined, если ничего не найдено
const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const cookieQuery = (get) => {
    if (get) {
        if(getCookie('goodsBascket')){
            /*goodsBascket =  JSON.parse(getCookie('goodsBascket'));*/
            Object.assign(goodsBascket,JSON.parse(getCookie('goodsBascket')));
        }
        checkCount();
    } else {
        document.cookie = `goodsBascket=${JSON.stringify(goodsBascket)}; max-age=86400e3`;
    }
   
};
const storageQuery = (get) => {
    if(get){
        if(localStorage.getItem('wishlist')){
           // (JSON.parse(localStorage.getItem('wishlist'))).forEach(id => wishlist.push(id));
          // ИЛИ wishlist.splice(0,0,...JSON.parse(localStorage.getItem('wishlist')));
          wishlist.push(...JSON.parse(localStorage.getItem('wishlist'))); 
        } 
        checkCount();
    }else{
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
     }
     
};

//СОБЫТИЯ

const closeCart = (event) => {
    const target = event.target; 
    if (target === cart ||
         target.classList.contains('cart-close') || 
         event.keyCode === 27){
        cart.style.display = '';
        document.removeEventListener('keydup',closeCart);
    }
    
};

const openCart = (event) => {
    event.preventDefault();
    cart.style.display = 'flex'; 
    document.addEventListener('keydown',closeCart);
    getGoods(renderBascket,showCardBascket); 
};

const choiceCategory = (event) => {
    event.preventDefault();
    const target = event.target;

    if(target.classList.contains('category-item')){
        const category = target.dataset.category;
        getGoods(renderCard, (goods) => goods.filter((item) => item.category.includes(category)));     
    }
};

const searchGoods = (event) => {
    event.preventDefault();
    const input = event.target.elements.searchGoods;
    const inputValue = input.value.trim();
    if (input.value.trim() !== ''){
        const searchString = new RegExp(inputValue, 'i');
        getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));
    }else {
        search.classList.add('error');
        setTimeout(() => {
            search.classList.remove('error');
        }, 2000);
    }
    input.value = '';
};

const toggleWishlist = (id, elem) => {
    if (wishlist.includes(id)){
        wishlist.splice(wishlist.indexOf(id),1);
        /*document.querySelector(`.card-add-wishlist[data-goods-id='${id}]'`)*/
        elem.classList.remove('active');
    }else{
        wishlist.push(id);
        /*document.querySelector(`.card-add-wishlist[data-goods-id='${id}]'`)*/
        elem.classList.add('active');    
    }
    checkCount();
    storageQuery();
    
};


const addBascket = (id) => {
    if (goodsBascket[id]){
        goodsBascket[id] += 1;
    }else{
        goodsBascket[id] = 1;
    }
    checkCount();
    cookieQuery();
      
};

const removeGoods = id => {
    delete goodsBascket[id];
    checkCount();
    cookieQuery();
    getGoods(renderBascket, showCardBascket);
};

//HENDLER - то куда тыкаем
const handlerGoods = (event) => {
    const target = event.target;

    if(target.classList.contains('card-add-wishlist')){
        toggleWishlist(target.dataset.goodsId, target);
    }
    if(target.classList.contains('card-add-cart')){
        addBascket(target.dataset.goodsId);
    }
};

const handlerBascket = event => {
    const target = event.target;
    if (target.classList.contains('goods-add-wishlist')) {
        toggleWishlist(target.dataset.goodsId, target);
    };
    if (target.classList.contains('goods-delete')) {
        removeGoods(target.dataset.goodsId);
    };
};

//ИНИЦИАЛИЗАЦИЯ
{
getGoods(renderCard, randomSort);
storageQuery(true);
cookieQuery(true);
cartBtn.addEventListener('click', openCart);
cart.addEventListener('click', closeCart);
category.addEventListener('click',choiceCategory);   
search.addEventListener('submit', searchGoods);
goodsWrapper.addEventListener('click',handlerGoods);
cartWrapper.addEventListener('click',handlerBascket);
wishlistBtn.addEventListener('click', showWishList);
}




///////////////////////////////////////////////////////////////////////////






    



        
    
  
    












 
});