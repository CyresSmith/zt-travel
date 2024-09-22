import { getTranslations } from 'next-intl/server';

import type { IconName } from '@icon-names';
import clsx from 'clsx';

import Container from './container';
import Icon from './icon';

import { EMAIL, PHONE, THEME_TRANSITION } from '@constants';

import { Link } from '@i18n/routing';

const contacts = [
    {
        iconName: 'point-on-map',
        contact: 'address',
        href: 'https://maps.app.goo.gl/nfPMMFSwdnVgNSEEA',
    },
    { iconName: 'mailbox', contact: EMAIL, href: `mailto:${EMAIL}` },
    { iconName: 'phone-calling', contact: PHONE, href: `tel:${PHONE.split(' ').join('')}` },
];

const socialLinks = [
    { href: 'https://www.instagram.com/zt.tic', label: 'instagram' },
    {
        href: 'https://www.facebook.com/p/%D0%9C%D0%B0%D0%BD%D0%B4%D1%80%D1%83%D0%B9-%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%89%D0%B8%D0%BD%D0%BE%D1%8E-61552689869239',
        label: 'facebook',
    },
    { href: 'https://www.youtube.com', label: 'youtube' },
    { href: 'https://www.tiktok.com/@tic.zt', label: 'tiktok' },
];

const Footer = async () => {
    const t = await getTranslations('footer');

    return (
        <footer className="bg-themePrimary py-8">
            <Container className="flex justify-between">
                <div className="flex gap-5">
                    <Link href={'/'}>
                        <Icon name="zt-region-logo" width={50} height={30} />
                    </Link>

                    <address className="not-italic">
                        <ul>
                            {contacts.map(({ iconName, contact, href }, i) => (
                                <li key={contact} className={clsx(i !== 0 && 'mt-2')}>
                                    <Link
                                        href={href}
                                        rel="noopener noreferrer nofollow"
                                        target="_blank"
                                        className={`flex gap-2 fill-white hover:fill-themeYellow hover:text-themeYellow ${THEME_TRANSITION}`}
                                    >
                                        <Icon name={iconName as IconName} fill="inherit" />

                                        {contact === 'address' ? t('address') : contact}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </address>
                </div>

                <ul className="flex gap-2">
                    {socialLinks.map(({ href, label }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                rel="noopener noreferrer nofollow"
                                target="_blank"
                                className={clsx(
                                    `fill-white hover:fill-themeYellow ${THEME_TRANSITION}`
                                )}
                            >
                                <Icon name={label as IconName} className="inherit" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </footer>
    );
};

export default Footer;
