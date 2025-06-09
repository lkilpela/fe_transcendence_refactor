import { layouts } from '@/assets/design-system'
import { cn } from '@/utils/cn'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const PongBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Recording function
  const recordPongVideo = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      alert('Canvas not ready!')
      return
    }

    alert('Recording started! Wait 1 minute...')
    const stream = canvas.captureStream(30)
    const recorder = new MediaRecorder(stream)
    const chunks: BlobPart[] = []

    recorder.ondataavailable = (e) => chunks.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pong-background.webm'
      a.click()
      alert('Video downloaded!')
    }

    recorder.start()
    setTimeout(() => recorder.stop(), 60000)  
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container size
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Make canvas transparent for glass effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Initial resize
    resize()

    // Add resize observer for more reliable size updates
    const resizeObserver = new ResizeObserver(() => {
      resize()
    })
    resizeObserver.observe(container)

    // Game properties
    const paddleHeight = 80
    const paddleWidth = 10
    const ballRadius = 6

    // Ball properties
    let ballX = canvas.width / 2
    let ballY = canvas.height / 2
    let ballSpeedX = 4
    let ballSpeedY = 4

    // Paddle properties
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2

    // Score properties
    let leftScore = 0
    let rightScore = 0

    // Center line properties
    const centerLineWidth = 2
    const centerLineDashLength = 10

    const drawCenterLine = () => {
      ctx.beginPath()
      ctx.setLineDash([centerLineDashLength])
      ctx.lineWidth = centerLineWidth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.moveTo(canvas.width / 2, 0)
      ctx.lineTo(canvas.width / 2, canvas.height)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawPaddle = (x: number, y: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillRect(x, y, paddleWidth, paddleHeight)
    }

    const drawBall = () => {
      ctx.beginPath()
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.shadowColor = '#fff'
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.closePath()
      ctx.shadowBlur = 0
    }

    const drawScore = () => {
      ctx.font = '48px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.textAlign = 'center'
      ctx.fillText(leftScore.toString(), canvas.width / 4, 60)
      ctx.fillText(rightScore.toString(), (canvas.width * 3) / 4, 60)
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas for transparency with glass effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw game elements
      drawCenterLine()
      drawPaddle(0, leftPaddleY)
      drawPaddle(canvas.width - paddleWidth, rightPaddleY)
      drawBall()
      drawScore()

      // Move paddles (AI simulation)
      leftPaddleY += (ballY - (leftPaddleY + paddleHeight / 2)) * 0.1
      rightPaddleY += (ballY - (rightPaddleY + paddleHeight / 2)) * 0.1

      // Keep paddles within bounds
      leftPaddleY = Math.max(
        0,
        Math.min(canvas.height - paddleHeight, leftPaddleY),
      )
      rightPaddleY = Math.max(
        0,
        Math.min(canvas.height - paddleHeight, rightPaddleY),
      )

      // Move ball
      ballX += ballSpeedX
      ballY += ballSpeedY

      // Ball collision with paddles
      if (
        (ballX - ballRadius < paddleWidth &&
          ballY > leftPaddleY &&
          ballY < leftPaddleY + paddleHeight) ||
        (ballX + ballRadius > canvas.width - paddleWidth &&
          ballY > rightPaddleY &&
          ballY < rightPaddleY + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX * 1.1 // Increase speed slightly on paddle hits
        const paddleCenter =
          ballX < canvas.width / 2
            ? leftPaddleY + paddleHeight / 2
            : rightPaddleY + paddleHeight / 2
        const hitPos = (ballY - paddleCenter) / (paddleHeight / 2)
        ballSpeedY = hitPos * 6 // Angle based on hit position
      }

      // Ball collision with walls
      if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY
      }

      // Ball out of bounds
      if (ballX < 0) {
        rightScore++
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballSpeedX = 4
        ballSpeedY = (Math.random() - 0.5) * 8
      } else if (ballX > canvas.width) {
        leftScore++
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballSpeedX = -4
        ballSpeedY = (Math.random() - 0.5) * 8
      }

      // Keep speed within bounds
      const maxSpeed = 8
      ballSpeedX = Math.max(Math.min(ballSpeedX, maxSpeed), -maxSpeed)
      ballSpeedY = Math.max(Math.min(ballSpeedY, maxSpeed), -maxSpeed)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* PORTAL: Render button outside of any containers */}
      {createPortal(
        <button
          onClick={recordPongVideo}
          className="fixed right-4 top-4 cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg hover:bg-red-600"
          style={{ zIndex: 999999 }}
        >
          🔴 RECORD PONG
        </button>,
        document.body,
      )}

      <div
        ref={containerRef}
        className={cn(layouts.pong.container, 'overflow-hidden')}
      >
        {/* Enhanced Glass Background */}
        <div className="via-blue-700/8 absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-900/5 backdrop-blur-sm" />

        {/* Subtle Glass Overlay */}
        <div className="bg-white/2 absolute inset-0 border border-white/5 backdrop-blur-lg" />

        {/* Pong Canvas */}
        <canvas
          ref={canvasRef}
          className={cn(layouts.pong.canvas, 'relative z-10')}
        />
      </div>
    </>
  )
}

export default PongBackground
