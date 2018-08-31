document.oncontextmenu=()=>{
    return false;
}
let canvasDraw=document.getElementById('draw');
let ctxD=canvasDraw.getContext('2d');
let pointerMode=0;
let colorSelector=document.getElementById('color');
let color=colorSelector.value;
let createColorSelector=document.getElementById('create-color-selector');
let colors=document.getElementById('color-selector');

colorSelector.addEventListener('change',()=>{
    color=colorSelector.value;
});

canvasDraw.width=screen.width;
canvasDraw.height=screen.height;

pointer();
generateColors();
createColorSelector.addEventListener('click',()=>{
    colors.style='display:block;';
});

function generateColors(){
    
    let R=['00','33','66','99','CC','FF'];
    let G=['00','33','66','99','CC','FF'];
    let B=['00','33','66','99','CC','FF'];
    let i;
    let j;
    let k;
    let MAX=R.length;
    for(i=0;i<MAX;i++){
        let color=document.createElement('div');
        let colorSelector=document.getElementById('color-selector');
        color.className='colors';
        colorSelector.appendChild(color);
        for(j=0;j<MAX;j++){
            for(k=0;k<MAX;k++){
                let colors=document.createElement('div');
                colors.className='color';
                colors.style.backgroundColor='#'+R[i]+G[j]+B[k];
                color.appendChild(colors);
                console.log(R[i]+G[j]+B[k]);
            }
        }
    }
}

