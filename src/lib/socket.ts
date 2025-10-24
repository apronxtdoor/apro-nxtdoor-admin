import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'
import { NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function SocketHandler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket',
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Join admin room
      socket.on('join:admin', () => {
        socket.join('admin')
        console.log('Admin joined admin room')
      })

      // Handle vendor updates
      socket.on('vendor:updated', (data) => {
        console.log('Vendor updated:', data)
        socket.to('admin').emit('vendor:updated', data)
      })

      // Handle subscription creation
      socket.on('subscription:created', (data) => {
        console.log('Subscription created:', data)
        socket.to('admin').emit('subscription:created', data)
      })

      // Send test notifications
      socket.on('admin:test-notification', (data) => {
        console.log('Test notification:', data)
        socket.to('admin').emit('admin-notification', {
          message: data.message || 'Test notification from server',
          type: 'info'
        })
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })

    res.socket.server.io = io
  }
  res.end()
}