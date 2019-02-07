let paddleB: game.LedSprite = null
let paddleA: game.LedSprite = null
let lastTimeChecked = 0
let ballMoveTimer = 0
let ball: game.LedSprite = null
input.onButtonPressed(Button.A, function () {
    if (paddleA.get(LedSpriteProperty.X) > 0) {
        paddleA.change(LedSpriteProperty.X, -1)
        paddleB.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (paddleA.get(LedSpriteProperty.X) < 3) {
        paddleA.change(LedSpriteProperty.X, 1)
        paddleB.change(LedSpriteProperty.X, 1)
    }
})
ball = game.createSprite(Math.randomRange(0, 4), 0)
ball.change(LedSpriteProperty.Brightness, 5)
ball.turn(Direction.Right, 90)
paddleA = game.createSprite(2, 4)
paddleB = game.createSprite(3, 4)
ballMoveTimer = 1000
lastTimeChecked = input.runningTime()
basic.forever(function () {
    if (input.runningTime() - lastTimeChecked >= ballMoveTimer) {
        ball.move(1)
        lastTimeChecked = input.runningTime()
        if (ball.isTouching(paddleA) || ball.isTouching(paddleB)) {
            ball.turn(Direction.Right, 180)
            ball.move(2)
            ballMoveTimer += -100
        } else if (ball.get(LedSpriteProperty.Y) == 4) {
            game.removeLife(1)
            ball.set(LedSpriteProperty.Y, 0)
        } else {
            if (ball.get(LedSpriteProperty.Y) == 0 && ball.get(LedSpriteProperty.Direction) == 0) {
                ball.turn(Direction.Right, 180)
            }
        }
    }
})
