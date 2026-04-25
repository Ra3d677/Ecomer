"use client";

import React from "react";

interface MarqueeItem {
  id: string;
  text: string;
}

interface StoreMarqueeProps {
  settings: {
    enabled: boolean;
    items: MarqueeItem[];
    backgroundColor: string;
    textColor: string;
    speed: number;
  };
}

export default function StoreMarquee({ settings }: StoreMarqueeProps) {
  if (!settings.enabled || settings.items.length === 0) return null;

  return (
    <div 
      className="py-4 border-y flex items-center overflow-hidden"
      style={{ 
        backgroundColor: settings.backgroundColor,
        borderColor: `${settings.textColor}20` // 20% opacity of text color for border
      }}
    >
      <div 
        className="flex text-sm sm:text-base font-extrabold whitespace-nowrap min-w-max hover:cursor-pointer"
        style={{ color: settings.textColor }}
      >
        <div 
          className="flex animate-marquee"
          style={{ animationDuration: `${settings.speed}s` }}
        >
          {/* Double the content so it seamlessly loops */}
          {[...Array(4)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-8 px-4 items-center">
              {settings.items.map((item) => (
                <React.Fragment key={item.id}>
                  <span>{item.text}</span> <span>•</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
