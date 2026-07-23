'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Fingerprint, Upload, Folder, BarChart2, CheckCheck } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useDemoStore } from '@/store/demo-store';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New species detected',
    description: 'Chinese Torrent Frog identified in river_amazon sample with 99% confidence.',
    time: '2 minutes ago',
    icon: Fingerprint,
    color: 'text-primary',
    bg: 'bg-primary/10',
    isRead: false,
  },
  {
    id: '2',
    title: 'ML analysis completed',
    description: 'Batch processing finished for 15 sequence records in Global eDNA Survey.',
    time: '1 hour ago',
    icon: BarChart2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    isRead: false,
  },
  {
    id: '3',
    title: 'Project joined',
    description: 'You are now a contributor to the Global eDNA River Survey.',
    time: '3 hours ago',
    icon: Folder,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    isRead: true,
  },
  {
    id: '4',
    title: 'Sample uploaded successfully',
    description: 'seq_batch_A.fasta (12.4 MB) has been securely stored and indexed.',
    time: '1 day ago',
    icon: Upload,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    isRead: true,
  }
];

export function NotificationsDropdown() {
  const { isDemoMode } = useDemoStore();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  if (!mounted) {
    return (
      <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
        <Bell className="h-5 w-5" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive border-2 border-card"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 sm:w-96 p-0 border-muted">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </button>
          )}
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-4 cursor-pointer border-b last:border-0 rounded-none focus:bg-muted transition-colors",
                  !notification.isRead ? "bg-muted/30" : "opacity-75 hover:opacity-100"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={cn("mt-0.5 flex-shrink-0 p-2 rounded-full", notification.bg, notification.color)}>
                  <notification.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none flex items-center justify-between">
                    {notification.title}
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 ml-2" />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium pt-1">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        <div className="p-2 border-t">
          <button className="w-full py-1.5 text-xs font-medium text-center text-muted-foreground hover:text-primary transition-colors">
            View all notifications
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
