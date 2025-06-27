"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send,
  Phone,
  Video,
  Calendar,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Star,
  Archive,
  Trash2,
  User,
  Building,
  Clock,
  CheckCircle,
  Circle,
  Image,
  FileText,
  Download,
  ExternalLink,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Settings,
  Users,
  Share2,
  Copy,
  Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderType: "startup" | "investor";
  content: string;
  timestamp: string;
  type: "text" | "image" | "file" | "meeting_request" | "system";
  status: "sent" | "delivered" | "read";
  attachments?: {
    id: number;
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  meetingDetails?: {
    title: string;
    date: string;
    duration: string;
    link?: string;
  };
}

interface Conversation {
  id: number;
  participants: {
    id: number;
    name: string;
    title: string;
    company: string;
    avatar?: string;
    type: "startup" | "investor";
    online: boolean;
    lastSeen?: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  matchScore?: number;
}

interface CommunicationInterfaceProps {
  currentUserId: number;
  userType: "startup" | "investor";
  conversations: Conversation[];
  activeConversationId?: number;
  onSendMessage: (conversationId: number, content: string, type?: string) => void;
  onStartVideoCall: (conversationId: number) => void;
  onScheduleMeeting: (conversationId: number, details: any) => void;
  onArchiveConversation: (conversationId: number) => void;
  onPinConversation: (conversationId: number) => void;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    participants: [
      {
        id: 1,
        name: "Sarah Chen",
        title: "Managing Partner",
        company: "TechVentures Capital",
        type: "investor",
        online: true
      },
      {
        id: 2,
        name: "Alex Johnson",
        title: "CEO",
        company: "TechFlow Solutions",
        type: "startup",
        online: false,
        lastSeen: "2 hours ago"
      }
    ],
    lastMessage: {
      id: 1,
      senderId: 1,
      senderName: "Sarah Chen",
      senderType: "investor",
      content: "I'd love to schedule a follow-up meeting to discuss the Series A details.",
      timestamp: "2024-01-20T14:30:00Z",
      type: "text",
      status: "read"
    },
    unreadCount: 2,
    isPinned: true,
    isArchived: false,
    matchScore: 95
  },
  {
    id: 2,
    participants: [
      {
        id: 3,
        name: "Michael Rodriguez",
        title: "Investment Director",
        company: "Growth Capital Partners",
        type: "investor",
        online: true
      },
      {
        id: 2,
        name: "Alex Johnson",
        title: "CEO",
        company: "TechFlow Solutions",
        type: "startup",
        online: false,
        lastSeen: "1 hour ago"
      }
    ],
    lastMessage: {
      id: 2,
      senderId: 3,
      senderName: "Michael Rodriguez",
      senderType: "investor",
      content: "Thanks for sharing the pitch deck. The traction metrics look impressive!",
      timestamp: "2024-01-20T13:15:00Z",
      type: "text",
      status: "delivered"
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    matchScore: 88
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    senderName: "Sarah Chen",
    senderType: "investor",
    content: "Hi Alex! I reviewed your pitch deck and I'm very interested in TechFlow Solutions. The market opportunity looks compelling.",
    timestamp: "2024-01-20T10:00:00Z",
    type: "text",
    status: "read"
  },
  {
    id: 2,
    senderId: 2,
    senderName: "Alex Johnson",
    senderType: "startup",
    content: "Thank you Sarah! I'm excited to discuss this opportunity with you. Would you like to schedule a call to dive deeper into our technology and market strategy?",
    timestamp: "2024-01-20T10:15:00Z",
    type: "text",
    status: "read"
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Sarah Chen",
    senderType: "investor",
    content: "Absolutely! I have some questions about your customer acquisition strategy and unit economics.",
    timestamp: "2024-01-20T10:30:00Z",
    type: "text",
    status: "read"
  },
  {
    id: 4,
    senderId: 2,
    senderName: "Alex Johnson",
    senderType: "startup",
    content: "Perfect! I've attached our latest financial model and customer acquisition metrics for your review.",
    timestamp: "2024-01-20T11:00:00Z",
    type: "file",
    status: "read",
    attachments: [
      {
        id: 1,
        name: "TechFlow_Financial_Model_Q4.xlsx",
        type: "spreadsheet",
        size: "2.3 MB",
        url: "#"
      },
      {
        id: 2,
        name: "Customer_Acquisition_Metrics.pdf",
        type: "pdf",
        size: "1.1 MB",
        url: "#"
      }
    ]
  },
  {
    id: 5,
    senderId: 1,
    senderName: "Sarah Chen",
    senderType: "investor",
    content: "",
    timestamp: "2024-01-20T14:30:00Z",
    type: "meeting_request",
    status: "read",
    meetingDetails: {
      title: "Series A Discussion - TechFlow Solutions",
      date: "2024-01-25T15:00:00Z",
      duration: "60 minutes",
      link: "https://meet.google.com/abc-defg-hij"
    }
  }
];

export const CommunicationInterface: React.FC<CommunicationInterfaceProps> = ({
  currentUserId,
  userType,
  conversations = mockConversations,
  activeConversationId = 1,
  onSendMessage,
  onStartVideoCall,
  onScheduleMeeting,
  onArchiveConversation,
  onPinConversation
}) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipant = activeConversation?.participants.find(p => p.id !== currentUserId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: currentUserId,
      senderName: "You",
      senderType: userType,
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      status: "sent"
    };

