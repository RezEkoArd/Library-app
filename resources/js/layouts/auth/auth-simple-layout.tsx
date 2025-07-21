
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        // <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        //     <div className="w-full max-w-sm">
        //         <div className="flex flex-col gap-8">
        //             <div className="flex flex-col items-center gap-4">
        //                 <div className="space-y-2 text-center">
        //                     <h1 className="text-xl font-medium">{title}</h1>
        //                     <p className="text-center text-sm text-muted-foreground">{description}</p>
        //                 </div>
        //             </div>
        //             {children}
        //         </div>
        //     </div>
        // </div>

        <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            {/* <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Acme Inc.
            </a> */}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
                <div className="flex flex-col items-center gap-2 text-center mb-6">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    {description}
                  </p>
                </div>
                {children}
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/placeholder.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    );
}
