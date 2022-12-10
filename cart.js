import { CART_COOKIE_KEY } from "./constants/cart.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { setPayInfo } from "./module/payModule.js";
import { getProductList } from "./module/productList.js";
import { makeDOMwithProperties } from "./utils/dom.js";

//부모 => section tag
// 뒤에 있는 요소 -> id: cart-pay container
//장바구니 내부에 있는 물품 -> product-list-con


//1.장바구니에 있는 물품 정보 가져오기
//2. 물품 정보 - productList와 연결
//3. section 아래의 cart-pay-container

const sectionDOM = document.getElementsByTagName('section')[0];
const cartPayContainerDOM = document.getElementById('cart-pay-container')

const cartInfo = getCartInfo()
const reloadPage = ()=> location.reload();

if(cartInfo.length <1){
    const noticeDOM = makeDOMwithProperties('div',{
        innerHTML:'장바구니가 비어있습니다.',
        className:'product-list-con'
    })
    sectionDOM.insertBefore(noticeDOM,cartPayContainerDOM);
}else{
    const productListDOM = getProductList(cartInfo ,reloadPage);
    sectionDOM.insertBefore(productListDOM,cartPayContainerDOM);
}

const cartAllDeleteButtonDOM = document.getElementById('remove-all-button');
cartAllDeleteButtonDOM.onclick=()=>{
    //locallStorage에 있는 장바구니 물품 목록 정보 전부 삭제
    localStorage.removeItem(CART_COOKIE_KEY);
    location.reload()
}

setPayInfo()