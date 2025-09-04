'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  type: 'mcq' | 'true_false';
}

interface QuizComponentProps {
  questions: Question[];
  title: string;
  onComplete: (score: number) => void;
  timeLimit?: number; // in minutes
}

export function QuizComponent({ questions, title, onComplete, timeLimit }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft === null || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;
    
    setIsSubmitted(true);
    let correctAnswers = 0;

    questions.forEach(question => {
      if (answers[question.id] === question.correct_answer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResult(true);
    onComplete(finalScore);

    if (finalScore >= 80) {
      toast.success(`Great job! You scored ${finalScore}%`);
    } else {
      toast.error(`You scored ${finalScore}%. Try again to improve your score.`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {score >= 80 ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle>Quiz Complete!</CardTitle>
          <CardDescription>
            You scored {score}% on {title}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2 text-primary">{score}%</div>
            <p className="text-muted-foreground">
              {score >= 80 ? 'Congratulations! You passed!' : 'Keep studying and try again.'}
            </p>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="text-left p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  {answers[question.id] === question.correct_answer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium mb-2">{question.question}</p>
                    <p className="text-sm text-muted-foreground">
                      Your answer: {question.options[answers[question.id]] || 'Not answered'}
                    </p>
                    <p className="text-sm text-green-600">
                      Correct answer: {question.options[question.correct_answer]}
                    </p>
                    {question.explanation && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={() => window.history.back()}>
              Return to Course
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          {timeLeft !== null && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className={timeLeft < 300 ? 'text-red-500' : 'text-muted-foreground'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>
        <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Question */}
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
            
            {/* Options */}
            <RadioGroup
              value={answers[currentQ.id]?.toString() || ''}
              onValueChange={(value) => handleAnswerChange(currentQ.id, parseInt(value))}
              className="space-y-3"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button 
                onClick={handleSubmitQuiz}
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== 0}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== 0}
              >
                Next
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="text-center text-sm text-muted-foreground">
            Answered: {Object.keys(answers).length} / {questions.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}