'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '10,000+', label: 'Active Students', suffix: '' },
  { value: '200+', label: 'Expert Courses', suffix: '' },
  { value: '50+', label: 'Country Reach', suffix: '' },
  { value: '95%', label: 'Success Rate', suffix: '' },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Learners Worldwide
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join a global community of learners who have transformed their careers 
            through our comprehensive education platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-primary-foreground/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}