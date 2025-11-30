import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Smile, Meh, Frown, Plus, Play, MessageSquare, Brain, 
  Flame, Target, TrendingUp, Calendar, Clock, Award,
  ChevronLeft, ChevronRight, Zap, Heart, CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BMIWidget from './BMIWidget';
import { calculateAllHealthMetrics } from './utils/healthCalculations';
import { useMealContext } from './utils/mealContext';
import { useMoodContext } from './utils/moodContext';
import { useWorkout } from './utils/workoutContext';
import { getWorkoutById } from './utils/workoutDatabase';

interface DashboardProps {
  userProfile: any;
  onNavigate?: (screen: string) => void;
}

const moodOptions = [
  { emoji: '😊', label: 'Great', value: 5, color: 'text-green-500' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'text-blue-500' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'text-yellow-500' },
  { emoji: '😔', label: 'Low', value: 2, color: 'text-orange-500' },
  { emoji: '😢', label: 'Bad', value: 1, color: 'text-red-500' },
];

const motivationalQuotes = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    category: "Fitness"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn",
    category: "Health"
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "Mental"
  },
  {
    text: "Your body can do it. It's your mind you need to convince.",
    author: "Unknown",
    category: "Motivation"
  },
  {
    text: "Health is not about the weight you lose, but about the life you gain.",
    author: "Unknown",
    category: "Wellness"
  },
];



const weeklyProgress = [
  { day: 'Mon', workouts: 1, calories: 2100 },
  { day: 'Tue', workouts: 0, calories: 1800 },
  { day: 'Wed', workouts: 1, calories: 2200 },
  { day: 'Thu', workouts: 1, calories: 1900 },
  { day: 'Fri', workouts: 0, calories: 2000 },
  { day: 'Sat', workouts: 2, calories: 2300 },
  { day: 'Sun', workouts: 1, calories: 2100 },
];

