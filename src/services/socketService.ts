import { io, Socket } from 'socket.io-client';

const SOCKET_URL = (import.meta as any).env?.VITE_WS_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect() {
    if (this.socket && this.isConnected) return this.socket;

    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('[WebSocket] Connected to Ahl Al Markabat real-time gateway');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('[WebSocket] Disconnected from gateway');
      });

      this.socket.on('connect_error', (_err: any) => {
        // Silently fallback if backend is offline
        this.isConnected = false;
      });

      return this.socket;
    } catch {
      return null;
    }
  }

  joinRoom(chatSessionId: string) {
    if (!this.socket) this.connect();
    this.socket?.emit('joinRoom', { chatSessionId });
  }

  sendMessage(payload: {
    chatSessionId: string;
    senderId: string;
    content?: string;
    attachmentUrl?: string;
  }) {
    if (!this.socket) this.connect();
    this.socket?.emit('sendMessage', payload);
  }

  onNewMessage(callback: (msg: any) => void) {
    if (!this.socket) this.connect();
    this.socket?.on('newMessage', callback);
  }

  offNewMessage(callback?: (msg: any) => void) {
    if (callback) {
      this.socket?.off('newMessage', callback);
    } else {
      this.socket?.off('newMessage');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

export const socketService = new SocketService();
export default socketService;
