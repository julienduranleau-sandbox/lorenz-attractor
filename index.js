class Game {
    constructor() {
        createCanvas(window.innerWidth, window.innerHeight, WEBGL)

        this.SIGMA = 10
        this.RHO = 28
        this.BETA = 8 / 3
        this.spd = 0.01
        this.pos = new p5.Vector(0.1, 0.1, 0.1)
        this.yRotation = 0
        this.scaleOffset = 0
        this.stats = new Stats()
        this.lockState = false

        this.pointList = []
        this.pointList2 = []

        this.toggleBt = createButton('Toggle drawing')
        this.toggleBt.class('button -regular')
        this.toggleBt.position(width - 130, 20)
        this.toggleBt.mousePressed(() => this.toggleDrawing())

        document.body.appendChild(this.stats.dom)
    }

    draw() {
        background(10, 10, 10)

        if (! this.lockState) {
            this.addNewPoint()
        }

        this.scaleOffset += 0.005

        scale(7 + sin(this.scaleOffset) * 1.5)
        rotateY(this.yRotation)
        this.yRotation += 0.005

        noFill()
        strokeWeight(2)
        stroke(244, 66, 215)

        beginShape()
        for (var i = 0; i < this.pointList.length; i++) {
            vertex(this.pointList[i].x, this.pointList[i].y, this.pointList[i].z)
        }
        endShape()
        beginShape()
        for (var i = 0; i < this.pointList.length; i++) {
            vertex(this.pointList2[i].x, this.pointList2[i].y, this.pointList2[i].z)
        }
        endShape()

        this.stats.update()
    }

    toggleDrawing() {
        this.lockState = !this.lockState
    }

    addNewPoint() {
        let posChange = new p5.Vector()
        posChange.x = this.SIGMA * (this.pos.y - this.pos.x)
        posChange.y = this.pos.x * (this.RHO - this.pos.z) - this.pos.y
        posChange.z = this.pos.x * this.pos.y - this.BETA * this.pos.z
        posChange.mult(this.spd)
        this.pos.add(posChange)

        let p2 = this.pos.copy().mult(-1)
        this.pointList.push(this.pos.copy())
        this.pointList2.push(p2.copy())
    }

}
