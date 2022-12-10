import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";

export const getProductCard=(productInfo,removeCartCallback)=>{
    const {
        imgSrc,
        name,
        discountPercent,
        price,
        originalPrice,
    } = productInfo

const sectionDOM = document.getElementsByTagName('section')[0];
    
const productCard = makeDOMwithProperties('div',{
    className : 'product-card'
})

//product-image-con 시작

const productImageCon = makeDOMwithProperties('div',{
    className: 'product-image-con',
})

const productImage = makeDOMwithProperties('img',{
    src:imgSrc,
    alt:name
})

const cartToggleBtn = getCartToggleButton(productInfo,removeCartCallback)

appendChildrenList(productImageCon,[productImage,cartToggleBtn]);
//product-image-con 끝

//product-description 시작
const productDescription = makeDOMwithProperties('div',{
    className:"product-description"
})

const productName = makeDOMwithProperties('div',{
    className:"product-name",
    innerHTML: name
})
const productPriceCon = makeDOMwithProperties('div',{
    className:"productPriceCon"
})
const productDiscountPercent = makeDOMwithProperties('div',{
    className:"product-discount-percent",
    innerHTML:`${discountPercent}%`
})
const productPrice = makeDOMwithProperties('div',{
    className:"product-price",
    innerHTML:`${price.toLocaleString()}원`,
})
const productOriginalPrice = makeDOMwithProperties('div',{
    className:"product-original-price",
    innerHTML:`${originalPrice.toLocaleString()}원`,
})

appendChildrenList(productPriceCon,[productDiscountPercent, productPrice])
appendChildrenList(productDescription,[productName,productPriceCon, productOriginalPrice])
//product-description 끝

appendChildrenList(productCard,[productImageCon,productDescription])

return productCard;
}