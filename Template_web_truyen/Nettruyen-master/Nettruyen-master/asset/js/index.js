
import { data  , topday , topmonth , topweek} from './data.js';
console.log(topmonth, data);
var slideIndex = 0;
var sildenext = document.querySelector(".silde-next");
var sildeprev = document.querySelector(".silde-prev");
var slidebox = document.querySelector(".slide-box");
var listitem = document.querySelector(".listitem ");
var backtotop = document.querySelector("#back-to-top");
window.onscroll = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.querySelector(".navbar-header").style.display = "none";
        var menuheader = document.querySelector(".menu-header");
        menuheader.style.position = "fixed";
        backtotop.style.display = "inline";
    } else {
        document.querySelector(".navbar-header").style.display = "flex";
        var menuheader = document.querySelector(".menu-header");
        menuheader.style.position = "unset";
        backtotop.style.display = "none";
    }
}
// adđ item 
let html = ''
for (let i = 0; i < 9; i++) {
    for (let i = 0; i < data.length; i++) {
        var index = data[i];
        html += `
        <div class="col l-3 owl-item">
        <div class="item">
            <div class="image">
                <img src="${index.img}"alt="">
                <div class="view">
                    <ul>
                    <li><p><i class="fa fa-eye"></i>${index.seen}</p></li>
                    <li><p><i class="fa fa-comment"></i>${index.comment}</p></li>
                    <li><p><i class="fa fa fa-heart"></i>${index.heart}</p></li>
                    <li><p><i class="fa fa-star"></i>${index.star}</p>${index.hot ? `<img src="http://s.nhattruyenvip.com/Data/Sites/2/skins/comic/images/icon-hot.gif" alt="">` : ''}</li>
                    </ul>
                </div>
            </div>
            <div class="figcaption">
                <a class="name">${index.name}</a>
                <ul>
                    <li><a href="#">Chapter ${index.chapter[0].chap}</a><span>${index.chapter[0].time}</span></li>
                    <li><a href="#">Chapter ${index.chapter[1].chap}</a><span>${index.chapter[1].time}</span></li>
                    <li><a href="#">Chapter ${index.chapter[2].chap}</a><span>${index.chapter[2].time}</span></li>
                </ul>
            </div>
        </div>
      </div>
        `
    }
}
listitem.innerHTML = html;
// add item Slide
let itemslide = ''
for (let i = 0; i < 16; i++) {
    itemslide += `
        <div class="slide-item l-2-4">
        <div class="item">
            <a href="#">
                <img src="http://st.imageinstant.net/data/comics/127/toan-chuc-phap-su.jpg"alt="?">
            </a>
            <div class="slide-caption">
                <a href="#">
                    <p>Toàn Chức Pháp Sư</p>
                    <p class="smail">Chapter 642 <span><i class="fa fa-clock-o"></i>23 giờ
                            trước</span></p>
                </a>
            </div>
        </div>
    </div>
        `
}
slidebox.innerHTML = itemslide;
var listslideitem = document.querySelectorAll(".slide-item");
var slideLeft = document.querySelector(".slide-item").clientWidth;
console.log(slideLeft);
// slide //
sildenext.onclick = function () {
    slideIndex++;
    resutlSlide()
}
sildeprev.onclick = function () {
    slideIndex--;
    resutlSlide()
}
function resutlSlide() {
    if (slideIndex == listslideitem.length - 4) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = listslideitem.length - 5;
    }
    slidebox.style.transform = `translateX(${slideIndex * slideLeft * -1}px)`;
}
// tự động chạy slide 
setInterval(() => {
    slideIndex++
    resutlSlide();
}, 5000);
// tag ?? 
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const tabs = $$(".tab-item");
const panes = $$(".tab-pane");
const line = $('.tabs-line');
tabs.forEach((tab, index) => {
    tab.onclick = function () {
        const pane = panes[index]
        $(".tab-item.tabs-active").classList.remove('tabs-active');
        $(".tab-pane.pane-active").classList.remove('pane-active');
        pane.classList.add("pane-active");
        this.classList.add('tabs-active');
        tabActive();
    }
})
function tabActive() {
    const tabActive = $(".tab-item.tabs-active");
    line.style.left = tabActive.offsetLeft + 'px';
    line.style.width = tabActive.offsetWidth + 'px';
}
tabActive();
// add item topmonth 
var month = document.querySelector(".topmonth");
var week = document.querySelector(".topweek");
var day = document.querySelector(".topday");
function addtoprank(array) {
    var topmonthhtml = "";
    for (let i = 0; i < array.length; i++) {
        var index = array[i]
        console.log(index);
        topmonthhtml += `
        <li>
         <a href="#">
       <div class="left">
        <p class="rank${i + 1}">${i + 1 < 10 ? "0" + (i + 1) : i + 1}</p>
         <div class="box">
          <img src="${index.img}" alt="?">
        </div>
      </div>
     <div class="right">
     <p>${index.name}</p>
      <div class="box">
     <p class="chapter">${index.chaper}</p>
     <p class="wier"><i class="fa fa-eye"></i>${index.wier}</p>
      </div>
     </div>
     </a>
    </li>`
    }
    return topmonthhtml;
}
month.innerHTML = addtoprank(topmonth);
week.innerHTML =  addtoprank(topweek);
day.innerHTML = addtoprank(topday);
// Back to top 
backtotop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}