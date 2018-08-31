const libs=[
    'js/pointer.js'
];

const mainScript='js/main.js';

window.addEventListener('DOMContentLoaded',()=>{
    let script;
    let i;
    const MAX=libs.length;
    const body=document.body;

    for(i=0;i<MAX;i++){
        script=document.createElement('script');
        script.src=libs[i];
        body.appendChild(script);
    }
    
    script=document.createElement('script');
    script.src=mainScript;

    setTimeout(()=>{
        body.appendChild(script);
    },1000);
});