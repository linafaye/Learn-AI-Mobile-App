
import React from 'react';

interface SettingsHeaderProps {
  title: string;
  description: string;
}

export function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
