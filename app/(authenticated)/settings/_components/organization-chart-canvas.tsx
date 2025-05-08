"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react";
import OrganizationNode from "./organization-node";
import { initialOrgData } from "./org-data";

export function OrganizationChartCanvas() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prevScale => Math.max(0.5, Math.min(2.5, prevScale + delta)));
    }
  }, []);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start dragging if it's with middle mouse button or if we're holding space
    if (e.button === 1 || e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const zoomIn = () => {
    setScale(prevScale => Math.min(2.5, prevScale + 0.1));
  };
  
  const zoomOut = () => {
    setScale(prevScale => Math.max(0.5, prevScale - 0.1));
  };
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error(`Error attempting to enable fullscreen: ${err.message}`));
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => console.error(`Error attempting to exit fullscreen: ${err.message}`));
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [handleMouseUp]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${isFullscreen ? 'h-screen w-screen bg-background' : 'h-[800px] w-full'}`}
    >
      <Card className={`h-full w-full overflow-hidden border border-border relative ${isFullscreen ? 'bg-background' : 'bg-muted/5'}`}>
        {/* Grid Background Canvas */}
        <div 
          ref={canvasRef}
          className="h-full w-full overflow-hidden cursor-grab relative bg-grid-pattern"
          style={{ 
            cursor: isDragging ? "grabbing" : "grab",
            backgroundSize: `${40 * scale}px ${40 * scale}px`,
            backgroundPosition: `${position.x % (40 * scale)}px ${position.y % (40 * scale)}px`
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          <div
            className="absolute transition-transform duration-75 ease-linear"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center",
            }}
          >
            <OrganizationNode node={initialOrgData} level={0} />
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-background/80 p-2 rounded-md backdrop-blur-sm">
          <Button size="icon" variant="outline" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
            <span className="sr-only">Zoom in</span>
          </Button>
          <div className="text-xs text-center font-mono">
            {Math.round(scale * 100)}%
          </div>
          <Button size="icon" variant="outline" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
            <span className="sr-only">Zoom out</span>
          </Button>
          <Button size="icon" variant="outline" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}