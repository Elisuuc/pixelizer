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

window.addEventListener('load',()=>{
    setTimeout(()=>{
        document.getElementById('carga').style='animation: cargado 1s linear  1 forwards;';
        document.getElementById('icon').remove();
        setTimeout(()=>{
            document.getElementById('carga').remove();
        },1000);
    },3000);
});