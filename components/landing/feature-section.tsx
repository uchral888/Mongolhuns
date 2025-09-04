'use client';

import { 
  Video, 
  Users, 
  Award, 
  BarChart3, 
  Shield, 
  Clock,
  BookOpen,
  Trophy,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Video,
    title: 'Interactive Video Lessons',
    description: 'High-quality video content with progress tracking and engagement monitoring.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and certified educators worldwide.',
  },
  {
    icon: Award,
    title: 'Verified Certificates',
    description: 'Earn recognized certificates upon successful course completion.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Detailed insights into your learning journey and performance metrics.',
  },
  {
    icon: Shield,
    title: 'Secure Learning',
    description: 'Protected content delivery with advanced security measures.',
  },
  {
    icon: Clock,
    title: '24/7 Access',
    description: 'Learn at your own pace with unlimited access to course materials.',
  },
  {
    icon: BookOpen,
    title: 'Rich Content Library',
    description: 'Comprehensive course materials, quizzes, and supplementary resources.',
  },
  {
    icon: Trophy,
    title: 'Gamified Learning',
    description: 'Engaging learning experience with achievements and progress rewards.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Real-time quiz results and immediate performance feedback.',
  },
];

export function FeatureSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose EduPlatform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methodologies 
            to deliver an unparalleled learning experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}