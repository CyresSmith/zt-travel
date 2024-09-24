import SectionCard from '../section-card/section-card';

type Props = {};

const EventItem = ({}: Props) => {
    const eventDate = new Date(Date.now()).toLocaleString();

    const tags = [
        { label: 'first tag', href: 'events/first-tag' },
        { label: 'second tag', href: 'events/second-tag' },
    ];

    return (
        <SectionCard
            image={''}
            title={'Some event Some event Some event Some event Some event'}
            titleHref={`events/some-event`}
            tags={tags}
            links={[
                { href: '', icon: 'calendar-add', label: eventDate },
                { href: 'place/some-place', icon: 'map-point', label: 'some place' },
            ]}
        />
    );
};

export default EventItem;
