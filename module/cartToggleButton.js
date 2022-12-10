import { CART_COOKIE_KEY } from "../constants/cart.js";
import { makeDOMwithProperties } from "../utils/dom.js";

export const getCartInfo =()=> JSON.parse(localStorage.getItem(CART_COOKIE_KEY))||[] //기존에 장바구니에 있던 상품을 가져옴, 비어있을 수 있음을 대비

const isInCart = ({id})=>{
    //현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과를 반환
    const originalCartInfo = getCartInfo()
    return !! originalCartInfo.find((cartInfo)=> cartInfo.id ===id);
};

const addCartInfo = (productInfo)=>{
    //장바구니에 해당 물품의 정보를 저장
    const originalCartInfo = getCartInfo()
    if(originalCartInfo.findIndex((cartInfo)=>cartInfo.id === productInfo.id) !== -1) return; //장바구니에 동일한 id의 상품이 있으면 담지 않음
    localStorage.setItem(CART_COOKIE_KEY,
        JSON.stringify([
            ...originalCartInfo,
            productInfo
        ])) //기존에 있던 장바구니 아이템에 새롭게 아이템을 추가시킴
    }
    
    const removeCartInfo=({id})=>{
    const originalCartInfo = getCartInfo()
    const newCartInfo =  originalCartInfo.filter((cartInfo)=> cartInfo.id !== id)
    localStorage.setItem(CART_COOKIE_KEY,JSON.stringify(newCartInfo))
}

export const getCartToggleButton=(productInfo,removeCartCallback)=>{
    let inCart = isInCart(productInfo);
    const cartToggleBtn = makeDOMwithProperties('button',{
        className:"cart-toggle-btn",
        type:"button",
        onclick:()=>{
            if(inCart){ //장바구니에 있다면
                if(!confirm(`${productInfo.name}을 장바구니에서 삭제할까요?`)) return;
                removeCartInfo(productInfo)
                cartImage.src = "./public/assets/cart.png"
                removeCartCallback?.(); //콜백 함수가 있는 경우에 실행하겠다는 optional chaining
            }else{
                addCartInfo(productInfo);
                cartImage.src = "./public/assets/cartDisabled.png"
                if(confirm("장바구니에 담았습니다. 장바구니로 이동하시겠습니까?")){
                    location.href='cart.html'
                }
            }
            inCart = !inCart;
        }

    });
    const cartImage = makeDOMwithProperties('img',{
        className:"cart-image",
        src: inCart ? "./public/assets/cartDisabled.png" : "./public/assets/cart.png"
    });
    cartToggleBtn.appendChild(cartImage);

    return cartToggleBtn;
}