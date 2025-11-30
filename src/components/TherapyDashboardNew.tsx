import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Send, Bot, User, Heart, Calendar, Clock, TrendingUp, 
  Brain, Smile, MessageSquare, FileText, BarChart3, 
  Info, Shield, Zap, Award, Activity, Edit, Star,
  CheckCircle, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useLanguage } from './utils/languageContext';

interface TherapyDashboardProps {
  userProfile: any;
}

interface Message {
  id: string;
  sender: 'user' | 'therapist';
  content: string;
  timestamp: Date;
}

interface TherapySession {
  id: string;
  date: string;
  topic: string;
  duration: number;
  rating: number;
  notes: string;
  mood: {
    before: number;
    after: number;
  };
}

const therapyTopics = [
  { id: 'stress', label: 'Stress Management', icon: Brain, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20' },
  { id: 'anxiety', label: 'Anxiety Relief', icon: Heart, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/20' },
  { id: 'sleep', label: 'Sleep Issues', icon: Clock, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20' },
  { id: 'motivation', label: 'Motivation', icon: Zap, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20' },
];

const aiResponses: { [key: string]: string[] } = {
  default: [
    "I'm here to support you. Can you tell me more about what's on your mind?",
    "That sounds challenging. How have you been coping with this?",
    "Thank you for sharing. What would you like to explore today?",
    "I appreciate you opening up. Let's work through this together.",
  ],
  stress: [
    "Stress is a natural response. Let's explore some techniques to manage it better. Have you tried deep breathing exercises?",
    "I hear that you're feeling stressed. What are the main sources of stress in your life right now?",
    "Managing stress is important for overall wellbeing. Would you like to try a quick relaxation exercise?",
  ],
  anxiety: [
    "Anxiety can be overwhelming. Remember, you're not alone in this. What triggers your anxiety most?",
    "Let's work on some grounding techniques. Can you name 5 things you can see right now?",
    "Your feelings are valid. Have you noticed any patterns in when your anxiety tends to increase?",
  ],
  sleep: [
    "Good sleep is essential for mental health. What's your current bedtime routine like?",
    "Sleep issues often have underlying causes. Have you noticed anything specific that keeps you awake?",
    "Let's create a sleep hygiene plan together. What time do you typically try to go to bed?",
  ],
  motivation: [
    "Motivation can fluctuate, and that's normal. What are your current goals?",
    "Sometimes breaking big goals into smaller steps helps. What's one small thing you'd like to accomplish today?",
    "Tell me about a time when you felt really motivated. What was different then?",
  ],
};

const progressData = [
  { week: 'Week 1', stress: 8, anxiety: 7, mood: 5 },
  { week: 'Week 2', stress: 7, anxiety: 6, mood: 6 },
  { week: 'Week 3', stress: 6, anxiety: 5, mood: 7 },
  { week: 'Week 4', stress: 5, anxiety: 4, mood: 7 },
  { week: 'Week 5', stress: 4, anxiety: 4, mood: 8 },
  { week: 'Week 6', stress: 4, anxiety: 3, mood: 8 },
];

export default function TherapyDashboard({ userProfile }: TherapyDashboardProps) {
  const { language } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'therapist',
      content: `Hello ${userProfile.name || 'there'}! I'm your AI wellness companion. I'm here to provide a safe, supportive space for you to explore your thoughts and feelings. How are you feeling today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessions, setSessions] = useState<TherapySession[]>([
    {
      id: '1',
      date: '2025-10-28',
      topic: 'Stress Management',
      duration: 45,
      rating: 5,
      notes: 'Worked on breathing techniques and time management strategies',
      mood: { before: 6, after: 8 }
    },
    {
      id: '2',
      date: '2025-10-25',
      topic: 'Sleep Issues',
      duration: 30,
      rating: 4,
      notes: 'Discussed sleep hygiene and created a bedtime routine',
      mood: { before: 5, after: 7 }
    },
    {
      id: '3',
      date: '2025-10-22',
      topic: 'Anxiety Relief',
      duration: 40,
      rating: 5,
      notes: 'Practiced grounding exercises and identified anxiety triggers',
      mood: { before: 4, after: 7 }
    },
    {
      id: '4',
      date: '2025-10-19',
      topic: 'Motivation',
      duration: 35,
      rating: 4,
      notes: 'Set SMART goals and created action plan',
      mood: { before: 5, after: 7 }
    },
  ]);

  // Profile stats
  const totalSessions = sessions.length;
  const thisMonthSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    const now = new Date();
    return sessionDate.getMonth() === now.getMonth() && sessionDate.getFullYear() === now.getFullYear();
  }).length;
  const avgRating = sessions.reduce((sum, s) => sum + s.rating, 0) / sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
  const avgMoodImprovement = sessions.reduce((sum, s) => sum + (s.mood.after - s.mood.before), 0) / sessions.length;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const detectTopic = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) return 'stress';
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) return 'anxiety';
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) return 'sleep';
    if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated') || lowerMessage.includes('goal')) return 'motivation';
    return 'default';
  };

  const getAIResponse = (userMessage: string): string => {
    const topic = detectTopic(userMessage);
    const responses = aiResponses[topic] || aiResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'therapist',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickTopic = (topic: string) => {
    setSelectedTopic(topic);
    const topicMessages: { [key: string]: string } = {
      stress: "I've been feeling really stressed lately and need some help managing it.",
      anxiety: "I'm experiencing anxiety and would like to talk about it.",
      sleep: "I'm having trouble sleeping and it's affecting my daily life.",
      motivation: "I'm struggling with motivation and need some guidance.",
    };
    setInputMessage(topicMessages[topic] || '');
  };

  return (
    <div className="p-6 space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-purple-600" />
            {language === 'fr' ? 'Thérapie et conseil' : 'Therapy & Counseling'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'fr' ? 'Soutien professionnel pour votre bien-être mental' : 'Professional support for your mental wellbeing'}
          </p>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          {language === 'fr' ? 'IA disponible' : 'AI Available'}
        </Badge>
      </motion.div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">{language === 'fr' ? 'Chat' : 'Chat'}</TabsTrigger>
          <TabsTrigger value="profile">{language === 'fr' ? 'Profil' : 'Profile'}</TabsTrigger>
          <TabsTrigger value="progress">{language === 'fr' ? 'Progrès' : 'Progress'}</TabsTrigger>
          <TabsTrigger value="sessions">{language === 'fr' ? 'Sessions' : 'Sessions'}</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Quick Topics Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    {language === 'fr' ? 'Sujets rapides' : 'Quick Topics'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {therapyTopics.map((topic) => (
                    <Button
                      key={topic.id}
                      variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-2 ${topic.color}`}
                      onClick={() => handleQuickTopic(topic.id)}
                    >
                      <topic.icon className="w-4 h-4" />
                      {topic.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Info className="w-4 h-4 text-gray-500" />
                    {language === 'fr' ? 'Rappel important' : 'Important Reminder'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' 
                      ? "Cet outil IA fournit un soutien, mais ne remplace pas les soins professionnels de santé mentale. En cas d'urgence, contactez les services d'urgence locaux."
                      : 'This AI tool provides support but does not replace professional mental health care. For emergencies, contact local emergency services.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    {language === 'fr' ? 'Compagnon de bien-être IA' : 'AI Wellness Companion'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.sender === 'therapist' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-purple-500 text-white">
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-2xl p-3 ${
                              message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-500 text-white">
                                {userProfile.name?.charAt(0) || 'U'}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-500 text-white">
                              <Bot className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="px-4">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-600" />
                  {language === 'fr' ? 'Informations du profil' : 'Profile Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800">
                      <AvatarFallback className="bg-purple-500 text-white text-2xl">
                        {userProfile.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl">{userProfile.name || 'User'}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{userProfile.age || 'N/A'} {language === 'fr' ? 'ans' : 'years old'}</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                        {language === 'fr' ? 'Membre actif' : 'Active Member'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Adresse e-mail' : 'Email'}</span>
                      <span className="font-medium">{userProfile.email || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Membre depuis' : 'Member Since'}</span>
                      <span className="font-medium">Oct 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Fuseau horaire' : 'Timezone'}</span>
                      <span className="font-medium">UTC-5 (EST)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Statistiques de session' : 'Session Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Sessions totales' : 'Total Sessions'}</p>
                          <p className="text-2xl">{totalSessions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Ce mois-ci' : 'This Month'}</p>
                          <p className="text-2xl">{thisMonthSessions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Note moyenne' : 'Avg. Rating'}</p>
                          <p className="text-2xl">{avgRating.toFixed(1)} ⭐</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{language === 'fr' ? 'Temps total' : 'Total Time'}</p>
                          <p className="text-2xl">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-6"
          >
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {language === 'fr' ? 'Aperçu des progrès' : 'Progress Overview'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' ? 'Suivez vos améliorations au fil du temps' : 'Track your improvements over time'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name={language === 'fr' ? 'Stress' : 'Stress'} />
                      <Line type="monotone" dataKey="anxiety" stroke="#F59E0B" strokeWidth={2} name={language === 'fr' ? 'Anxiété' : 'Anxiety'} />
                      <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} name={language === 'fr' ? 'Humeur' : 'Mood'} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Progress Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'fr' ? 'Niveau de stress' : 'Stress Level'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">4/10</span>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      ↓ -50%
                    </Badge>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Excellents progrès! Continue.' : 'Great progress! Keep going.'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'fr' ? 'Qualité du sommeil' : 'Sleep Quality'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">8/10</span>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      ↑ +60%
                    </Badge>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Beaucoup mieux!' : 'Much better!'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'fr' ? 'Score d\'humeur' : 'Mood Score'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">8/10</span>
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
                      → {language === 'fr' ? 'Stable' : 'Stable'}
                    </Badge>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Bien maintenu' : 'Well maintained'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Key Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  {language === 'fr' ? 'Réalisations clés' : 'Key Achievements'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{language === 'fr' ? 'Série de 7 jours' : '7-Day Streak'}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Participation cohérente aux sessions' : 'Consistent session participation'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{language === 'fr' ? 'Niveau de stress réduit' : 'Reduced Stress Level'}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? 'Diminué de 50% depuis le début' : 'Decreased by 50% since start'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{language === 'fr' ? 'Techniques maîtrisées' : 'Mastered Techniques'}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'fr' ? '5 nouvelles stratégies d\'adaptation apprises' : 'Learned 5 new coping strategies'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {language === 'fr' ? 'Sessions récentes' : 'Recent Sessions'}
                </CardTitle>
                <CardDescription>
                  {language === 'fr' ? 'Historique de vos sessions de thérapie' : 'History of your therapy sessions'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{session.topic}</h3>
                            <Badge variant="outline">{session.duration} min</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{session.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(session.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {session.notes}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Smile className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {language === 'fr' ? 'Avant' : 'Before'}: {session.mood.before}/10
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smile className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {language === 'fr' ? 'Après' : 'After'}: {session.mood.after}/10
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 ml-auto">
                          +{session.mood.after - session.mood.before} {language === 'fr' ? 'amélioration' : 'improvement'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
