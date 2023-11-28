

let dup;
let row;
let col;
let setrow;
let setcol;
let blanksud;
let boxcont;
let diveles;
let declairing=function(){
    dup = [];
    row=[];
    col=[];
    setrow=[];
    setcol=[];
    blanksud=[];
    boxcont=document.getElementById('boxcont');
    diveles=document.getElementsByClassName('cells');
}
let initialising=function(){
    for (let i = 0; i < 9; i++) {
        let d = [];
        for (let j = 0; j < 9; j++) {
            d.push(0);
        }
        setrow.push(i);
        setcol.push(i);
        blanksud[i]=[];
        dup.push(d);
    }
}
let shuffleRowsCols=function(){
    for(let i=0;i<9;i++){
        let indr=Math.floor(Math.random()*setrow.length);
        let indc=Math.floor(Math.random()*setcol.length);
        row[i]=setrow[indr];
        col[i]=setcol[indc];
        setrow.splice(indr,1);
        setcol.splice(indc,1);
    }
}
let valid=function(i, j, k) {
    for (let ii = 0; ii < 9; ii++) {
        if (dup[ii][j] == k) {
            return false;
        }
    }
    for (let ii = 0; ii < 9; ii++) {
        if (dup[i][ii] == k) {
            return false;
        }
    }
    for (let ii = (Math.floor(i / 3)) * 3; ii < (((Math.floor(i / 3)) * 3) + 3); ii++) {
        for (let jj = (Math.floor(j / 3)) * 3; jj < (((Math.floor(j / 3)) * 3) + 3); jj++) {
            if (dup[ii][jj] == k) {
                return false;
            }
        }
    }
    return true;
}
let sol=function(){
    for (let i of row) {
        for (let j of col) {
            if (dup[i][j] == 0) {             
                for (let k = 1; k < 10; k++) {
                    if (valid(i, j, k)) {
                        dup[i][j] = k;
                        let t = sol();
                        if (t == false) {
                            dup[i][j] = 0;
                        }
                        else {
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }
     
    return true;
}
let blank=function(elemsinboxes){
    let row=[];
    for(let i=0;i<9;i++) row[i]=i;
    for(let i=0;i<9;i++){
        let randrow=Math.floor(Math.random()*row.length);
        let eachrow=[];
        for(let j=0;j<9;j++) eachrow[j]=0;
        let places=[];
        for(let j=0;j<9;j++) places[j]=j;
        for(let j=0;j<elemsinboxes[i];j++){
            let randplaces=Math.floor(Math.random()*places.length);
            eachrow[places[randplaces]]=dup[row[randrow]][places[randplaces]];
            places.splice(randplaces,1);
        }
        blanksud[row[randrow]]=eachrow;
        row.splice(randrow,1);
    }
}
// blank([2,3,3,4,4,4,3,2,6]);
let createsud=function(){
    for(let i=0;i<81;i++){
        let divele=document.createElement('div');
        divele.classList.add('cells');
        let rw=Math.floor(i/9);
        let cl=i%9;
        if((rw%3==0) && rw!=0){
            divele.style.borderTopWidth='4px';
        }
        if(cl%3==0 && cl!=0){
            
            divele.style.borderLeftWidth='4px'
        }
        if(blanksud[rw][cl]!=0){
            // divele.innerText="";
            divele.innerHTML=`${blanksud[rw][cl]}`;
            divele.classList.add('default');
        }
        divele.id=""+rw+""+cl;
        divele.addEventListener('click',function(){
            if(document.getElementsByClassName('redcol').length==0){
                if(blanksud[rw][cl]==0){
                    let blueback=document.getElementsByClassName('blueback');
                    if(blueback.length!=0){
                        blueback[0].classList.remove('blueback');
                    }
                    divele.classList.add('blueback');
                }
            }
        })
        boxcont.appendChild(divele);
    }
}
let createbtns=function(){
    let btns=document.getElementById('btns');
    for(let i=0;i<9;i++){
        let btn=document.createElement('button');
        btn.textContent=i+1;
        btn.classList.add('btn');
        btn.addEventListener('click',function(){
            let blueback=document.getElementsByClassName('blueback');
            if(blueback.length!=0){
                if(blueback[0].textContent==btn.textContent){
                    blueback[0].textContent='';
                    blueback[0].classList.remove('redcol');
                    blueback[0].classList.remove('bluecol');
                }
                else{
                    blueback[0].textContent=btn.textContent;
                    if(blueback[0].textContent!=dup[Number.parseInt(blueback[0].id.charAt(0))][Number.parseInt(blueback[0].id.charAt(1))]){
                        blueback[0].classList.add('redcol');
                        blueback[0].classList.remove('bluecol');
                    }
                    else{
                        blueback[0].classList.remove('redcol');
                        blueback[0].classList.add('bluecol');
                        // console.log(81-document.getElementsByClassName('default').length-document.getElementsByClassName('bluecol').length);
                        if((81-document.getElementsByClassName('default').length-document.getElementsByClassName('bluecol').length)==0){
                            for(let ti=0;ti<9;ti++){
                                    for(let inn=0;inn<9;inn++){
                                        if(diveles[(ti*9)+inn].classList.contains('bluecol')){
                                            diveles[(ti*9)+inn].classList.add('blueback');
                                        }
                                    } 
                            }
                            

                        }

                    }
                }
                
            }
        })
        btns.appendChild(btn);
    }
}
declairing();
initialising();
shuffleRowsCols();
sol();
blank([6,5,7,3,7,4,8,5,8]);
createsud();
createbtns();
document.getElementById('next').addEventListener('click',function(){
    location.reload(true);
 });
