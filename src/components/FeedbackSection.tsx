import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Send, Star, ThumbsUp, ThumbsDown, CheckCircle,
  Sparkles, Bug, Lightbulb, Zap, Heart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { useLanguage } from './utils/languageContext';

interface FeedbackSectionProps {
  userProfile: any;
}

interface FeedbackSubmission {
  id: string;
  type: string;
  rating: number;
  title: string;
  description: string;
  feature: string;
  date: string;
  status: 'submitted' | 'reviewed' | 'implemented';
}

const feedbackTypes = [
  { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { value: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  { value: 'improvement', label: 'Improvement', icon: Sparkles, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  { value: 'praise', label: 'Praise', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50 dark:bg-pink-900/20' },
  { value: 'other', label: 'Other', icon: MessageSquare, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
];

const features = [
  'Dashboard',
  'Nutrition Tracker',
  'Workout Section',
  'Mental Wellbeing',
  'Therapy Chat',
  'Supplement Store',
  'Community',
  'Settings',
  'General Experience'
];

export default function FeedbackSection({ userProfile }: FeedbackSectionProps) {
  const { language } = useLanguage();
  
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<FeedbackSubmission[]>([
    {
      id: '1',
      type: 'improvement',
      rating: 5,
      title: 'Add dark mode',
      description: 'Would love to see a dark mode option for evening use',
      feature: 'Settings',
      date: '2025-10-25',
      status: 'implemented'
    },
    {
      id: '2',
      type: 'feature',
      rating: 4,
      title: 'Workout video tutorials',
      description: 'It would be great to have video demonstrations for exercises',
      feature: 'Workout Section',
      date: '2025-10-22',
      status: 'reviewed'
    },
  ]);

  const handleSubmitFeedback = () => {
    if (!feedbackType || !title || !description || rating === 0) {
      toast.error(
        language === 'fr' ? 'Champs requis manquants' : 'Missing required fields',
        { 
          description: language === 'fr' 
            ? 'Veuillez remplir tous les champs obligatoires'
            : 'Please fill in all required fields' 
        }
      );
      return;
    }

    const newFeedback: FeedbackSubmission = {
      id: Date.now().toString(),
      type: feedbackType,
      rating,
      title,
      description,
      feature: selectedFeature,
      date: new Date().toISOString().split('T')[0],
      status: 'submitted'
    };

    setSubmittedFeedback([newFeedback, ...submittedFeedback]);

    // Reset form
    setFeedbackType('');
    setRating(0);
    setTitle('');
    setDescription('');
    setSelectedFeature('');

    toast.success(
      language === 'fr' ? 'Merci pour vos commentaires!' : 'Thank you for your feedback!',
      { 
        description: language === 'fr' 
          ? 'Nous avons reçu votre retour et nous en tiendrons compte.'
          : 'We received your feedback and will take it into consideration.' 
      }
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { 
        label: language === 'fr' ? 'Soumis' : 'Submitted', 
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
      },
      reviewed: { 
        label: language === 'fr' ? 'En revue' : 'Reviewed', 
        color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' 
      },
      implemented: { 
        label: language === 'fr' ? 'Implémenté' : 'Implemented', 
        color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const selectedType = feedbackTypes.find(t => t.value === feedbackType);

  return (
    <div className="p-6 space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl">
          {language === 'fr' ? 'Vos retours comptent' : 'Your Feedback Matters'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          {language === 'fr' 
            ? 'Aidez-nous à améliorer WellnessHub. Partagez vos idées, signalez des bugs ou dites-nous simplement ce que vous aimez!'
            : 'Help us improve WellnessHub. Share your ideas, report bugs, or just tell us what you love!'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Feedback Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                {language === 'fr' ? 'Soumettre des retours' : 'Submit Feedback'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' 
                  ? 'Partagez vos pensées pour nous aider à améliorer votre expérience'
                  : 'Share your thoughts to help us improve your experience'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Feedback Type Selection */}
              <div>
                <Label className="text-base mb-3 block">
                  {language === 'fr' ? 'Type de retour' : 'Feedback Type'} *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFeedbackType(type.value)}
                      className={`p-4 border-2 rounded-xl text-center transition-all ${
                        feedbackType === type.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                        feedbackType === type.value ? 'text-blue-600' : type.color
                      }`} />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-base mb-3 block">
                  {language === 'fr' ? 'Évaluation globale' : 'Overall Rating'} *
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= rating 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-gray-600 dark:text-gray-400 self-center">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Feature Selection */}
              <div>
                <Label htmlFor="feature">
                  {language === 'fr' ? 'Fonctionnalité concernée' : 'Related Feature'}
                </Label>
                <Select value={selectedFeature} onValueChange={setSelectedFeature}>
                  <SelectTrigger id="feature" className="mt-2">
                    <SelectValue placeholder={
                      language === 'fr' ? 'Sélectionner une fonctionnalité' : 'Select a feature'
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {features.map((feature) => (
                      <SelectItem key={feature} value={feature}>
                        {feature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="title">
                  {language === 'fr' ? 'Titre' : 'Title'} *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    language === 'fr' 
                      ? 'Bref résumé de vos retours'
                      : 'Brief summary of your feedback'
                  }
                  className="mt-2"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">
                  {language === 'fr' ? 'Description' : 'Description'} *
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    language === 'fr' 
                      ? 'Partagez vos pensées détaillées, suggestions ou problèmes...'
                      : 'Share your detailed thoughts, suggestions, or issues...'
                  }
                  rows={6}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {description.length}/500 {language === 'fr' ? 'caractères' : 'characters'}
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmitFeedback}
                className="w-full gap-2"
                size="lg"
              >
                <Send className="w-4 h-4" />
                {language === 'fr' ? 'Soumettre les retours' : 'Submit Feedback'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats & Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Impact Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' ? 'Votre impact' : 'Your Impact'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {language === 'fr' ? 'Retours soumis' : 'Feedback Submitted'}
                  </span>
                </div>
                <span className="text-2xl">{submittedFeedback.length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">
                    {language === 'fr' ? 'Implémentés' : 'Implemented'}
                  </span>
                </div>
                <span className="text-2xl">
                  {submittedFeedback.filter(f => f.status === 'implemented').length}
                </span>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Merci de nous aider à améliorer WellnessHub! 💜'
                    : 'Thank you for helping us improve WellnessHub! 💜'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' ? 'Directives' : 'Guidelines'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 text-sm">
                <ThumbsUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Soyez spécifique et détaillé'
                    : 'Be specific and detailed'}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <ThumbsUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Incluez des étapes pour reproduire les bugs'
                    : 'Include steps to reproduce bugs'}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <ThumbsUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Soyez respectueux et constructif'
                    : 'Be respectful and constructive'}
                </p>
              </div>
              <div className="flex gap-2 text-sm">
                <ThumbsDown className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'fr' 
                    ? 'Évitez le spam ou les informations personnelles'
                    : 'Avoid spam or personal information'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Previous Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              {language === 'fr' ? 'Vos retours précédents' : 'Your Previous Feedback'}
            </CardTitle>
            <CardDescription>
              {language === 'fr' 
                ? 'Suivez le statut de vos soumissions'
                : 'Track the status of your submissions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submittedFeedback.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>
                  {language === 'fr' 
                    ? 'Aucun retour soumis pour le moment'
                    : 'No feedback submitted yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {submittedFeedback.map((feedback) => {
                  const typeConfig = feedbackTypes.find(t => t.value === feedback.type);
                  return (
                    <div 
                      key={feedback.id}
                      className={`p-4 rounded-lg border-2 ${
                        typeConfig?.bgColor || 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {typeConfig && <typeConfig.icon className={`w-5 h-5 ${typeConfig.color}`} />}
                          <h3 className="font-semibold">{feedback.title}</h3>
                        </div>
                        {getStatusBadge(feedback.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {feedback.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          {feedback.feature && (
                            <Badge variant="outline">{feedback.feature}</Badge>
                          )}
                          <div className="flex items-center gap-1">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <span>{feedback.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
