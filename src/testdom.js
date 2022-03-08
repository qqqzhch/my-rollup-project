import _ from "underscore";
import $ from "cash-dom";
import demoHtml from './demo.html'

// let _ = require("underscore")
// let $= require("cash-dom")

let baseclassorid="logo_"

export function  makehtml(){
    let dom = demoHtml;
    var compiledDom = _.template(dom)
    return  compiledDom({
        baseclassorid
    });


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

export default function openPanel(appclassname){
    let html = makehtml()
    showhtml(appclassname,html)
    bindEvent(appclassname);
}