export default function Dashboard({ userProfile, onNavigate }: DashboardProps) {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [showMoodSaved, setShowMoodSaved] = useState(false);
  const { getTotalCalories } = useMealContext();
  const { getAverageMood, addMoodEntry } = useMoodContext();
  const workoutContext = useWorkout();
  const { getWeeklyProgress, getTotalStats, getScheduledWorkoutsForToday } = workoutContext;

  const handleSaveMood = () => {
    if (currentMood) {
      addMoodEntry({
        date: new Date().toLocaleDateString(),
        mood: currentMood,
        stressLevel: 5,
        energyLevel: 7,
      });
      setShowMoodSaved(true);
      setTimeout(() => setShowMoodSaved(false), 2000);
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Calculate user's calorie target using shared utility
  const { targetCalories, macros } = calculateAllHealthMetrics(
    userProfile.height,
    userProfile.weight,
    userProfile.age,
    userProfile.gender,
    userProfile.goals || []
  );

  // Get actual logged calorie intake from meal context
  const currentCalories = getTotalCalories();
  const calorieProgress = Math.round((currentCalories / targetCalories) * 100);

  // Create calorie data based on actual macros
  const calorieData = [
    { name: 'Carbs', value: macros.carbs.percent, color: '#3B82F6' },
    { name: 'Protein', value: macros.protein.percent, color: '#10B981' },
    { name: 'Fat', value: macros.fat.percent, color: '#F59E0B' },
  ];

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
  };

  const currentQuote = motivationalQuotes[currentQuoteIndex];

  // Get workout data
  const workoutWeeklyProgress = getWeeklyProgress();
  const workoutTotalStats = getTotalStats();
  const weeklyWorkoutCount = workoutWeeklyProgress.reduce((sum, day) => sum + day.workouts, 0);
  const weeklyGoal = 5; // User's weekly workout goal
  const workoutProgressPercent = Math.min((weeklyWorkoutCount / weeklyGoal) * 100, 100);

  const workoutTodayScheduled = getScheduledWorkoutsForToday();

  return (
    <div className="p-6 space-y-6 pb-20 md:pb-6">
      {/* Personalized Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 p-1"
      >
        <div className="bg-white rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {greeting}, {userProfile.name}! 
                {currentMood && (
                  <span className="ml-2">
                    {moodOptions.find(m => m.value === currentMood)?.emoji}
                  </span>
                )}
              </h1>
              <p className="text-gray-600 mt-1">How are you feeling today?</p>
              
              {/* Mood Selector */}
              <div className="flex gap-3 mt-4 flex-wrap items-center">
                {moodOptions.map((mood) => (
                  <motion.button
                    key={mood.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentMood(mood.value)}
                    className={`text-2xl p-2 rounded-xl transition-all ${
                      currentMood === mood.value 
                        ? 'bg-blue-100 ring-2 ring-blue-500' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {mood.emoji}
                  </motion.button>
                ))}
                {currentMood && (
                  <Button
                    onClick={handleSaveMood}
                    size="sm"
                    className="ml-2 bg-green-600 hover:bg-green-700"
                  >
                    {showMoodSaved ? '✓ Saved!' : 'Save'}
                  </Button>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1687180948607-9ba1dd045e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBjYWxtfGVufDF8fHx8MTc1Njc5MjM1MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wellness"
                className="w-24 h-24 rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* BMI Widget */}
        <BMIWidget userProfile={userProfile} />
        {/* Calorie Intake */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              Today's Calories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">{currentCalories.toLocaleString()}</div>
                <div className="text-sm text-gray-600">of {targetCalories.toLocaleString()} goal</div>
              </div>
              <div className="w-20 h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={calorieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {calorieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Progress value={calorieProgress} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-600">
              {calorieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-blue-500" />
              Workout Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold">{weeklyWorkoutCount}/{weeklyGoal}</span>
                <Badge variant="secondary">{Math.round(workoutProgressPercent)}%</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-3">workouts this week</div>
              <Progress value={workoutProgressPercent} className="mb-3" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Workouts</span>
                <span className="text-green-600">{workoutTotalStats.totalWorkouts} completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Calories Burned</span>
                <span className="text-blue-600">{workoutTotalStats.totalCalories} kcal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Time Invested</span>
                <span className="text-purple-600">{Math.floor(workoutTotalStats.totalDuration / 60)}h {workoutTotalStats.totalDuration % 60}m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mental Health Check-in */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="w-5 h-5 text-pink-500" />
              Mental Wellness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-2xl font-bold mb-1">
                {currentMood ? moodOptions.find(m => m.value === currentMood)?.label : 'Not set'}
              </div>
              <div className="text-sm text-gray-600 mb-3">mood today</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Average mood</span>
                <span className="text-pink-600 font-medium">{getAverageMood() > 0 ? getAverageMood().toFixed(1) : 'No data'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Meditation streak</span>
                <span className="text-green-600 font-medium">7 days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Journal entries</span>
                <span className="text-blue-600 font-medium">5 this week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 bg-green-50 border-green-200 hover:bg-green-100"
            onClick={() => onNavigate?.('nutrition')}
          >
            <Plus className="w-6 h-6 text-green-600" />
            <span className="text-sm">Log Meal</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100"
            onClick={() => onNavigate?.('workout')}
          >
            <Play className="w-6 h-6 text-blue-600" />
            <span className="text-sm">Start Workout</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100"
            onClick={() => onNavigate?.('therapy')}
          >
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Therapy Chat</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex-col gap-2 bg-pink-50 border-pink-200 hover:bg-pink-100"
            onClick={() => onNavigate?.('mental')}
          >
            <Brain className="w-6 h-6 text-pink-600" />
            <span className="text-sm">Meditate</span>
          </Button>
        </div>
      </motion.div>

      {/* Motivational Quote Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevQuote}
                className="text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 text-center px-4">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="text-lg italic mb-2">
                    "{currentQuote.text}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <cite className="text-sm opacity-90">— {currentQuote.author}</cite>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {currentQuote.category}
                    </Badge>
                  </div>
                </motion.div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextQuote}
                className="text-white hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex justify-center mt-4 gap-1">
              {motivationalQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-opacity ${
                    index === currentQuoteIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutWeeklyProgress.length > 0 ? workoutWeeklyProgress : weeklyProgress}>
                  <XAxis dataKey={workoutWeeklyProgress.length > 0 ? "date" : "day"} />
                  <YAxis />
                  <Bar dataKey="workouts" fill="#3B82F6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">
                  {weeklyWorkoutCount}
                </div>
                <div className="text-xs text-gray-600\">Workouts</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {Math.floor(workoutTotalStats.totalDuration / 60)}h {workoutTotalStats.totalDuration % 60}m
                </div>
                <div className="text-xs text-gray-600">Duration</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">
                  {workoutTotalStats.totalCalories}
                </div>
                <div className="text-xs text-gray-600">Calories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workoutTodayScheduled.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No activities scheduled for today</p>
                  <p className="text-sm mt-1">Go to Workout section to schedule activities</p>
                </div>
              ) : (
                workoutTodayScheduled.map((scheduled) => {
                  const workout = getWorkoutById(scheduled.workoutId);
                  if (!workout) return null;
                  
                  return (
                    <div key={scheduled.id} className={`flex items-center gap-4 p-3 rounded-lg ${
                      scheduled.completed ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        scheduled.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {scheduled.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Clock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{workout.title}</h4>
                        <p className="text-sm text-gray-600">{scheduled.time} • {workout.duration}m</p>
                      </div>
                      <Badge variant="outline" className={
                        scheduled.completed 
                          ? 'border-green-500 text-green-700 bg-green-100' 
                          : 'border-blue-500 text-blue-700'
                      }>
                        {scheduled.completed ? 'Completed' : 'Scheduled'}
                      </Badge>
                    </div>
                  );
                })
              )}
              
              {/* Sample activities if no workouts */}
              {workoutTodayScheduled.length === 0 && (
                <>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg opacity-50">
                    <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-600">Example: Morning Yoga</h4>
                      <p className="text-sm text-gray-500">7:00 AM - 7:30 AM</p>
                    </div>
                    <Badge variant="outline" className="border-gray-400 text-gray-600">
                      Sample
                    </Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Achievement 1 */}
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">7-Day Streak</h3>
                    <p className="text-sm text-gray-600 mt-1">Logged meals for 7 consecutive days</p>
                    <Badge className="mt-2 bg-yellow-500 text-white">
                      Unlocked Oct 28
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Achievement 2 */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Goal Crusher</h3>
                    <p className="text-sm text-gray-600 mt-1">Completed 5 weekly workout goals</p>
                    <Badge className="mt-2 bg-blue-500 text-white">
                      Unlocked Oct 22
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Achievement 3 */}
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Mindful Master</h3>
                    <p className="text-sm text-gray-600 mt-1">Completed 30 meditation sessions</p>
                    <Badge className="mt-2 bg-green-500 text-white">
                      Unlocked Oct 15
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Achievement 4 */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Early Bird</h3>
                    <p className="text-sm text-gray-600 mt-1">Completed 10 morning workouts</p>
                    <Badge className="mt-2 bg-purple-500 text-white">
                      Unlocked Oct 10
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Achievement 5 */}
              <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border-2 border-red-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Weight Loss Champion</h3>
                    <p className="text-sm text-gray-600 mt-1">Lost 5kg towards your goal</p>
                    <Badge className="mt-2 bg-red-500 text-white">
                      Unlocked Oct 5
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Achievement 6 */}
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Perfect Week</h3>
                    <p className="text-sm text-gray-600 mt-1">Met all goals for 7 days straight</p>
                    <Badge className="mt-2 bg-indigo-500 text-white">
                      Unlocked Sep 28
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Personal Records Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Personal Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Record 1 */}
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold">Max Bench Press</span>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      100 kg
                    </div>
                    <p className="text-sm text-gray-600">2025-10-15</p>
                    <p className="text-sm text-gray-700 mt-2 italic">"New PR!"</p>
                  </div>
                </div>
              </div>

              {/* Record 2 */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">Fastest 5K</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      22.5 minutes
                    </div>
                    <p className="text-sm text-gray-600">2025-10-20</p>
                    <p className="text-sm text-gray-700 mt-2 italic">"Beat previous time by 2 min"</p>
                  </div>
                </div>
              </div>

              {/* Record 3 */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="font-semibold">Lowest Weight</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      69.6 kg
                    </div>
                    <p className="text-sm text-gray-600">2025-10-28</p>
                    <p className="text-sm text-gray-700 mt-2 italic">"Down 5kg from start!"</p>
                  </div>
                </div>
              </div>

              {/* Record 4 */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold">Most Push-ups</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      75 reps
                    </div>
                    <p className="text-sm text-gray-600">2025-10-12</p>
                    <p className="text-sm text-gray-700 mt-2 italic">"Finally hit my goal!"</p>
                  </div>
                </div>
              </div>

              {/* Record 5 */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-red-600" />
                      <span className="font-semibold">Longest Plank</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      3.5 minutes
                    </div>
                    <p className="text-sm text-gray-600">2025-10-08</p>
                    <p className="text-sm text-gray-700 mt-2 italic">"Core strength is improving!"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full" onClick={() => onNavigate?.('settings')}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Personal Record
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}