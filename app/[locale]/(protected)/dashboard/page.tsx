import { getSession } from '@lib/utils';

type Props = {};

const DashboardPage = async () => {
    const session = await getSession();

    console.log('🚀 ~ DashboardPage ~ session:', session);

    return <div>DashboardPage</div>;
};

export default DashboardPage;
