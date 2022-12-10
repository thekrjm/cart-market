import { getProductSection } from "./module/productSection.js";
import {fetchSectionListData} from './module/fetch.js'

const body = document.getElementsByTagName('body')[0]

try{
    const sectionInfoList = await fetchSectionListData()
    sectionInfoList.forEach((sectionInfo)=>{
        const {sectionTitle, productList} = sectionInfo;
        const productSectionDOM = getProductSection(sectionTitle, productList);
        body.appendChild(productSectionDOM);
    });

}catch(error){
    console.log(error)
}
