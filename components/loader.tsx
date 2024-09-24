import Icon from './icon';

const Loader = () => {
    return (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-backdrop">
            <Icon name="black-hole" width={50} height={50} className="animate-spin fill-themeBg" />
        </div>
    );
};

export default Loader;
