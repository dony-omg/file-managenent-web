'use client';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewVehicleForm = dynamic(() => import('./components/create-form'), {
  ssr: false
});

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-[600px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Tạo mới phương tiện
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NewVehicleForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
