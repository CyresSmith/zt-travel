import { NavigationMenu } from '@radix-ui/react-navigation-menu';

import { getTranslations } from 'next-intl/server';

import { auth } from '@auth';
import { NAV_KEYS } from '@lib/constants';
import { namu } from '@lib/fonts';
import clsx from 'clsx';

import AuthButton from './auth-button/auth-button';
import LocaleSwitcher from './locale-switcher';
import Navigation from './navigation';

import Container from '@components/container';
import Icon from '@components/icon';

import { Link } from '@i18n/routing';

type Props = { fixed?: boolean };

type NavKeysType = (typeof NAV_KEYS)[number];

const Header = async ({ fixed = false }: Props) => {
    const session = await auth();
    const t = await getTranslations('header');

    const user = session?.user;

    return (
        <header
            className={clsx(
                'left-0 top-0 z-50 w-full bg-themeFg/60 py-0 backdrop-blur-[2px]',
                fixed && 'fixed'
            )}
        >
            <Container>
                <div className="flex items-center gap-6">
                    <NavigationMenu className="flex h-full flex-1 items-center justify-between">
                        <Link href={'/'} className="inline-flex items-center gap-6 py-3">
                            <Icon name="zt-region-logo" width={100} height={60} />

                            <p
                                className={clsx(
                                    'w-[250px] text-xl leading-7 text-white',
                                    namu.className
                                )}
                            >
                                {t('title')}
                            </p>
                        </Link>

                        <Navigation
                            items={NAV_KEYS.map(key => ({
                                href: `/${key}`,
                                label: t(`navigation.${key as NavKeysType}`),
                            }))}
                        />
                    </NavigationMenu>

                    <div className="flex items-center gap-2">
                        <AuthButton user={user} />
                        <LocaleSwitcher />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
