import React from 'react';
import { cn } from '@/lib/utils';
import type { Project, Notification, ActivityLog } from '@/lib/types';
import { Clock, Folder, CheckCircle, AlertTriangle, FileText, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm p-5 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group",
        onClick && "cursor-pointer"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Folder className="h-5 w-5" />
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full font-medium capitalize",
            project.visibility === 'public' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
          )}>
            {project.visibility}
          </span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{project.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description || 'No description provided.'}</p>
      </div>
      <div className="mt-4 flex items-center text-xs text-muted-foreground">
        <Clock className="mr-1 h-3 w-3" />
        {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
      </div>
    </div>
  );
}

export function NotificationCard({ notification, onRead }: { notification: Notification; onRead?: () => void }) {
  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-lg transition-colors border-b last:border-b-0",
      notification.is_read ? "bg-transparent" : "bg-muted/30"
    )}>
      <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <AlertTriangle className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{notification.title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
        <p className="text-xs text-muted-foreground pt-1">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
      {!notification.is_read && onRead && (
        <button 
          onClick={onRead}
          className="shrink-0 h-8 w-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          title="Mark as read"
        >
          <CheckCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function ActivityCard({ activity }: { activity: ActivityLog }) {
  const getIcon = () => {
    switch(activity.entity_type) {
      case 'project': return <Folder className="h-4 w-4" />;
      case 'sample': return <FileText className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-b-0">
      <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm truncate">
          <span className="font-medium capitalize">{activity.action.replace('_', ' ')}</span>
          <span className="text-muted-foreground ml-1">a {activity.entity_type}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
