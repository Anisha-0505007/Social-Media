import { Link } from "react-router-dom";

function Landing() {
	return (
		<main className="landing-page">
			<header className="landing-header">
				<Link to="/" className="landing-brand"><span>S.</span> SST Social</Link>
				<nav aria-label="Account">
					<Link to="/login">Log in</Link>
					<Link to="/signup" className="landing-nav-cta">Join the circle <span aria-hidden="true">↗</span></Link>
				</nav>
			</header>

			<section className="landing-hero">
				<p className="landing-kicker">A social space for your people</p>
				<h1>Make the everyday worth sharing.</h1>
				<p className="landing-description">Little updates, familiar faces, and the moments you want to keep close. Your circle starts here.</p>
				<Link to="/signup" className="landing-cta">Create your account <span aria-hidden="true">↗</span></Link>
				<div className="landing-note"><span>01</span> Your circle, your feed.</div>
			</section>
		</main>
	);
}

export default Landing;
