import NavBar from './NavBar';

function Layout({ children }) {
	return (
		<div className="container mx-auto">
			<NavBar />
			{children}
		</div>
	);
}
export default Layout;
