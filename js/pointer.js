function pointer(){
    let canvasPointer=document.getElementById('pointer');
    let ctxP=canvasPointer.getContext('2d');
    canvasPointer.width=screen.width;
    canvasPointer.height=screen.height;
    let positionsX={
        'new':0,
        'last':0,
    };
    let positionsY={
        'new':0,
        'last':0,
    };

    //mirror
    let positionsXM=[];
    let positionsYM=[];
    let size=5;
    let positionsD=[];

    ctxP.fillRect(positionsX['last'],positionsY['last'],size,size);

    canvasPointer.addEventListener('mousemove',evt=>{
        let x=evt.offsetX;
        let y=evt.offsetY;
        
        if(x<positionsX['new']){
            positionsX['new']=positionsX['new']-size;
        }
        else if(x>positionsX['new']+size){
            positionsX['new']=positionsX['new']+size;
        }
        else if(y<positionsY['new']){
            positionsY['new']=positionsY['new']-size;
        }
        else if(y>positionsY['new']+size){
            positionsY['new']=positionsY['new']+size;
        }
        ctxP.clearRect(0,0,screen.width,screen.height);
        ctxP.strokeStyle=color;
        ctxP.strokeRect(positionsX['new'],positionsY['new'],size,size);
        
        if(pointerMode===1){
            if(positionsXM['new']-positionsXM['pivot']>positionsXM['pivot']-positionsX['new']){
                positionsXM['new']=positionsXM['new']-size;
            }
            else if(positionsXM['new']-positionsXM['pivot']<positionsXM['pivot']-positionsX['new']){
                positionsXM['new']=positionsXM['new']+size;
            }
            else if(y<positionsYM['new']){
                positionsYM['new']=positionsYM['new']-size;
            }
            else if(y>positionsYM['new']+size){
                positionsYM['new']=positionsYM['new']+size;
            }
            ctxP.clearRect(positionsXM['last']-1,positionsYM['last']-1,size+2,size+2);
            ctxP.strokeRect(positionsXM['new'],positionsYM['new'],size,size);
            positionsXM['last']=positionsXM['new'];
            positionsYM['last']=positionsYM['new'];
        }

        positionsX['last']=positionsX['new'];
        positionsY['last']=positionsY['new'];
    });

    canvasPointer.addEventListener('mousedown',draw);
    canvasPointer.addEventListener('mousedown',()=>{
        if(pointerMode===3){
            let i;
            let MAX=positionsD.length;
            for(i=0;i<MAX;i++){
                positionsD[i]['difX']=positionsD[i]['positionXN']-positionsX['new'];
                positionsD[i]['difY']=positionsD[i]['positionYN']-positionsY['new'];
            }
        }
    });
    canvasPointer.addEventListener('mouseup',()=>{
        canvasPointer.removeEventListener('mousemove',draw);
        canvasPointer.removeEventListener('mousemove',erase);
        canvasPointer.removeEventListener('mousemove',dublicateMode);
    });
    canvasPointer.addEventListener('wheel',event=>{
        if(event.deltaY<0){
            size=size/2;
        }    
        if(event.deltaY>0){
            size=size*2;
        }
        positionsX['new']=0;
        positionsY['new']=0;
    });

    
    document.addEventListener('keydown',event=>{
        switch(event.key){
            case 'm':
                console.log(1);
                if(pointerMode===0){
                    pointerMode++;
                    positionsXM['pivot']=positionsXM['new']=positionsX['new'];
                    positionsYM['pivot']=positionsYM['new']=positionsY['new'];
                }
                else{
                    pointerMode--;
                    ctxP.clearRect(positionsXM['last']-1,positionsYM['last']-1,size+2,size+2);
                }
            break;
            case 'd':

                if(pointerMode!==3 && pointerMode!==4){
                    pointerMode=3;
                }
                else if(pointerMode===3){

                    generator();

                    canvasPointer.addEventListener('mousemove',event=>{
                        let MAX=positionsD.length;
                        let i;
                        for(i=0;i<MAX;i++){
                            ctxP.clearRect(positionsD[i]['positionXF']-1,positionsD[i]['positionYF']-1,size+2,size+2);
                            ctxP.strokeRect(positionsD[i]['positionXN'],positionsD[i]['positionYN'],size,size);
                        }
                    });
                    
                    let time=setTimeout(()=>{
                        pointerMode=0;
                        positionsD.length=0;
                    },2000);

                    document.addEventListener('keyup',event=>{
                        clearTimeout(time);
                        console.log(1);
                    });
                }
            break;
            case 's':
                let filename=prompt("Filename");
                let c=canvasDraw.toDataURL('image/png');
                let a=document.createElement("a");

                a.download=filename===''?'FILENAME.png':filename+'.png';
                a.href=c;
                a.id="save";
                document.body.appendChild(a);
                document.getElementById('save').click();
                document.getElementById('save').remove();
            break;
            case 'o':
                let options=document.getElementById('options');
                options.style='display:block;';
                document.addEventListener('keyup',()=>{
                    let options=document.getElementById('options');
                    options.style='display:none;';
                });
            break;
            case 'c':
                ctxD.clearRect(0,0,screen.width,screen.height);
            break;
        }
    });
    

    function generator(){
        let pointerD;
        pointerD={
            'positionXN':0,
            'positionYN':0,
            'positionXF':0,
            'positionYF':0
        };

        pointerD['positionXF']=pointerD['positionXN']=positionsX['new'];
        pointerD['positionYF']=pointerD['positionYN']=positionsY['new'];

        positionsD.push(pointerD);
    }


    function draw(event){
        switch(event.button){
            case 0:
                ctxD.fillStyle=color;
                ctxD.fillRect(positionsX['new'],positionsY['new'],size,size);
                canvasPointer.addEventListener('mousemove',draw);
                if(pointerMode===1){
                    ctxD.fillRect(positionsXM['new'],positionsYM['new'],size,size);
                }
                if(pointerMode===3){
                    let x=event.offsetX;
                    let y=event.offsetY;
                    let MAX=positionsD.length;
                    let i;
                    for(i=0;i<MAX;i++){
                        
                        if(positionsD[i]['difX']<positionsD[i]['positionXN']-positionsX['new']){
                            positionsD[i]['positionXN']=positionsD[i]['positionXN']-size;
                        }
                        else if(positionsD[i]['difX']>positionsD[i]['positionXN']-positionsX['new']){
                            positionsD[i]['positionXN']=positionsD[i]['positionXN']+size;
                        }
                        else if(positionsD[i]['difY']<positionsD[i]['positionYN']-positionsY['new']){
                            positionsD[i]['positionYN']=positionsD[i]['positionYN']-size;
                        }
                        else if(positionsD[i]['difY']>positionsD[i]['positionYN']-positionsY['new']){
                            positionsD[i]['positionYN']=positionsD[i]['positionYN']+size;
                        }
                        ctxD.fillRect(positionsD[i]['positionXN'],positionsD[i]['positionYN'],size,size);
                        positionsD[i]['positionXF']=positionsD[i]['positionXN'];
                        positionsD[i]['positionYF']=positionsD[i]['positionYN'];
                    }
                    ctxD.fillRect(positionsD[i]['positionXN'],positionsD[i]['positionYN'],size,size);
                }
            break;
            case 2:
                erase(event);
                canvasPointer.addEventListener('mousemove',erase);
            break;
            case 1:
                if(pointerMode===3){
                    let x=event.offsetX;
                    let y=event.offsetY;
                    let MAX=positionsD.length;
                    let i;
                    for(i=0;i<MAX;i++){
                        
                        if(positionsD[i]['difX']<positionsD[i]['positionXN']-positionsX['new']){
                            positionsD[i]['positionXN']=positionsD[i]['positionXN']-size;
                        }
                        else if(positionsD[i]['difX']>positionsD[i]['positionXN']-positionsX['new']){
                            positionsD[i]['positionXN']=positionsD[i]['positionXN']+size;
                        }
                        else if(positionsD[i]['difY']<positionsD[i]['positionYN']-positionsY['new']){
                            positionsD[i]['positionYN']=positionsD[i]['positionYN']-size;
                        }
                        else if(positionsD[i]['difY']>positionsD[i]['positionYN']-positionsY['new']){
                            positionsD[i]['positionYN']=positionsD[i]['positionYN']+size;
                        }
                        positionsD[i]['positionXF']=positionsD[i]['positionXN'];
                        positionsD[i]['positionYF']=positionsD[i]['positionYN'];
                    }
                    canvasPointer.addEventListener('mousemove',dublicateMode);
                }

                
                console.log(1);
            break;
        }
    }

    function erase(event){
        ctxD.clearRect(positionsX['new'],positionsY['new'],size,size);
        if(pointerMode===1){
            ctxD.clearRect(positionsXM['new'],positionsYM['new'],size,size);
        }
        if(pointerMode===3){
            let x=event.offsetX;
            let y=event.offsetY;
            let MAX=positionsD.length;
            let i;
            for(i=0;i<MAX;i++){        
                if(positionsD[i]['difX']<positionsD[i]['positionXN']-positionsX['new']){
                    positionsD[i]['positionXN']=positionsD[i]['positionXN']-size;
                }
                else if(positionsD[i]['difX']>positionsD[i]['positionXN']-positionsX['new']){
                    positionsD[i]['positionXN']=positionsD[i]['positionXN']+size;
                }
                else if(positionsD[i]['difY']<positionsD[i]['positionYN']-positionsY['new']){
                    positionsD[i]['positionYN']=positionsD[i]['positionYN']-size;
                }
                else if(positionsD[i]['difY']>positionsD[i]['positionYN']-positionsY['new']){
                    positionsD[i]['positionYN']=positionsD[i]['positionYN']+size;
                }
                ctxD.clearRect(positionsD[i]['positionXN'],positionsD[i]['positionYN'],size,size);
                positionsD[i]['positionXF']=positionsD[i]['positionXN'];
                positionsD[i]['positionYF']=positionsD[i]['positionYN'];
            }
        }
    }

    function dublicateMode(event){
        let x=event.offsetX;
        let y=event.offsetY;
        let MAX=positionsD.length;
        let i;
        for(i=0;i<MAX;i++){
                        
            if(positionsD[i]['difX']<positionsD[i]['positionXN']-positionsX['new']){
                positionsD[i]['positionXN']=positionsD[i]['positionXN']-size;
            }
            else if(positionsD[i]['difX']>positionsD[i]['positionXN']-positionsX['new']){
                positionsD[i]['positionXN']=positionsD[i]['positionXN']+size;
            }
            else if(positionsD[i]['difY']<positionsD[i]['positionYN']-positionsY['new']){
                positionsD[i]['positionYN']=positionsD[i]['positionYN']-size;
            }
            else if(positionsD[i]['difY']>positionsD[i]['positionYN']-positionsY['new']){
                positionsD[i]['positionYN']=positionsD[i]['positionYN']+size;
            }
            positionsD[i]['positionXF']=positionsD[i]['positionXN'];
            positionsD[i]['positionYF']=positionsD[i]['positionYN'];
        }
    }
}

