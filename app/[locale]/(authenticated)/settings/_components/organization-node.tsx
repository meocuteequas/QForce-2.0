"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type OrgChartMember } from "./org-data";

interface OrganizationNodeProps {
  node: OrgChartMember;
  level: number;
}

export default function OrganizationNode({ node, level }: OrganizationNodeProps) {
  const [expanded, setExpanded] = useState(true);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };
  
  const hasChildren = node.children && node.children.length > 0;
  const isRoot = level === 0;

  // Calculate the colors based on level
  const getLevelColor = (level: number) => {
    const colors = ["bg-primary/10", "bg-secondary/10", "bg-accent/10", "bg-muted/20", "bg-primary/5"];
    return colors[level % colors.length];
  };

  return (
    <div className="flex flex-col items-center">
      <Card className={`p-3 min-w-[200px] ${getLevelColor(level)} border-2 ${isRoot ? "border-primary" : "border-border"} shadow-md`}>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {node.image ? (
              <AvatarImage src={node.image} alt={node.name} />
            ) : (
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{node.name}</div>
            <div className="text-xs text-muted-foreground truncate">{node.title}</div>
          </div>
          {hasChildren && (
            <button
              onClick={handleToggle}
              className="p-1 rounded-full hover:bg-muted"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
        
        {node.department && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              {node.department}
            </Badge>
          </div>
        )}
      </Card>
      
      {hasChildren && expanded && (
        <div className="pt-6 relative">
          {/* Vertical line from parent to horizontal connector */}
          <div className="absolute top-0 left-1/2 h-6 w-[2px] bg-primary/30 -translate-x-1/2" />
          
          <div className="flex flex-row gap-8">
            {node.children?.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children!.length - 1;
              const childCount = node.children!.length;
              
              return (
                <div key={child.id} className="relative">
                  {/* Horizontal connector line */}
                  {childCount > 1 && (
                    <>
                      {/* Top horizontal connector */}
                      <div 
                        className="absolute top-0 h-[2px] bg-primary/30 -translate-y-3"
                        style={{
                          left: isFirst ? '50%' : '0',
                          right: isLast ? '50%' : '0'
                        }}
                      />
                      
                      {/* Vertical drop to child for middle children */}
                      {!isFirst && !isLast && (
                        <div className="absolute top-0 left-1/2 h-3 w-[2px] bg-primary/30 -translate-x-1/2 -translate-y-3" />
                      )}
                    </>
                  )}
                  
                  <OrganizationNode node={child} level={level + 1} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}