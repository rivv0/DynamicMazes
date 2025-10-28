import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const PerlinBackground = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let inc = 0.05; // Reduced for smoother flow
    let scl = 15; // Increased scale for larger flow patterns
    let cols, rows;
    let zoff = 0;
    let particles = [];
    let flowfield;

    // Particle class
    class Particle {
      constructor(p) {
        this.p5 = p;
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(0, 0);
        this.acc = p.createVector(0, 0);
        this.maxspeed = 6; // Increased speed for more visible movement
        this.h = 0;
        this.prevPos = this.pos.copy();
      }

      update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }

      follow(vectors) {
        const x = this.p5.floor(this.pos.x / scl);
        const y = this.p5.floor(this.pos.y / scl);
        const index = x + y * cols;
        if (vectors[index]) {
          const force = vectors[index];
          this.applyForce(force);
        }
      }

      applyForce(force) {
        this.acc.add(force);
      }

      show() {
        // More visible colors with higher brightness and alpha
        this.p5.stroke(this.h, 200, 255, 80); // Increased brightness and alpha
        this.h = this.h + 2; // Faster color cycling
        if (this.h > 255) {
          this.h = 0;
        }
        this.p5.strokeWeight(1.5); // Thicker lines for better visibility
        this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
      }

      updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
      }

      edges() {
        if (this.pos.x > this.p5.width) {
          this.pos.x = 0;
          this.updatePrev();
        }
        if (this.pos.x < 0) {
          this.pos.x = this.p5.width;
          this.updatePrev();
        }
        if (this.pos.y > this.p5.height) {
          this.pos.y = 0;
          this.updatePrev();
        }
        if (this.pos.y < 0) {
          this.pos.y = this.p5.height;
          this.updatePrev();
        }
      }
    }

    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);
        p.colorMode(p.HSB, 255);
        
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
        flowfield = new Array(cols * rows);

        // Increased number of particles for more visible effect
        for (let i = 0; i < 400; i++) {
          particles[i] = new Particle(p);
        }
      };

      p.draw = () => {
        // Darker background with more transparency for longer trails
        p.background(0, 0, 0, 5);
        
        let yoff = 0;
        for (let y = 0; y < rows; y++) {
          let xoff = 0;
          for (let x = 0; x < cols; x++) {
            const index = x + y * cols;
            const angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 6; // Increased multiplier for more dynamic flow
            const v = p5.Vector.fromAngle(angle);
            v.setMag(1.5); // Increased magnitude for stronger force
            flowfield[index] = v;
            xoff += inc;
          }
          yoff += inc;
        }
        zoff += 0.001; // Faster time progression for more dynamic animation

        for (let i = 0; i < particles.length; i++) {
          particles[i].follow(flowfield);
          particles[i].update();
          particles[i].edges();
          particles[i].show();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = p.floor(p.width / scl);
        rows = p.floor(p.height / scl);
        flowfield = new Array(cols * rows);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default PerlinBackground;