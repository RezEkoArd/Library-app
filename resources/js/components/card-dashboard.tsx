import React from 'react';
import {
  Card,
  CardContent, // CardAction tidak ada di shadcn/ui, mungkin maksud Anda CardContent?
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CardDashboard as CardDashboardProps } from '@/types'; // Mengganti nama untuk menghindari konflik

export const CardDashboard = ({
  cardDescription,
  cardTitle,
  cardAction,
  footerTitle,
  footerDescription,
}: CardDashboardProps) => {
  const ActionIcon = cardAction;

  return (
    <Card className="@container/card">
      <CardHeader>
        {/* Sekarang variabel ini bisa diakses karena sudah di-destructure */}
        <CardDescription>{cardDescription}</CardDescription>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {cardTitle}
          </CardTitle>
          {/* Render ikon di sini, di sebelah judul */}
          {ActionIcon && <ActionIcon className="h-5 w-5 text-gray-500" />}
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerTitle}
        </div>
        <div className="text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};