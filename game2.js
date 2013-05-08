// create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x999, true);

        // create a renderer instance
        if(window.innerWidth>800)
        {
            var renderer = PIXI.autoDetectRenderer(1750, 2308, null, true);
            var width = 1000;
        }
        else
        {
            var renderer = PIXI.autoDetectRenderer(window.innerWidth, 2308, null, true);
            var width = window.innerWidth;
        }


        // add the renderer view element to the DOM
        document.body.appendChild(renderer.view);
        renderer.view.style.position = "absolute";
        renderer.view.style.top = "0px";

        renderer.view.style.left = ""+((window.innerWidth/2)-800)+"px";
        
        // Determine the starting place of each frame for the moving background
        var bgDrawY1 = 0;
        var bgDrawY2 = -2038;
        var bgDrawY3 = 2308;
        
        //Number of lives
        var lives = 3;

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("myplane.png");
        var texture2 = PIXI.Texture.fromImage("badguy.png");
        var texture3 = PIXI.Texture.fromImage("Rocket.png");
        var texture4 = PIXI.Texture.fromImage("boom.png");
        var texture5 = PIXI.Texture.fromImage("explosion.png");
        var texture6 = PIXI.Texture.fromImage("Floor.png");
        var texture7 = PIXI.Texture.fromImage("badGuyFire.png");
        
        
        //Adding background to the container
        var imgSprite = new PIXI.Sprite(texture6);
        //imgSprite.anchor.x = 0;
        //imgSprite.anchor.y = 0;
        var imgSprite2 = new PIXI.Sprite(texture6);
        //imgSprite2.anchor.x = 0;
        //imgSprite2.anchor.y = 0;
        var imgSprite3 = new PIXI.Sprite(texture6);
        //imgSprite3.anchor.x = 0;
        //imgSprite3.anchor.y = 0;
        
        var fire = new PIXI.Sprite(texture4);
        fire.scale.x=fire.scale.y=0.2;
        var explosion = new PIXI.Sprite(texture5);
        //fire.scale.x=fire.scale.y=0.5;
        
        container = new PIXI.DisplayObjectContainer();
        stage.addChild(container);
        
        container.addChild(imgSprite3,0,bgDrawY3);
        container.addChild(imgSprite);
        container.addChild(imgSprite2,0,bgDrawY2);
        for(var i=0 ; i < 10 ; i++){
            requestAnimFrame( moveBg );
        }

        var myplane = new PIXI.Sprite(texture);  
        createMyplane(Math.random() * width, Math.random() * window.innerHeight);
        var score=0;
        var shooting = false ;

        function createMyplane(x, y)
        {

            // enable the myplane to be interactive.. this will allow it to respond to mouse and touch events		
            myplane.setInteractive(true);

           // center the myplanes anchor point
            myplane.anchor.x = 0.25;
            myplane.anchor.y = 0.25;
            myplane.scale.x = myplane.scale.y =2;
            this.dragging = true;
            // set the callbacks for when the mouse or a touch moves
            myplane.mousemove = myplane.touchmove = function(data)
            { 
                this.dragging = true;
                this.data = data;
                this.alpha = 0.9;
                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;

            };

            myplane.mousedown = myplane.touchstart = function(data)
            {
                this.dragging = true;
                shooting=true;
            };

            // set the events for when the mouse is released or a touch is released
            myplane.mouseup = myplane.mouseupoutside = myplane.touchend = myplane.touchendoutside = function(data)
            {
                this.dragging = true;
                shooting=false;
            };

            // move the sprite to its designated position
            myplane.position.x = x;
            myplane.position.y = y;

            // add it to the stage
            container.addChild(myplane);
        }


        var elashrar=[];
        var narelashrar=[];
        var tid = setInterval(addBad, 2000);


         function addBad()
         {       

                var badguy = new PIXI.Sprite(texture2);
                var badGuysFire = new PIXI.Sprite(texture7);
                badguy.position.x = (Math.random()* width);
                badGuysFire.position.x = badguy.position.x + 10;

               // badguy.scale.x = badguy.scale.y =0.75;
                badguy.anchor.x = badguy.anchor.y=0.5;
                badGuysFire.anchor.x = badGuysFire.anchor.y=0.5;
                //badGuysFire.scale.x = badGuysFire.scale.y = 0.5;
                elashrar.push(badguy);
                narelashrar.push(badGuysFire);
                container.addChild(badguy);
                container.addChild(badGuysFire);
                requestAnimFrame( moveBadguys );
                requestAnimFrame( moveBadGuysFire );
                badguy.end =false;
                badguy.life=true;
        }

        function abortTimer()
        { // to be called when you want to stop the timer
                clearInterval(tid);
        }

                var steps=0;
        function moveBadguys() 
        {

               for (var i = 0; i < elashrar.length; i++) 
                {

                        if(steps%10==0){
                            var xMove= - 10;
                        }else{
                            var xMove = 1;
                        }

                        elashrar[i].position.x += xMove;
                        elashrar[i].position.y += 1;
                        narelashrar[i].position.x += xMove;
                        narelashrar[i].position.y += 4;
                        if(elashrar[i].position.y == window.height ){
                           elashrar[i].end =true;
                           if(elashrar[i].life){
                               // container.removeChild(elashrar[i]);
                               elashrar[i].visible=false;
                               elashrar[i].life=false;
                           }
                        }
                        if(elashrar[i].life){
                         if((elashrar[i].position.y > myplane.position.y-50)&&(elashrar[i].position.y < myplane.position.y+50))
                            {
                                if((elashrar[i].position.x > myplane.position.x-50)&&(elashrar[i].position.x < myplane.position.x+50))
                                {
                                   
                                    explosion.position.x=elashrar[i].position.x;
                                    explosion.position.y=elashrar[i].position.y;
                                    explosion.anchor.x= fire.anchor.y=0.5;
                                    container.addChild(explosion);
                                    firing.push(explosion);
                                    elashrar[i].visible=false;
                                    elashrar[i].life=false;
                                }
                            }
                        }
                }
                steps++;
                renderer.render(stage);
                requestAnimFrame(moveBadguys);

        }
        var rockets = [];
        var t = setInterval(shoot, 100);

        function shoot(){

             if(shooting){
            //var rocket = new PIXI.Sprite(texture3);

                var rocket = new PIXI.Sprite(texture3);
                    rocket.position.x=myplane.position.x;
                    rocket.position.y=myplane.position.y;
                    rocket.setInteractive(true);
                    rocket.scale.x = rocket.scale.y =0.3;
                    rocket.anchor.x = 0.5;
                    rocket.anchor.y = 0.5;
                    rocket.speedY=Math.random() *10;
                    rocket.end=false;
                    rocket.life=true;
                    rockets.push(rocket);
                    container.addChild(rocket);    
                    requestAnimFrame( rocketMove );
             }
        }

        function abort() 
        { // to be called when you want to stop the timer
                clearInterval(t);

        }
        var firing=[];
        function rocketMove()
        {
            for(var i=0;i<rockets.length;i++)
            {

                rockets[i].position.y -= (rockets[i].speedY)%6+3 ;


                 if(rockets[i].position.y<=0 ){
                   rockets[i].end=true  ; 
                   if(rockets[i].life)
                   container.removeChild(rockets[i]);

                }else{

                    for(var x=0;x<elashrar.length;x++) // checkig for "darb "
                    {
                        if(elashrar[x].life && rockets[i].life){

                        if((rockets[i].position.y > elashrar[x].position.y-50)&&(rockets[i].position.y < elashrar[x].position.y+50))
                            {
                                if((rockets[i].position.x > elashrar[x].position.x-80)&&(rockets[i].position.x < elashrar[x].position.x+80))
                            {
                                     score++;

                                 var fire = new PIXI.Sprite(texture4);
                                     fire.scale.x=fire.scale.y=0.2;
                                     fire.position.x=rockets[i].position.x;
                                     fire.position.y=rockets[i].position.y;
                                     fire.anchor.x= fire.anchor.y=0.5;
                                     firing.push(fire);

                                    if(rockets[i].life && elashrar[x].life){

                                      rockets[i].visible=false;
                                      rockets[i].life=false;
                                      container.addChild(fire);
                                      elashrar[x].visible=false;
                                      elashrar[x].life=false;
                                    }
                             }

                                     break;

                            }
                        }
                     }
                  }
                }


            var temp=[];
         for(var i=0;i<rockets.length;i++)
            {
                  var b =rockets.slice(i,i+1);
                   if(b[0].end == false)
                   {
                       temp.push(b[0]);
                   }
             }
             rockets=temp;
             renderer.render(stage);
             requestAnimFrame(rocketMove);


        }
        var f = setInterval(removeFire, 60);

        function removeFire(){
            for(var i =0 ;i<firing.length;i++)
            {
                container.removeChild(firing[i]);
                firing.pop();
            }
        }
        
        function moveBg(){
            bgDrawY1 += 1;
            bgDrawY2 += 1;
            bgDrawY3 += 1;
            if (bgDrawY1 >= 2*2308){
                bgdrawY1 = -2308;
            }
            else if (bgDrawY2 >= 2*2308){
                bgDrawY2 = -2308;
            }
            if (bgDrawY3 >= 2*2308){
                bgDrawY3 = -2308;
            }
            imgSprite.position.y = bgDrawY1;
            imgSprite2.position.y = bgDrawY2;
            imgSprite3.position.y = bgDrawY3;
            renderer.render(stage);
            requestAnimFrame(moveBg);
        }
        function moveBadGuysFire(){
            for (var i = 0; i < narelashrar.length; i++)
            {
                var xMove;
                if((steps%10) == 0){
                    xMove = - 10;
                }
                else{
                    xMove = 1;
                }
                narelashrar[i].position.x += xMove;
                narelashrar[i].position.y += 2;
                       
                if((narelashrar[i].position.y >= myplane.position.y) && (narelashrar[i].position.y <= myplane.position.y + myplane.height)&&(narelashrar[i].position.x >= myplane.position.x)&&(narelashrar[i].position.x <= myplane.position.x + myplane.width))
                {
                    lives-- ;
                    explosion.position.x=myplane.position.x;
                    explosion.position.y=myplane.position.y;
                    explosion.anchor.x= fire.anchor.y=0.5;
                    container.addChild(explosion);
                    firing.push(explosion);
                    myplane.visible = false;
                    if(lives == 0){
                        myplane.visible = false;
                    }else{
                        myplane.visible = true;
                    }
                }
            }
            steps++;
            renderer.render(stage);
            requestAnimFrame(moveBadGuysFire);
        }
