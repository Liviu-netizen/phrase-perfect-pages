
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, Clock, User } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  message: string;
  sender_type: 'visitor' | 'admin';
  created_at: string;
}

interface Conversation {
  id: string;
  visitor_id: string;
  visitor_email?: string;
  visitor_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const ChatAdmin = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      const { data } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (data) {
        setConversations(data);
      }
    };

    loadConversations();
  }, []);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', selectedConversation.id)
        .order('created_at', { ascending: true });

      if (data) {
        setMessages(data);
      }
    };

    loadMessages();
  }, [selectedConversation]);

  // Real-time subscriptions
  useEffect(() => {
    // Listen for new conversations
    const conversationsChannel = supabase
      .channel('admin_conversations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_conversations'
        },
        (payload) => {
          const newConv = payload.new as Conversation;
          setConversations(prev => [newConv, ...prev]);
        }
      )
      .subscribe();

    // Listen for new messages
    const messagesChannel = supabase
      .channel('admin_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          const newMsg = payload.new as Message;
          
          // Update conversations list to reflect latest activity
          setConversations(prev => 
            prev.map(conv => 
              conv.id === newMsg.conversation_id 
                ? { ...conv, updated_at: new Date().toISOString() }
                : conv
            ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          );

          // Add message if viewing this conversation
          if (selectedConversation && newMsg.conversation_id === selectedConversation.id) {
            setMessages(prev => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(conversationsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setIsLoading(true);
    const messageToSend = newMessage.trim();
    setNewMessage('');

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: selectedConversation.id,
          sender_type: 'admin',
          message: messageToSend
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getLatestMessage = (conversationId: string) => {
    // This would require a more complex query in a real app
    return "New conversation started";
  };

  const hasUnreadMessages = (conversation: Conversation) => {
    // In a real app, you'd track read status
    return Math.random() > 0.5; // Mock for demo
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-copywriter-navy">Chat Admin</h1>
          <p className="text-gray-600">Manage customer conversations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations ({conversations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-y-auto h-[500px]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedConversation?.id === conversation.id && "bg-blue-50 border-l-4 border-l-copywriter-navy"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-sm">
                          {conversation.visitor_name || conversation.visitor_id}
                        </span>
                        {hasUnreadMessages(conversation) && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatTime(conversation.updated_at)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {getLatestMessage(conversation.id)}
                    </p>
                    <Badge 
                      variant={conversation.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs mt-2"
                    >
                      {conversation.status}
                    </Badge>
                  </div>
                ))}
                
                {conversations.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No conversations yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <span>{selectedConversation.visitor_name || selectedConversation.visitor_id}</span>
                      {selectedConversation.visitor_email && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({selectedConversation.visitor_email})
                        </span>
                      )}
                    </div>
                    <Badge variant={selectedConversation.status === 'active' ? 'default' : 'secondary'}>
                      {selectedConversation.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-[500px]">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender_type === 'admin' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg p-3",
                            message.sender_type === 'admin'
                              ? "bg-copywriter-navy text-white"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={cn(
                            "text-xs mt-1 opacity-70",
                            message.sender_type === 'admin' ? "text-gray-300" : "text-gray-500"
                          )}>
                            {formatTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your response..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      size="icon"
                      className="bg-copywriter-navy hover:bg-copywriter-navy/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-[500px]">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;
