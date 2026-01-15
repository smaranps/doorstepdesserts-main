
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CakeCustomizerPage() {
  const [eventDescription, setEventDescription] = useState('');

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Cake Customizer</CardTitle>
          <CardDescription>
            Describe your event and theme, and we'll design the perfect cake for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="event-description">Event Details</Label>
              <Textarea
                id="event-description"
                placeholder="e.g., 'A baby shower for a friend who loves travel.' or 'My son's 8th birthday. He is obsessed with space and rockets!'"
                rows={4}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
             <Button type="submit" className="w-full" size="lg">
                Generate Cake Ideas
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-headline text-center mb-4">Your Custom Cake</h3>
               <div className="text-center text-muted-foreground">
                Your generated cake description will appear here.
              </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
