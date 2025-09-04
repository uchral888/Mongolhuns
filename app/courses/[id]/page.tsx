'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from '@/components/video/video-player';
import { QuizComponent } from '@/components/quiz/quiz-component';
import { 
  PlayCircle, 
  Clock, 
  BookOpen, 
  CheckCircle,
  Lock,
  Star,
  Users
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration: number;
  order_index: number;
  is_completed: boolean;
  quiz?: any;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail_url: string;
  lessons: Lesson[];
  rating: number;
  total_students: number;
}

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCourse(params.id as string);
    }
  }, [params.id]);

  const fetchCourse = async (courseId: string) => {
    try {
      // Mock data for demonstration
      const mockCourse: Course = {
        id: courseId,
        title: 'JavaScript Fundamentals',
        description: 'Learn the core concepts of JavaScript programming from scratch.',
        instructor: 'John Doe',
        thumbnail_url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
        rating: 4.8,
        total_students: 1250,
        lessons: [
          {
            id: '1',
            title: 'Introduction to JavaScript',
            description: 'Getting started with JavaScript basics',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: 900, // 15 minutes
            order_index: 1,
            is_completed: true,
            quiz: {
              id: 'quiz-1',
              title: 'JavaScript Basics Quiz',
              questions: [
                {
                  id: '1',
                  question: 'What is JavaScript?',
                  options: [
                    'A markup language',
                    'A programming language',
                    'A database',
                    'A web server'
                  ],
                  correct_answer: 1,
                  type: 'mcq',
                  explanation: 'JavaScript is a high-level, interpreted programming language.'
                },
                {
                  id: '2',
                  question: 'JavaScript is case-sensitive',
                  options: ['True', 'False'],
                  correct_answer: 0,
                  type: 'true_false',
                  explanation: 'Yes, JavaScript is case-sensitive. Variable names, function names, and keywords must be typed with consistent capitalization.'
                }
              ],
              passing_score: 80,
              time_limit: 5
            }
          },
          {
            id: '2',
            title: 'Variables and Data Types',
            description: 'Understanding variables, data types, and declarations',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: 1200, // 20 minutes
            order_index: 2,
            is_completed: false,
          },
          {
            id: '3',
            title: 'Functions and Scope',
            description: 'Mastering functions, parameters, and scope in JavaScript',
            video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: 1500, // 25 minutes
            order_index: 3,
            is_completed: false,
          },
        ],
      };

      setCourse(mockCourse);
      setCurrentLesson(mockCourse.lessons[0]);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    // Check if lesson is accessible (previous lessons completed)
    const lessonIndex = course?.lessons.findIndex(l => l.id === lesson.id) || 0;
    const previousLessons = course?.lessons.slice(0, lessonIndex) || [];
    const allPreviousCompleted = previousLessons.every(l => l.is_completed);

    if (lessonIndex === 0 || allPreviousCompleted) {
      setCurrentLesson(lesson);
      setShowQuiz(false);
    }
  };

  const handleVideoComplete = () => {
    if (currentLesson?.quiz) {
      setShowQuiz(true);
    } else {
      // Mark lesson as completed
      markLessonCompleted();
    }
  };

  const handleQuizComplete = (score: number) => {
    if (score >= 80) {
      markLessonCompleted();
      setShowQuiz(false);
    }
  };

  const markLessonCompleted = () => {
    if (!course || !currentLesson) return;

    setCourse(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        lessons: prev.lessons.map(lesson =>
          lesson.id === currentLesson.id
            ? { ...lesson, is_completed: true }
            : lesson
        ),
      };
    });
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!course) {
    return <div className="text-center p-8">Course not found</div>;
  }

  const completedLessons = course.lessons.filter(l => l.is_completed).length;
  const progress = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full lg:w-80 h-48 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge>by {course.instructor}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{course.total_students.toLocaleString()} students</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {completedLessons} of {course.lessons.length} lessons completed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {showQuiz && currentLesson?.quiz ? (
              <QuizComponent
                questions={currentLesson.quiz.questions}
                title={currentLesson.quiz.title}
                timeLimit={currentLesson.quiz.time_limit}
                onComplete={handleQuizComplete}
              />
            ) : currentLesson ? (
              <Card>
                <CardHeader>
                  <CardTitle>{currentLesson.title}</CardTitle>
                  <CardDescription>{currentLesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoPlayer
                    src={currentLesson.video_url}
                    title={currentLesson.title}
                    onProgressUpdate={(progress) => {
                      // Update lesson progress
                    }}
                    onComplete={handleVideoComplete}
                    preventSkipping={true}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a lesson to start learning</h3>
                  <p className="text-muted-foreground">
                    Choose a lesson from the course content to begin your learning journey.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Course Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {course.lessons.map((lesson, index) => {
                    const isAccessible = index === 0 || course.lessons[index - 1]?.is_completed;
                    const isActive = currentLesson?.id === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 cursor-pointer transition-colors ${
                          isActive ? 'bg-muted' : 'hover:bg-muted/50'
                        } ${!isAccessible ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => isAccessible && handleLessonSelect(lesson)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {lesson.is_completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : isAccessible ? (
                              <PlayCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{Math.round(lesson.duration / 60)} min</span>
                              {lesson.quiz && (
                                <Badge variant="outline" className="text-xs">Quiz</Badge>
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
          </div>
        </div>
      </div>
    </div>
  );
}