
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  conversation_id: string;
  message: string;
  sender_type: string;
  created_at: string;
}

interface Conversation {
  id: string;
  visitor_id: string;
  status: string;
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [visitorId, setVisitorId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate visitor ID on mount
  useEffect(() => {
    const generateVisitorId = () => {
      const stored = localStorage.getItem('chat_visitor_id');
      if (stored) {
        setVisitorId(stored);
      } else {
        const newId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chat_visitor_id', newId);
        setVisitorId(newId);
      }
    };
    generateVisitorId();
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load existing conversation
  useEffect(() => {
    if (!visitorId) return;

    const loadConversation = async () => {
      const { data: existingConversation } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('visitor_id', visitorId)
        .eq('status', 'active')
        .single();

      if (existingConversation) {
        setConversation(existingConversation);
        setHasStartedConversation(true);
        
        // Load messages
        const { data: existingMessages } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', existingConversation.id)
          .order('created_at', { ascending: true });

        if (existingMessages) {
          setMessages(existingMessages);
        }
      }
    };

    loadConversation();
  }, [visitorId]);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!conversation) return;

    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversation.id}`
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation]);

  // Create conversation and send first message
  const startConversation = async (firstMessage: string) => {
    if (!visitorId) return;

    setIsLoading(true);
    
    try {
      // Create conversation
      const { data: newConversation, error: convError } = await supabase
        .from('chat_conversations')
        .insert([{ visitor_id: visitorId }])
        .select()
        .single();

      if (convError) throw convError;

      setConversation(newConversation);
      setHasStartedConversation(true);

      // Send first message
      const { error: msgError } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: newConversation.id,
          sender_type: 'visitor',
          message: firstMessage
        }]);

      if (msgError) throw msgError;

      // Send welcoming bot response
      setTimeout(async () => {
        await supabase
          .from('chat_messages')
          .insert([{
            conversation_id: newConversation.id,
            sender_type: 'admin',
            message: "Hi there! 👋 Thank you so much for reaching out! I've received your message and I'm excited to help you. I'll get back to you personally very soon - usually within just a few minutes! Feel free to share any additional details in the meantime. 😊"
          }]);
      }, 1000);

    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: conversation.id,
          sender_type: 'visitor',
          message: messageToSend
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle first message
  const handleFirstMessage = async () => {
    if (!newMessage.trim()) return;
    
    const firstMsg = newMessage.trim();
    setNewMessage('');
    await startConversation(firstMsg);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-copywriter-navy hover:bg-copywriter-navy/90 shadow-lg transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={cn(
          "bg-white rounded-lg shadow-2xl border transition-all duration-300",
          isMinimized ? "w-80 h-12" : "w-80 h-96"
        )}>
          {/* Header */}
          <div className="bg-copywriter-navy text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Chat with Liviu</h3>
              {!isMinimized && (
                <p className="text-xs text-gray-200">Usually replies instantly</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {!hasStartedConversation && (
                  <div className="text-center text-gray-600">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-copywriter-navy mb-2">
                        Welcome! 👋
                      </h4>
                      <p className="text-sm">
                        I'm here to help with any questions about copywriting services. 
                        Send me a message and I'll get back to you right away!
                      </p>
                    </div>
                  </div>
                )}
                
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender_type === 'visitor' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.sender_type === 'visitor'
                          ? "bg-copywriter-navy text-white"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      <p>{message.message}</p>
                      <p className={cn(
                        "text-xs mt-1 opacity-70",
                        message.sender_type === 'visitor' ? "text-gray-300" : "text-gray-500"
                      )}>
                        {formatTime(message.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        hasStartedConversation ? sendMessage() : handleFirstMessage();
                      }
                    }}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={hasStartedConversation ? sendMessage : handleFirstMessage}
                    disabled={!newMessage.trim() || isLoading}
                    size="icon"
                    className="bg-copywriter-navy hover:bg-copywriter-navy/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
