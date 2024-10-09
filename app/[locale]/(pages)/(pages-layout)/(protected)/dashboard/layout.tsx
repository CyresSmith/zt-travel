import Container from '@components/container';
import DashboardMenu from '@components/dashboard/dashboard-menu';

import type { WithChildren } from '@types';

const DashboardLayout = ({ children }: WithChildren) => {
    return (
        <Container className="flex gap-10">
            <DashboardMenu />
            <div className="flex-1">{children}</div>
        </Container>
    );
};

export default DashboardLayout;
