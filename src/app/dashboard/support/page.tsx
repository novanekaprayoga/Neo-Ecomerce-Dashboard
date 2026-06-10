'use client';

import { Button, Card, CardBody, CardHeader, CardTitle, Input } from '@/components/ui';

const faqs = [
  {
    question: 'Why is my dashboard data not changing?',
    answer: 'This demo uses local mock data. Filters and search update the visible dataset, but no live server data is fetched.',
  },
  {
    question: 'Can I export filtered data?',
    answer: 'Yes. Dashboard exports now use the currently filtered orders or products data.',
  },
  {
    question: 'Where can I update profile details?',
    answer: 'Open Profile Settings from the avatar menu, or go to Settings and scroll to Profile Settings.',
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h1>
        <p className="text-gray-500 dark:text-gray-400">Find answers or send a request to the support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Email</p>
              <p className="text-gray-500 dark:text-gray-400">support@neo-commerce.local</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Response Time</p>
              <p className="text-gray-500 dark:text-gray-400">Within 1 business day</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Status</p>
              <p className="text-green-600 dark:text-green-400">Support available</p>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Submit Ticket</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Subject" type="text" placeholder="What do you need help with?" />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Describe the issue..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="primary">Send Request</Button>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardBody className="divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
              <h2 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
