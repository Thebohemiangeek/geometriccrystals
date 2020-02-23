function pointOncircle(s, posX, posY, radius, angle) {
  const x = posX + radius * s.cos(angle)
  const y = posY + radius * s.sin(angle)
  return s.createVector(x, y)
}
function hexagon(s, posX, posY, radius) {
  const rotAngle = 360 / 6
  s.beginShape()
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOncircle(s, posX, posY, radius, i * rotAngle)
    s.vertex(thisVertex.x, thisVertex.y)
  }
  s.endShape(s.CLOSE)
}
function getRandomArrayIndex(s, array) {
  const randomNumber = s.floor(s.random(0, array.length))
  return array[randomNumber]
}
function randomBoolean(s) {
  const randomNumber = s.random(1)
  if (randomNumber > 0.5) {
    return true
  } else {
    return false
  }
}
function testLines(s, cristalSize, palette) {
  const sides = 6
  const numberShapes = randomBoolean(s) ? sides : sides * 2
  const strokeColor = getRandomArrayIndex(s, palette)

  const angle = 360 / numberShapes

  s.noFill()
  s.stroke(strokeColor)

  s.push()
  s.translate(s.width / 2, s.height / 2)

  s.ellipse(0, 0, cristalSize, cristalSize)

  for (let i = 0; i < numberShapes; i++) {
    s.line(0, 0, cristalSize / 2, 0)
    s.rotate(angle)
    s.stroke(strokeColor)
  }
  s.pop()
}
function myTriangle(s, center, radius, direction) {
  if (direction) {
    s.beginShape()
    s.vertex(center + radius * s.cos(0), radius * s.sin(0))
    s.vertex(center + radius * s.cos(120), radius * s.sin(120))
    s.vertex(center + radius * s.cos(240), radius * s.sin(240))
    s.endShape(s.CLOSE)
  } else {
    s.beginShape()
    s.vertex(center + radius * s.cos(180), radius * s.sin(180))
    s.vertex(center + radius * s.cos(300), radius * s.sin(300))
    s.vertex(center + radius * s.cos(60), radius * s.sin(60))
    s.endShape(s.CLOSE)
  }
}

export {
  pointOncircle,
  hexagon,
  getRandomArrayIndex,
  randomBoolean,
  testLines,
  myTriangle,
}
