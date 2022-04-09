const socket = io();

socket.on('connect', io => {
    console.log('connected')
})

class Player {
    constructor(x, y, width, height, id) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 0.5
        this.gravity = 0.5
        this.color = '#0095DD'
        this.id = id
        this.direction = 0
        this.pressed = false
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update(deltaTime) {
        if(this.y + this.height > canvas.height) this.gravity = 0
        else this.gravity -= 0.1
        this.y -= this.gravity
        if(this.pressed) this.x += this.speed * deltaTime * this.direction
        socket.emit('pos', { x: this.x, y: this.y, id: this.id })
        
    }
}


const canvas = document.getElementById('canvas1')
canvas.width = 600
canvas.height = 300
const ctx = canvas.getContext('2d')

let player = new Player(100, 100, 50, 50, id)
const players = []
console.log(session)
session.forEach(s => {
    if(!s) return
    players.push(new Player(s.x, s.y, 50, 50, s.id))
})

socket.on('new', (data) => {
    console.log(data)
    if(!data) return
    players.push(new Player(data.x, data.y, 50, 50, data.id))
})

let lastTime = 0
function run(timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player?.draw()
    player?.update(deltaTime)
    players.forEach(s => {
        if(s.id == id) return
        s.draw()
        s.update(deltaTime)
    })
    
    requestAnimationFrame(run)
}
run()
socket.on('disconnect', () => {
    console.log('disconnecting')
    socket.emit('disconnect', { id })
})

socket.on('pos', (data) => {
    const p2 = players.find(p => p.id == data.id);
    p2.x = data.x
    p2.y = data.y
})

document.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) {
        player.direction = -1
        player.pressed = true
    } else if(e.keyCode == 39) {
        player.direction = 1
        player.pressed = true
    }
})

document.addEventListener("keyup", () => {
    player.pressed = false
})