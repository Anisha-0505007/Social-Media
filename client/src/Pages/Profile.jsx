import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
	const { username } = useParams();
	const { user } = useAuth();
	const displayName = user?.name || username || "Your profile";
	const initials = displayName
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<main className="profile-page">
			<header className="profile-header">
				<Link to="/home" className="profile-back">← Feed</Link>
				<span>SST Social</span>
			</header>
			<section className="profile-summary">
				<div className="profile-avatar" aria-hidden="true">{initials}</div>
				<p className="profile-kicker">Your corner of the circle</p>
				<h1>{displayName}</h1>
				<p className="profile-username">@{user?.username || username}</p>
				{user?.bio && <p className="profile-bio">{user.bio}</p>}
				<Link to="/home" className="profile-feed-link">Back to your feed <span aria-hidden="true">↗</span></Link>
			</section>
		</main>
	);
}

export default Profile;
