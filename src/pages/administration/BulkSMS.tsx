
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FloatCard } from '@/components/ui/FloatCard';
import { FloatButton } from '@/components/ui/FloatButton';
import { FloatInput } from '@/components/ui/FloatInput';
import { FloatBadge } from '@/components/ui/FloatBadge';
import { MessageSquare, Send, Users, Clock, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
    id: string;
    name: string;
    content: string;
}

const initialTemplates: Template[] = [
    { id: '1', name: 'Meeting Reminder', content: 'Dear Member, this is a reminder for the upcoming meeting on Sunday at 10 AM. Please be on time.' },
    { id: '2', name: 'Donation Thank You', content: 'Thank you for your generous donation. Your support helps us continue our mission. God bless you.' },
    { id: '3', name: 'Event Invitation', content: 'You are cordially invited to our annual harvest celebration this weekend. Join us for a time of joy and fellowship.' },
];

const BulkSMS: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'compose' | 'templates' | 'history'>('compose');
    const [templates, setTemplates] = useState<Template[]>(initialTemplates);
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Template Management State
    const [isEditingTemplate, setIsEditingTemplate] = useState(false);
    const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
    const [templateName, setTemplateName] = useState('');
    const [templateContent, setTemplateContent] = useState('');

    const handleSendSMS = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient || !message) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success('SMS sent successfully');
            setMessage('');
            setRecipient('');
        }, 1500);
    };

    const handleUseTemplate = (template: Template) => {
        setMessage(template.content);
        setActiveTab('compose');
        toast.info(`Loaded template: ${template.name}`);
    };

    const handleDeleteTemplate = (id: string) => {
        setTemplates(templates.filter(t => t.id !== id));
        toast.success('Template deleted');
    };

    const handleSaveTemplate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!templateName || !templateContent) {
            toast.error('Please provide a name and content for the template');
            return;
        }

        if (currentTemplateId) {
            // Update existing
            setTemplates(templates.map(t => t.id === currentTemplateId ? { ...t, name: templateName, content: templateContent } : t));
            toast.success('Template updated');
        } else {
            // Create new
            const newTemplate = {
                id: Date.now().toString(),
                name: templateName,
                content: templateContent
            };
            setTemplates([...templates, newTemplate]);
            toast.success('Template created');
        }

        // Reset form
        setIsEditingTemplate(false);
        setCurrentTemplateId(null);
        setTemplateName('');
        setTemplateContent('');
    };

    const prepareEditTemplate = (template: Template) => {
        setTemplateName(template.name);
        setTemplateContent(template.content);
        setCurrentTemplateId(template.id);
        setIsEditingTemplate(true);
    };

    return (
        <DashboardLayout title="Bulk SMS" subtitle="Send messages to your congregation">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <FloatCard className="text-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary mb-2">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-foreground font-display">1,240</p>
                    <p className="text-sm text-muted-foreground">SMS Sent</p>
                </FloatCard>
                <FloatCard className="text-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-success-light text-success mb-2">
                        <Users className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-foreground font-display">Active</p>
                    <p className="text-sm text-muted-foreground">Status</p>
                </FloatCard>
                <FloatCard className="text-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-warning-light text-warning mb-2">
                        <Clock className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-foreground font-display">500</p>
                    <p className="text-sm text-muted-foreground">Credits Remaining</p>
                </FloatCard>
            </div>

            <div className="flex gap-4 border-b border-border mb-6">
                <button
                    onClick={() => setActiveTab('compose')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'compose' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                    Compose Sending
                </button>
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'templates' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                    Templates
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                    History
                </button>
            </div>

            {activeTab === 'compose' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <FloatCard title="New Message">
                            <form onSubmit={handleSendSMS} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Recipients</label>
                                    <select
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select recipients</option>
                                        <option value="All Members">All Members</option>
                                        <option value="Clergy Only">Clergy Only</option>
                                        <option value="Men's Fellowship">Men's Fellowship</option>
                                        <option value="Women's Fellowship">Women's Fellowship</option>
                                        <option value="Youth Fellowship">Youth Fellowship</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-sm font-medium text-foreground">Message Content</label>
                                        <span className={`text-xs ${message.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                            {message.length} / 160 characters
                                        </span>
                                    </div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        rows={6}
                                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <FloatButton
                                        type="submit"
                                        variant="primary"
                                        isLoading={isLoading}
                                        leftIcon={<Send className="w-4 h-4" />}
                                    >
                                        Send Message
                                    </FloatButton>
                                </div>
                            </form>
                        </FloatCard>
                    </div>

                    <div>
                        <FloatCard title="Quick Templates">
                            <div className="space-y-3">
                                {templates.slice(0, 3).map((template) => (
                                    <div key={template.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => handleUseTemplate(template)}>
                                        <h4 className="font-medium text-sm text-foreground mb-1">{template.name}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{template.content}</p>
                                    </div>
                                ))}
                                <FloatButton variant="ghost" className="w-full text-xs" onClick={() => setActiveTab('templates')}>
                                    View All Templates
                                </FloatButton>
                            </div>
                        </FloatCard>
                    </div>
                </div>
            )}

            {activeTab === 'templates' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {templates.map(template => (
                                <FloatCard key={template.id} className="flex flex-col h-full relative group">
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => prepareEditTemplate(template)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteTemplate(template.id)} className="p-1.5 hover:bg-red-50 text-muted-foreground hover:text-red-500 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2 pr-12">{template.name}</h3>
                                    <p className="text-sm text-muted-foreground flex-1 mb-4">{template.content}</p>
                                    <FloatButton variant="outline" size="sm" onClick={() => handleUseTemplate(template)}>
                                        Use Template
                                    </FloatButton>
                                </FloatCard>
                            ))}
                        </div>
                    </div>

                    <div>
                        <FloatCard title={isEditingTemplate ? "Edit Template" : "New Template"}>
                            <form onSubmit={handleSaveTemplate} className="space-y-4">
                                <FloatInput
                                    label="Template Name"
                                    placeholder="e.g., Weekly Reminder"
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
                                    <textarea
                                        value={templateContent}
                                        onChange={(e) => setTemplateContent(e.target.value)}
                                        placeholder="Template content..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {isEditingTemplate && (
                                        <FloatButton variant="ghost" className="flex-1" onClick={() => {
                                            setIsEditingTemplate(false);
                                            setTemplateName('');
                                            setTemplateContent('');
                                            setCurrentTemplateId(null);
                                        }}>
                                            Cancel
                                        </FloatButton>
                                    )}
                                    <FloatButton variant="primary" type="submit" className="flex-1" leftIcon={<Plus className="w-4 h-4" />}>
                                        {isEditingTemplate ? "Update" : "Create"}
                                    </FloatButton>
                                </div>
                            </form>
                        </FloatCard>
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <FloatCard>
                    <div className="text-center py-12 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No message history available yet</p>
                    </div>
                </FloatCard>
            )}

        </DashboardLayout>
    );
};

export default BulkSMS;
