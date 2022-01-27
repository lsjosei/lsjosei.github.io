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
    constructor(position, size, element){
        this.position = position
        this.moveDir
        this.generateNewDirection()
        this.dimensions = size
        this.color = 0
        this.element = element
        this.updateDisplay()
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


        if (hit[0] || hit[1])
        {
            hitsTotal += 1
            this.color += 180 -Math.floor(Math.random()*90);
            dvdElement.style.filter ="hue-rotate("+this.color+"deg)"
            hitsTotalElement.innerHTML = hitsTotal;
        }
        if (hit[0] && hit[1])
        {
            hitsCorner += 1
            hitsCornerElement.innerHTML = hitsCorner;
        }

        this.updateDisplay()
    }
    updateDisplay(){
        /*
        *Actualiza la posicion del div
        */
        this.element.style.left = this.position.x - this.dimensions.x / 2 + "px";
        this.element.style.top = this.position.y - this.dimensions.y +"px";
    }

    generateNewDirection()
    {
        /*
        *Genera una nueva direccion aleatoria
        */
        this.moveDir = new Vector2(
            [1,-1][Math.floor(Math.random() *2)],
            [1,-1][Math.floor(Math.random() *2)]
        )
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
    console.log(state)
    if (state == "Hide Stats")
    {
        console.log("hiding")
        statsElement.style.display = "none"
        toggleStatsElement.innerHTML = "Show Stats"

    }
    else if ( state == "Show Stats")
    {
        console.log("showing")
        statsElement.style.display = "block"
        toggleStatsElement.innerHTML = "Hide Stats"

    }
    console.log("hey")
})

let hitsTotal = 0
let hitsCorner = 0

let position = new Vector2(
    100 + Math.floor((screenSize.x - 200) * Math.random()),
    100 + Math.floor((screenSize.y - 200) * Math.random()))


const ball = new Ball(
    position,
    new Vector2(80,40),
    ballElement)

ball.updateDisplay()


window.setInterval(() => ball.move(),7);