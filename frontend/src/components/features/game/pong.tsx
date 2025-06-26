import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslate } from '@/hooks'
import { GameState } from '@/types'

// Constants
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const PADDLE_WIDTH = 10
const PADDLE_HEIGHT = 100
const BALL_RADIUS = 8
const PADDLE_SPEED = 7
const MAX_SCORE = 2
const PADDLE_ROUNDING = 4

let trailLength = 20
let rightPaddleHit = 0
let leftPaddleHit = 0

let trailT = 0;
let trailInv = 0;
let trailR = 0;
let trailG = 0;
let trailB = 0;
let trailAlpha = 0;
let trailX = 0;
let trailY = 0;
let trailRad = 0;

interface Particle { x: number; y: number; vx: number; vy: number; life: number; }
let particles: Particle[] = [];
let isPaused = false;

interface PongProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  onMatchEnd?: (winner: { id: number; name: string }) => void
  onScoreUpdate?: (scores: { player1: number; player2: number }) => void
  onMatchStatusChange?: (status: 'pending' | 'in_progress' | 'completed') => void
}

export const Pong: React.FC<PongProps> = ({
  canvasRef,
  onMatchEnd,
  onScoreUpdate,
  onMatchStatusChange
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const gameState = location.state as GameState
  const ballSpeedX = useRef(4)
  const ballSpeedY = useRef(4)

  const [scores, setScores] = useState({ player1: 0, player2: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [matchStatus, setMatchStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending')
  const [matchStarted, setMatchStarted] = useState(false)

  const t = useTranslate()

  // Win condition check function
  const checkWinCondition = useCallback(async (currentScores: { player1: number; player2: number }) => {
    if (currentScores.player1 >= MAX_SCORE || currentScores.player2 >= MAX_SCORE) {
      setGameOver(true);
      setMatchStatus('completed');
      
      const winner = currentScores.player1 > currentScores.player2
        ? (gameState?.player1 || { id: 1, name: 'Player 1' })
        : (gameState?.player2 || { id: 2, name: 'Player 2' });

      // Call parent callback
      onMatchEnd?.(winner)
    }
  }, [onMatchEnd, gameState])

  // Update parent components when scores change
  useEffect(() => {
    onScoreUpdate?.(scores)
    // Check win condition after score update
    checkWinCondition(scores)
  }, [scores, onScoreUpdate, checkWinCondition])

  // Update parent components when match status changes
  useEffect(() => {
    onMatchStatusChange?.(matchStatus)
  }, [matchStatus, onMatchStatusChange])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    // Game variables
    let paddle1Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2
    let paddle2Y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2
    let ballX = CANVAS_WIDTH / 2
    let ballY = CANVAS_HEIGHT / 2
    let paddle1Up = false
    let paddle1Down = false
    let paddle2Up = false
    let paddle2Down = false
    let ballDirectionX = 0
    let ballDirectionY = 0
    let goalScored = false  // Prevent multiple scoring on same ball

    const keyDownHandler = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', ' ','Spacer'].includes(e.key)) e.preventDefault()
      if (e.key === 'w' || e.key === 'W') paddle1Up = true
      if (e.key === 's' || e.key === 'S') paddle1Down = true
      if (e.key === 'ArrowUp') paddle2Up = true
      if (e.key === 'ArrowDown') paddle2Down = true

      if (e.key === 'Spacer' || e.key === ' ') setMatchStarted(true)
    }

    const keyUpHandler = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault()
      if (e.key === 'w' || e.key === 'W') paddle1Up = false
      if (e.key === 's' || e.key === 'S') paddle1Down = false
      if (e.key === 'ArrowUp') paddle2Up = false
      if (e.key === 'ArrowDown') paddle2Down = false
    }

    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

      const resetBall = () => {
      ballX = CANVAS_WIDTH / 2
      ballY = CANVAS_HEIGHT / 2
      ballSpeedX.current = (Math.random() > 0.5 ? 1 : -1) * 3
      ballSpeedY.current =
        (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 4 + 2)
      goalScored = false  // Reset goal flag
    }

    const onGoal = (x: number, y: number) => {
        // generate ~30 particles bursting out
        let angle = 0;
        for (let i = 0; i < 40; i++) {

            if (ballX > CANVAS_WIDTH / 2) {
                angle = Math.random() * Math.PI + Math.PI / 2;
            }
            else {
                angle = Math.random() * Math.PI - Math.PI / 2;
            }
            const speed = Math.random() * 4 + 2;
            particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 60,  // frames until they vanish
            });
        }
        isPaused = true;
        setTimeout(() => {
            particles = [];
            isPaused = false;
            resetBall();
        }, 1000);  // 1s delay
    }

    const update = () => {
      if (gameOver || !matchStarted || isPaused) return

      // Move paddles
      if (paddle1Up && paddle1Y > 0) paddle1Y -= PADDLE_SPEED
      if (paddle1Down && paddle1Y < CANVAS_HEIGHT - PADDLE_HEIGHT)
        paddle1Y += PADDLE_SPEED
      if (paddle2Up && paddle2Y > 0) paddle2Y -= PADDLE_SPEED
      if (paddle2Down && paddle2Y < CANVAS_HEIGHT - PADDLE_HEIGHT)
        paddle2Y += PADDLE_SPEED

      // update ball direction from previous frame for trail effect
      ballDirectionX = ballSpeedX.current
      ballDirectionY = ballSpeedY.current

      // Move ball
      ballX += ballSpeedX.current
      ballY += ballSpeedY.current

      // Ball collision with top and bottom
      if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > CANVAS_HEIGHT) {
        ballSpeedY.current = -ballSpeedY.current
      }

      // Ball collision with left paddle
      if (
        ballX - BALL_RADIUS <= PADDLE_WIDTH &&
        ballY + BALL_RADIUS >= paddle1Y &&
        ballY - BALL_RADIUS <= paddle1Y + PADDLE_HEIGHT
      ) {
        ballX = PADDLE_WIDTH + BALL_RADIUS
        ballSpeedX.current = -ballSpeedX.current * 1.1
        ballSpeedY.current += (ballY - (paddle1Y + PADDLE_HEIGHT / 2)) * 0.1
        leftPaddleHit++
      }

      // Ball collision with right paddle
      if (
        ballX + BALL_RADIUS >= CANVAS_WIDTH - PADDLE_WIDTH &&
        ballY + BALL_RADIUS >= paddle2Y &&
        ballY - BALL_RADIUS <= paddle2Y + PADDLE_HEIGHT
      ) {
        ballX = CANVAS_WIDTH - PADDLE_WIDTH - BALL_RADIUS
        ballSpeedX.current = -ballSpeedX.current * 1.1
        ballSpeedY.current += (ballY - (paddle2Y + PADDLE_HEIGHT / 2)) * 0.1
        rightPaddleHit++
      }

      // Clamp ball speed
      ballSpeedX.current = Math.max(Math.min(ballSpeedX.current, 10), -10)
      ballSpeedY.current = Math.max(Math.min(ballSpeedY.current, 10), -10)

      trailLength = Math.max(Math.abs(ballSpeedX.current), Math.abs(ballSpeedY.current)) * 1.4
      if (trailLength < 10) trailLength = 10

      // Score points
      if (ballX - BALL_RADIUS < 0 && !goalScored) {
        goalScored = true
        setScores((prev) => ({ ...prev, player2: prev.player2 + 1 }))
        onGoal(ballX, ballY);
      }

      if (ballX + BALL_RADIUS > CANVAS_WIDTH && !goalScored) {
        goalScored = true
        setScores((prev) => ({ ...prev, player1: prev.player1 + 1 }))
        onGoal(ballX, ballY);
      }
    }

    const draw = () => {
        // Black background
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // White center line
        ctx.strokeStyle = 'white'
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(CANVAS_WIDTH / 2, 0)
        ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT)
        ctx.stroke()

        // White paddles
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.roundRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_ROUNDING)
        ctx.fill()

        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.roundRect(CANVAS_WIDTH - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_ROUNDING)
        ctx.fill()

        particles.forEach(p => {
          p.life--;
          p.x += p.vx;
          p.y += p.vy;
          ctx.globalAlpha = p.life / 60;
          ctx.fillStyle = 'white'
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        particles = particles.filter(p => p.life > 0);
        if (isPaused) return;

      // paddle bounce effect
      if (rightPaddleHit > 0) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.roundRect(
          CANVAS_WIDTH - PADDLE_WIDTH - rightPaddleHit,
          paddle2Y,
          PADDLE_WIDTH + rightPaddleHit,
          PADDLE_HEIGHT,
          PADDLE_ROUNDING
        )
        ctx.fill()
        rightPaddleHit++
        if (rightPaddleHit > 8) {
            rightPaddleHit = 0
        }
      }

      if (leftPaddleHit > 0) {
          ctx.fillStyle = 'white'
          ctx.beginPath()
          ctx.roundRect(0, paddle1Y, PADDLE_WIDTH + leftPaddleHit, PADDLE_HEIGHT, PADDLE_ROUNDING)
          ctx.fill()
          leftPaddleHit++
          if (leftPaddleHit > 8) {
              leftPaddleHit = 0
          }
      }

      // ball trail effect
      const endColor = ballDirectionX > 0 ? { r:   0, g:   0, b: 255 } : { r: 255, g:   0, b:   0 };
      for (let i = 0; i < trailLength; i++) {
        trailT = i / trailLength;
        trailInv = 1 - trailT;
        trailR = Math.round(255 * trailInv + endColor.r * trailT);
        trailG = Math.round(255 * trailInv + endColor.g * trailT);
        trailB = Math.round(255 * trailInv + endColor.b * trailT);
        trailAlpha = trailInv;

        ctx.fillStyle = `rgba(${trailR},${trailG},${trailB},${trailAlpha})`;

        trailX = ballX - ballDirectionX * i;
        trailY = ballY - ballDirectionY * i;
        trailRad = BALL_RADIUS * trailInv;

        ctx.beginPath();
        ctx.arc(trailX, trailY, trailRad, 0, Math.PI * 2);
        ctx.fill();
      }

      // head:
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      const tX = ballX / CANVAS_WIDTH;
      let r, g, b;
      if (tX < 0.5) {
        const t = tX / 0.5;
        r = 0xff * (1 - t) + 0xff * t;
        g = 0x5c * (1 - t) + 0xff * t;
        b = 0x5c * (1 - t) + 0x00 * t;
      }
      else {
        const t = (tX - 0.5) / 0.5;
        r = 0xff * (1 - t) + 0x3c * t;
        g = 0xff * (1 - t) + 0x86 * t;
        b = 0xff * (1 - t) + 0xff * t;
      }

      ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      ctx.beginPath()
      ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2)
      ctx.fill()
    }

    setMatchStatus('in_progress')
    let animationFrameId: number

    const loop = () => {
      update()
      draw()
      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
      cancelAnimationFrame(animationFrameId)
    }
  }, [scores, gameOver, matchStatus, navigate, gameState, matchStarted, onMatchEnd, canvasRef, t])

  return null
}
