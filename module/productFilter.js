const MAX_VALUE = Number.MAX_VALUE;
import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";


const minPriceFilter = document.getElementById('price-min-filter');
const maxPriceFilter = document.getElementById('price-max-filter');
const discountilter = document.getElementById('discount-filter');
const filterButton = document.getElementsByClassName('product-filter-con')[0]?.lastElementChild;



const convertPriceNumber = (originalPrice)=>{
    const formattedString = String(originalPrice).replace('원','').replace(',','');
    const formattedNumber = Number(formattedString);
    return isNaN(formattedNumber) ? 0:formattedNumber;

}
const formatToPrice = (event)=>{
        const value = event.target.value;
        const result = Number(value);
        if(isNaN(result)){
            alert("숫자를 입력해주세요.");
        };
        event.target.value = `${result.toLocaleString()}원`
}

const convertPercentToNumber = (originalPrice)=>{
    const formattedString = String(originalPrice).replace('%','')
    const formattedNumber = Number(formattedString);
    return isNaN(formattedNumber) ? 0:formattedNumber;
}



export const setButtonEvent=(productList)=>{
    filterButton.onclick=()=>{
        const maxPrice = convertPriceNumber(maxPriceFilter.value) ||MAX_VALUE;
        const minPrice = convertPriceNumber(minPriceFilter.value)||0;
        const discountRate = convertPercentToNumber(discountilter.value)||0;

        const newProductList = productList.filter((productInfo)=>{
            const {price, discountPercent} = productInfo;
            return minPrice<=price && maxPrice >= price && discountRate<=discountPercent;
        });

        
        const sectionDOM = document.getElementsByTagName('section')[0];
        const originalProductListDOM = document.getElementsByClassName('product-list-con')[0];
        sectionDOM.removeChild(originalProductListDOM);    
        
        if(newProductList.length >0){
            const productListDOM = getProductList(newProductList);
            sectionDOM.appendChild(productListDOM);
        }else{
            const emptyProductListDOM = makeDOMwithProperties('div', {
                className:'product-list-con empty',
                innerHTML: '조건에 해당하는 상품이 없습니다.'
            });
            sectionDOM.appendChild(emptyProductListDOM);
        }
    }
}


export const setFilterEvent=()=>{
    minPriceFilter.onblur= formatToPrice;
    minPriceFilter.onfocus=(event)=>{
        event.target.value = convertPriceNumber(event.target.value);}

    maxPriceFilter.onblur= formatToPrice;
    maxPriceFilter.onfocus=(event)=>{
        event.target.value = convertPriceNumber(event.target.value);}

    discountilter.onfocus=(event)=>{
        event.target.value = convertPercentToNumber(event.target.value);
    }
    discountilter.onblur=(event)=>{
        const value = event.target.value;
        const result = Number(value);
        if(isNaN(result)){
            alert("숫자를 입력해주세요.");
            event.target.value=0;
            return;
        };
        if(result >100 || result <0){
            alert('0이상 100이하의 숫자를 입력해주세요.')
            event.target.value=0;
            return;
        }
        event.target.value = `${result}%`
}
};