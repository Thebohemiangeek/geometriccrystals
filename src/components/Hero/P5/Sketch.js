import {
  hexagon,
  getRandomArrayIndex,
  randomBoolean,
  myTriangle,
} from "./helpersP5"

const herosketch = s => {
  const cristalSize = 150
  const randomR = s.random(255)
  const randomG = s.random(255)
  const randomB = s.random(255)

  const palette = [
    s.color(255, 52, 154),
    s.color(4, 0, 152),
    s.color(randomR, s.random(255), randomG),
    s.color(randomR, randomB, s.random(255)),
    s.color(s.random(255), randomB, randomG),
    s.color(s.random(255), s.random(255), s.random(255)),
  ]
  const rows = 3
  const padding = cristalSize * 0.3
  const SIDES = 6
  const gridBox = cristalSize + padding
  const start = cristalSize
  const totalX = s.displayWidth
  const totalY = start + gridBox * rows
  const columns = s.displayWidth / gridBox - 1

  s.setup = () => {
    s.createCanvas(totalX, totalY)
    s.angleMode(s.DEGREES)
    s.rectMode(s.CENTER)
    s.noLoop()
  }

  const state = {
    sides: SIDES,
    radius: cristalSize / 2,

    stepsOut: 8,
    thinStroke: 1,
    thickStroke: 3,
  }

  const setState = state => {
    state.numberShapes = state.sides
    state.angle = 360 / state.numberShapes
    state.singleStep = state.radius / state.stepsOut
    state.layerColor = getRandomArrayIndex(s, palette)
    return state
  }

  const Circles = state => {
    state.circleSize = state.radius * 0.93
    state.position = state.radius - state.circleSize / 2

    return {
      name: "circles",
      state,
      render: () => {
        s.noFill()
        s.stroke(state.layerColor)
        s.strokeWeight(1)
        s.push()
        for (let i = 0; i <= state.numberShapes; i++) {
          s.ellipse(state.position, 0, state.circleSize, state.circleSize)
          s.rotate(state.angle)
        }
        s.pop()
      },
    }
  }
  const SimpleLines = state => {
    state.weight = randomBoolean(s) ? state.thinStroke : state.thickStroke
    state.numberShapes = randomBoolean(s) ? state.sides : state.sides * 2
    state.angle = 360 / state.numberShapes
    state.numberSteps = randomBoolean(s)
      ? state.stepsOut
      : s.int(state.stepsOut * 1.25)
    state.step = state.radius / state.numberSteps

    state.start = s.floor(s.random(0, state.numberSteps))
    state.stop = s.floor(s.random(state.start, state.numberSteps + 1))

    return {
      name: "Simple Lines",
      state,
      render: () => {
        s.noFill()
        s.strokeWeight(state.weight)
        s.stroke(state.layerColor)

        s.push()

        for (let i = 0; i < state.numberShapes; i++) {
          s.line(state.start * state.step, 0, state.stop * state.step, 0)
          s.rotate(state.angle)
        }
        s.pop()
      },
    }
  }

  const OutLineShape = state => {
    state.hexagonTrue = randomBoolean(s)
    state.weight = randomBoolean(s) ? state.thinStroke : state.thickStroke

    return {
      name: "Outline Shape",
      state,
      render: () => {
        s.noFill()

        s.strokeWeight(state.weight)
        s.stroke(state.layerColor)
        s.push()
        if (state.hexagonTrue) {
          hexagon(s, 0, 0, cristalSize / 2)
        } else {
          s.ellipse(0, 0, cristalSize, cristalSize)
        }
        s.pop()
      },
    }
  }
  const DottedLines = state => {
    state.numberShapes = randomBoolean(s) ? state.sides : state.sides * 2
    state.angle = 360 / state.numberShapes
    state.shapeSize = 3
    state.centerOffset = state.singleStep

    return {
      name: "Dotted Lines",
      state,
      render: () => {
        s.fill(state.layerColor)
        s.noStroke()
        s.push()
        for (let i = 0; i <= state.numberShapes; i++) {
          for (
            let x = state.centerOffset;
            x < cristalSize / 2;
            x += state.singleStep
          ) {
            s.rect(x, 0, state.shapeSize, state.shapeSize)
          }
          s.rotate(state.angle)
        }
        s.pop()
      },
    }
  }

  const CenteredShape = state => {
    state.randomShape = s.random(1)
    state.shapeSize =
      s.floor(s.random(state.stepsOut / 2, state.stepsOut - 2)) *
      state.singleStep

    return {
      name: "Centered Shape",
      state,
      render: () => {
        s.fill(state.layerColor)
        s.noStroke()
        s.push()
        //  s.translate(s.width / 2, s.height / 2)
        if (state.randomShape < 0.1) {
          s.rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
        } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
          s.ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
        } else if (state.randomShape >= 0.6) {
          s.rotate(state.angle / 2)
          hexagon(s, 0, 0, state.shapeSize)
        }
        s.pop()
      },
    }
  }

  const RingOfShapes = state => {
    state.steps = s.floor(s.random(1, state.stepsOut))
    state.center = state.steps * state.singleStep
    state.randomShape = s.random(1)
    state.direction = randomBoolean(s) // used for triangle only
    state.fillColor = randomBoolean(s) ? state.layerColor : s.color(0, 1)
    state.weight = randomBoolean(s) ? state.thinStroke : state.thickStroke

    if (state.steps < state.stepsOut / 2) {
      state.radius = s.floor(s.random(1, state.steps)) * state.singleStep
    } else if (state.steps > state.stepsOut / 2) {
      state.radius =
        s.floor(s.random(1, state.stepsOut - state.steps)) * state.singleStep
    } else {
      state.radius =
        s.floor(s.random(1, state.stepsOut / 2 + 1)) * state.singleStep
    }

    return {
      state,
      name: "ringofshapes",
      render: () => {
        s.stroke(state.layerColor)
        s.fill(state.fillColor)
        s.strokeWeight(state.weight)

        s.push()
        for (let i = 0; i < state.numberShapes; i++) {
          if (state.randomShape < 0.33) {
            s.ellipse(0, state.center, state.radius, state.radius)
          } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
            s.rect(0, state.center, state.radius, state.radius)
          } else if (state.randomShape >= 0.66) {
            myTriangle(s, state.center, state.radius, state.direction)
          }
          s.rotate(state.angle)
        }
        s.pop()
      },
    }
  }

  const SteppedHexagons = state => {
    state.numberSteps = randomBoolean(s)
      ? state.stepsOut
      : state.stepsOut * 1.25
    state.centerOffset = state.radius * 0.15
    state.singleStep =
      (cristalSize / 2 - state.centerOffset) / state.numberSteps
    state.weight = randomBoolean(s) ? state.thinStroke : state.thickStroke

    return {
      name: "Stepped Hexagons",
      state,
      render: () => {
        s.stroke(state.layerColor)
        s.noFill()
        s.strokeWeight(state.weight)
        s.push()
        s.rotate(state.angle / 2)
        for (let i = 1; i < state.numberSteps + 1; i++) {
          hexagon(s, 0, 0, state.centerOffset + i * state.singleStep)
        }
        s.pop()
      },
    }
  }

  const layerConstructors = [
    {
      name: "Outline Shape",
      init: props =>
        OutLineShape({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Centered Shape",
      init: props =>
        CenteredShape({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Circles",
      init: props =>
        Circles({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Simple Lines",
      init: props =>
        SimpleLines({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Dotted Lines",
      init: props =>
        DottedLines({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Ring of Shapes",
      init: props =>
        RingOfShapes({
          ...props,
          ...setState(state),
        }),
      weight: 0.3,
    },
    {
      name: "Stepped Hexagons",
      init: props =>
        SteppedHexagons({
          ...props,
          ...setState(state),
        }),
      weight: 0.7,
    },
  ]

  const makeCrystal = pos => {
    const layers = layerConstructors.map(layerItem => {
      let picker = s.random(1)
      const draw = picker > layerItem.weight
      return layerItem.init({
        pos,
        draw,
      })
    })
    return layers
  }

  const drawCrystal = crystal => {
    crystal.forEach(layer => {
      if (layer.state.draw) {
        s.push()
        s.translate(layer.state.pos.x, layer.state.pos.y)
        layer.render()
        s.pop()
      }
    })
  }
  let allCrystals = []
  s.draw = () => {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const posX = start + x * gridBox
        const posY = start + y * gridBox
        const crystal = makeCrystal({ x: posX, y: posY })
        allCrystals.push(crystal)
      }
    }

    allCrystals.forEach(crystal => {
      drawCrystal(crystal)
    })
  }
}
export default herosketch
