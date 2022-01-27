class Vector2{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    normalize()
    {
        /*
        *Devuelve un vector con misma orientacion pero magnitud == 1
        */
        let magnitude = Math.sqrt(this.x * this.x + this.y * this.y)
        this.x /= magnitude
        this.y /= magnitude
    }
}

function sumVectors(v1, v2)
{
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
}

class Ball{
    constructor(size, element){
        this.position
        this.moveDir
        this.initializePositionAndDirection()
        this.dimensions = size
        this.color = 0
        this.element = element
        this.updateDisplay()

        this.hasHitCorner = true
        this.flashCounter = 0
        this.flashCounterReset = 20
    }
    
    move(){
        /*
        *desplaza la bola sumando moveDir a position
        *si esto se sale de la pantalla invierte el vector de direccion
        *x o y correspondiente
        */
        let hit = [false, false];
        let desiredPosition = sumVectors(this.position, this.moveDir)
        let xCondition = desiredPosition.x >= this.dimensions.x/2 && desiredPosition.x <= screenSize.x - this.dimensions.x/2
        let yCondition  = desiredPosition.y >= this.dimensions.y/2 && desiredPosition.y <= screenSize.y - this.dimensions.y/2
        if (xCondition)
        {
            this.position.x = desiredPosition.x;
        }
        else{
            this.moveDir.x *= -1
            this.position.x += this.moveDir.x
            hit[0] = true
        }


        if (yCondition)
        {
            this.position.y = desiredPosition.y;
        }
        else{
            this.moveDir.y *= -1
            this.position.y += this.moveDir.y
            hit[1] = true
     
        }


        if (hit[0] && hit[1])
        {

            this.hasHitCorner = true
            this.flashCounter = this.flashCounterReset
            hitsCorner += 1
            hitsTotal += 1
        }
        else if (hit[0] || hit[1])
        {
            this.hasHitCorner = false
            hitsTotal += 1
            this.color += (90 + Math.floor(Math.random()*180)) * [-1,1][Math.floor(Math.random() * 2)];
        }

        this.updateDisplay()
    }
    updateDisplay(){
        /*
        *Actualiza la posicion del div
        */
        this.element.style.left = this.position.x - this.dimensions.x / 2 + "px";
        this.element.style.top = this.position.y - this.dimensions.y +"px";

        hitsTotalElement.innerHTML = hitsTotal;
        hitsCornerElement.innerHTML = hitsCorner;


        if (this.hasHitCorner)
        {
            this.flashCounter -= 1
            if (this.flashCounter < 1)
            {
                this.color += (90 + Math.floor(Math.random()*180)) * [-1,1][Math.floor(Math.random() * 2)];
                this.flashCounter = this.flashCounterReset

            }
        }

        dvdElement.style.filter ="hue-rotate("+this.color+"deg)"
    }

    initializePositionAndDirection()
    {

        /*
        *Genero una posicion+direction simulando haber chocado con una esquina para asegurar
        *que la trayectoria incluye  mas esquinas
        */
        let x = 100 + Math.floor(Math.random() * (screenSize.x - 200))
        let y
        let r = Math.random();

        if (x < screenSize.x / 2 && r < .5)
        {
            y = x 
            this.moveDir = new Vector2(1,1)
        }
        else if (x < screenSize.x / 2)
        {
            y = screenSize.y - x
            this.moveDir = new Vector2(1,-1)
        }
        else if (r < .5)
        {
            y = screenSize.x - x
            this.moveDir = new Vector2(-1,1)
        }
        else
        {
            y = screenSize.y - (screenSize.x - x)
            this.moveDir = new Vector2(-1,-1)
        }

        this.position = new Vector2(x,y)
    }
}

const screenSize = new Vector2(500, 380)
const ballElement = document.getElementById("ball")
const dvdElement = document.getElementById("dvd")

const hitsTotalElement = document.getElementById("hits--total")
const hitsCornerElement = document.getElementById("hits--corner")

const toggleStatsElement = document.getElementById("button--stats")
const statsElement = document.getElementById("stats")

toggleStatsElement.addEventListener("click", ()=>{
    let state = toggleStatsElement.innerHTML
    if (state == "Hide Stats")
    {
        statsElement.style.display = "none"
        toggleStatsElement.innerHTML = "Show Stats"

    }
    else if ( state == "Show Stats")
    {
        statsElement.style.display = "block"
        toggleStatsElement.innerHTML = "Hide Stats"

    }
})


let hitsTotal = 0
let hitsCorner = 0


const ball = new Ball(
    new Vector2(80,40),
    ballElement)


for (let i = 0; i < Math.floor(2000+100000*Math.random()); i++)
{
    ball.move()
}

hitsTotal = 0
hitsCorner = 0


ball.updateDisplay()


let myInterval = window.setInterval(() => ball.move(),7);