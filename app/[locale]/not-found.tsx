import { Button } from '@ui/button';

import { Link } from '@i18n/routing';

const NotFound = async () => {
    return (
        <div className="flex h-screen w-screen flex-col content-center justify-center text-center">
            <h2 className="text-xxl text-red-500">Not found</h2>
            <p className="mt-6 text-xl">Requested recourse not found</p>
            <Button className="mx-auto mt-6" asChild>
                <Link href="/">"Return to home page"</Link>
            </Button>
        </div>
    );
};

export default NotFound;
