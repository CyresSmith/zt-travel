'use client';

import { Button } from '@ui/button';

import { useRouter } from '@i18n/routing';

const DashboardSectionHeader = () => {
    const router = useRouter();

    const handleBackClick = () => router.push('/dashboard');

    return (
        <div className="flex w-full justify-end gap-3">
            <Button onClick={handleBackClick} iconName="widget">
                Dashboard
            </Button>
        </div>
    );
};

export default DashboardSectionHeader;