    setMessages(prev => [...prev, message]);
    onSendMessage(activeConversationId!, newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Circle className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <CheckCircle className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCircle className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.senderId === currentUserId;
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
          {!isOwnMessage && (
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {message.senderName}
              </span>
            </div>
          )}
          
          <div className={`rounded-lg px-4 py-2 ${
            isOwnMessage 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
          }`}>
            {message.type === "text" && (
              <p className="text-sm">{message.content}</p>
            )}
            
            {message.type === "file" && message.attachments && (
              <div className="space-y-2">
                {message.content && (
                  <p className="text-sm mb-2">{message.content}</p>
                )}
                {message.attachments.map(attachment => (
                  <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/10 rounded border">
                    <FileText className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{attachment.name}</div>
                      <div className="text-xs opacity-75">{attachment.size}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {message.type === "meeting_request" && message.meetingDetails && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Meeting Request</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{message.meetingDetails.title}</div>
                  <div>{new Date(message.meetingDetails.date).toLocaleString('en-US', { timeZone: 'UTC' })}</div>
                  <div>Duration: {message.meetingDetails.duration}</div>
                </div>
                {message.meetingDetails.link && (
                  <Button variant="ghost" size="sm" className="text-white hover:text-white">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Join Meeting
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
            isOwnMessage ? 'justify-end' : 'justify-start'
          }`}>
            <span>{formatTime(message.timestamp)}</span>
            {isOwnMessage && getMessageStatusIcon(message.status)}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderVideoCall = () => {
    if (!isVideoCallActive) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* Video Call Header */}
        <div className="flex justify-between items-center p-4 bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">{otherParticipant?.name}</div>
              <div className="text-gray-300 text-sm">{otherParticipant?.company}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">15:42</span>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-16 w-16 text-white" />
              </div>
              <div className="text-white text-xl font-medium">{otherParticipant?.name}</div>
              <div className="text-gray-300">Connecting...</div>
            </div>
          </div>
          
          {/* Self Video */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Video Call Controls */}
        <div className="flex justify-center items-center gap-4 p-6 bg-black/50">
          <Button
            variant={isMicMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={() => setIsMicMuted(!isMicMuted)}
            className="rounded-full w-12 h-12"
          >
            {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={isVideoMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className="rounded-full w-12 h-12"
          >
            {isVideoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={() => setIsVideoCallActive(false)}
            className="rounded-full w-12 h-12"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full w-12 h-12"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge variant="secondary">
                {conversations.filter(c => c.unreadCount > 0).length} unread
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto">
              {filteredConversations.map(conversation => {
                const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
                const isActive = conversation.id === activeConversationId;
                
                return (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        {otherParticipant?.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm truncate">
                              {otherParticipant?.name}
                            </span>
                            {conversation.isPinned && (
                              <Star className="h-3 w-3 text-yellow-500" />
                            )}
                            {conversation.matchScore && (
                              <Badge variant="outline" className="text-xs">
                                {conversation.matchScore}%
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {otherParticipant?.title} at {otherParticipant?.company}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {conversation.lastMessage.content || "Meeting request"}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      {otherParticipant?.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{otherParticipant?.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {otherParticipant?.online ? (
                          <span className="text-green-600">Online</span>
                        ) : (
                          `Last seen ${otherParticipant?.lastSeen}`
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsVideoCallActive(true)}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowMeetingScheduler(true)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map(message => renderMessage(message))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a conversation from the sidebar to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Video Call Overlay */}
      {renderVideoCall()}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          // Handle file upload
          console.log("Files selected:", e.target.files);
        }}
      />
    </div>
  );
}; 