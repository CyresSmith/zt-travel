import { NavigationMenu } from '@radix-ui/react-navigation-menu';

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { auth } from '@auth';
import { NAV_KEYS } from '@lib/constants';
import { namu } from 'app/[locale]/layout';
import clsx from 'clsx';

import AuthButton from './auth-button/auth-button';
import LocaleSwitcher from './locale-switcher';
import Navigation from './navigation';

import Container from '@components/container';
import Icon from '@components/icon';

type Props = { absolute?: boolean };

type NavKeysType = (typeof NAV_KEYS)[number];

const Header = async ({ absolute = false }: Props) => {
    const session = await auth();
    const t = await getTranslations('Header');

    const user = session?.user;

    return (
        <header className="} mobile:py-3 tablet:py-4 desktop:py-6">
            <Container>
                <div className="flex h-[60px] items-center gap-6">
                    <NavigationMenu className="flex h-[60px] flex-1 items-center justify-between">
                        <Link href={'/'} className="inline-flex items-center gap-6">
                            <Icon name="zt-region-logo" width={100} height={60} />

                            <p
                                className={clsx(
                                    'w-[250px] text-xxl leading-7 text-white',
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
