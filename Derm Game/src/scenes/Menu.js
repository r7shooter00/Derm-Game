//Starting menu scene
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.image('background', './assets/background.png');
        this.load.image('marker', './assets/marker.png');
        this.load.image('side_view', './assets/Side_view.png');
    }

    create()
    {
        //anatomy skin side view
        this.sideView = this.add.tileSprite(640, 0, 640, 480, 'side_view').setOrigin(0, 0);

        //top down view
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        //space key object
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //start point and end point of inputted line
        this.startPoint;
        this.endPoint;

        //is the player holding left click? To determine the exact instance that the player left clicks
        this.holdClick = false;

        //did the player just release the left click? To determine the exact instance that the player releases left click
        this.justReleased = true;

        //group object to hold and access all markers created by the player
        this.markers = this.add.group();

        //group object to hold and access all the lines generated when markers are added
        this.markerLines = this.add.group();

        //the original y coordinate of the created markers
        this.originalMarkers = [];

        //true = top down view, false = side view; for the program to know whether the original marker
        //was created in the top down view or the side view
        this.viewLabels = [];
    }

    update()
    {
        //If the player left clicks, and it's the exact moment that the player first left clicks
        if (this.input.activePointer.leftButtonDown()) //&& !this.holdClick)
        {
            this.holdClick = true;
            this.justReleased = false;

            //create a sprite where the player clicked
            this.startPoint = this.markers.create(this.input.mousePointer.worldX, this.input.mousePointer.worldY, 'marker');

            //store the original y value of the created marker
            this.originalMarkers.push(this.input.mousePointer.worldY);

            //If the top down view is active push true, if the side view is active, push false
            if(this.background.visible)
                this.viewLabels.push(true);
            else
                this.viewLabels.push(false);
        }

        //If the player releases left clicks, and it's the exact moment that the player releases left click
        /*
        else if(this.input.activePointer.leftButtonReleased() && !this.justReleased)
        {
            this.holdClick = false;
            this.justReleased = true;

            //create a sprite where the player released left click
            //this.endPoint = this.add.sprite(this.input.mousePointer.worldX, this.input.mousePointer.worldY, 'marker');
            this.endPoint = this.markers.create(this.input.mousePointer.worldX, this.input.mousePointer.worldY, 'marker');

            //store the original y value of the created marker
            this.originalMarkers.push(this.input.mousePointer.worldY);

            //create a line connecting the two sprites the player created
            this.markerLines.add(this.add.line(0, 0, this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y, 0x000000).setOrigin(0,0));

            //mirrors the inputs to the other view
            if(this.input.mousePointer.worldX < 640)
            {
                this.markers.create(this.startPoint.x + 640, 320, 'marker');
                this.markers.create(this.endPoint.x + 640, 320, 'marker');
                this.markerLines.add(this.add.line(0, 0, this.startPoint.x + 640, 320, this.endPoint.x + 640, 320, 0x000000).setOrigin(0,0));
            }
            else
            {
                this.markers.create(this.startPoint.x - 640, 240, 'marker');
                this.markers.create(this.endPoint.x - 640, 240, 'marker');
                this.markerLines.add(this.add.line(0, 0, this.startPoint.x - 640, 240, this.endPoint.x - 640, 240, 0x000000).setOrigin(0,0));
            }

            //if the top down view is active when the marker is created, push true.
            //if the side view is active when the marker iS created, push false.
            if(this.background.visible)
                this.viewLabels.push(true);
            else
                this.viewLabels.push(false);
        }
        /*

        /*
        //If the player presses space bar, switch views
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar))
        {
            if(this.background.visible)
            {
                this.background.visible = false;
                this.sideView.visible = true;

                //turn the group object into arrays for iterating
                this.markersArray = this.markers.getChildren();
                this.markersArrayLength = this.markersArray.length;
                this.markerLinesArray = this.markerLines.getChildren();
                this.markerLinesArrayLength = this.markerLinesArray.length;

                for (let i = 0; i < this.markersArrayLength; i++)
                {
                    //depending on which view the marker was created, adjust the y value accordingly
                    if(this.viewLabels[i])
                        this.markersArray[i].y = 320;
                    else
                        this.markersArray[i].y = this.originalMarkers[i];
                }
                
                for(let i = 0; i < this.markerLinesArrayLength; i++)
                {
                    //remap the endpoints of each line to match the new location of the markers
                    this.markerLinesArray[i].setTo(this.markersArray[i*2].x, this.markersArray[i*2].y, this.markersArray[(i*2)+1].x, this.markersArray[(i*2)+1].y);
                }
            }
            else
            {
                this.background.visible = true;
                this.sideView.visible = false;

                //turn the group object into arrays for iterating
                this.markersArray = this.markers.getChildren();
                this.markersArrayLength = this.markersArray.length;
                this.markerLinesArray = this.markerLines.getChildren();
                this.markerLinesArrayLength = this.markerLinesArray.length;
                
                for (let i = 0; i < this.markersArrayLength; i++)
                {
                    //depending on which view the marker was created, adjust the y value accordingly
                    if(this.viewLabels[i])
                        this.markersArray[i].y = this.originalMarkers[i];
                    else
                        this.markersArray[i].y = 240;
                }
                                
                for(let i = 0; i < this.markerLinesArrayLength; i++)
                {
                    //remap the endpoints of each line to match the new location of the markers
                    this.markerLinesArray[i].setTo(this.markersArray[i*2].x, this.markersArray[i*2].y, this.markersArray[(i*2)+1].x, this.markersArray[(i*2)+1].y);
                }
            }
        }
        */
    }
}