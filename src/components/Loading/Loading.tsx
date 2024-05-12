import { tailspin } from 'ldrs';

tailspin.register();

const Loading = () => {
    return (
        <div className="w-full h-full bg-bgButton grid place-items-center">
            <l-tailspin size="60" stroke="5" speed="0.9" color="white"></l-tailspin>
        </div>
    );
};

export default Loading;

// Default values shown
