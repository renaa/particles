const MAX_SPEED = 5
const MIN_SPEED = 1
const MAX_FORCE = 1

// const alignmentPerceptionRadius  = 50
// const cohesionPerceptionRadius   = 100
// const separationPerceptionRadius = 50

class Boid {
  constructor() {
    this.position = createVector(random(width), random(height))
    this.velocity = p5.Vector.random2D()
    this.velocity.setMag(random(MIN_SPEED, MAX_SPEED))
    this.acceleration = createVector()

  }


  // avg heading local flock
  getAlignmentAcceleration(boids) {
    let perceptionRadius = aRadiusSlider.value()
    let steering = createVector()
    let total = 0

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(MAX_SPEED)
      steering.sub(this.velocity)
      steering.limit(MAX_FORCE)
    }
    return steering
  }
  getCohersionVelocity(boids) {
    let perceptionRadius = cRadiusSlider.value()
    let steering = createVector()
    let total = 0

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
      if (other != this && d < perceptionRadius) {
        steering.add(other.position)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.sub(this.position)
      steering.setMag(MAX_SPEED)
      steering.sub(this.velocity)
      steering.limit(MAX_FORCE)
    }
    return steering
  }
  getSeparationVelocity(boids) {
    let perceptionRadius = sRadiusSlider.value()
    let steering = createVector()
    let total = 0

    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position)
        if (d == 0){
          console.log('d is null')
        }
        diff.div(d)
        steering.add(diff)
        total++
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(MAX_SPEED)
      steering.sub(this.velocity)
      steering.limit(MAX_FORCE)
    }
    return steering
  }
  flock(boids) {
    let alignmentAcceleration = this.getAlignmentAcceleration(boids).mult(aForceSlider.value())
    let cohesionAcceleration = this.getCohersionVelocity(boids).mult(cForceSlider.value())
    let separationAcceleration = this.getSeparationVelocity(boids).mult(sForceSlider.value())
    this.acceleration.add(alignmentAcceleration)
    this.acceleration.add(cohesionAcceleration)
    this.acceleration.add(separationAcceleration)
  }


  // steer to avoid crashing, repelling force
  edgeWrap() {
    if (this.position.x > width) {
      this.position.x = this.position.x - width
    }
    if (this.position.x < 0) {
      this.position.x = this.position.x + width
    }
    if (this.position.y > height) {
      this.position.y = this.position.y - height
    }
    if (this.position.y < 0) {
      this.position.y = this.position.y + height
    }
  }
  update() {
    this.edgeWrap()
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(MAX_SPEED)
    this.acceleration.set(0, 0)

  }
  show() {
    strokeWeight(8)
    stroke(255)
    point(this.position.x, this.position.y)
  }
}