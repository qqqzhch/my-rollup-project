import _ from "underscore";
import $ from "cash-dom";

// let _ = require("underscore")
// let $= require("cash-dom")

let baseclassorid="logo_"

export function  makehtml(){
    let dom = ```
    <div><button id="${baseclassorid}btn">test</button> </div>
    ```
    var compiledDom = _.template(dom)
    return  compiledDom({});


};

export function showhtml(appclassname,html){
    $(```#${appclassname} ```).append(html)


}

export function bindEvent(){
    $(```#${appclassname} ```).find(```${baseclassorid}btn```).on( "click",btnclick)
}

export function btnclick(){
    console.log('click1112')

}

export default function openPanel(appclassname){
    let html = makehtml()
    showhtml(appclassname,html)
    bindEvent(appclassname);
}