import _ from "lodash-es";
import $ from "cash-dom";
import demoHtml from './demo.html'
import demoEjs from './demo.ejs'
import { ethers } from 'ethers';

// let _ = require("underscore")
// let $= require("cash-dom")

let baseclassorid="logo_"

export function  makehtml(){
    // let dom = demoHtml;
    // var compiledDom = _.template(dom)
    // return  compiledDom({
    //     baseclassorid
    // });
    console.log(demoEjs)
    return demoEjs({
             baseclassorid
         })


};

export function showhtml(appclassname,html){
    $("."+appclassname).append(html)


}

export function bindEvent(appclassname){
    $("."+appclassname).find("#"+baseclassorid+"btn").on( "click",btnclick)
}

export function btnclick(){
    console.log('click1112')

}

function Order(appclassname){
    this.appclassname=appclassname;
}

Order.prototype.openPanel=function(){
    let html = makehtml()
    
    showhtml(this.appclassname,html)
    bindEvent(this.appclassname);
    
    
}
Order.prototype.addNft=function(){

}

Order.prototype.approve=function(){
    
}

Order.prototype.LinkWallet=function(){
    let web3Provider;

    if (window.ethereum) {
      web3Provider = window.ethereum;
    } else if (window.web3) {
      // 老版 MetaMask Legacy dapp browsers...
      web3Provider = window.web3.currentProvider;
    } else {
      console.log('not find wallet')
    }
     this.ethersprovider = new ethers.providers.Web3Provider(web3Provider);
    
}

Order.prototype.testes= async function(){
    console.log('---')
    var index = (arr = []) => {
        return Array.from(arr).length;
      };
    return await Promise((ok, file)=>{
        if(index){
            ok()

        }else{
            file()

        }

    })



}








export default function openPanel(appclassname){
    let html = makehtml()
    showhtml(appclassname,html)
    bindEvent(appclassname);
    var ss = new Order(appclassname);
    ss.testes();
    ss.LinkWallet();


}