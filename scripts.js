    // const fallin = document.querySelector("#fallin");
    // fallin.animate(
    // [
    //     {fontSize: "50vw", textShadow: "50px 50px 75px black"},
    //     {fontSize: "7vw", textShadow: "10px 10px 5px black"},
    // ],
    // {duration: 1500, fill:"forwards", easing: "cubic-bezier(0.36, 0.2, 0, 1)"}
    // )
    // setTimeout(() => {fallin.animate(
    //     [
    //         {top:"50%"},
    //         {top:"15%"}
    //     ],
    //     {duration: 1500, fill:"forwards", easing: "cubic-bezier(0.6, 0, 0.6, 1)"}
    //     )},200)
function load(){
    function clamp(input, min, max){
        if(input < min){
            return min;
        }
        else if(input > max){
            return max;
        }
        else{
            return input;
        }
    }
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    window.addEventListener("resize", ()=>{
        alert('Please do not resize the window.')
        if(width < height){
            alert('Also, this website only works in landscape.')
        }
        window.resizeTo(width, height)
    })
    window.addEventListener('touchstart', ()=>{
        alert('Sorry, this website currently doesn\'t support touchscreen. If you\'re on mobile, please come back when you have a computer.')
    })
    const cursor = document.querySelector('#cursor');
    let canvas = document.querySelector('#canvas');
    let lowerCanvas = document.querySelector("#lowercanvas");
    let upperCanvas = document.querySelector('#uppercanvas');
    let itemCanvas = document.querySelector('#itemcanvas');
    document.documentElement.style.cursor = 'none';
    document.documentElement.addEventListener('mouseenter',(e)=>{
        cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`}, {duration:0, fill:"forwards", easing:"ease-in-out"})
        cursor.style.display = 'block'
    })
    document.documentElement.addEventListener('mouseleave',()=>{
        cursor.style.display = 'none'
    })
    document.documentElement.addEventListener('contextmenu',()=>{return false;})
    document.querySelector("#uppercanvas").innerHTML = canvas.innerHTML;
    let inMainMenu = 1;
    const pi = 3.1415926535;
    let language = "en";
    document.querySelector(".toggle").addEventListener("click", ()=>{
        if(language == 'en'){
            document.querySelector('.slider').animate({left: 25+"px"}, {duration:300, fill:"forwards", easing:"ease-in-out"});
            language = 'vi';
        }
        else{
            document.querySelector('.slider').animate({left: 3.5+"px"}, {duration:300, fill:"forwards", easing:"ease-in-out"});
            language = 'en';
        }
    })
    let mouseOver = -1; // gives info about which .main .circle the mouse is currently over
    const scaleFactor = 0.05; // how much the cursor sticks to the .main .circle being hovered //currently unused.
    const distanceFactor = 1.2; //distanceFactor controls how far .item's are placed away from .main's.
    const cursorLag = 100; // how much the cursor lags behind the mouse, in milliseconds
    const topicMenuCircleRadius = 0.5; //the radius of topic menu circles (the menu that appears when you click on a .main .circle), unit = 50vh
    const topicMenuSpacing = 0.614; // distance between center of first topic menu circle to top of the page, unit = 50vh
    const trackSpeed = 2;
    // const innerCursor = document.querySelector('#innercursor');
    // this data was taken from the figma file with the weird ellipses
    // data is for w=4656, h=3311
    let circleData = [
        [360.2,662.8,598.8,"#403f4c",[]],
        [417.6,695.4,1664.4,"#07a0c3",[]],
        [166.2,3172.8,1771.8,"#fff1d0",[]],
        [261.6,4217.4,1487.4,"#ff686b",[]],
        [313.8,2700.2,377.2,"#f9dc5c",[]],
        [546.6,3532.4,2050.4,"#f0c808",[]],
        [293.4,4001.6,397.6,"#3185fc",[]],
        [579,2572,2236,"#dd1c1a",[]],
        [402.6,3272.4,1010.4,"#efbcd5",[]],
        [247.8,1221.2,2407.2,"#e5446d",[]],
        [708.6,1782.4,1122.5,"#e84855",[]],
        [309.6,494.4,2819.4,"#ff7d00",[]]
    ]

    cursor.style.width = "20px";
    cursor.style.height = "20px";
    for(let i = 0; i < 12; i++){
        let circle = document.querySelector(`#canvas > #circle${i+1}`);
        document.querySelector(`#uppercanvas > #circle${i+1}`).innerHTML += `<div class="circle" id="backdiv${i+1}"><p id="back${i+1}" style="display:none; font-size: 1.5em;"><i class="fa-duotone fa-arrow-left"></i>   Back</p></div>`;
        circle.style.width = 2*(circleData[i][0]/4656)*width+"px";
        circle.style.height = circle.style.width;
        circle.style.position = "absolute";
        circle.style.left = 2*(circleData[i][1]/4656)*width+(circleData[i][0]/4656)*width+"px";
        circle.style.top = 2*(circleData[i][2]/3311)*height+(circleData[i][0]/4656)*width+"px";
        circle.style.borderRadius = (circleData[i][0]/4656)*width+"px";
        circle.style.backgroundColor = circleData[i][3];
        let itemsList = document.querySelectorAll(`#canvas > #circle${i+1} > .item`);
        let imageContainer = document.querySelector(`#canvas > #circle${i+1} .imagecontainer`);
        imageContainer.style.height = "0px";
        imageContainer.style.width = "0px";
        for(let j = 0; j < itemsList.length; j++){
            itemsList[j].style.height = 2*(circleData[i][0]/4656)*width/3+"px";
            itemsList[j].style.width = 2*(circleData[i][0]/4656)*width/3+"px";
        }
        circle.addEventListener('mouseover', (e)=> {
            mouseOver = i; 
            imageContainer.animate({height: 2.01*(circleData[i][0]/4656)*width+"px", width: 2.01*(circleData[i][0]/4656)*width+"px"}, {duration:300, fill:"forwards", easing:"ease-in-out"});
            cursor.animate({height: `50px`, width:`50px`}, {duration:400, fill:"forwards", easing:"ease-in-out"});
            for(let j = 0; j < itemsList.length; j++){
                setTimeout(() => {itemsList[j].animate({top: `${(circleData[i][0]/4656)*width*(Math.sin((2*pi*j/itemsList.length)-pi/2)*4/3*distanceFactor)+(circleData[i][0]/4656)*width}px`, left:`${(circleData[i][0]/4656)*width*(Math.cos((2*pi*j/itemsList.length)-pi/2)*4/3*distanceFactor)+(circleData[i][0]/4656)*width}px`},{duration:400, fill:"forwards", easing:"ease-in-out"})}, 60*j)
            }
        })
        circle.addEventListener('mouseleave', (e)=> {
            mouseOver = -1;
            imageContainer.animate({height: "0px", width: "0px"}, {duration:200, fill:"forwards", easing:"ease-out"});
            cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`, height: "20px", width:"20px"}, {duration:4*cursorLag, fill:"forwards", easing:"ease-out"});
            for(let j = 0; j < itemsList.length; j++){
                setTimeout(() => {itemsList[j].animate({top: `${(circleData[i][0]/4656)*width}px`, left:`${(circleData[i][0]/4656)*width}px`},{duration:400, fill:"forwards", easing:"ease-in-out"})}, 60*j)
            }
        })
        // circle.addEventListener('mousedown', ()=>{
        //     circle.animate({height: 1*(circleData[i][0]/4656)*width+"px", width:1*(circleData[i][0]/4656)*width+"px"},{duration:400, fill:"forwards", easing:"ease-in-out"})
        // })
        // circle.addEventListener('mouseup', ()=>{
        //     circle.animate({height: 2*(circleData[i][0]/4656)*width+"px", width:2*(circleData[i][0]/4656)*width+"px"},{duration:400, fill:"forwards", easing:"ease-in-out"})
        // })
        //idea: make the circle shrink a bit on mousedown.
        let imageList = document.querySelectorAll(`#uppercanvas > #circle${i+1} > .item > img`)
        circle.addEventListener('click', (e)=> {
            mouseOver = -1;
            inMainMenu = 0;
            let mouseIsDown = 0;
            let clickPosition = 0; // x-coord of click position
            let previousScrollAmount = 0; // this is not a percentage, it's out of 1.
            function handleMouseMove(e){
                if(mouseIsDown && !inMainMenu){
                    let mouseMovement = e.clientX - parseFloat(clickPosition); 
                    upperCircle.animate({transform:`translate(${(clamp(previousScrollAmount+trackSpeed*mouseMovement/window.innerWidth, -1, 0)*50*totalTrackLength)+50*width/height-50*(topicMenuSpacing)}vh, 0%)`}, {duration:1200, fill:"forwards"}); // linear easing actually looks better here!
                    document.querySelector(`#back${i+1}`).animate({left:`${(clamp(-(previousScrollAmount+trackSpeed*mouseMovement/window.innerWidth), 0, 1)*40)+50}%`}, {duration:1200, fill:"forwards"}); 
                    for(let i = 0; i < imageList.length; i++){
                        imageList[i].animate({objectPosition:`${(clamp(previousScrollAmount+trackSpeed*mouseMovement/window.innerWidth, -1, 0)*100)+100}% 50%`}, {duration:1200, fill:"forwards"}); 
                    }
                    //TODO: when inserting actual, non-placeholder images, make sure tht they all have the same dimensions.
                }
            }
            function handleMouseUp(e){
                if(!inMainMenu){
                    mouseIsDown = 0;
                    previousScrollAmount+=(trackSpeed*(e.clientX - parseFloat(clickPosition))/window.innerWidth);
                    previousScrollAmount = clamp(previousScrollAmount, -1, 0);
                }
            }
            function handleMouseDown(e){
                if(!inMainMenu){
                    clickPosition = e.clientX;
                    mouseIsDown = 1;
                }
            }
            document.documentElement.addEventListener('mousedown', handleMouseDown)
            document.documentElement.addEventListener('mouseup', handleMouseUp)
            document.documentElement.addEventListener('mousemove', handleMouseMove)
            upperCanvas.style.display = "block";
            cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`, height: "20px", width:"20px"}, {duration:4*cursorLag, fill:"forwards", easing:"ease-out"});
            let circlePos = circle.getBoundingClientRect();
            let upperCircle = document.querySelector(`#uppercanvas > #circle${i+1}`);
            upperCircle.style.position = "absolute";
            upperCircle.style.top = circlePos.top+(circleData[i][0]/4656)*width+"px";
            upperCircle.style.left = circlePos.left+(circleData[i][0]/4656)*width+"px";
            upperCircle.style.height = 2*(circleData[i][0]/4656)*width+"px";
            upperCircle.style.width = 2*(circleData[i][0]/4656)*width+"px";
            upperCircle.style.display = "block";
            upperCircle.style.backgroundColor = circleData[i][3];
            upperCircle.animate(
                [
                    {
                        height: 2*(circleData[i][0]/4656)*width+"px",
                        width: 2*(circleData[i][0]/4656)*width+"px",
                        backgroundColor: circleData[i][3]
                    },
                    {
                        height:"200vw", 
                        width: "200vw", 
                        backgroundColor:"#181417"
                    }
                ], 
                {duration:500, fill: "forwards", direction: "normal", easing:"ease-in-out"});
            let itemsList2 = document.querySelectorAll(`#uppercanvas > #circle${i+1} > .item`);
            const commonCircleSpacing = Math.sqrt((topicMenuCircleRadius+topicMenuSpacing)**2-(4*(1-topicMenuSpacing)**2)); 
            const totalTrackLength = commonCircleSpacing*(itemsList2.length - 1); // total length of the track of images, unit: 50vh.
            setTimeout(()=>{
                upperCircle.style.top = "0px";
                upperCircle.style.left = "0px";
                //upperCircle.animate({top: "0px", left: "0px"}, {duration: 0, fill: "forwards"}); // to other developers: don't ask
                upperCircle.style.borderRadius = "0px";
                upperCircle.style.height = "100vh";
                upperCircle.style.width = "fit-content";
                upperCircle.style.transform = `translate(${50*width/height-50*topicMenuSpacing}vh, 0%)`
                upperCircle.style.visibility = "hidden"
                canvas.style.display = "none";
                lowerCanvas.style.display = "none";
                const backdiv = document.querySelector(`#backdiv${i+1}`);
                const back = document.querySelector(`#back${i+1}`);
                back.style.position = "absolute";
                back.style.top = "50%";
                back.style.left = "50%";
                back.style.display = "block"
                back.style.transform = "translate(-50%, -50%)";
                backdiv.style.transform = "translate(-50%, -50%)"
                backdiv.style.position = "absolute";
                backdiv.style.visibility = "visible";
                backdiv.style.width = topicMenuCircleRadius*100+"vh";
                backdiv.style.height = topicMenuCircleRadius*100+"vh"; 
                backdiv.style.display = "block";
                backdiv.style.left = topicMenuSpacing*50 + "vh";
                backdiv.style.backgroundColor = "#282828";
                backdiv.style.top = -topicMenuCircleRadius*50+"vh";
                setTimeout(()=>{(backdiv.animate({top: `${topicMenuSpacing*50}vh`, left:topicMenuSpacing*50+"vh"},{duration:400, fill:"forwards", easing:"cubic-bezier(0, 0.6, 0.5, 1)"}))},0)
                //circle arrangement from https://www.desmos.com/calculator/mluzazvbxz (a = topicMenuSpacing, p = topicMenuCircleRadius)

                let xPos = topicMenuSpacing + commonCircleSpacing;

                for(let i = 0; i < itemsList2.length; i++){
                    upperCanvas.style.zIndex = 5;
                    itemsList2[i].style.position = "absolute";
                    itemsList2[i].style.visibility = "visible";
                    itemsList2[i].style.display = "block";
                    itemsList2[i].style.left = xPos*50 + "vh";
                    itemsList2[i].style.borderRadius = "0px";
                    itemsList2[i].style.clipPath = "circle(40.0% at 50% 50%)";
                    itemsList2[i].style.width = topicMenuCircleRadius*125+"vh";
                    itemsList2[i].style.height = topicMenuCircleRadius*125+"vh";   
                    itemsList2[i].style.transform = "translate(-50%, -50%)";
                    itemsList2[i].id = `item${i}`
                    if(i % 2 == 1){
                        itemsList2[i].style.top = -topicMenuCircleRadius*50+"vh";
                        setTimeout(()=>{(itemsList2[i].animate({top: `${topicMenuSpacing*50}vh`, left:`${((topicMenuSpacing+(i+1)*commonCircleSpacing))*50}vh`},{duration:400, fill:"forwards", easing:"cubic-bezier(0, 0.6, 0.5, 1)"}))}, 60*(i+1))
                        setTimeout(()=>{itemsList2[i].style.top = `${topicMenuSpacing*50}vh`}, 60*(i+1)+400)
                    }
                    else{
                        itemsList2[i].style.top = 100 + topicMenuCircleRadius*50+"vh";
                        setTimeout(()=>{(itemsList2[i].animate({top: `${100 - topicMenuSpacing*50}vh`, left:`${((topicMenuSpacing+(i+1)*commonCircleSpacing))*50}vh`},{duration:400, fill:"forwards", easing:"cubic-bezier(0, 0.6, 0.5, 1)"}))}, 60*(i+1))
                        setTimeout(()=>{itemsList2[i].style.top = `${100 - topicMenuSpacing*50}vh`}, 60*(i+1)+400)
                    }
                    itemsList2[i].style.zIndex = 1;
                    itemsList2[i].style.pointerEvents = "auto";
                    xPos += commonCircleSpacing;
                }
                for(let i = 0; i < itemsList2.length; i++){
                    console.log(`#item${i}`)
                    document.querySelector(`#item${i}`).addEventListener('mouseover', ()=>{
                        cursor.animate({height: '50px', width: '50px', mixBlendMode: 'normal'}, {duration:200, fill:"forwards", easing:"ease-in-out"})
                    })
                    document.querySelector(`#item${i}`).addEventListener('mouseleave', ()=>{
                        cursor.animate({height: '20px', width: '20px', mixBlendMode: 'normal'}, {duration:200, fill:"forwards", easing:"ease-in-out"})
                    })
                    // document.querySelector(`#item${i}`).addEventListener('dblclick', ()=>{
                    //     itemCanvas.innerHTML = "";
                    //     itemCanvas.innerHTML += itemsList2[i].outerHTML;
                    //     const itemDiv = document.querySelector(`#itemcanvas > #item${i}`);
                    //     const box = document.querySelector(`#item${i}`).getBoundingClientRect();
                    //     itemDiv.style.top = box.top;
                    //     const zoomFactor = (box.bottom-box.top)/document.querySelector(`#itemcanvas > #item${i} > img`).naturalHeight;
                    //     itemDiv.style.left = parseFloat(box.left) + ((clamp(previousScrollAmount, -1, 0)*50*totalTrackLength)+50*width/height)*height/100 - clamp(previousScrollAmount, -1, 0)*(document.querySelector(`#itemcanvas > #item${i} > img`).naturalWidth*zoomFactor-(box.bottom-box.top)) + "px"
                    //     itemDiv.style.clipPath = "inset(0 0 0 0)";
                    //     itemDiv.style.objectFit = "cover";
                    //     itemDiv.animate({top: "50vh", left:"50vw", height:"100vh", width: "100vw"}, {duration:400, fill:"forwards", easing: "ease-out"});
                    //     itemCanvas.style.clipPath = `circle(${(box.bottom-box.top)/5*2}px at ${parseFloat(box.left) + ((clamp(previousScrollAmount, -1, 0)*50*totalTrackLength)+50*width/height)*height/100}px ${(box.top+box.bottom)/2}px)`
                    //     itemCanvas.animate({clipPath: `circle(${(box.bottom-box.top)/5*20}px at ${parseFloat(box.left) + ((clamp(previousScrollAmount, -1, 0)*50*totalTrackLength)+50*width/height)*height/100}px ${(box.top+box.bottom)/2}px)`}, {duration:1000, fill:"forwards", easing: "ease-out"});
                    // })
                }
                document.querySelector(`#backdiv${i+1}`).style.zIndex = 2;
                
                document.querySelector(`#backdiv${i+1}`).addEventListener('mouseover', ()=>{
                    cursor.animate({height: '50px', width: '50px', mixBlendMode: 'normal'}, {duration:200, fill:"forwards", easing:"ease-in-out"})
                })
                document.querySelector(`#backdiv${i+1}`).addEventListener('mouseleave', ()=>{
                    cursor.animate({height: '20px', width: '20px', mixBlendMode: 'normal'}, {duration:200, fill:"forwards", easing:"ease-in-out"})
                })
                document.querySelector(`#backdiv${i+1}`).addEventListener('click', (e)=>{
                    document.querySelector(`#backdiv${i+1}`).animate({height:"200vw", width: "200vw", backgroundColor:"#181417"}, {duration:500, fill:"forwards", easing:"ease-in-out"});
                    document.querySelector(`#back${i+1}`).animate({opacity: 0}, {duration:500, fill:"forwards", easing:"ease-in-out"});

                    setTimeout(()=>{
                        backdiv.style.display = "none";
                        for(let i = 0; i < itemsList2.length; i++){
                            itemsList2[i].style.display = 'none';
                        }
                        document.querySelector(`#backdiv${i+1}`).animate({height:"200vw", width: "200vw", backgroundColor:"#181417"}, {duration:0, fill:"forwards", easing:"ease-in-out", direction: "reverse"});
                        document.querySelector(`#back${i+1}`).animate({opacity: 0}, {duration:0, fill:"forwards", easing:"ease-in-out", direction: "reverse"});
                        upperCircle.animate(
                            [
                                {
                                    height:"200vw", 
                                    width: "200vw", 
                                    backgroundColor:"#181417"
                                    
                                },
                                {
                                    height: 2*(circleData[i][0]/4656)*width+"px",
                                    width: 2*(circleData[i][0]/4656)*width+"px",
                                    backgroundColor: circleData[i][3]
                                }
                            ], 
                            {duration:0, fill: "forwards", easing:"ease-in-out"});
                        upperCircle.removeAttribute('style');
                        upperCircle.replaceWith(upperCircle.cloneNode(true))
                        upperCircle.style.display = 'none';
                        upperCircle.style.transform = 'translate(-50%, -50%)';
                        upperCanvas.style.display = 'none';
                        canvas.style.display = 'block';
                        lowerCanvas.style.display = 'block';
                        canvas.animate({opacity: 0}, {duration:0, fill:"forwards", easing:"ease-in-out"})
                        lowerCanvas.animate({opacity: 0}, {duration:0, fill:"forwards", easing:"ease-in-out"});
                        canvas.animate({opacity: 1}, {duration:500, fill:"forwards", easing:"ease-in-out"})
                        lowerCanvas.animate({opacity: 1}, {duration:500, fill:"forwards", easing:"ease-in-out"});
                        inMainMenu = 1;
                        document.querySelector('#canvas').animate({transform: `translate(${-55*e.clientX/width-30}%, ${-60*e.clientY/height-27}%)`}, {duration:0, fill:"forwards", easing:"ease-in-out"})
                        document.querySelector('#lowercanvas').animate({transform: `translate(${-45*e.clientX/width-30}%, ${-50*e.clientY/height-27}%)`}, {duration:0, fill:"forwards", easing:"ease-in-out"})
                        document.documentElement.removeEventListener('mousedown', handleMouseDown)
                        document.documentElement.removeEventListener('mouseup', handleMouseUp)
                        document.documentElement.removeEventListener('mousemove', handleMouseMove)
                    }, 500)
                })

            }, 500)
            let imageList = document.querySelectorAll(`#uppercanvas > #circle${i+1} > .item > img`)
            for(let i = 0; i < imageList.length; i++){
                imageList[i].style.objectPosition = '100% 50%'
            }


            // upperCircle.

            cursor.style.zIndex = 9;
            cursor.style.mixBlendMode = "normal";
        })
    }

    window.addEventListener('mousemove', (e)=> {
        if(inMainMenu){
            if(mouseOver == -1){
                cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`}, {duration:cursorLag, fill:"forwards", easing:"ease-in-out"});
            }
            else{
                cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`}, {duration:cursorLag, fill:"forwards", easing:"ease-in-out"});
            }
            document.querySelector('#canvas').animate({transform: `translate(${-55*e.clientX/width-30}%, ${-60*e.clientY/height-27}%)`}, {duration:750, fill:"forwards", easing:"ease-in-out"})
            document.querySelector('#lowercanvas').animate({transform: `translate(${-45*e.clientX/width-30}%, ${-50*e.clientY/height-27}%)`}, {duration:750, fill:"forwards", easing:"ease-in-out"})
        }
        else{
            cursor.animate({top:`${e.clientY}px`, left:`${e.clientX}px`}, {duration:cursorLag, fill:"forwards", easing:"ease-in-out"});
        }
    })
    // document.documentElement.addEventListener('mousedown', ()=>{
    //     cursor.style.height = 0.8 * parseFloat(cursor.style.height) + "px";
    //     cursor.style.width = 0.8 * parseFloat(cursor.style.width) + "px";
    // })
    // document.documentElement.addEventListener('mouseup', ()=>{
    //     cursor.style.height = 1.25 * parseFloat(cursor.style.height) + "px";
    //     cursor.style.width = 1.25 * parseFloat(cursor.style.width) + "px";
    // })
}

// const objectData = [
//     [1017, 96, 42, "#403f4c"], 
//     [696, 417, 1386, "#07a0c3"], 
//     [277, 3062, 1731, "#fff1d0"], 
//     [436, 3943, 1513, "#ff686b"], 
//     [523, 2491, 168, "#f9dc5c"], 
//     [911, 3468, 2286, "#f0c808"], 
//     [489, 3806, 202, "#3185fc"], 
//     [965, 1986, 2050, "#dd1c1a"], 
//     [671, 3004, 742, "#efbcd5"], 
//     [413, 1056, 2242, "#e5446d"], 
//     [1181, 1310, 550, "#e84855"], 
//     [516, 288, 2613, "#ff7d00"]]