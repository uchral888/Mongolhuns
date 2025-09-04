'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  PlayCircle,
  CheckCircle,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  total_lessons: number;
  completed_lessons: number;
  progress: number;
  instructor: string;
  duration: string;
}

interface RecentActivity {
  id: string;
  type: 'lesson' | 'quiz' | 'exam';
  title: string;
  course: string;
  score?: number;
  date: string;
}

export function StudentDashboard() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalWatchTime: 0,
    certificatesEarned: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for demonstration
      setCourses([
        {
          id: '1',
          title: 'JavaScript Fundamentals',
          description: 'Learn the basics of JavaScript programming',
          thumbnail_url: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
          total_lessons: 12,
          completed_lessons: 8,
          progress: 67,
          instructor: 'John Doe',
          duration: '4 hours',
        },
        {
          id: '2',
          title: 'React Development',
          description: 'Master modern React development',
          thumbnail_url: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
          total_lessons: 15,
          completed_lessons: 3,
          progress: 20,
          instructor: 'Jane Smith',
          duration: '6 hours',
        },
      ]);

      setRecentActivity([
        {
          id: '1',
          type: 'lesson',
          title: 'Variables and Data Types',
          course: 'JavaScript Fundamentals',
          date: '2 hours ago',
        },
        {
          id: '2',
          type: 'quiz',
          title: 'Chapter 3 Quiz',
          course: 'JavaScript Fundamentals',
          score: 85,
          date: '1 day ago',
        },
      ]);

      setStats({
        totalCourses: 5,
        completedCourses: 2,
        totalWatchTime: 24,
        certificatesEarned: 2,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.completedCourses}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalWatchTime}h</p>
                  <p className="text-sm text-muted-foreground">Watch Time</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      size="sm"
                      className="absolute top-4 right-4"
                      asChild
                    >
                      <a href={`/courses/${course.id}`}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Continue
                      </a>
                    </Button>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {course.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </span>
                      <Badge variant={course.progress === 100 ? 'default' : 'secondary'}>
                        {course.progress === 100 ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your learning activities from the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {activity.type === 'lesson' && <PlayCircle className="h-4 w-4 text-primary" />}
                          {activity.type === 'quiz' && <Target className="h-4 w-4 text-primary" />}
                          {activity.type === 'exam' && <Trophy className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.course}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.score && (
                          <Badge variant={activity.score >= 80 ? 'default' : 'secondary'}>
                            {activity.score}%
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements & Certificates
                </CardTitle>
                <CardDescription>
                  Your learning milestones and earned certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 border rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                    <Award className="h-8 w-8 text-yellow-600 mb-3" />
                    <h3 className="font-semibold mb-2">JavaScript Master</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Completed JavaScript Fundamentals with 90% score
                    </p>
                    <Button size="sm" variant="outline">
                      View Certificate
                    </Button>
                  </div>
                  
                  <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                    <Star className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-2">Quick Learner</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Completed 5 lessons in a single day
                    </p>
                    <Badge variant="secondary">Unlocked</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}