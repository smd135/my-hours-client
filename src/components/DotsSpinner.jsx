import { ThreeDots } from 'react-loader-spinner';

const DotsSpinner = () => {
	return <ThreeDots visible={true} height="80" width="80" color="#c073ff" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="spinnerWrapper" />;
};

export default DotsSpinner;
