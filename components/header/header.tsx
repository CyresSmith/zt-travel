import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

import { NAV_KEYS } from '@lib/constants';
import { namu } from 'app/[locale]/layout';
import clsx from 'clsx';

import AuthButton from './auth-button';
import HeaderLink from './header-link';
import LocaleSwitcher from './locale-switcher';

import Icon from '@components/icon';

type Props = { absolute?: boolean; params: { locale: string } };

const Header = ({ absolute = false, params: { locale } }: Props) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('Header');

    return (
        <header
            className={clsx(
                'bg-primary-dark left-0 top-0 z-20 w-full bg-opacity-70 py-5',
                absolute && 'absolute'
            )}
        >
            <div>
                <div className="flex h-[60px] items-center gap-6">
                    <nav className="flex h-[60px] flex-1 items-center justify-between">
                        <Link href={'/'} className="inline-flex items-center gap-6">
                            <Icon name="zt-region-logo" width={100} height={60} />

                            <p
                                className={clsx(
                                    'text-xxl w-[250px] leading-7 text-white',
                                    namu.className
                                )}
                            >
                                {t('title')}
                            </p>
                        </Link>

                        <ul className="flex h-full gap-5">
                            {NAV_KEYS.map((key: string) => {
                                return (
                                    <li key={key} className="h-full">
                                        <HeaderLink
                                            key={key}
                                            label={t(`navigation.${key}`)}
                                            slug={key}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <AuthButton label={t('enter')} />
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
