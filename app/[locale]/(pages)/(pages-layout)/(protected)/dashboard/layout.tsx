import type { WithChildren } from '@lib/types';

import DashboardMenu from '@components/dashboard/dashboard-menu';

const DashboardLayout = ({ children }: WithChildren) => {
    return (
        <div className="flex gap-10">
            <DashboardMenu />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;
